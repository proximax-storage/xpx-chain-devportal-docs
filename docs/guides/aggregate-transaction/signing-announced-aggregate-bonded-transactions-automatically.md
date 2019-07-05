---
id: signing-announced-aggregate-bonded-transactions-automatically
title: Signing announced aggregate-bonded transactions automatically
---
Sign automatically transactions pending to be cosigned.

## Prerequisites

- Finish [creating an escrow with aggregate bonded transaction guide](./creating-an-escrow-with-aggregate-bonded-transaction.md)
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

2. Create a new listener to get notified every time a new aggregate bonded transaction requires the signature of your account.

3. Open the connection. You only need to open the connection once and then connect to all desired channels.

4. Start listening for new transactions, subscribing to the `aggregateBondedAdded` channel using your account’s address.

<div class=info>

**Note**

To automatically sign aggregate bonded transactions that must be signed by multisig cosignatories, refer to the multisig address instead. See [how to get multisig accounts where an account is cosignatory](../multisig-account/converting-an-account-to-multisig.md#guide-get-multisig-account-info).

</div>

5. For each received transaction, check if you have not already signed it. Cosign each pending aggregate bonded transaction using the previously created function.
  
6. Announce `CosignatureSignedTransaction` to the network using the `TransactionHttp` repository.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const privateKey = process.env.PRIVATE_KEY as string;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const nodeUrl = 'http://localhost:3000';
const transactionHttp = new TransactionHttp(nodeUrl);
const listener = new Listener(nodeUrl);

listener.open().then(() => {

    listener
        .aggregateBondedAdded(account.address)
        .pipe(
            filter((_) => !_.signedByAccount(account.publicAccount)),
            map(transaction => cosignAggregateBondedTransaction(transaction, account)),
            mergeMap(cosignatureSignedTransaction => transactionHttp.announceAggregateBondedCosignature(cosignatureSignedTransaction))
        )
        .subscribe(announcedTransaction => console.log(announcedTransaction), err => console.error(err));
});
```
<!--JavaScript-->
```js
const privateKey = process.env.PRIVATE_KEY;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const nodeUrl = 'http://localhost:3000';
const transactionHttp = new TransactionHttp(nodeUrl);
const listener = new Listener(nodeUrl);

listener.open().then(() => {

    listener
        .aggregateBondedAdded(account.address)
        .pipe(
            filter((_) => !_.signedByAccount(account.publicAccount)),
            map(transaction => cosignAggregateBondedTransaction(transaction, account)),
            mergeMap(cosignatureSignedTransaction => transactionHttp.announceAggregateBondedCosignature(cosignatureSignedTransaction))
        )
        .subscribe(announcedTransaction => console.log(announcedTransaction), err => console.error(err));
});
```

<!--Java-->
```java
    // Replace with a private key
    final String privateKey = "";

    final Account account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

    final AccountHttp accountHttp = new AccountHttp("http://localhost:3000");

    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    final Listener listener = new Listener("http://localhost:3000");

    listener.open().get();

    final AggregateTransaction transaction = listener.aggregateBondedAdded(account.getAddress()).take(1).toFuture().get();

    if (!transaction.signedByAccount(account.getPublicAccount())) {
        // Filter aggregates that need my signature
        final CosignatureTransaction cosignatureTransaction = CosignatureTransaction.create(transaction);

        final CosignatureSignedTransaction cosignatureSignedTransaction = account.signCosignatureTransaction(cosignatureTransaction);

        transactionHttp.announceAggregateBondedCosignature(cosignatureSignedTransaction).toFuture().get();
    }
```

<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

Extend the previous function for signing transactions if they follow some constraints.

- Aggregate transactions with two inner transactions.
- Two inner transactions must be transfer transactions.
- The transaction sending funds must have yourself as the signer.
- The transaction sending funds should have only one mosaic, being this less than 100 XPX.

Try it yourself! Here you have a possible implementation:

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const validTransaction = (transaction: Transaction, publicAccount: PublicAccount): boolean => {
    return transaction instanceof TransferTransaction &&
        transaction.signer!.equals(publicAccount) &&
        transaction.mosaics.length == 1 &&
        transaction.mosaics[0].id.equals(NetworkCurrencyMosaic.MOSAIC_ID) &&
        transaction.mosaics[0].amount.compact() < NetworkCurrencyMosaic.createRelative(100).amount.compact();
};

const cosignAggregateBondedTransaction = (transaction: AggregateTransaction, account: Account): CosignatureSignedTransaction => {
    const cosignatureTransaction = CosignatureTransaction.create(transaction);
    return account.signCosignatureTransaction(cosignatureTransaction);
};

const privateKey = process.env.PRIVATE_KEY as string;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const nodeUrl = 'http://localhost:3000';
const transactionHttp = new TransactionHttp(nodeUrl);
const listener = new Listener(nodeUrl);

listener.open().then(() => {

    listener
        .aggregateBondedAdded(account.address)
        .pipe(
            filter((_) => _.innerTransactions.length == 2),
            filter((_) => !_.signedByAccount(account.publicAccount)),
            filter((_) => validTransaction(_.innerTransactions[0], account.publicAccount) || validTransaction(_.innerTransactions[1], account.publicAccount)),
            map(transaction => cosignAggregateBondedTransaction(transaction, account)),
            mergeMap(cosignatureSignedTransaction => transactionHttp.announceAggregateBondedCosignature(cosignatureSignedTransaction))
        )
        .subscribe(announcedTransaction => console.log(announcedTransaction),
            err => console.error(err));
});
```

<!--Java-->
```java
    final String privateKey = "";

    final Account account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

    final AccountHttp accountHttp = new AccountHttp("http://localhost:3000");

    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    final Listener listener = new Listener("http://localhost:3000");

    listener.open().get();

    final AggregateTransaction transaction = listener.aggregateBondedAdded(account.getAddress())
        .filter(tx -> tx.getInnerTransactions().size() == 2)
        .filter(tx -> !tx.signedByAccount(account.getPublicAccount()))
        .filter(tx -> validTransaction(tx.getInnerTransactions().get(0), account.getPublicAccount()) || validTransaction(tx.getInnerTransactions().get(1), account.getPublicAccount()))
        .take(1)
        .toFuture()
        .get();

    final CosignatureTransaction cosignatureTransaction = CosignatureTransaction.create(transaction);
    final CosignatureSignedTransaction cosignatureSignedTransaction = account.signCosignatureTransaction(cosignatureTransaction);

    transactionHttp.announceAggregateBondedCosignature(cosignatureSignedTransaction).toFuture().get();
    
    }

    private boolean validTransaction(Transaction transaction, PublicAccount publicAccount) {
        return transaction.getType() == TransactionType.TRANSFER &&
                transaction.getSigner().get().equals(publicAccount) &&
                ((TransferTransaction)transaction).getMosaics().size() == 1 &&
                ((TransferTransaction)transaction).getMosaics().get(0).getId().equals(NetworkCurrencyMosaic.MOSAICID) &&
                ((TransferTransaction) transaction).getMosaics().get(0).getAmount().compareTo(BigInteger.valueOf(100)) > 0;
    }
```

<!--END_DOCUSAURUS_CODE_TABS-->

