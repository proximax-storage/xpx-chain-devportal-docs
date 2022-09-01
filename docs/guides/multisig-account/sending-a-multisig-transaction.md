---
id: sending-a-multisig-transaction
title: Sending a multisig transaction
---

Send a transaction involving a [multisig](../../built-in-features/multisig-account.md).

## Background

![Multisig transaction](/img/multisig-transaction-1-of-2.png "Sending an aggregate complete transaction")

<p class=caption>Sending an aggregate complete transaction</p>

Alice and Bob have separate [accounts](../../built-in-features/account.md). They also want to have a shared account to buy groceries, so that if Bob is out shopping, he can buy groceries for both himself and Alice.

This shared account appears in Sirius Chain as **1-of-2 multisig**. Multisig accounts permit Alice and Bob sharing funds in a separate account, requiring only the signature from one of them to transact.

![1-of-2 multisig account example](/img/multisig-1-of-2.png "1-of-2 multisig account example")

<p class=caption>1-of-2 multisig account example</p>

In this guide, you will send a transaction from a multisig account.

## Prerequisites

- XPX-Chain-SDK.
- A text editor or IDE.
- Finish sending a [transfer transaction guide](../transaction/sending-a-transfer-transaction.md).
- Finish converting an [account to multisig guide](../multisig-account/converting-an-account-to-multisig.md).
- A [multisig](../../built-in-features/multisig-account.md) account with `XPX`.
- A cosignatory [account](../../built-in-features/account.md) with `XPX`.

## Getting into some code

### 1-of-2 signatures required

Bob has finished filling the basket, and he is ready to pay. The cashier’s screen indicates that the cost of the purchase adds up to `10 XPX`.

Let’s develop the piece of code present in Bob’s mobile wallet that enables him to send multisig transactions.

1. Define the private key of Bob’s account and the public key of the multisig account shared with Alice.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://bctestnet1.brimstone.xpxsirius.io:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

cosignatureAccount, err := client.NewAccountFromPrivateKey(os.Getenv("COSIGNATORY_PRIVATE_KEY"))
if err != nil {
    panic(err)
}

multisigAccount, err := client.NewAccountFromPublicKey(os.Getenv("MULTISIG_PUBLIC_KEY"))
if err != nil {
    panic(err)
}

recipientAddress, err := sdk.NewAddressFromRaw("VD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54")
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp( 'http://bctestnet1.brimstone.xpxsirius.io:3000');

const cosignatoryPrivateKey = process.env.COSIGNATORY_1_PRIVATE_KEY as string;
const cosignatoryAccount = Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.TEST_NET);

const multisigAccountPublicKey = '202B3861F34F6141E120742A64BC787D6EBC59C9EFB996F4856AA9CBEE11CD31';
const multisigAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.TEST_NET);

const recipientAddress = Address.createFromRawAddress('VD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54');
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp( 'http://bctestnet1.brimstone.xpxsirius.io:3000');

const cosignatoryPrivateKey = process.env.COSIGNATORY_1_PRIVATE_KEY;
const cosignatoryAccount = Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.TEST_NET);

const multisigAccountPublicKey = '202B3861F34F6141E120742A64BC787D6EBC59C9EFB996F4856AA9CBEE11CD31';
const multisigAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.TEST_NET);

const recipientAddress = Address.createFromRawAddress('VD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54');
```

<!--Java-->
```java
    // Replace with a Cosignatory's private key
    final String cosignatoryPrivateKey = "<privateKey>";

    // Replace with a Multisig's public key
    final String multisigAccountPublicKey = "<publicKey>";

    // Replace with recipient address
    final String recipientAddress = "VD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54";

    final Account cosignatoryAccount = Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.TEST_NET);

    final PublicAccount multisigPublicAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.TEST_NET);
```
<!--END_DOCUSAURUS_CODE_TABS-->


2. Define the following [transfer transaction](../../built-in-features/transfer-transaction.md#transfertransaction).

- Recipient: Grocery’s address
- Message: sending 10 XPX
- Mosaics: [10 `XPX`]

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
transferTransaction, err := client.NewTransferTransaction(
    sdk.NewDeadline(time.Hour),
    recipientAddress,
    []*sdk.Mosaic{sdk.XpxRelative(10)},
    sdk.NewPlainMessage("sending 10 xpx"),
)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    recipientAddress,
    [NetworkCurrencyMosaic.createRelative(10)],
    PlainMessage.create('sending 10 xpx'),
    NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    recipientAddress,
    [NetworkCurrencyMosaic.createRelative(10)],
    PlainMessage.create('sending 10 xpx'),
    NetworkType.TEST_NET);
```

<!--Java-->
```java
    final TransferTransaction transferTransaction = TransferTransaction.create(
        Deadline.create(2, HOURS),
        Address.createFromRawAddress(recipientAddress),
        Collections.singletonList(NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(10))),
        PlainMessage.create("sending 10 xpx"),
        NetworkType.TEST_NET
    );
```
<!--END_DOCUSAURUS_CODE_TABS-->

3. Wrap the transfer transaction under an [aggregate transaction](../../built-in-features/aggregate-transaction.md#examples), attaching multisig public key as the signer.

An aggregate transaction is **complete** if before announcing it to the network, all the required cosigners have signed it. In this case the multisig requires only one signature (1-of-2), so you can define the aggregate as complete.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
transferTransaction.ToAggregate(multisigAccount)
aggregateTransaction, err := client.NewCompleteAggregateTransaction(sdk.NewDeadline(time.Hour), []sdk.Transaction{transferTransaction})
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [transferTransaction.toAggregate(multisigAccount)],
    NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [transferTransaction.toAggregate(multisigAccount)],
    NetworkType.TEST_NET);
```

<!--Java-->
```java

final AggregateTransaction aggregateTransaction = new TransactionBuilderFactory().aggregateComplete()
            .innerTransactions(Arrays.asList(
                    transferTransaction.toAggregate(multisigPublicAccount)
            )).deadline(new Deadline(2, ChronoUnit.HOURS)).networkType(NetworkType.TEST_NET);

```

<!--END_DOCUSAURUS_CODE_TABS-->

4. Sign and announce the transaction with Bob’s account.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
signedTransaction, err := cosignatureAccount.Sign(aggregateTransaction)
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
const signedTransaction = cosignatoryAccount.sign(aggregateTransaction, generationHash);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const signedTransaction = cosignatoryAccount.sign(aggregateTransaction, generationHash);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--Java-->
```java
final SignedTransaction aggregateSignedTransaction = cosignatoryAccount.sign(aggregateTransaction, generationHash);

final TransactionHttp transactionHttp = new TransactionHttp("http://bctestnet1.brimstone.xpxsirius.io:3000");

    transactionHttp.announce(aggregateSignedTransaction).toFuture().get();
```

<!--END_DOCUSAURUS_CODE_TABS-->

### 2-of-2 signatures required

What would have happened if the account was a 2-of-2 multisig instead of a 1-of-2? As all required cosigners did not sign the transaction, it should be announced as [aggregate bonded](../../built-in-features/aggregate-transaction.md#examples) and cosigned later with Alice’s account.

![Multisig Transaction 2 of 2](/img/multisig-transaction-2-of-2.png "Multisig-transaction 2 of 2")

<p class=caption>Sending an aggregate bonded transaction</p>

1. Open a new terminal to monitor the aggregate bonded transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--CLI-->
```sh
xpx2-cli monitor aggregatebonded --address <your-address-here>
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Modify the previous code, defining the transaction as `aggregate bonded`.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
aggregateBoundedTransaction, err := client.NewBondedAggregateTransaction(
    sdk.NewDeadline(time.Hour),
    []sdk.Transaction{transferTransaction},
)
if err != nil {
    panic(err)
}

signedAggregateBoundedTransaction, err := cosignatureAccount.Sign(aggregateBoundedTransaction)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const aggregateTransaction = AggregateTransaction.createBonded(
    Deadline.create(),
    [transferTransaction.toAggregate(multisigAccount)],
    NetworkType.TEST_NET);

const signedTransaction = cosignatoryAccount.sign(aggregateTransaction, generationHash);
```

<!--JavaScript-->
```js
const aggregateTransaction = AggregateTransaction.createBonded(
    Deadline.create(),
    [transferTransaction.toAggregate(multisigAccount)],
    NetworkType.TEST_NET);

const signedTransaction = cosignatoryAccount.sign(aggregateTransaction, generationHash);
```

<!--Java-->
```java
final AggregateTransaction aggregateTransaction = new TransactionBuilderFactory().aggregateBonded()
            .innerTransactions(Arrays.asList(
                    transferTransaction.toAggregate(multisigPublicAccount)
            )).deadline(new Deadline(2, ChronoUnit.HOURS)).networkType(NetworkType.TEST_NET);

final SignedTransaction aggregateSignedTransaction = cosignatoryAccount.sign(aggregateTransaction, generationHash);
```

<!--END_DOCUSAURUS_CODE_TABS-->

3. When an aggregate transaction is bonded, Bob needs to lock at least `10` XPX to avoid network spamming. Once all cosigners sign the transaction, the amount of XPX locked becomes available again in Bob’s account. After [hash lock](../../built-in-features/aggregate-transaction.md#hash-lock-transaction) transaction has been confirmed, [announce the aggregate bonded transaction](../../built-in-features/aggregate-transaction.md).


<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
lockFundsTransaction, err := client.NewLockFundsTransaction(
    sdk.NewDeadline(time.Hour),
    sdk.XpxRelative(10),
    sdk.Duration(480),
    signedAggregateBoundedTransaction,
)
if err != nil {
    panic(err)
}

signedLockFundsTransaction, err := cosignatureAccount.Sign(lockFundsTransaction)
if err != nil {
    panic(err)
}

_, err = client.Transaction.Announce(context.Background(), signedLockFundsTransaction)
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

const lockFundsTransactionSigned = cosignatoryAccount.sign(lockFundsTransaction, generationHash);

listener.open().then(() => {

    transactionHttp
        .announce(lockFundsTransactionSigned)
        .subscribe(x => console.log(x), err => console.error(err));

    listener
        .confirmed(cosignatoryAccount.address)
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

const lockFundsTransactionSigned = cosignatoryAccount.sign(lockFundsTransaction, generationHash);

listener.open().then(() => {

    transactionHttp
        .announce(lockFundsTransactionSigned)
        .subscribe(x => console.log(x), err => console.error(err));

    listener
        .confirmed(cosignatoryAccount.address)
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

    // Creating the lock funds transaction and announce it

    final LockFundsTransaction lockFundsTransaction = LockFundsTransaction.create(
        Deadline.create(2, HOURS),
        NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(10)),
        BigInteger.valueOf(480),
        aggregateSignedTransaction,
        NetworkType.TEST_NET
    );

    final SignedTransaction lockFundsTransactionSigned = cosignatoryAccount.sign(lockFundsTransaction, generationHash);

    final TransactionHttp transactionHttp = new TransactionHttp("http://bctestnet1.brimstone.xpxsirius.io:3000");

    transactionHttp.announce(lockFundsTransactionSigned).toFuture().get();

    System.out.println(lockFundsTransactionSigned.getHash());

    final Listener listener = new Listener("http://bctestnet1.brimstone.xpxsirius.io:3000");

    listener.open().get();

    final Transaction transaction = listener.confirmed(cosignatoryAccount.getAddress()).take(1).toFuture().get();

    System.out.println(transaction);

    transactionHttp.announceAggregateBonded(aggregateSignedTransaction).toFuture().get();
```

<!--END_DOCUSAURUS_CODE_TABS-->

4. [Cosign the aggregate transaction](../aggregate-transaction/signing-announced-aggregate-bonded-transactions.md) with Alice's account. Use transaction hash output from step 1.

<!--DOCUSAURUS_CODE_TABS-->
<!--CLI-->
```sh
xpx2-cli transaction cosign --hash A6A374E66B32A3D5133018EFA9CD6E3169C8EEA339F7CCBE29C47D07086E068C --profile alice
```
<!--END_DOCUSAURUS_CODE_TABS-->

