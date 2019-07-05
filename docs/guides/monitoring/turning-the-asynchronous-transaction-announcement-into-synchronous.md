---
id: turning-the-asynchronous-transaction-announcement-into-synchronous
title: Turning the asynchronous transaction announcement into synchronous
sidebar_label: Turning asynchronous transaction announcement into synchronous
---
Turn asynchronous transaction announcement into synchronous with [nem2-camel](https://github.com/proximax-storage/nem2-camel).
Background

Alice is developing an app to send 10 prx:xpx to Bob. She wants to know if the transaction has reached the network before sending Bob an email.

When announcing a transaction in NIS1, you had to wait to get the response from the node. Catapult works differently. When a transaction is announced, the REST API server will always return an OK.

As a result, the developer does not have to wait until the server returns a response, being able to make more responsive apps. However, it is developer’s responsibility to check the transactions status and ensure it is confirmed.

On the other hand, keeping track of transactions status adds unnecessary complexity to small projects. It also increases the difficulty when migrating from NIS1.

nem2-camel aims to solve these problems by providing a server that listens to the Catapult REST calls and acts as a proxy. When it detects a transaction announcement, it waits for the confirmation via [WebSockets](../../rest-api/websockets.md) and returns the message to the HTTP call.

<div class=info>

**Note**

The function `TransactionHttp.announceSync` allows announcing transactions synchronously when using nem2-camel as a proxy. nem2-camel will respond successfully when the transaction has reached the network and had no validation errors. You might still need to [wait for several confirmations](../../protocol/transaction.md) before executing additional actions.

</div>

![NEM2 Camel Proxy](/img/nem2-camel-proxy.png "NEM2 Camel Proxy")

<p class=caption>nem2-camel</p>

## Prerequisites

- Finish [sending a transfer transaction guide](../transaction/sending-a-transfer-transaction.md)
- A text editor or IDE
- An account with XPX

## Let’s get into some code

### Running Catapult Service in local

nem2-camel acts like a proxy between the application and the REST API.

For development and learning purposes, you can run the [Catapult Server and Catapult REST](../../protocol/node.md) using the [Catapult Service Bootstrap](https://github.com/tech-bureau/catapult-service-bootstrap/).

1. Make sure you have [docker](https://docs.docker.com/install/) and [docker compose](https://docs.docker.com/compose/install/) installed before running the following instructions:

```
$> git clone git@github.com:tech-bureau/catapult-service-bootstrap.git
$> cd catapult-service-bootstrap
$> docker-compose up
```

2. If everything goes well, after the image has been downloaded and the service is running, check if you can get the first block information:

```
$> curl localhost:3000/block/1
```

### Getting Alice and Bob addresses

Once the Catapult Service is running, it will generate a set of accounts containing XPX.

1. Find the key pairs which contain XPX under the section `nemesis_addresses`.

```
    $> cd  build/generated-addresses/
    $> cat raw-addresses.yaml
```

2. Take the first key pair as Alice's account, and copy the private key.

3. Take the second key pair as Bob's account, and copy the address.

### Installing nem2-camel

<div class=info>

**Note**

nem2-camel requires at least Java version 8.

</div>

1. Download the latest [nem2-camel jar](https://github.com/proximax-storage/nem2-camel/releases) package release, and run:

```
$> java -jar nem2-camel.jar --url http://localhost:3000
```

2. After the service is up, use 0.0.0.0:9000 as the new proxy url.

### Sending the transfer transaction

1. Alice creates a [Transfer Transaction](../../built-in-features/transfer-transaction.md), sending 10 XPX to Bob and signs it with her account.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const privateKey = process.env.PRIVATE_KEY as string;
const account = Account.createFromPrivateKey(privateKey,NetworkType.TEST_NET);

const recipientAddress =  Address.createFromRawAddress('SBHEVGUFDEW22FAT2EFU6UYXRKLTC6HFOPB4CRSE');

const transferTransaction = TransferTransaction.create(
    Deadline.create(),
   recipientAddress,
    [NetworkCurrencyMosaic.createRelative(10)],
    EmptyMessage,
    NetworkType.TEST_NET);

const signedTransaction = account.sign(transferTransaction);
```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Once signed, Alice can [announce the transaction](../../protocol/transaction.md) to the network. Use `TransactionHttp.announceSync` instead of `TransactionHttp.announce` to wait until it reaches the network and returns back the Transaction object. After that, Alice can send an email to Bob.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp('http://0.0.0.0:9000');

transactionHttp
    .announceSync(signedTransaction)
    .subscribe(x => {
        console.log(x);
        // TODO: send email to Bob
    },
    err => {
        console.error(err);
    }
);
```

<!--END_DOCUSAURUS_CODE_TABS-->

If the transaction is valid, nem2-camel returns a `Transaction` object. It is important to highlight that this transaction has an `unconfirmed` status. Alice, or you, might still need to [wait for several confirmations](../../protocol/transaction.md) before executing additional actions.

In case the Catapult REST server throws an error, the subscribe method will invoke the `error function` returning a `TransactionStatus` object.