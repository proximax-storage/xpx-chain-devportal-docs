---
id: sending-a-multisig-transaction
title: Sending a multisig transaction
---
This guide will help you send a transaction involving a [multisig](../../built-in-features/multisig-account.md) and learn how an [aggregate bonded transaction](../../built-in-features/aggregate-transaction.md#examples) works.

## Background Information 

![Multisig transaction](/img/multisig-transaction-1-of-2.png "Multisig transaction")

<p class=caption>Sending an aggregate complete transaction</p>

Alice and Bob live together and have separate accounts. They have a shared account so that if Bob is shopping, he can buy groceries for both himself and Alice.

This shared account is in Sirius Chain translated as 1-of-2 multisig, meaning that one cosignatory needs to co-sign the transaction to be included in a block.

Remember that a multisig account has cosignatories accounts, and it cannot start transactions itself. Only the cosignatories can initiate transactions.

## Prerequisites

- Finish sending a [transfer transaction guide](../transaction/sending-a-transfer-transaction.md).
- Finish converting an [account to multisig guide](../multisig-account/converting-an-account-to-multisig.md).
- XPX-Chain-SDK.
- A text editor or IDE.
- An multisig account with XPX.
- An cosignatory account with XPX.

## Let’s do some coding!

Bob has finished filling his basket, and he is ready to pay. The cashier’s screen indicates that the cost of the purchase adds up to 10 XPX.

1. Bob needs to know which is the public key of the multisig account that he shares with Alice, and his private key to start announcing the transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp( 'http://localhost:3000');

const cosignatoryPrivateKey = process.env.COSIGNATORY_1_PRIVATE_KEY as string;
const cosignatoryAccount = Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.TEST_NET);

const multisigAccountPublicKey = '202B3861F34F6141E120742A64BC787D6EBC59C9EFB996F4856AA9CBEE11CD31';
const multisigAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.TEST_NET);

const recipientAddress = Address.createFromRawAddress('SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54');
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp( 'http://localhost:3000');

const cosignatoryPrivateKey = process.env.COSIGNATORY_1_PRIVATE_KEY;
const cosignatoryAccount = Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.TEST_NET);

const multisigAccountPublicKey = '202B3861F34F6141E120742A64BC787D6EBC59C9EFB996F4856AA9CBEE11CD31';
const multisigAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.TEST_NET);

const recipientAddress = Address.createFromRawAddress('SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54');
```

<!--Java-->
```java
    // Replace with a Cosignatory's private key
    final String cosignatoryPrivateKey = "";

    // Replace with a Multisig's public key
    final String multisigAccountPublicKey = "";

    // Replace with recipient address
    final String recipientAddress = "SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54";

    final Account cosignatoryAccount = Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.TEST_NET);

    final PublicAccount multisigPublicAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.TEST_NET);
```

<!--END_DOCUSAURUS_CODE_TABS-->

2. As he wants to pay the groceries with the multisig account, he defines a [transfer transaction](../../built-in-features/transfer-transaction.md#transfertransaction).

- Recipient: Grocery’s address
- Message: Grocery payment
- Mosaics: [10 XPX]

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    recipientAddress,
    [NetworkCurrencyMosaic.createRelative(10)],
    PlainMessage.create('sending 10 prx:xpx'),
    NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    recipientAddress,
    [NetworkCurrencyMosaic.createRelative(10)],
    PlainMessage.create('sending 10 prx:xpx'),
    NetworkType.TEST_NET);
```

<!--Java-->
```java
    final TransferTransaction transferTransaction = TransferTransaction.create(
        Deadline.create(2, HOURS),
        Address.createFromRawAddress(recipientAddress),
        Collections.singletonList(NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(10))),
        PlainMessage.create("sending 10 prx:xpx"),
        NetworkType.TEST_NET
    );
```

<!--END_DOCUSAURUS_CODE_TABS-->

3. Wrap the transfer transaction under an [aggregate transaction](../../built-in-features/aggregate-transaction.md#examples), attaching multisig public key as the signer.

An aggregate transaction is **complete** if before announcing it to the network, all required cosigners have signed it. If it is valid, it will be included in a block.

Remember that we are using a 1-of-2 multisig account? As Bob has one private key to sign the transaction, consider an aggregate complete transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [transferTransaction.toAggregate(multisigAccount),],
    NetworkType.TEST_NET,
    []);
```

<!--JavaScript-->
```js
const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [transferTransaction.toAggregate(multisigAccount),],
    NetworkType.TEST_NET,
    []);
```

<!--Java-->
```java
final AggregateTransaction aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(2, HOURS),
    Collections.singletonList(
        transferTransaction.toAggregate(multisigPublicAccount)
    ),
    NetworkType.TEST_NET
);
```
<!--END_DOCUSAURUS_CODE_TABS-->

4. Sign and announce the transaction with Bob’s account.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const signedTransaction = cosignatoryAccount.sign(aggregateTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const signedTransaction = cosignatoryAccount.sign(aggregateTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--Java-->
```java
final SignedTransaction aggregateSignedTransaction = cosignatoryAccount.sign(aggregateTransaction);

final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    transactionHttp.announce(aggregateSignedTransaction).toFuture().get();
```
<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

What would have happened if the account were a 2-of-2 multisig instead of a 1-of-2?

As all required cosigners did not sign the transaction, it should be announced as [aggregate bonded](../../built-in-features/aggregate-transaction.md#examples).

![Multisig Transaction 2 of 2](/img/multisig-transaction-2-of-2.png "Multisig-transaction 2 of 2")

<p class=caption>Sending an aggregate bonded transaction</p>


<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const aggregateTransaction = AggregateTransaction.createBonded(
    Deadline.create(),
    [transferTransaction.toAggregate(multisigAccount)],
    NetworkType.TEST_NET);

const signedTransaction = cosignatoryAccount.sign(aggregateTransaction);
```

<!--JavaScript-->
```js
const aggregateTransaction = AggregateTransaction.createBonded(
    Deadline.create(),
    [transferTransaction.toAggregate(multisigAccount)],
    NetworkType.TEST_NET);

const signedTransaction = cosignatoryAccount.sign(aggregateTransaction);
```

<!--Java-->
```java
final AggregateTransaction aggregateTransaction = AggregateTransaction.createBonded(
    Deadline.create(2, HOURS),
    Arrays.asList(
        transferTransaction.toAggregate(multisigPublicAccount)
    ),
    NetworkType.TEST_NET
);
```
<!--END_DOCUSAURUS_CODE_TABS-->

1. Open a new terminal to [monitor](../monitoring/monitoring-a-transaction-status.md) the aggregate bonded transaction.

```
xpx2-cli monitor aggregatebonded --address <your-address-here>
```
2. When an aggregate transaction is bonded, Bob needs to lock at least 10 XPX to avoid network spamming. Once all cosigners sign the transaction, the amount of XPX becomes available again in Bob’s account. After [hash lock transaction](../../built-in-features/aggregate-transaction.md#hashlocktransaction) has been confirmed, [announce the aggregate bonded transaction](../../built-in-features/aggregate-transaction.md).

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const lockFundsTransaction = LockFundsTransaction.create(
    Deadline.create(),
    NetworkCurrencyMosaic.createRelative(10),
    UInt64.fromUint(480),
    signedTransaction,
    NetworkType.TEST_NET);

const lockFundsTransactionSigned = cosignatoryAccount.sign(lockFundsTransaction);

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

const lockFundsTransactionSigned = cosignatoryAccount.sign(lockFundsTransaction);

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
    final SignedTransaction aggregateSignedTransaction = cosignatoryAccount.sign(aggregateTransaction);

    // Creating the lock funds transaction and announce it

    final LockFundsTransaction lockFundsTransaction = LockFundsTransaction.create(
        Deadline.create(2, HOURS),
        NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(10)),
        BigInteger.valueOf(480),
        aggregateSignedTransaction,
        NetworkType.TEST_NET
    );

    final SignedTransaction lockFundsTransactionSigned = cosignatoryAccount.sign(lockFundsTransaction);

    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    transactionHttp.announce(lockFundsTransactionSigned).toFuture().get();

    System.out.println(lockFundsTransactionSigned.getHash());

    final Listener listener = new Listener("http://localhost:3000");

    listener.open().get();

    final Transaction transaction = listener.confirmed(cosignatoryAccount.getAddress()).take(1).toFuture().get();

    System.out.println(transaction);

    transactionHttp.announceAggregateBonded(aggregateSignedTransaction).toFuture().get();
```
<!--END_DOCUSAURUS_CODE_TABS-->

<div class=info>

**Note:**

The [listener implementation changes](../monitoring/monitoring-a-transaction-status.md#troubleshooting-monitoring-transactions-on-the-client-side) when used on the client side (e.g., Angular, React, Vue).

</div>

Alice should [co-sign the transaction](../aggregate-transaction/signing-announced-aggregate-bonded-transactions.md) to be confirmed!

