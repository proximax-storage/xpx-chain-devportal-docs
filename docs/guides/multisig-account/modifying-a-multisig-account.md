---
id: modifying-a-multisig-account
title: Modifying a multisig-account
---
Modify an existing [multisig account](../../built-in-features/multisig-account.md).

First, you are going to turn a 1-of-2 multisig account into a 2-of-2. Then, you will add a new cosignatory, becoming a 2-of-3. After removing a cosignatory, you will know how to perform all sort of modifications to multisig accounts.

## Prerequisites

- Finish [converting an account to multisig guide](./converting-an-account-to-multisig.md)
- Text editor or IDE
- XPX-Chain-SDK or XPX-Chain-CLI
- One multisig account

## Let’s get into some code

### Editing minApproval

Alice and Bob are cosignatories of the 1-of-2 multisig account. At least one of their account’s signatures is required to authorise multisig transactions. In other words, the `minApproval` parameter of the multisig is currently set to `1`.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const cosignatoryPrivateKey = process.env.COSIGNATORY_1_PRIVATE_KEY as string;
const cosignatoryAccount = Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.TEST_NET);

const multisigAccountPublicKey = '202B3861F34F6141E120742A64BC787D6EBC59C9EFB996F4856AA9CBEE11CD31';
const multisigAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const cosignatoryPrivateKey = process.env.COSIGNATORY_1_PRIVATE_KEY;
const cosignatoryAccount = Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.TEST_NET);

const multisigAccountPublicKey = '202B3861F34F6141E120742A64BC787D6EBC59C9EFB996F4856AA9CBEE11CD31';
const multisigAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.TEST_NET);
```

<!--Java-->
```java
    final String cosignatoryPrivateKey = "";
    final String multisigAccountPublicKey = "";

    final Account cosignatoryAccount = Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.TEST_NET);
    final PublicAccount multisigAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.TEST_NET);
```
<!--END_DOCUSAURUS_CODE_TABS-->

Multisig accounts are editable at the blockchain level. In this case, we want to make both cosignatories required, shifting to a 2-of-2 multisig instead. We could achieve it by increasing `minApproval` parameter in one unit.

![Multisig 2 of 2](/img/multisig-2-of-2.png "Multisig 2 of 2")

<p class=caption>2-of-2 multisig account example</p>

One of the accounts, for example Alice’s, announces a [modify multisig account transaction](../../built-in-features/multisig-account.md#modifymultisigtransaction) wrapped in an [aggregate transaction](../../built-in-features/aggregate-transaction.md#examples), increasing `minApprovalDelta`.

1. Create a modify multisig account transaction, increasing minAprovalDelta in one unit.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const modifyMultisigAccountTransaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    1,
    0,
    [],
    NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const modifyMultisigAccountTransaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    1,
    0,
    [],
    NetworkType.TEST_NET);
```

<!--Java-->
```java
 final ModifyMultisigAccountTransaction modifyMultisigAccountTransaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(2, HOURS),
    1,
    0,
    Collections.emptyList(),
    NetworkType.TEST_NET
);
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Wrap the modify multisig account transaction under an aggregate transaction, attaching multisig public key as the signer.

An aggregate transaction is complete if, before announcing it to the network, all required cosignatories have signed it. If valid, it will be included in a block.

As only one cosignature is required (1-of-2), Alice can sign the transaction and announce it to the network.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [modifyMultisigAccountTransaction.toAggregate(multisigAccount)],
    NetworkType.TEST_NET,
    []);

const signedTransaction = cosignatoryAccount.sign(aggregateTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [modifyMultisigAccountTransaction.toAggregate(multisigAccount)],
    NetworkType.TEST_NET,
    []);

const signedTransaction = cosignatoryAccount.sign(aggregateTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--Java-->
```java
    final AggregateTransaction aggregateTransaction = AggregateTransaction.createComplete(
        Deadline.create(2, HOURS),
        Collections.singletonList(modifyMultisigAccountTransaction.toAggregate(multisigAccount)),
        NetworkType.TEST_NET
    );

    final SignedTransaction signedTransaction = cosignatoryAccount.sign(aggregateTransaction);

    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    transactionHttp.announce(signedTransaction).toFuture().get();
```
<!--END_DOCUSAURUS_CODE_TABS-->

Once confirmed, the minApproval value of the multisig will be set to 2, having our 2-of-2 multisig.

<div class=info>

**Note**

If you want to decrease the minApproval parameter, going back to a 1-of-2 multisig, set minApprovalDelta with a negative value. In this case `-1`.

</div>

### Adding a new cosignatory

Suddenly, Alice and Bob want to add Carol as a cosignatory of the multisig account to achieve 2-of-3 cosignatures required.

![Multisig 2 of 3](/img/multisig-2-of-31.png "Multisig 2 of 3")

<p class=caption>2-of-3 multisig account example</p>

Alice creates a [modify multisig account transaction](../../built-in-features/multisig-account.md#modifymultisigtransaction) adding in a `MultisigCosignatoryModification` Carol as a cosignatory. The multisig account will become a 2-of-3, as she is not increasing the minApprovalDelta.

1. Create a multisig cosignatory modification:

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const nodeUrl = 'http://localhost:3000';
const transactionHttp = new TransactionHttp(nodeUrl);
const listener = new Listener(nodeUrl);

const cosignatoryPrivateKey = process.env.COSIGNATORY_1_PRIVATE_KEY as string;
const cosignatoryAccount = Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.TEST_NET);

const multisigAccountPublicKey = '202B3861F34F6141E120742A64BC787D6EBC59C9EFB996F4856AA9CBEE11CD31';
const multisigAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.TEST_NET);

const newCosignatoryPublicKey = 'CD4EE677BD0642C93910CB93214954A9D70FBAAE1FFF1FF530B1FB52389568F1';
const newCosignatoryAccount = PublicAccount.createFromPublicKey(newCosignatoryPublicKey, NetworkType.TEST_NET);

const multisigCosignatoryModification = new MultisigCosignatoryModification(MultisigCosignatoryModificationType.Add,newCosignatoryAccount);
```

<!--JavaScript-->
```js
const nodeUrl = 'http://localhost:3000';
const transactionHttp = new TransactionHttp(nodeUrl);
const listener = new Listener(nodeUrl);

const cosignatoryPrivateKey = process.env.COSIGNATORY_1_PRIVATE_KEY;
const cosignatoryAccount = Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.TEST_NET);

const multisigAccountPublicKey = '202B3861F34F6141E120742A64BC787D6EBC59C9EFB996F4856AA9CBEE11CD31';
const multisigAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.TEST_NET);

const newCosignatoryPublicKey = 'CD4EE677BD0642C93910CB93214954A9D70FBAAE1FFF1FF530B1FB52389568F1';
const newCosignatoryAccount = PublicAccount.createFromPublicKey(newCosignatoryPublicKey, NetworkType.TEST_NET);

const multisigCosignatoryModification = new MultisigCosignatoryModification(MultisigCosignatoryModificationType.Add,newCosignatoryAccount);
```

<!--Java-->
```java
    // Replace with the multisig public key
    final String cosignatoryPrivateKey = "";
    final String multisigAccountPublicKey = "";
    final String newCosignatoryPublicKey = "";

    final Account cosignatoryAccount = Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.TEST_NET);
    final PublicAccount newCosignatoryAccount = PublicAccount.createFromPublicKey(newCosignatoryPublicKey, NetworkType.TEST_NET);
    final PublicAccount multisigAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.TEST_NET);

    final MultisigCosignatoryModification multisigCosignatoryModification = new MultisigCosignatoryModification(
        MultisigCosignatoryModificationType.ADD,
        newCosignatoryAccount
    );
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Create a modify multisig account transaction:

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const modifyMultisigAccountTransaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    0,
    0,
    [multisigCosignatoryModification],
    NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const modifyMultisigAccountTransaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    0,
    0,
    [multisigCosignatoryModification],
    NetworkType.TEST_NET);
```

<!--Java-->
```java
    final ModifyMultisigAccountTransaction modifyMultisigAccountTransaction = ModifyMultisigAccountTransaction.create(
        Deadline.create(2, HOURS),
        0,
        0,
        Collections.singletonList(multisigCosignatoryModification),
        NetworkType.TEST_NET
    );
```
<!--END_DOCUSAURUS_CODE_TABS-->

3. Create an aggregate bonded transaction. The transaction is aggregate bonded because more than one cosignature is required:

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const aggregateTransaction = AggregateTransaction.createBonded(
    Deadline.create(),
    [modifyMultisigAccountTransaction.toAggregate(multisigAccount)],
    NetworkType.TEST_NET);

const signedTransaction = cosignatoryAccount.sign(aggregateTransaction);
```

<!--JavaScript-->
```js
const aggregateTransaction = AggregateTransaction.createBonded(
    Deadline.create(),
    [modifyMultisigAccountTransaction.toAggregate(multisigAccount)],
    NetworkType.TEST_NET);

const signedTransaction = cosignatoryAccount.sign(aggregateTransaction);
```

<!--Java-->
```java
    final AggregateTransaction aggregateTransaction = AggregateTransaction.createBonded(
        Deadline.create(2, HOURS),
        Collections.singletonList(modifyMultisigAccountTransaction.toAggregate(multisigAccount)),
        NetworkType.TEST_NET
    );

    final SignedTransaction signedTransaction = cosignatoryAccount.sign(aggregateTransaction);
```
<!--END_DOCUSAURUS_CODE_TABS-->

4. Before sending an aggregate bonded transaction, Alice needs to lock at least `10` XPX. This mechanism is required to prevent network spamming and ensure that transactions are cosigned. After hash lock transaction has been confirmed, Alice announces the aggregate transaction.

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
    final LockFundsTransaction lockFundsTransaction = LockFundsTransaction.create(
        Deadline.create(2, HOURS),
        NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(10)),
        BigInteger.valueOf(480),
        signedTransaction,
        NetworkType.TEST_NET
    );

    final SignedTransaction lockFundsTransactionSigned = cosignatoryAccount.sign(lockFundsTransaction);

    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    transactionHttp.announce(lockFundsTransactionSigned).toFuture().get();

    // announce signed transaction
    final Listener listener = new Listener("http://localhost:3000");

    listener.open().get();

    final Transaction transaction = listener.confirmed(cosignatoryAccount.getAddress()).toFuture().get();

    transactionHttp.announceAggregateBonded(signedTransaction).toFuture().get();
```
<!--END_DOCUSAURUS_CODE_TABS-->

<div class="info">

**Note**

The [listener implementation changes](../monitoring/monitoring-a-transaction-status.md#troubleshooting-monitoring-transactions-on-the-client-side) when used on the client side (e.g., Angular, React, Vue).

</div>

Once Bob [cosigns the transaction](./signing-announced-aggregate-bonded-transactions.md), the amount of XPX locked becomes available again on Alice’s account and Carol is added to the multisig.

### Removing a cosignatory

Once you have finished this guide, delete a cosignatory from the multisig. Multisig accounts can be converted again into regular accounts by removing all cosignatories. Make sure you own the multisig private key!

The following code shows how to remove a cosignatory of a 2-of-3 multisig account with `minRemoval` set to 1. The multisig modification transaction is wrapped in an aggregate complete, as only one person is required to delete others from the multisig.

<div class=info>

**Note**

The minRemoval parameter indicates the number of required signatures to delete someone from the multisig. You can increase or decrease it the same way you [modify minApproval parameter](./modifying-a-multisig-account.md#editing-minapproval).

</div>

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const multisigAccountPublicKey = '202B3861F34F6141E120742A64BC787D6EBC59C9EFB996F4856AA9CBEE11CD31';
const multisigAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.TEST_NET);

const cosignatoryToRemovePublicKey = 'CD4EE677BD0642C93910CB93214954A9D70FBAAE1FFF1FF530B1FB52389568F1';
const cosignatoryToRemove = PublicAccount.createFromPublicKey(cosignatoryToRemovePublicKey, NetworkType.TEST_NET);

const cosignatoryPrivateKey = process.env.COSIGNATORY_1_PRIVATE_KEY as string;
const cosignatoryAccount =  Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.TEST_NET);

const multisigCosignatoryModification = new MultisigCosignatoryModification(MultisigCosignatoryModificationType.Remove,cosignatoryToRemove);

const modifyMultisigAccountTransaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    0,
    0,
    [multisigCosignatoryModification],
    NetworkType.TEST_NET);

const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [modifyMultisigAccountTransaction.toAggregate(multisigAccount)],
    NetworkType.TEST_NET,
    []);

const signedTransaction = cosignatoryAccount.sign(aggregateTransaction);

transactionHttp.announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const multisigAccountPublicKey = '202B3861F34F6141E120742A64BC787D6EBC59C9EFB996F4856AA9CBEE11CD31';
const multisigAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.TEST_NET);

const cosignatoryToRemovePublicKey = 'CD4EE677BD0642C93910CB93214954A9D70FBAAE1FFF1FF530B1FB52389568F1';
const cosignatoryToRemove = PublicAccount.createFromPublicKey(cosignatoryToRemovePublicKey, NetworkType.TEST_NET);

const cosignatoryPrivateKey = process.env.COSIGNATORY_1_PRIVATE_KEY;
const cosignatoryAccount =  Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.TEST_NET);

const multisigCosignatoryModification = new MultisigCosignatoryModification(MultisigCosignatoryModificationType.Remove,cosignatoryToRemove);

const modifyMultisigAccountTransaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    0,
    0,
    [multisigCosignatoryModification],
    NetworkType.TEST_NET);

const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [modifyMultisigAccountTransaction.toAggregate(multisigAccount)],
    NetworkType.TEST_NET,
    []);

const signedTransaction = cosignatoryAccount.sign(aggregateTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--Java-->
```java
    // Replace with the multisig public key
    final String multisigAccountPublicKey = "";

    // Replace with the cosignatory private key
    final String cosignatoryPrivateKey = "";

    final Account cosignatoryAccount = Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.TEST_NET);
    final PublicAccount multisigPublicAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.TEST_NET);

    final MultisigCosignatoryModification multisigCosignatoryModification = new MultisigCosignatoryModification(
        MultisigCosignatoryModificationType.REMOVE,
        PublicAccount.createFromPublicKey("", NetworkType.TEST_NET)
    );

    final ModifyMultisigAccountTransaction modifyMultisigAccountTransaction = ModifyMultisigAccountTransaction.create(
        Deadline.create(2, HOURS),
        0,
        0,
        Collections.singletonList(multisigCosignatoryModification),
        NetworkType.TEST_NET
    );

    final AggregateTransaction aggregateTransaction = AggregateTransaction.createComplete(
        Deadline.create(2, HOURS),
        Collections.singletonList(modifyMultisigAccountTransaction.toAggregate(multisigPublicAccount)),
        NetworkType.TEST_NET
    );

    final SignedTransaction signedTransaction = cosignatoryAccount.sign(aggregateTransaction);

    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    transactionHttp.announce(signedTransaction).toFuture().get();
```
<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

Learn more about [multi-level multisig accounts](./creating-a-multi-level-multisig-account.md). 
