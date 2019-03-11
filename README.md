# EOSJS Ledger Signature Provider Interface

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

