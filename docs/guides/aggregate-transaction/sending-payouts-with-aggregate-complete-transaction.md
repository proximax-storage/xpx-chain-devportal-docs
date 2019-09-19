---
id: sending-payouts-with-aggregate-complete-transaction
title: Sending payouts with aggregate-complete transaction
---

Send transactions to different accounts atomically, using an [aggregate complete transaction](../../built-in-features/aggregate-transaction.md#examples).

## Background Information 

Dan wants to send mosaics to Alice and Bob. He chooses to send an aggregate complete transaction, so both will receive the funds at the same time.

![Aggregate Sending Payout](/img/aggregate-sending-payouts.png "Aggregate Sending Payout")

<p class=caption>Sending transactions to different recipients atomically</p>

Dan chooses to send an aggregate complete transaction, so both will receive the funds at the same time.

## Prerequisites

- XPX-Chain-SDK
- A text editor or IDE
- Finish [sending a transfer transaction guide](../transaction/sending-a-transfer-transaction.md)
- An account with `xpx`

## Geting into some code

1. Create two [transfer transaction](../../built-in-features/transfer-transaction.md) with two different recipients, wrapping them in an [aggregate transaction](../../built-in-features/aggregate-transaction.md#examples).

As one private key can sign all the transactions in the aggregate, define the aggregate as complete. That means that there is no need to lock funds to send the transaction. If valid, it will be accepted by the network.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://localhost:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)


sender, err := client.NewAccountFromPrivateKey(os.Getenv("SENDER_PRIVATE_KEY"))
if err != nil {
    panic(err)
}
aliceAccount, err := client.NewAccountFromPublicKey(os.Getenv("ALICE_PUBLIC_KEY"))
if err != nil {
    panic(err)
}

bobAccount, err := client.NewAccountFromPublicKey(os.Getenv("BOB_PUBLIC_KEY"))
if err != nil {
    panic(err)
}

amount := []*sdk.Mosaic{sdk.XpxRelative(10)}

aliceTransferTransaction, err := client.NewTransferTransaction(sdk.NewDeadline(time.Hour), aliceAccount.Address, amount, sdk.NewPlainMessage("payout"))
aliceTransferTransaction.ToAggregate(sender.PublicAccount)
if err != nil {
    panic(err)
}

bobTransferTransaction, err := client.NewTransferTransaction(sdk.NewDeadline(time.Hour), bobAccount.Address, amount, sdk.NewPlainMessage("payout"))
bobTransferTransaction.ToAggregate(sender.PublicAccount)
if err != nil {
    panic(err)
}

aggregateTransaction, err := client.NewCompleteAggregateTransaction(sdk.NewDeadline(time.Hour), []sdk.Transaction{aliceTransferTransaction, bobTransferTransaction})
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const privateKey = process.env.PRIVATE_KEY as string;
const danAccount = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const aliceAddress = 'VDG4WG-FS7EQJ-KFQKXM-4IUCQG-PXUW5H-DJVIJB-OXJG';
const aliceAccount = Address.createFromRawAddress(aliceAddress);

const bobAddress = 'VCGPXB-2A7T4I-W5MQCX-FQY4UQ-W5JNU5-F55HGK-HBUN';
const bobAccount = Address.createFromRawAddress(bobAddress);

const amount = NetworkCurrencyMosaic.createRelative(10); // 10 xpx represent 10 000 000 micro xpx

const aliceTransferTransaction = TransferTransaction.create(Deadline.create(), aliceAccount, [amount], PlainMessage.create('payout'), NetworkType.TEST_NET);
const bobTransferTransaction = TransferTransaction.create(Deadline.create(), bobAddress, [amount], PlainMessage.create('payout'), NetworkType.TEST_NET);

const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [
        aliceTransferTransaction.toAggregate(danAccount.publicAccount),
        bobTransferTransaction.toAggregate(danAccount.publicAccount)
    ],
    NetworkType.TEST_NET
);
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const privateKey = process.env.PRIVATE_KEY;
const danAccount = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const aliceAddress = 'VDG4WG-FS7EQJ-KFQKXM-4IUCQG-PXUW5H-DJVIJB-OXJG';
const aliceAccount = Address.createFromRawAddress(aliceAddress);

const bobAddress = 'VCGPXB-2A7T4I-W5MQCX-FQY4UQ-W5JNU5-F55HGK-HBUN';
const bobAccount = Address.createFromRawAddress(bobAddress);

const amount = NetworkCurrencyMosaic.createRelative(10); // 10 xpx represent 10 000 000 micro xpx

const aliceTransferTransaction = TransferTransaction.create(Deadline.create(), aliceAccount, [amount], PlainMessage.create('payout'), NetworkType.TEST_NET);
const bobTransferTransaction = TransferTransaction.create(Deadline.create(), bobAddress, [amount], PlainMessage.create('payout'), NetworkType.TEST_NET);

const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [
        aliceTransferTransaction.toAggregate(danAccount.publicAccount),
        bobTransferTransaction.toAggregate(danAccount.publicAccount)
    ],
    NetworkType.TEST_NET
);
```

<!--Java-->
```java
        // Replace with private key
        final String privateKey = "<privateKey>";

        final Address aliceAddress = Address.createFromRawAddress("VDG4WG-FS7EQJ-KFQKXM-4IUCQG-PXUW5H-DJVIJB-OXJG");
        final Address bobAddress = Address.createFromRawAddress("VCGPXB-2A7T4I-W5MQCX-FQY4UQ-W5JNU5-F55HGK-HBUN");

        final Account danAccount = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

        final NetworkCurrencyMosaic xpx = NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(10)); // 10 xpx represent 10 000 000 micro xpx

        final TransferTransaction aliceTransferTransaction = TransferTransaction.create(
                Deadline.create(2, HOURS),
                aliceAddress,
                Collections.singletonList(xpx),
                PlainMessage.create("payout"),
                NetworkType.TEST_NET
        );

        final TransferTransaction bobTransferTransaction = TransferTransaction.create(
                Deadline.create(2, HOURS),
                bobAddress,
                Collections.singletonList(xpx),
                PlainMessage.create("payout"),
                NetworkType.TEST_NET
        );

        final AggregateTransaction aggregateTransaction = new TransactionBuilderFactory().aggregateComplete()
            .innerTransactions(Arrays.asList(
                    aliceTransferTransaction.toAggregate(danAccount.getPublicAccount()),
                    bobTransferTransaction.toAggregate(danAccount.getPublicAccount())
            )).deadline(new Deadline(2, ChronoUnit.HOURS)).networkType(NetworkType.TEST_NET);


```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Sign and announce the transaction.
<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
signedTransaction, err := sender.Sign(aggregateTransaction)
if err != nil {
    panic(err)
}

_, err = client.Transaction.Announce(context.Background(), signedTransaction)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const signedTransaction = danAccount.sign(aggregateTransaction, generationHash);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```
<!--JavaScript-->
```js
const signedTransaction = danAccount.sign(aggregateTransaction, generationHash);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--Java-->
```java
    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    final SignedTransaction signedTransaction = danAccount.sign(aggregateTransaction, generationHash);

    transactionHttp.announce(signedTransaction).toFuture().get();
```

<!--END_DOCUSAURUS_CODE_TABS-->


## What’s next?

Send an aggregate bonded transaction by following the [creating an escrow with aggregate bonded transaction](./creating-an-escrow-with-aggregate-bonded-transaction.md) guide.

