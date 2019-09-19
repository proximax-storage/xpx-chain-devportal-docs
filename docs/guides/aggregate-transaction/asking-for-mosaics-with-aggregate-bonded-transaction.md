---
id: asking-for-mosaics-with-aggregate-bonded-transaction
title: Asking for mosaics with aggregate-bonded transaction
---

Ask an account to send you funds using an [aggregate bonded transaction](../../built-in-features/aggregate-transaction.md).

## Prerequisites

- A text editor or IDE
- An account with XPX
- Finish [creating an escrow with aggregate bonded transaction guide](./creating-an-escrow-with-aggregate-bonded-transaction.md)
- Have account with `xpx`

## Getting into some code

![Aggregate asking for mosaics](/img/aggregate-asking-for-mosaics.png "Aggregate asking for mosaics")

<p class=caption>Asking for mosaics with an aggregate bonded transaction</p>

Bob wants to ask Alice for `20 xpx`.

1. Set up both Alice’s and Bob’s accounts.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://localhost:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

alicePrivateKey := os.Getenv("PRIVATE_KEY")
aliceAccount, err := client.NewAccountFromPrivateKey(alicePrivateKey)
if err != nil {
    panic(err)
}

bobPublicKey := "F82527075248B043994F1CAFD965F3848324C9ABFEC506BC05FBCF5DD7307C9D";
bobAccount, err := client.NewAccountFromPublicKey(bobPublicKey)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const nodeUrl = 'http://localhost:3000';
const transactionHttp = new TransactionHttp(nodeUrl);
const listener = new Listener(nodeUrl);

const alicePrivateKey = process.env.ALICE_PRIVATE_KEY as string;
const aliceAccount = Account.createFromPrivateKey(alicePrivateKey, NetworkType.TEST_NET);

const bobPublicKey = 'F82527075248B043994F1CAFD965F3848324C9ABFEC506BC05FBCF5DD7307C9D';
const bobAccount = PublicAccount.createFromPublicKey(bobPublicKey, NetworkType.TEST_NET);
```
<!--JavaScript-->
```js
const nodeUrl = 'http://localhost:3000';
const transactionHttp = new TransactionHttp(nodeUrl);
const listener = new Listener(nodeUrl);

const alicePrivateKey = process.env.ALICE_PRIVATE_KEY;
const aliceAccount = Account.createFromPrivateKey(alicePrivateKey, NetworkType.TEST_NET);

const bobPublicKey = 'F82527075248B043994F1CAFD965F3848324C9ABFEC506BC05FBCF5DD7307C9D';
const bobAccount = PublicAccount.createFromPublicKey(bobPublicKey, NetworkType.TEST_NET);
```
<!--Java-->
```java
import java.math.BigInteger;
import java.net.MalformedURLException;
import java.util.Arrays;
import java.util.Collections;
import java.util.concurrent.ExecutionException;

import static java.time.temporal.ChronoUnit.HOURS;

class AskingForMosaicsWithAggregateBondedTransaction {

    @Test
    void askingForMosaicsWithAggregateBondedTransaction() throws ExecutionException, InterruptedException, MalformedURLException {

        // Replace with a Alice's private key
        final String alicePrivateKey = "";

        // Replace with a Bob's public key
        final String bobPublicKey = "";

        final Account aliceAccount = Account.createFromPrivateKey(alicePrivateKey, NetworkType.TEST_NET);
        final PublicAccount bobPublicAccount = PublicAccount.createFromPublicKey(bobPublicKey, NetworkType.TEST_NET);
```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Create an aggregate bonded transaction with two inner transactions:

<div class=cap-alpha-ol>

1. From Bob to Alice with the message `send me 20 xpx`

</div>

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
transferTransaction1, err := client.NewTransferTransaction(sdk.NewDeadline(time.Hour), aliceAccount.PublicAccount.Address, []*sdk.Mosaic{}, sdk.NewPlainMessage("send me 20 XPX"))
if err != nil {
    panic(err)
}
transferTransaction1.ToAggregate(bobAccount)
```

<!--TypeScript-->
```js
const transferTransaction1 = TransferTransaction.create(
    Deadline.create(),
    bobAccount.address,
    [],
    PlainMessage.create('send me 20 XPX'),
    NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const transferTransaction1 = TransferTransaction.create(
    Deadline.create(),
    bobAccount.address,
    [],
    PlainMessage.create('send me 20 XPX'),
    NetworkType.TEST_NET);
```

<!--Java-->
```java
    final TransferTransaction transferTransaction1 = TransferTransaction.create(
        Deadline.create(2, HOURS),
        bobPublicAccount.getAddress(),
        Collections.emptyList(),
        PlainMessage.create("send me 20 XPX"),
        NetworkType.TEST_NET
    );
```

<!--END_DOCUSAURUS_CODE_TABS-->

<div class=cap-alpha-ol>

2. From Alice to Bob sending `20 xpx`

</div>
<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
transferTransaction2, err := client.NewTransferTransaction(sdk.NewDeadline(time.Hour), bobAccount.Address, []*sdk.Mosaic{sdk.XpxRelative(20)}, sdk.NewPlainMessage(""))
if err != nil {
    panic(err)
}
transferTransaction2.ToAggregate(aliceAccount.PublicAccount)
```

<!--TypeScript-->
```js
const transferTransaction2 = TransferTransaction.create(
    Deadline.create(),
    aliceAccount.address,
    [NetworkCurrencyMosaic.createRelative(20)],
    EmptyMessage,
    NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const transferTransaction2 = TransferTransaction.create(
    Deadline.create(),
    aliceAccount.address,
    [NetworkCurrencyMosaic.createRelative(20)],
    EmptyMessage,
    NetworkType.TEST_NET);
```

<!--Java-->
```java
    final TransferTransaction transferTransaction2 = TransferTransaction.create(
        Deadline.create(2, HOURS),
        aliceAccount.getAddress(),
        Collections.singletonList(NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(20))),
        PlainMessage.Empty,
        NetworkType.TEST_NET
    );
```

<!--END_DOCUSAURUS_CODE_TABS-->

3. Wrap the defined transactions in an [aggregate bonded transaction](../../built-in-features/aggregate-transaction.md):

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
aggregateTransaction, err := client.NewBondedAggregateTransaction(sdk.NewDeadline(time.Hour), []sdk.Transaction{transferTransaction1, transferTransaction2})
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const aggregateTransaction = AggregateTransaction.createBonded(
    Deadline.create(),
    [transferTransaction1.toAggregate(aliceAccount.publicAccount),
        transferTransaction2.toAggregate(bobAccount)],
    NetworkType.TEST_NET);

const signedTransaction = aliceAccount.sign(aggregateTransaction, generationHash);
```

<!--JavaScript-->
```js
const aggregateTransaction = AggregateTransaction.createBonded(
    Deadline.create(),
    [transferTransaction1.toAggregate(aliceAccount.publicAccount),
        transferTransaction2.toAggregate(bobAccount)],
    NetworkType.TEST_NET);

const signedTransaction = aliceAccount.sign(aggregateTransaction, generationHash);
```

<!--Java-->
```java
    final AggregateTransaction aggregateTransaction = new TransactionBuilderFactory().aggregateBonded()
            .innerTransactions(Arrays.asList(
                    transferTransaction1.toAggregate(aliceAccount.getPublicAccount()),
                    transferTransaction2.toAggregate(bobPublicAccount)
            )).deadline(new Deadline(2, ChronoUnit.HOURS)).networkType(NetworkType.TEST_NET);

    final SignedTransaction aggregateSignedTransaction = aliceAccount.sign(aggregateTransaction, generationHash);
```

<!--END_DOCUSAURUS_CODE_TABS-->

4. Sign the aggregate bonded transaction with Alice’s account and announce it to the network. Remember to [lock 10 nativeCurrency](../../built-in-features/aggregate-transaction.md#hashlocktransaction) first. Alice will recover the locked mosaics if the aggregate transaction completes.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
signedAggregateBoundedTransaction, err := aliceAccount.Sign(aggregateTransaction)
if err != nil {
    panic(err)
}

lockFundsTransaction, err := client.NewLockFundsTransaction(
    sdk.NewDeadline(time.Hour),
    sdk.XpxRelative(10),
    sdk.Duration(1000),
    signedAggregateBoundedTransaction
)
if err != nil {
    panic(err)
}

signedLockFundsTransaction, err := aliceAccount.Sign(lockFundsTransaction)
if err != nil {
    panic(err)
}

_, err = client.Transaction.Announce(context.Background(), signedLockFundsTransaction)
if err != nil {
    panic(err)
}

time.Sleep(time.Second * 30)

_, err = client.Transaction.AnnounceAggregateBonded(context.Background(), signedAggregateBoundedTransaction)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const lockFundsTransaction = LockFundsTransaction.create(
    Deadline.create(),
    NetworkCurrencyMosaic.createRelative(10),
    UInt64.fromUint(480),
    signedTransaction,
    NetworkType.TEST_NET);

const lockFundsTransactionSigned = aliceAccount.sign(lockFundsTransaction, generationHash);

listener.open().then(() => {

    transactionHttp
        .announce(lockFundsTransactionSigned)
        .subscribe(x => console.log(x), err => console.error(err));

    listener
        .confirmed(aliceAccount.address)
        .pipe(
            filter((transaction) => transaction.transactionInfo !== undefined
                && transaction.transactionInfo.hash === lockFundsTransactionSigned.hash),
            mergeMap(ignored => transactionHttp.announceAggregateBonded(signedTransaction))
        )
        .subscribe(announcedAggregateBonded => console.log(announcedAggregateBonded),
            err => console.error(err));
});
```

<!--JavaScript-->
```js
const lockFundsTransaction = LockFundsTransaction.create(
    Deadline.create(),
    NetworkCurrencyMosaic.createRelative(10),
    UInt64.fromUint(480),
    signedTransaction,
    NetworkType.TEST_NET);

const lockFundsTransactionSigned = aliceAccount.sign(lockFundsTransaction, generationHash);

listener.open().then(() => {

    transactionHttp
        .announce(lockFundsTransactionSigned)
        .subscribe(x => console.log(x), err => console.error(err));

    listener
        .confirmed(aliceAccount.address)
        .pipe(
            filter((transaction) => transaction.transactionInfo !== undefined
                && transaction.transactionInfo.hash === lockFundsTransactionSigned.hash),
            mergeMap(ignored => transactionHttp.announceAggregateBonded(signedTransaction))
        )
        .subscribe(announcedAggregateBonded => console.log(announcedAggregateBonded),
            err => console.error(err));
});
```

<!--Java-->
```java
    final SignedTransaction pullTransactionSigned = aliceAccount.sign(pullTransaction, generationHash);

    // Creating the lock funds transaction and announce it
    final LockFundsTransaction lockFundsTransaction = LockFundsTransaction.create(
        Deadline.create(2, HOURS),
        NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(10)),
        BigInteger.valueOf(480),
        pullTransactionSigned,
        NetworkType.TEST_NET
    );

    final SignedTransaction lockFundsTransactionSigned = aliceAccount.sign(lockFundsTransaction, generationHash);

    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    transactionHttp.announce(lockFundsTransactionSigned).toFuture().get();

    System.out.println(lockFundsTransactionSigned.getHash());

    final Listener listener = new Listener("http://localhost:3000");

    listener.open().get();

    final Transaction transaction = listener.confirmed(aliceAccount.getAddress()).take(1).toFuture().get();

    transactionHttp.announceAggregateBonded(pullTransactionSigned).toFuture().get();
```

<!--END_DOCUSAURUS_CODE_TABS-->

5. If all goes well, [Bob receives a notification to cosign the transaction](../monitoring/monitoring-a-transaction-status.md). Check how to [cosign the transaction](./signing-announced-aggregate-bonded-transactions.md) with Bob's account in the following guide.

