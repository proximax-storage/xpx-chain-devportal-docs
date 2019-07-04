---
id: sending-payouts-with-aggregate-complete-transaction
title: Sending payouts with aggregate-complete transaction
---
Send transactions to different accounts atomically, using an [aggregate complete transaction](../../built-in-features/aggregate-transaction.md#examples).

## Background

Dan wants to send mosaics to Alice and Bob.

![Aggregate Sending Payout](/img/aggregate-sending-payouts.png "Aggregate Sending Payout")

<p class=caption>Sending transactions to different recipients atomically</p>

He chooses to send an aggregate complete transaction, so both will receive the funds at the same time.

## Prerequisites

- Finish [sending a transfer transaction guide](../transaction/sending-a-transfer-transaction.md)
- XPX-Chain-SDK
- A text editor or IDE
- An account with XPX

## Let’s get into some code

1. Dan creates two [transfer transaction](../../built-in-features/transfer-transaction.md) with two different recipients, and wrap them in an [aggregate transaction](../../built-in-features/aggregate-transaction.md#examples).

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->

```ts
const transactionHttp = new TransactionHttp('http://localhost:3000');

const privateKey = process.env.PRIVATE_KEY as string;
const account = Account.createFromPrivateKey(privateKey, NetworkType.PRIVATE_TEST);

const brotherAddress = 'SDG4WG-FS7EQJ-KFQKXM-4IUCQG-PXUW5H-DJVIJB-OXJG';
const brotherAccount = Address.createFromRawAddress(brotherAddress);

const sisterAddress = 'SCGPXB-2A7T4I-W5MQCX-FQY4UQ-W5JNU5-F55HGK-HBUN';
const sisterAccount = Address.createFromRawAddress(sisterAddress);

const amount = NetworkCurrencyMosaic.createRelative(10); // 10 xpx represent 10 000 000 micro xpx

const brotherTransferTransaction = TransferTransaction.create(Deadline.create(), brotherAccount, [amount], PlainMessage.create('payout'), NetworkType.PRIVATE_TEST);
const sisterTransferTransaction = TransferTransaction.create(Deadline.create(), sisterAccount, [amount], PlainMessage.create('payout'), NetworkType.PRIVATE_TEST);

const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [brotherTransferTransaction.toAggregate(account.publicAccount),
        sisterTransferTransaction.toAggregate(account.publicAccount)],
    NetworkType.PRIVATE_TEST,
    []
);
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const privateKey = process.env.PRIVATE_KEY;
const account = Account.createFromPrivateKey(privateKey, NetworkType.PRIVATE_TEST);

const brotherAddress = 'SDG4WG-FS7EQJ-KFQKXM-4IUCQG-PXUW5H-DJVIJB-OXJG';
const brotherAccount = Address.createFromRawAddress(brotherAddress);

const sisterAddress = 'SCGPXB-2A7T4I-W5MQCX-FQY4UQ-W5JNU5-F55HGK-HBUN';
const sisterAccount = Address.createFromRawAddress(sisterAddress);

const amount = NetworkCurrencyMosaic.createRelative(10); // 10 xpx represent 10 000 000 micro xpx

const brotherTransferTransaction = TransferTransaction.create(Deadline.create(), brotherAccount, [amount], PlainMessage.create('payout'), NetworkType.PRIVATE_TEST);
const sisterTransferTransaction = TransferTransaction.create(Deadline.create(), sisterAccount, [amount], PlainMessage.create('payout'), NetworkType.PRIVATE_TEST);

const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [brotherTransferTransaction.toAggregate(account.publicAccount),
        sisterTransferTransaction.toAggregate(account.publicAccount)],
    NetworkType.PRIVATE_TEST,
    []
);
```

<!--Java-->
```java
        // Replace with private key
        final String privateKey = "";

        final Address brotherAddress = Address.createFromRawAddress("SDG4WG-FS7EQJ-KFQKXM-4IUCQG-PXUW5H-DJVIJB-OXJG");
        final Address sisterAddress = Address.createFromRawAddress("SCGPXB-2A7T4I-W5MQCX-FQY4UQ-W5JNU5-F55HGK-HBUN");

        final Account account = Account.createFromPrivateKey(privateKey, NetworkType.PRIVATE_TEST);

        final NetworkCurrencyMosaic xpx = NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(10)); // 10 xpx represent 10 000 000 micro xpx

        final TransferTransaction brotherTransferTransaction = TransferTransaction.create(
                Deadline.create(2, HOURS),
                brotherAddress,
                Collections.singletonList(xpx),
                PlainMessage.create("payout"),
                NetworkType.PRIVATE_TEST
        );

        final TransferTransaction sisterTransferTransaction = TransferTransaction.create(
                Deadline.create(2, HOURS),
                sisterAddress,
                Collections.singletonList(xpx),
                PlainMessage.create("payout"),
                NetworkType.PRIVATE_TEST
        );

        final AggregateTransaction aggregateTransaction = AggregateTransaction.createComplete(
                Deadline.create(2, HOURS),
                Arrays.asList(
                        brotherTransferTransaction.toAggregate(account.getPublicAccount()),
                        sisterTransferTransaction.toAggregate(account.getPublicAccount())
                ),
                NetworkType.PRIVATE_TEST
        );
```

<!--END_DOCUSAURUS_CODE_TABS-->

Do you know the difference between aggregate complete and aggregate bonded? In this case, one private key can sign all the transactions in the aggregate, so it is aggregate complete.

That means that there is no need to lock funds to send the transaction. If valid, it will be accepted by the network.

2. Sign and announce the transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```ts
const signedTransaction = account.sign(aggregateTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```
<!--JavaScript-->
```js
const signedTransaction = account.sign(aggregateTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--Java-->
```java
    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    final SignedTransaction signedTransaction = account.sign(aggregateTransaction);

    transactionHttp.announce(signedTransaction).toFuture().get();
```

<!--END_DOCUSAURUS_CODE_TABS-->


## What’s next?

Send an aggregate bonded transaction by following [creating an escrow with aggregate bonded transaction](./creating-an-escrow-with-aggregate-bonded-transaction.md) guide.
