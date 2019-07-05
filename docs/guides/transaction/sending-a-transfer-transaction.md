---
id: sending-a-transfer-transaction
title: Sending a transfer transaction
sidebar_label: Transfer transaction
---
Transfer [mosaics](../../built-in-features/mosaic.md) and messages between two accounts.

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md)
- XPX-Chain-SDK or XPX-Chain-CLI
- A text editor or IDE
- An account with XPX

## Background

![Transfer Transaction](/img/transfer-transaction1.png "Transfer Transaction")

<p class=caption>Sending a transfer Transaction</p>

Alice wants to send 10 XPX to Bob, whose address is `SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54`.

### Monitoring the transaction

Once an account announces a transaction, the server will always return an OK response. Receiving an OK response does not mean the transaction is valid. A good practice is to [monitor transactions](../monitoring/monitoring-a-transaction-status.md) before being announced.

To understand the transaction lifecycle, we recommend you to open three new terminals. The first terminal monitors announced transactions validation errors.

```
$> xpx2-cli monitor status
```

Monitoring `unconfirmed` shows you which transactions have reached the network, but not are not included in a block yet.

```
$> xpx2-cli monitor unconfirmed
```

Once a transaction is included, you will see it under the `confirmed` terminal.

```
$> xpx2-cli monitor confirmed
```

## Let’s get into some code

Alice wants sends 10 XPX to Bob. She wants to include a message, for example Welcome to Sirius-Chain.

1. Create the transfer transaction, by including Bob address as the recipient, adding 10 XPX and the message requested.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const recipientAddress = Address.createFromRawAddress('SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54');

const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    recipientAddress,
    [NetworkCurrencyMosaic.createRelative(10)],
    PlainMessage.create('Welcome To Sirius-Chain'),
    NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const recipientAddress = Address.createFromRawAddress('SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54');

const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    recipientAddress,
    [NetworkCurrencyMosaic.createRelative(10)],
    PlainMessage.create('Welcome To Sirius-Chain'),
    NetworkType.TEST_NET);
```

<!--Java-->
```java
    final String recipientAddress = "SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54";

    final TransferTransaction transferTransaction = TransferTransaction.create(
        Deadline.create(2, HOURS),
        Address.createFromRawAddress(recipientAddress),
        Collections.singletonList(NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(10))),
        PlainMessage.create("Welcome To Sirius-Chain"),
        NetworkType.TEST_NET
    );
```
<!--END_DOCUSAURUS_CODE_TABS-->


Although the transaction is created, it has not been announced to the network yet. Alice must sign the transaction with her account first so that the network can verify its authenticity.

2. Sign the transaction with Alice account.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const privateKey = process.env.PRIVATE_KEY as string;

const account = Account.createFromPrivateKey(privateKey,NetworkType.TEST_NET);

const signedTransaction = account.sign(transferTransaction);
```

<!--JavaScript-->
```js
const privateKey = process.env.PRIVATE_KEY;

const account = Account.createFromPrivateKey(privateKey,NetworkType.TEST_NET);

const signedTransaction = account.sign(transferTransaction);
```

<!--Java-->
```java
    // Replace with private key
    final String privateKey = "";

    final Account account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

    final SignedTransaction signedTransaction = account.sign(transferTransaction);
```
<!--END_DOCUSAURUS_CODE_TABS-->


3. Once signed, you can [announce the transaction](../../protocol/transaction.md) to the network.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--Java-->
```java
    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    transactionHttp.announce(signedTransaction).toFuture().get();
```

<!--Bash-->
```bash
xpx2-cli transaction transfer --recipient VD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54 --mosaics prx:xpx::10000000 --message "Welcome to Sirius-Chain"
```

<!--END_DOCUSAURUS_CODE_TABS-->


4. Open the terminal where you are monitoring account transactions `status`. It should be empty. If there is an error, you can [check the error code here](../../rest-api/status-errors.md).

A new transaction should have appeared in the terminal where you are monitoring `unconfirmed`. At this point, the transaction has reached the network, but it is not clear if it will get included in a block.

If it is included in a block, the transaction gets processed, and the amount stated in the transaction gets transferred from the sender’s account to the recipient’s account.

## What’s next?

Send multiple mosaics in the same transaction.

### Adding multiple mosaics

![Transfer-transaction multiple mosaics](/img/transfer-transaction-multiple-mosaics.png "Transfer-transaction multiple mosaics")

<p class=caption>Sending multiple mosaics in the same transaction</p>

As you may have noticed, transfer transactions require an array of mosaics as a parameter, allowing to send transfer transactions with multiple mosaics at the same time.

If you own more than one mosaic, send them together in the same transaction:

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
[new Mosaic( new MosaicId('alice:token'), UInt64.fromUint(10)),
        NetworkCurrencyMosaic.createRelative(10)],
```

<!--JavaScript-->
```js
[new Mosaic( new MosaicId('alice:token'), UInt64.fromUint(10)),
        NetworkCurrencyMosaic.createRelative(10)],
```

<!--Java-->
```java
    Arrays.asList(
        new Mosaic(new MosaicId("alice:token"), BigInteger.valueOf(10)),
        NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(10))
    ),
```

<!--Bash-->
```bash
xpx2-cli transaction transfer --recipient VD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54 --mosaics alice:token::10,prx:xpx::10000000 --message "sending multiple mosaics"
```

<!--END_DOCUSAURUS_CODE_TABS-->
