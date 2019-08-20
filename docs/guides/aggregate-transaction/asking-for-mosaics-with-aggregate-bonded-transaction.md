---
id: asking-for-mosaics-with-aggregate-bonded-transaction
title: Asking for mosaics with aggregate-bonded transaction
---
Ask an account to send you funds using an [aggregate bonded transaction](../../built-in-features/aggregate-transaction.md).

## Prerequisites

- Finish [creating an escrow with aggregate bonded transaction guide](./creating-an-escrow-with-aggregate-bonded-transaction.md)
- A text editor or IDE
- An account with XPX

## Let’s get into some code

![Aggregate asking for mosaics](/img/aggregate-asking-for-mosaics.png "Aggregate asking for mosaics")

<p class=caption>Asking for mosaics with an aggregate bonded transaction</p>

Alice wants to ask Bob for 20 XPX.

1. Set up both Alice’s and Bob’s accounts.

<!--DOCUSAURUS_CODE_TABS-->

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

<!--Golang-->
```go
alicePrivateKey := os.GetEnv("PRIVATE_KEY")
aliceAccount := sdk.NewAccountFromPrivateKey(alicePrivateKey, sdk.PUBLIC_TEST)

bobPublicKey := 'F82527075248B043994F1CAFD965F3848324C9ABFEC506BC05FBCF5DD7307C9D';
bobAccount := sdk.NewAccountFromPublicKey(bobPublicKey, sdk.PUBLIC_TEST)
```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Alice creates an aggregate bonded transaction with two inner transactions:

<div class=cap-alpha-ol>

1. Define the first inner [transfer transaction](../../built-in-features/transfer-transaction.md#transfertransaction):

</div>

- message: “message reason” (custom, but not empty)
- receiver: Bob address
- signer: Alice

<!--DOCUSAURUS_CODE_TABS-->

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

<!--Golang-->
```go
conf, err := sdk.NewConfig(baseUrl, sdk.PUBLIC_NET, time.Second * 10)
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

transferTransaction1, err := client.NewTransferTransaction(sdk.NewDeadline(2), bobAccount.PublicAccount.Address, []*sdk.Mosaic{}, sdk.NewPlainMessage("send me 20 XPX"))
if err != nil {
    panic(err)
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

<div class=cap-alpha-ol>

2. Define the second inner [transfer transaction](../../built-in-features/transfer-transaction.md#transfertransaction):

</div>

- message: empty
- receiver: Alice address
- mosaics: 20 XPX
- signer: Bob

<!--DOCUSAURUS_CODE_TABS-->

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

<!--Golang-->
```go
transferTransaction2, err := client.NewTransferTransaction(sdk.NewDeadline(2), aliceAccount.Address, []*sdk.Mosaic{sdk.XpxRelative(20)}, sdk.NewPlainMessage(""))
if err != nil {
    panic(err)
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

3. Wrap the defined transactions in an aggregate bonded transaction:

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const aggregateTransaction = AggregateTransaction.createBonded(
    Deadline.create(),
    [transferTransaction1.toAggregate(aliceAccount.publicAccount),
        transferTransaction2.toAggregate(bobAccount)],
    NetworkType.TEST_NET);

const signedTransaction = aliceAccount.sign(aggregateTransaction);
```

<!--JavaScript-->
```js
const aggregateTransaction = AggregateTransaction.createBonded(
    Deadline.create(),
    [transferTransaction1.toAggregate(aliceAccount.publicAccount),
        transferTransaction2.toAggregate(bobAccount)],
    NetworkType.TEST_NET);

const signedTransaction = aliceAccount.sign(aggregateTransaction);
```

<!--Java-->
```java
// TODO
```

<!--Golang-->
```go
aggregateTransaction, err := client.NewBondedAggregateTransaction(sdk.NewDeadline(10), []sdk.Transaction{transferTransaction1, transferTransaction2})
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

4. Alice signs the aggregate bonded transaction and announces it to the network, locking first 10 XPX.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const lockFundsTransaction = LockFundsTransaction.create(
    Deadline.create(),
    NetworkCurrencyMosaic.createRelative(10),
    UInt64.fromUint(480),
    signedTransaction,
    NetworkType.TEST_NET);

const lockFundsTransactionSigned = aliceAccount.sign(lockFundsTransaction);

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

const lockFundsTransactionSigned = aliceAccount.sign(lockFundsTransaction);

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
    final SignedTransaction pullTransactionSigned = aliceAccount.sign(pullTransaction);

    // Creating the lock funds transaction and announce it
    final LockFundsTransaction lockFundsTransaction = LockFundsTransaction.create(
        Deadline.create(2, HOURS),
        NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(10)),
        BigInteger.valueOf(480),
        pullTransactionSigned,
        NetworkType.TEST_NET
    );

    final SignedTransaction lockFundsTransactionSigned = aliceAccount.sign(lockFundsTransaction);

    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    transactionHttp.announce(lockFundsTransactionSigned).toFuture().get();

    System.out.println(lockFundsTransactionSigned.getHash());

    final Listener listener = new Listener("http://localhost:3000");

    listener.open().get();

    final Transaction transaction = listener.confirmed(aliceAccount.getAddress()).take(1).toFuture().get();

    transactionHttp.announceAggregateBonded(pullTransactionSigned).toFuture().get();
```

<!--END_DOCUSAURUS_CODE_TABS-->

<div class=info>

**Note**

The [listener implementation changes](../monitoring/monitoring-a-transaction-status.md#troubleshooting-monitoring-transactions-on-the-client-side) when used on the client side (e.g., Angular, React, Vue).

</div>

If all goes well, [Bob receives a notification](../monitoring/monitoring-a-transaction-status.md).

## What’s next?

Bob has not cosigned the transaction yet. Consider reading [signing announced aggregate bonded transactions](./signing-announced-aggregate-bonded-transactions.md) guide.

After receiving the transaction, Bob signs the `transaction hash` and announces the cosignature signed transaction.

As the aggregate bonded transaction has all the cosignatures required, it will be included in a block.
