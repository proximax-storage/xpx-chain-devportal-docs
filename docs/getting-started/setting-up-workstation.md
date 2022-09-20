---
id: setting-up-workstation
title: Setting up your workstation
---

This first guide will walk you through a step-by-step installation of the required tools to start developing on Sirius Chain.

## Running Sirius Chain Service Bootstrap

![Sirius Chain Layer](/img/four-layer-architecture-basic.png "Sirius Chain Layer")


**Sirius Chain Server nodes** (layer 1) build the peer-to-peer blockchain network. 
**Sirius Chain Rest nodes** (layer 2) provide the API gateway that the applications may use to access the blockchain and its features.

### Using your local environment and setup local node

```
This section is still a work in progress.
```


### Access our existing testing network without setting up a local node

Node Description | Network Type| Node REST API URL | Address Prefix (1st Letter)
-----------------|-------------|-------------------|------------------------
Public Test Network node | TEST_NET | https://bctestnet1.brimstone.xpxsirius.io | V

#
You can use our Sirius Chain REST API directly with your respective URL and network type as above. Besides, you can use your own node with your own API URL and network type if you happen to have one.

To get first block information:

```
$> {API URL}/block/1
```

## Creating a test account

An account is a key pair (private and public key) associated to a mutable state stored in the Sirius Chain. In other words, you have a deposit box on the blockchain, which only you can modify with your key pair. As the name suggests, the private key has to be kept secret at all times. Anyone with access to the private key ultimately has control over the account.

The **public key** is cryptographically derived from the private key. It would take millions of years to do the reverse process and therefore, the public key is safe to be shared.

Finally, the account address is generated with the public key, following the Sirius Chain protocol. Share this address instead of the public key, as it contains more information, such as a validity check or which network it uses (public, testnet or private).

[XPX-Chain-CLI](../client/overview.md) conveniently allows you to perform the most commonly used commands from your terminal i.e. using it to interact with the blockchain, setting up an account, sending funds, etc.

1. Install XPX-Chain-CLI using `npm`.

```
$> sudo npm install --global xpx2-cli
```

2. Create an account with the command line tool.

```
$> xpx2-cli account generate --network {Network Type} --save --url {API URL}
```

The `network flag` is set to TEST_NET. Test network is an alternative Sirius Chain used for development and testing purposes.

Use `save flag` to store the account on your computer. XPX-Chain-CLI uses stored account to sign the transactions that you start.

3. You should be able to see the following lines in your terminal, containing the account credentials:

> New Account: VCVG35-ZSPMYP-L2POZQ-JGSVEG-RYOJ3V-BNIU3U-N2E6 <br> Public Key: 33E0…6ED <br> Private Key: 0168…595

## What is XPX and how to get it?

The underlying cryptocurrency of the Sirius Chain network is called **XPX**. Every action on the Sirius Chain costs XPX, in order to provide an incentive for those who validate and secure the network.

Let’s use an account which already has XPX. We will need it to register the namespace and mosaic.

### Use nemesis address (for those who are hosting a local node)

1. Open a terminal, and go to the directory where you have  downloaded Sirius Chain Bootstrap Service.

```
$> cd  build/generated-addresses/
$> cat addresses.yaml
```
2. Under the section `nemesis_addresses`, you will find the key pairs which contain XPX.
3. Load the first account as a profile in XPX-Chain-CLI.
```
$> xpx2-cli profile create

Introduce network type (PRIVATE_TEST, PRIVATE, MAIN_NET, TEST_NET): TEST_NET
Introduce your private key: 41************************************************************FF
Introduce Sirius Chain Node URL. (Example: http://bctestnet1.brimstone.xpxsirius.io:3000): http://bctestnet1.brimstone.xpxsirius.io:3000
Insert profile name (blank means default and it could overwrite the previous profile):
```

### Use our faucet to get test-XPX

For `testnet` you can get test-XPX from our online faucet.
Simply go to our [faucet](../cheatsheet.md#testnet-1-faucet) to get your test-XPX.

## Accessing our PRIVATE Net

For our `Private` net, please send an email to devops@proximax.io to gain access to the private network.

## Setting up the development environment
It is time to choose a programming language. Pick the one you feel most comfortable with, or follow your project requirements.

Create a folder for your new project and run the instructions for the selected languages:

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```
`go get github.com/proximax-storage/go-xpx-chain-sdk`
```

<!--TypeScript-->

1. Create a `package.json` file. The minimum required Node.js version is 8.9.X.
```
$> npm init
```
2. Install tsjs-xpx-chain-sdk and rxjs library.
```
$> npm install tsjs-xpx-chain-sdk rxjs
```

3. tsjs-xpx-chain-sdk is build with TypeScript language. It is recommended to use TypeScript instead of JavaScript when building applications for Sirius Chain.

Make sure you have at least version 2.5.X installed.
```
$> sudo npm install --global typescript
$> typescript --version
```

4. Use ts-node to execute TypeScript files with node.
```
$> sudo npm install --global ts-node
```

<!--JavaScript-->

1. Create a `package.json` file. The minimum required Node.js version is 8.9.X.
```
$> npm init
```
2. Install tsjs-xpx-chain-sdk and rxjs library.
```
$> npm install tsjs-xpx-chain-sdk rxjs
```

<!--END_DOCUSAURUS_CODE_TABS-->



