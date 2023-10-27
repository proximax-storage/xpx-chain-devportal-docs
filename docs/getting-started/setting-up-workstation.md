---
id: setting-up-workstation
title: Setting up your workstation
---

This first guide will walk you through a step-by-step installation of the required tools to start developing on Sirius Chain.

## Sirius Chain Layers

![Sirius Chain Layer](/img/four-layer-architecture-basic.png "Sirius Chain Layer")


**Sirius Chain Server nodes** (layer 1) build the peer-to-peer blockchain network. 
**Sirius Chain Rest nodes** (layer 2) provide the API gateway that the applications may use to access the blockchain and its features.


### Access our existing testing network without setting up a local node

Node Description | Network Type| Node REST API URL | Address Prefix (1st Letter)
-----------------|-------------|-------------------|------------------------
Public Test Network 2 node | TEST_NET | https://api-2.testnet2.xpxsirius.io | V

If you wish to use other nodes, you can refer to [our API nodes](../cheatsheet.md#our-api-node)
#
You can use our Sirius Chain REST API directly with your respective URL and network type as above.

To get first block information:

```sh
curl {API URL}/block/1
```

## Creating a test account

An account is a key pair (private and public key) associated to a mutable state stored in the Sirius Chain. In other words, you have a deposit box on the blockchain, which only you can modify with your key pair. As the name suggests, the private key has to be kept secret at all times. Anyone with access to the private key ultimately has control over the account.

The **public key** is cryptographically derived from the private key. It would take millions of years to do the reverse process and therefore, the public key is safe to be shared.

Finally, the account address is generated with the public key, following the Sirius Chain protocol. Share this address instead of the public key, as it contains more information, such as a validity check or which network it uses (public, testnet or private).

### Using sdk to make a keypair

1. Install sdk using `npm`.

```sh
npm install tsjs-xpx-chain-sdk
```

2. Create an account with the command line tool.

```typescript
import {Account, NetworkType, Address} from 'tsjs-xpx-chain-sdk';

const NETWORK_TYPE = NetworkType.PUBLIC_TEST;

const newAccount = Account.generateNewAccount(NETWORK_TYPE);

console.log('Private Key: ' + newAccount.privateKey);
console.log('Public Key:  ' + newAccount.publicKey);
console.log('Address:     ' + newAccount.address.plain());
```

3. You should be able to see the following lines in your terminal, containing the account credentials:

> Private Key: af8...530 <br> Public Key: 37f...346 <br> Address: VAUOT2T4IRGFAY4WSD7DY3EUHANTRL3IAUG2TPNZ

## What is XPX and how to get it?

The underlying cryptocurrency of the Sirius Chain network is called **XPX**. Every action on the Sirius Chain costs XPX, in order to provide an incentive for those who validate and secure the network.

### Use our faucet to get test-XPX

For `testnet`, you can get test-XPX from our online faucet.
Simply go to our [faucet](../cheatsheet.md#testnet-2-faucet) to get your test-XPX.

## Setting up the development environment
It is time to choose a programming language. Pick the one you feel most comfortable with, or follow your project requirements.

Create a folder for your new project and run the instructions for the selected languages:

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```sh
go get github.com/proximax-storage/go-xpx-chain-sdk
```

<!--TypeScript-->

1. Create a `package.json` file. The minimum required Node.js version is 8.9.X.
```sh
npm init
```
2. Install tsjs-xpx-chain-sdk and rxjs library.
```sh
npm install tsjs-xpx-chain-sdk rxjs
```

3. tsjs-xpx-chain-sdk is build with TypeScript language. It is recommended to use TypeScript instead of JavaScript when building applications for Sirius Chain.

Make sure you have at least version 2.5.X installed.
```sh
sudo npm install --global typescript
typescript --version
```

4. Use ts-node to execute TypeScript files with node.
```sh
sudo npm install --global ts-node
```

<!--JavaScript-->

1. Create a `package.json` file. The minimum required Node.js version is 8.9.X.
```sh
npm init
```
2. Install tsjs-xpx-chain-sdk and rxjs library.
```sh
npm install tsjs-xpx-chain-sdk rxjs
```

<!--END_DOCUSAURUS_CODE_TABS-->



