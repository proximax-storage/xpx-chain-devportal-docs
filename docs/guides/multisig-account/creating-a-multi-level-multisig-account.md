---
id: creating-a-multi-level-multisig-account
title: Creating a multi-level multisig-account
---

Create a [multi-level multisig account](../../built-in-features/multisig-account.md).

Following this guide you will learn to create the following 3-level multisig account.

![Multi-level multisig-account](/img/mlma-complex-1.png "Multi-level multisig-account")

<p class=caption>Three-level multisig account example</p>

## Background Information 

[Multisig accounts](../../built-in-features/multisig-account.md) can have as cosignatories other multisig accounts. Multi-level multisig accounts add “AND/OR” logic to multi-signature transactions.

## Prerequisites

- Text editor or IDE
- XPX-Chain-SDK or XPX-Chain-CLI
- Finish [converting an account to multisig guide](./converting-an-account-to-multisig.md)

## Getting into some code

1. Define the multisig account #2

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://bctestnet1.brimstone.xpxsirius.io:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

multisig2, err := client.NewAccountFromPrivateKey(os.Getenv("MULTISIG_2_ACCOUNT_PRIVATE_KEY"))
if err != nil {
    panic(err)
}

cosignatory5, err := client.NewAccountFromPublicKey(os.Getenv("COSIGNATORY_5_PUBLIC_KEY"))
if err != nil {
    panic(err)
}

cosignatory6, err := client.NewAccountFromPublicKey(os.Getenv("COSIGNATORY_6_PUBLIC_KEY"))
if err != nil {
    panic(err)
}

convertMultisigAccount2Transaction, err := client.NewModifyMultisigAccountTransaction(
    sdk.NewDeadline(time.Hour),
    1,
    1,
    []*sdk.MultisigCosignatoryModification{
        {sdk.Add, cosignatory5},
        {sdk.Add, cosignatory6},
    },
)
```

<!--TypeScript-->
```js
const multisig2PrivateKey = '<privateKey2>';
const multisigAccount2 = Account.createFromPrivateKey(multisig2PrivateKey, NetworkType.TEST_NET);

const cosignatoryAccount5PublicKey = '<publicKey5>';
const cosignatory5 = PublicAccount.createFromPublicKey(cosignatoryAccount5PublicKey, NetworkType.TEST_NET);

const cosignatoryAccount6PublicKey = '<publicKey6>';
const cosignatory6 = PublicAccount.createFromPublicKey(cosignatoryAccount6PublicKey, NetworkType.TEST_NET);

const convertMultisigAccount2Transaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    1,
    1,
    [
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory5,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory6,
        )],
    NetworkType.TEST_NET);

```

<!--JavaScript-->
```js
const multisig2PrivateKey = '<privateKey2>';
const multisigAccount2 = Account.createFromPrivateKey(multisig2PrivateKey, NetworkType.TEST_NET);

const cosignatoryAccount5PublicKey = '<publicKey5>';
const cosignatory5 = PublicAccount.createFromPublicKey(cosignatoryAccount5PublicKey, NetworkType.TEST_NET);

const cosignatoryAccount6PublicKey = '<publicKey6>';
const cosignatory6 = PublicAccount.createFromPublicKey(cosignatoryAccount6PublicKey, NetworkType.TEST_NET);

const convertMultisigAccount2Transaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    1,
    1,
    [
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory5,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory6,
        )],
    NetworkType.TEST_NET);

```

<!--Java-->
```java
    // Create multisig #2 (1-of-2)

    // Replace with the private key of the account that you want to convert into multisig
    final String multisig2PrivateKey = "<privateKey2>";

    // Replace with cosignatories public keys
    final String cosignatory5PublicKey = "<publicKey5>";
    final String cosignatory6PublicKey = "<publicKey6>";

    final Account multisigAccount2 = Account.createFromPrivateKey(multisig2PrivateKey, NetworkType.TEST_NET);

    final PublicAccount cosignatory5PublicAccount = PublicAccount.createFromPublicKey(cosignatory5PublicKey, NetworkType.TEST_NET);
    final PublicAccount cosignatory6PublicAccount = PublicAccount.createFromPublicKey(cosignatory6PublicKey, NetworkType.TEST_NET);

    final ModifyMultisigAccountTransaction convertMultisigAccount2Transaction = ModifyMultisigAccountTransaction.create(
        Deadline.create(2, HOURS),
        1,
        1,
        Arrays.asList(
            new MultisigCosignatoryModification(
                MultisigCosignatoryModificationType.ADD,
                cosignatory5PublicAccount
            ),
            new MultisigCosignatoryModification(
                MultisigCosignatoryModificationType.ADD,
                cosignatory6PublicAccount
            )
        ),
        NetworkType.TEST_NET
    );
```

<!--END_DOCUSAURUS_CODE_TABS-->


2. Create multisig account #3

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
multisig3, err := client.NewAccountFromPrivateKey(os.Getenv("MULTISIG_3_ACCOUNT_PRIVATE_KEY"))
if err != nil {
    panic(err)
}

cosignatory7, err := client.NewAccountFromPublicKey(os.Getenv("COSIGNATORY_7_PUBLIC_KEY"))
if err != nil {
    panic(err)
}

cosignatory8, err := client.NewAccountFromPublicKey(os.Getenv("COSIGNATORY_8_PUBLIC_KEY"))
if err != nil {
    panic(err)
}

cosignatory4, err := client.NewAccountFromPublicKey(os.Getenv("COSIGNATORY_4_PUBLIC_KEY"))
if err != nil {
    panic(err)
}

convertMultisigAccount3Transaction, err := client.NewModifyMultisigAccountTransaction(
    sdk.NewDeadline(time.Hour),
    2,
    1,
    []*sdk.MultisigCosignatoryModification{
        {sdk.Add, cosignatory7},
        {sdk.Add, cosignatory8},
        {sdk.Add, cosignatory4},
    },
)
```

<!--TypeScript-->
```js
const multisig3PrivateKey = "<privateKey3>";
const multisigAccount3 = Account.createFromPrivateKey(multisig3PrivateKey, NetworkType.TEST_NET);

const cosignatoryAccount7PublicKey = "<publicKey7>";
const cosignatory7 = PublicAccount.createFromPublicKey(cosignatoryAccount7PublicKey, NetworkType.TEST_NET);

const cosignatoryAccount8PublicKey = "<publicKey8>";
const cosignatory8 = PublicAccount.createFromPublicKey(cosignatoryAccount8PublicKey, NetworkType.TEST_NET);

const cosignatoryAccount4PublicKey = "<publicKey4>";
const cosignatory4 = PublicAccount.createFromPublicKey(cosignatoryAccount4PublicKey, NetworkType.TEST_NET);

const convertMultisigAccount3Transaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    2,
    1,
    [
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory7,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory8,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory4,
        )],
    NetworkType.TEST_NET);

```

<!--JavaScript-->
```js
const multisig3PrivateKey = "<privateKey3>";
const multisigAccount3 = Account.createFromPrivateKey(multisig3PrivateKey, NetworkType.TEST_NET);

const cosignatoryAccount7PublicKey = "<publicKey7>";
const cosignatory7 = PublicAccount.createFromPublicKey(cosignatoryAccount7PublicKey, NetworkType.TEST_NET);

const cosignatoryAccount8PublicKey = "<publicKey8>";
const cosignatory8 = PublicAccount.createFromPublicKey(cosignatoryAccount8PublicKey, NetworkType.TEST_NET);

const cosignatoryAccount4PublicKey = "<publicKey4>";
const cosignatory4 = PublicAccount.createFromPublicKey(cosignatoryAccount4PublicKey, NetworkType.TEST_NET);

const convertMultisigAccount3Transaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    2,
    1,
    [
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory7,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory8,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory4,
        )],
    NetworkType.TEST_NET);

```

<!--Java-->
```java
    // Replace with the private key of the account that you want to convert into multisig
    final String multisig3PrivateKey = "<privateKey3>";

    // Replace with cosignatories public keys
    final String cosignatory7PublicKey = "<publicKey7>";
    final String cosignatory8PublicKey = "<publicKey8>";
    final String cosignatory4PublicKey = "<publicKey4>";

    final Account multisigAccount3 = Account.createFromPrivateKey(multisig3PrivateKey, NetworkType.TEST_NET);

    final PublicAccount cosignatory7PublicAccount = PublicAccount.createFromPublicKey(cosignatory7PublicKey, NetworkType.TEST_NET);
    final PublicAccount cosignatory8PublicAccount = PublicAccount.createFromPublicKey(cosignatory8PublicKey, NetworkType.TEST_NET);
    final PublicAccount cosignatory4PublicAccount = PublicAccount.createFromPublicKey(cosignatory4PublicKey, NetworkType.TEST_NET);

    final ModifyMultisigAccountTransaction convertMultisigAccount3Transaction = ModifyMultisigAccountTransaction.create(
        Deadline.create(2, HOURS),
        2,
        1,
        Arrays.asList(
            new MultisigCosignatoryModification(
                MultisigCosignatoryModificationType.ADD,
                cosignatory7PublicAccount
            ),
            new MultisigCosignatoryModification(
                MultisigCosignatoryModificationType.ADD,
                cosignatory8PublicAccount
            ),
            new MultisigCosignatoryModification(
                MultisigCosignatoryModificationType.ADD,
                cosignatory4PublicAccount
            )
        ),
        NetworkType.TEST_NET
    );

```

<!--END_DOCUSAURUS_CODE_TABS-->


3. Create multisig account #1

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
multisig1, err := client.NewAccountFromPrivateKey(os.Getenv("MULTISIG_1_ACCOUNT_PRIVATE_KEY"))
if err != nil {
    panic(err)
}

convertMultisigAccount1Transaction, err := client.NewModifyMultisigAccountTransaction(
    sdk.NewDeadline(time.Hour),
    3,
    1,
    []*sdk.MultisigCosignatoryModification{
        {sdk.Add, multisig2.PublicAccount},
        {sdk.Add, multisig3.PublicAccount},
        {sdk.Add, cosignatory4},
    },
)
```

<!--TypeScript-->
```js
const multisig1PrivateKey = "<privateKey1>";
const multisigAccount1 = Account.createFromPrivateKey(multisig1PrivateKey, NetworkType.TEST_NET);

const convertMultisigAccount1Transaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    3,
    1,
    [
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            multisigAccount2.publicAccount,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            multisigAccount3.publicAccount,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory4,
        )],
    NetworkType.TEST_NET);

```

<!--JavaScript-->
```js
const multisig1PrivateKey = "<privateKey1>";
const multisigAccount1 = Account.createFromPrivateKey(multisig1PrivateKey, NetworkType.TEST_NET);

const convertMultisigAccount1Transaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    3,
    1,
    [
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            multisigAccount2.publicAccount,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            multisigAccount3.publicAccount,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory4,
        )],
    NetworkType.TEST_NET);

```

<!--Java-->
```java
    // Replace with the private key of the account that you want to convert into multisig
    final String multisig1PrivateKey = "<privateKey1>";

    final Account multisigAccount1 = Account.createFromPrivateKey(multisig1PrivateKey, NetworkType.TEST_NET);

    final ModifyMultisigAccountTransaction convertMultisigAccount1Transaction = ModifyMultisigAccountTransaction.create(
        Deadline.create(2, HOURS),
        3,
        1,
        Arrays.asList(
            new MultisigCosignatoryModification(
                MultisigCosignatoryModificationType.ADD,
                multisigAccount2.getPublicAccount()
            ),
            new MultisigCosignatoryModification(
                MultisigCosignatoryModificationType.ADD,
                multisigAccount3.getPublicAccount()
            ),
            new MultisigCosignatoryModification(
                MultisigCosignatoryModificationType.ADD,
                cosignatory4PublicAccount
            )
        ),
        NetworkType.TEST_NET
    );

```

<!--END_DOCUSAURUS_CODE_TABS-->

4. Announce the transactions together using an [aggregate bonded transaction](../../built-in-features/aggregate-transaction.md). Make sure that the account #1 owns at least `10 xpx`.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
convertMultisigAccount1Transaction.ToAggregate(multisig1.PublicAccount)
convertMultisigAccount2Transaction.ToAggregate(multisig2.PublicAccount)
convertMultisigAccount3Transaction.ToAggregate(multisig3.PublicAccount)
aggregateTransaction, err := client.NewCompleteAggregateTransaction(
    sdk.NewDeadline(time.Hour),
    []sdk.Transaction{convertMultisigAccount1Transaction, convertMultisigAccount2Transaction, convertMultisigAccount3Transaction},
)
if err != nil {
    panic(err)
}

signedAggregateTransaction, err := multisig1.Sign(aggregateTransaction)
if err != nil {
    panic(err)
}

lockFundsTransaction, err := client.NewLockFundsTransaction(
    sdk.NewDeadline(time.Hour),
    sdk.XpxRelative(10),
    sdk.Duration(1000),
    signedAggregateTransaction,
)
if err != nil {
    panic(err)
}

signedLockFundsTransaction, err := multisig1.Sign(lockFundsTransaction)
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

const aggregateTransaction = AggregateTransaction.createBonded(
    Deadline.create(),
    [
        convertMultisigAccount1Transaction.toAggregate(multisigAccount1.publicAccount),
        convertMultisigAccount2Transaction.toAggregate(multisigAccount2.publicAccount),
        convertMultisigAccount3Transaction.toAggregate(multisigAccount3.publicAccount)
    ],
    NetworkType.TEST_NET);

const signedTransaction = multisigAccount1.sign(aggregateTransaction, generationHash);

const lockFundsTransaction = LockFundsTransaction.create(
    Deadline.create(),
    NetworkCurrencyMosaic.createRelative(10),
    UInt64.fromUint(1000),
    signedTransaction,
    NetworkType.TEST_NET);

const lockFundsTransactionSigned = multisigAccount1.sign(lockFundsTransaction, generationHash);

const transactionHttp = new TransactionHttp('http://bctestnet1.brimstone.xpxsirius.io:3000');

listener.open().then(() => {

    transactionHttp
        .announce(lockFundsTransactionSigned)
        .subscribe(x => console.log(x), err => console.error(err));

    listener
        .confirmed(multisigAccount1.address)
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

const aggregateTransaction = AggregateTransaction.createBonded(
    Deadline.create(),
    [
        convertMultisigAccount1Transaction.toAggregate(multisigAccount1.publicAccount),
        convertMultisigAccount2Transaction.toAggregate(multisigAccount2.publicAccount),
        convertMultisigAccount3Transaction.toAggregate(multisigAccount3.publicAccount)
    ],
    NetworkType.TEST_NET);

const signedTransaction = multisigAccount1.sign(aggregateTransaction, generationHash);

const lockFundsTransaction = LockFundsTransaction.create(
    Deadline.create(),
    NetworkCurrencyMosaic.createRelative(10),
    UInt64.fromUint(1000),
    signedTransaction,
    NetworkType.TEST_NET);

const lockFundsTransactionSigned = multisigAccount1.sign(lockFundsTransaction, generationHash);

const transactionHttp = new TransactionHttp('http://bctestnet1.brimstone.xpxsirius.io:3000');

listener.open().then(() => {

    transactionHttp
        .announce(lockFundsTransactionSigned)
        .subscribe(x => console.log(x), err => console.error(err));

    listener
        .confirmed(multisigAccount1.address)
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

    final AggregateTransaction aggregateTransaction = new TransactionBuilderFactory().aggregateBonded()
            .innerTransactions(Arrays.asList(
                convertMultisigAccount1Transaction.toAggregate(multisigAccount1.getPublicAccount()),
                convertMultisigAccount2Transaction.toAggregate(multisigAccount2.getPublicAccount()),
                convertMultisigAccount3Transaction.toAggregate(multisigAccount3.getPublicAccount())
            )).deadline(new Deadline(2, ChronoUnit.HOURS)).networkType(NetworkType.TEST_NET);

    final SignedTransaction aggregateSignedTransaction = multisigAccount1.sign(aggregateTransaction, generationHash);

    // Creating the lock funds transaction and announce it
    final LockFundsTransaction lockFundsTransaction = LockFundsTransaction.create(
        Deadline.create(2, HOURS),
        NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(10)),
        BigInteger.valueOf(1000),
        pullTransactionSigned,
        NetworkType.TEST_NET
    );

    final SignedTransaction lockFundsTransactionSigned = multisigAccount1.sign(lockFundsTransaction, generationHash);

    final TransactionHttp transactionHttp = new TransactionHttp("http://bctestnet1.brimstone.xpxsirius.io:3000");

    transactionHttp.announce(lockFundsTransactionSigned).toFuture().get();

    System.out.println(lockFundsTransactionSigned.getHash());

    final Listener listener = new Listener("http://bctestnet1.brimstone.xpxsirius.io:3000");

    listener.open().get();

    final Transaction transaction = listener.confirmed(multisigAccount1.getAddress()).take(1).toFuture().get();

    transactionHttp.announceAggregateBonded(aggregateSignedTransaction).toFuture().get();
```

<!--END_DOCUSAURUS_CODE_TABS-->

5. The cosignatories must opt-in to become cosignatories. [Cosign the announced aggregate transaction](../aggregate-transaction/signing-announced-aggregate-bonded-transactions.md) with the accounts #5, #6, #7, #8, and #4.

<!--DOCUSAURUS_CODE_TABS-->
<!--CLI-->
```sh
xpx2-cli transaction cosign --hash A6A374E66B32A3D5133018EFA9CD6E3169C8EEA339F7CCBE29C47D07086E068C --profile <account>
```
<!--END_DOCUSAURUS_CODE_TABS-->

**Note:**

If the account #5 initiates an aggregate bonded transaction involving the account #1, which accounts should cosign the transaction?

![Multi-level multisig-account complex](/img/mlma-complex-2.png "Multi-level multisig-account complex")

<p class=caption>Sending an aggregate bonded transaction from a MLMA</p>
