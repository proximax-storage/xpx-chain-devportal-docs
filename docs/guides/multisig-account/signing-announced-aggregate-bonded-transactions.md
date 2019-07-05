---
id: signing-announced-aggregate-bonded-transactions
title: Signing announced aggregate-bonded transactions
---
You have probably announced an aggregate bonded transaction, but all required cosigners have not signed it yet.

This guide will show you how to cosign aggregate bonded transactions that require being signed by your account.

## Prerequisites

- Finish [creating an escrow with aggregate bonded transaction guide](../aggregate-transaction/creating-an-escrow-with-aggregate-bonded-transaction.md)
- Received some aggregate bonded transaction
- XPX-Chain-SDK
- A text editor or IDE
- An account with XPX

## Let’s get into some code

1. Create a function to cosign any aggregate bonded transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const cosignAggregateBondedTransaction = (transaction: AggregateTransaction, account: Account): CosignatureSignedTransaction => {
    const cosignatureTransaction = CosignatureTransaction.create(transaction);
    return account.signCosignatureTransaction(cosignatureTransaction);
};
```

<!--JavaScript-->
```js
const cosignAggregateBondedTransaction = (transaction, account)  => {
    const cosignatureTransaction = CosignatureTransaction.create(transaction);
    return account.signCosignatureTransaction(cosignatureTransaction);
};
```

<!--END_DOCUSAURUS_CODE_TABS-->


2. Fetch all aggregate bonded transactions pending to be signed by your account.

<div class=info>

**Note**

To fetch aggregate bonded transactions that must be signed by multisig cosignatories, refer to the multisig public key instead. See [how to get multisig accounts where an account is cosignatory](../multisig-account/converting-an-account-to-multisig.md#getMultisigAccountInfo).

</div>

3. For each transaction, check if you have not already signed it. Cosign each pending transaction using the previously created function.

4. Announce `CosignatureSignedTransaction` to the network using the `TransactionHttp` repository.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const privateKey = process.env.PRIVATE_KEY as string;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const nodeUrl = 'http://localhost:3000';
const accountHttp = new AccountHttp(nodeUrl);
const transactionHttp = new TransactionHttp(nodeUrl);

accountHttp
    .aggregateBondedTransactions(account.publicAccount)
    .pipe(
        mergeMap((_) => _),
        filter((_) => !_.signedByAccount(account.publicAccount)),
        map(transaction => cosignAggregateBondedTransaction(transaction, account)),
        mergeMap(cosignatureSignedTransaction => transactionHttp.announceAggregateBondedCosignature(cosignatureSignedTransaction))
    )
    .subscribe(announcedTransaction => console.log(announcedTransaction),
        err => console.error(err));
```

<!--JavaScript-->
```js
const privateKey = process.env.PRIVATE_KEY;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const nodeUrl = 'http://localhost:3000';
const accountHttp = new AccountHttp(nodeUrl);
const transactionHttp = new TransactionHttp(nodeUrl);

accountHttp
    .aggregateBondedTransactions(account.publicAccount)
    .pipe(
        mergeMap((_) => _),
        filter((_) => !_.signedByAccount(account.publicAccount)),
        map(transaction => cosignAggregateBondedTransaction(transaction, account)),
        mergeMap(cosignatureSignedTransaction => transactionHttp.announceAggregateBondedCosignature(cosignatureSignedTransaction))
    )
    .subscribe(announcedTransaction => console.log(announcedTransaction),
        err => console.error(err));
```

<!--Java-->
```java
    // Replace with a private key
    final String privateKey = "";

    final Account account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

    final AccountHttp accountHttp = new AccountHttp("http://localhost:3000");

    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    accountHttp.aggregateBondedTransactions(account.getPublicAccount())
        .flatMapIterable(tx -> tx) // Transform transaction array to single transactions to process them
        .filter(tx -> !tx.signedByAccount(account.getPublicAccount()))
        .map(tx -> {
            final CosignatureTransaction cosignatureTransaction = CosignatureTransaction.create(tx);

            final CosignatureSignedTransaction cosignatureSignedTransaction = account.signCosignatureTransaction(cosignatureTransaction);

            return transactionHttp.announceAggregateBondedCosignature(cosignatureSignedTransaction).toFuture().get();
        })
        .toFuture()
        .get();
```

<!--Bash-->
```
xpx2-cli transaction cosign --hash A6A374E66B32A3D5133018EFA9CD6E3169C8EEA339F7CCBE29C47D07086E068C
```

<!--END_DOCUSAURUS_CODE_TABS-->
