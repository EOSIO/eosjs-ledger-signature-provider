# EOSJS Signature Provider for Ledger

## Overview
A SignatureProvider for communicating with [eosjs](https://github.com/EOSIO/eosjs) from a Ledger device.

When plugged into `eosjs`, this signature provider enables applications to route signing requests to a Ledger device. Full instructions for `eosjs` can be found [here](https://github.com/EOSIO/eosjs).

## Installation

```bash
# Using yarn
yarn add @blockone/eosjs-ledger-signature-provider
```

## Usage

#### Example
```javascript
const { SignatureProvider } from '@blockone/eosjs-ledger-signature-provider'

const signatureProvider = new SignatureProvider()

signatureProvider.getAvailableKeys()
  .then((result) => console.info('Keys: ', result))
  .catch((error) => console.info('Error: ', error))

const chainId = '000000000'
const serializedTransaction = {} // A transaction as a Uint8Array. View `serializeTransaction` in https://github.com/EOSIO/eosjs/blob/develop/src/eosjs-api.ts

signatureProvider.sign({ chainId, serializedTransaction })
  .then((result) => console.info('TransactionId: ', result))
  .catch((error) => console.info('Error: ', error))
```

#### Example with eosjs
```javascript
const { Api, JsonRpc } from 'eosjs'
const { SignatureProvider } from '@blockone/eosjs-ledger-signature-provider'

const rpcEndpoint = 'https://localhost:3000'
const signatureProvider = new SignatureProvider()
const rpc = new JsonRpc(rpcEndpoint)
const api = new Api({ signatureProvider, rpc })

// eosjs will call both `getAvailableKeys` and `sign` from the SignatureProvider
api.transact(...)
.then((result) => console.info('TransactionId: ', result))
.catch((error) => console.info('Error: ', error))
```

## Contribution
Check out the [Contributing](./CONTRIBUTING.md) guide

## License
[MIT licensed](./LICENSE)

## Important

See LICENSE for copyright and license terms.  Block.one makes its contribution on a voluntary basis as a member of the EOSIO community and is not responsible for ensuring the overall performance of the software or any related applications.  We make no representation, warranty, guarantee or undertaking in respect of the software or any related documentation, whether expressed or implied, including but not limited to the warranties or merchantability, fitness for a particular purpose and noninfringement. In no event shall we be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or documentation or the use or other dealings in the software or documentation.  Any test results or performance figures are indicative and will not reflect performance under all conditions.  Any reference to any third party or third-party product, service or other resource is not an endorsement or recommendation by Block.one.  We are not responsible, and disclaim any and all responsibility and liability, for your use of or reliance on any of these resources. Third-party resources may be updated, changed or terminated at any time, so the information here may be out of date or inaccurate.
