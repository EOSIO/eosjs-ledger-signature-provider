import { Api } from 'eosjs'
import { LedgerAPI } from './LedgerAPI'
import { getTransport } from './LedgerUtils'

interface SignatureProviderInterface {
  addressIndex: number
  eosjsApi: Api
  ledgerApi: LedgerAPI
  cachedKeys: string[]
  cachedKeysFull: Array<{ indexNumber: number, key: string }>
}

export class SignatureProvider implements SignatureProviderInterface {
  public addressIndex: number = 0
  public eosjsApi: Api = null
  public ledgerApi: LedgerAPI = null
  public cachedKeys: string[] = []
  public cachedKeysFull: Array<{ indexNumber: number, key: string }> = []

  public async getLedgerApi() {
    if (this.ledgerApi) {
      return this.ledgerApi
    }

    const transport = await getTransport()
    this.ledgerApi = new LedgerAPI(transport)
    return this.ledgerApi
  }

  /** Public keys associated with the private keys that the `SignatureProvider` holds */
  public async getAvailableKeys(requestPermission: boolean = false, indexArray?: number[]) {
    try {
      const api = await this.getLedgerApi()
      if (!indexArray || !indexArray.length) {indexArray = [this.addressIndex]}
      for (const indexNumber of indexArray) {
        const cached = this.cachedKeysFull.find((key) => key.indexNumber === indexNumber)
        if (!cached) {
          const key = await api.getPublicKey(requestPermission, indexNumber)
          this.cachedKeysFull.push({indexNumber, key})
        }
      }
      this.cachedKeys = this.cachedKeysFull.map((key) => key.key)
      return this.cachedKeys
    } catch (error) {
      throw error
    }
  }

  /** Sign a transaction */
  public async sign(
    { chainId, serializedTransaction}:
    { chainId: string, serializedTransaction: Uint8Array}) {
    try {
      const api = await this.getLedgerApi()
      const indexNumber = this.addressIndex
      const signatures = await api.signTransaction({ chainId, serializedTransaction, indexNumber })
      return { signatures, serializedTransaction }
    } catch (error) {
      throw error
    }
  }

  protected getCachedKeys(): string[] {
    return this.cachedKeys
  }

  protected setCachedKeys(keys: string[]): void {
    this.cachedKeys = keys
  }

  public clearCachedKeys(): void {
    this.cachedKeys = null
  }

  public cleanUp(): void {
    return
  }
}
