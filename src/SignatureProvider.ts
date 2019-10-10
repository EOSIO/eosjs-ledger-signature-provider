import { Api } from 'eosjs'
import { LedgerAPI } from './LedgerAPI'
import { getTransport } from './LedgerUtils'

interface SignatureProviderInterface {
  eosjsApi: Api
  ledgerApi: LedgerAPI
  cachedKeys: string[]
  cachedKeysFull: { indexNumber: number, key: string }[]
}

export class SignatureProvider implements SignatureProviderInterface {
  public eosjsApi: Api = null
  public ledgerApi: LedgerAPI = null
  public cachedKeys: string[] = []
  public cachedKeysFull: { indexNumber: number, key: string }[] = []

  public async getLedgerApi() {
    if (this.ledgerApi) {
      return this.ledgerApi
    }

    const transport = await getTransport()
    this.ledgerApi = new LedgerAPI(transport)
    return this.ledgerApi
  }

  /** Public keys associated with the private keys that the `SignatureProvider` holds */
  public async getAvailableKeys(requestPermission?: boolean, indexArray?: Array<number>) {
    try {
      const api = await this.getLedgerApi();
      if (!indexArray || !indexArray.length) indexArray = [0];
      let keys = this.cachedKeysFull.slice();
      for (const indexNumber of indexArray){
        let cached = keys.find(key=>key.indexNumber==indexNumber);
        if (!cached){
          let key = await api.getPublicKey(requestPermission, indexNumber);
          keys.push({indexNumber, key})
        }
      } 
      this.cachedKeysFull = keys;
      this.cachedKeys = this.cachedKeysFull.map(key=>key.key)
      return this.cachedKeys
    } catch (error) {
      throw error
    }
  }

  /** Sign a transaction */
  public async sign({ chainId, serializedTransaction, indexNumber}: { chainId: string, serializedTransaction: Uint8Array, indexNumber?: number }) {
    try {
      const api = await this.getLedgerApi()
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
