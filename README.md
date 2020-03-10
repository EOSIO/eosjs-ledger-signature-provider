# EOSJS Signature Provider for Ledger

## Overview
A SignatureProvider for communicating with [eosjs](https://github.com/EOSIO/eosjs) from a Ledger device.

When plugged into `eosjs`, this signature provider enables applications to route signing requests to a Ledger device. Full instructions for `eosjs` can be found [here](https://github.com/EOSIO/eosjs).

![EOSIO Labs](https://img.shields.io/badge/EOSIO-Labs-5cb3ff.svg)

# About EOSIO Labs

EOSIO Labs repositories are experimental.  Developers in the community are encouraged to use EOSIO Labs repositories as the basis for code and concepts to incorporate into their applications. Community members are also welcome to contribute and further develop these repositories. Since these repositories are not supported by Block.one, we may not provide responses to issue reports, pull requests, updates to functionality, or other requests from the community, and we encourage the community to take responsibility for these.

## Installation

```bash
# Using yarn
yarn add eosjs-ledger-signature-provider
```

## Usage

#### Example
```javascript
const { SignatureProvider } from 'eosjs-ledger-signature-provider'

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
const { SignatureProvider } from 'eosjs-ledger-signature-provider'

const rpcEndpoint = 'https://localhost:3000'
const signatureProvider = new SignatureProvider()
const rpc = new JsonRpc(rpcEndpoint)
const api = new Api({ signatureProvider, rpc })

// eosjs will call both `getAvailableKeys` and `sign` from the SignatureProvider
api.transact(...)
.then((result) => console.info('TransactionId: ', result))
.catch((error) => console.info('Error: ', error))
```

## Contributing

[Contributing Guide](./CONTRIBUTING.md)

[Code of Conduct](./CONTRIBUTING.md#conduct)

## License

[MIT](./LICENSE)

## Important

See [LICENSE](./LICENSE) for copyright and license terms.

All repositories and other materials are provided subject to the terms of this [IMPORTANT](./IMPORTANT.md) notice and you must familiarize yourself with its terms.  The notice contains important information, limitations and restrictions relating to our software, publications, trademarks, third-party resources, and forward-looking statements.  By accessing any of our repositories and other materials, you accept and agree to the terms of the notice.
