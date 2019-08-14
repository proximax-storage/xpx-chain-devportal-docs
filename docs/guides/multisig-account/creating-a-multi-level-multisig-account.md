---
id: creating-a-multi-level-multisig-account
title: Creating a multi-level multisig-account
---
This guide will help you create a [multi-level multisig account](../../built-in-features/multisig-account.md).

![Multi-level multisig-account](/img/mlma-complex-1.png "Multi-level multisig-account")

<p class=caption>Three-level multisig account example</p>

## Background Information 

[Multisig accounts](../../built-in-features/multisig-account.md) can have as cosignatories other multisig accounts. Multi-level multisig accounts add “AND/OR” logic to multi-signature transactions.

The maximum depth of a multilevel multisig account is `3`.

## Prerequisites

- Finish [converting an account to multisig guide](./converting-an-account-to-multisig.md).
- Text editor or IDE.
- XPX-Chain-SDK or XPX-Chain-CLI.

## Let’s do some coding!

1. Create multisig account #2

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const multisig2PrivateKey = process.env.MULTISIG_2_PRIVATE_KEY as string;
const multisigAccount2 = Account.createFromPrivateKey(multisig2PrivateKey, NetworkType.TEST_NET);

const cosignatoryAccount5PublicKey = '7D08373CFFE4154E129E04F0827E5F3D6907587E348757B0F87D2F839BF88246';
const cosignatory5 = PublicAccount.createFromPublicKey(cosignatoryAccount5PublicKey, NetworkType.TEST_NET);

const cosignatoryAccount6PublicKey = '28AE57EC0E81967880C483BE99D4B6AF38E5DCD9F8B89D41F2E7619CFDB447C5';
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

const transactionHttp = new TransactionHttp('http://localhost:3000');

const signedTransaction2 = multisigAccount2.sign(convertMultisigAccount2Transaction);

transactionHttp
    .announce(signedTransaction2)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const multisig2PrivateKey = process.env.MULTISIG_2_PRIVATE_KEY;
const multisigAccount2 = Account.createFromPrivateKey(multisig2PrivateKey, NetworkType.TEST_NET);

const cosignatoryAccount5PublicKey = '7D08373CFFE4154E129E04F0827E5F3D6907587E348757B0F87D2F839BF88246';
const cosignatory5 = PublicAccount.createFromPublicKey(cosignatoryAccount5PublicKey, NetworkType.TEST_NET);

const cosignatoryAccount6PublicKey = '28AE57EC0E81967880C483BE99D4B6AF38E5DCD9F8B89D41F2E7619CFDB447C5';
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

const transactionHttp = new TransactionHttp('http://localhost:3000');

const signedTransaction2 = multisigAccount2.sign(convertMultisigAccount2Transaction);

transactionHttp
    .announce(signedTransaction2)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--Java-->
```java
    // Create multisig #2 (1-of-2)

    // Replace with the private key of the account that you want to convert into multisig
    final String multisig2PrivateKey = "";

    // Replace with cosignatories public keys
    final String cosignatory5PublicKey = "";
    final String cosignatory6PublicKey = "";

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

    final SignedTransaction signedTransaction2 = multisigAccount2.sign(convertMultisigAccount2Transaction);

    transactionHttp.announce(signedTransaction2).toFuture().get();
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Create multisig account #3

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const multisig3PrivateKey = process.env.MULTISIG_3_PRIVATE_KEY as string;
const multisigAccount3 = Account.createFromPrivateKey(multisig3PrivateKey, NetworkType.TEST_NET);

const cosignatoryAccount7PublicKey = 'DAD5B5B7F7AE4ACEAB3F6A5FE05EA3186208D219A04B6C047C39A2B0EFF49511';
const cosignatory7 = PublicAccount.createFromPublicKey(cosignatoryAccount7PublicKey, NetworkType.TEST_NET);

const cosignatoryAccount8PublicKey = 'E29302E0AF530292EABEDADF2DE2953BBFBB0BDD9A1F51FA0C857E87828BABA9';
const cosignatory8 = PublicAccount.createFromPublicKey(cosignatoryAccount8PublicKey, NetworkType.TEST_NET);

const cosignatoryAccount4PublicKey = '473233D6B89671DCA4D334CF1059C31356CBF18120E484E33EEA9BDC09EEA515';
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

const signedTransaction3 = multisigAccount3.sign(convertMultisigAccount3Transaction);

transactionHttp
    .announce(signedTransaction3)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const multisig3PrivateKey = process.env.MULTISIG_3_PRIVATE_KEY;
const multisigAccount3 = Account.createFromPrivateKey(multisig3PrivateKey, NetworkType.TEST_NET);

const cosignatoryAccount7PublicKey = 'DAD5B5B7F7AE4ACEAB3F6A5FE05EA3186208D219A04B6C047C39A2B0EFF49511';
const cosignatory7 = PublicAccount.createFromPublicKey(cosignatoryAccount7PublicKey, NetworkType.TEST_NET);

const cosignatoryAccount8PublicKey = 'E29302E0AF530292EABEDADF2DE2953BBFBB0BDD9A1F51FA0C857E87828BABA9';
const cosignatory8 = PublicAccount.createFromPublicKey(cosignatoryAccount8PublicKey, NetworkType.TEST_NET);

const cosignatoryAccount4PublicKey = '473233D6B89671DCA4D334CF1059C31356CBF18120E484E33EEA9BDC09EEA515';
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

const signedTransaction3 = multisigAccount3.sign(convertMultisigAccount3Transaction);

transactionHttp
    .announce(signedTransaction3)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--Java-->
```java
    // Replace with the private key of the account that you want to convert into multisig
    final String multisig3PrivateKey = "";

    // Replace with cosignatories public keys
    final String cosignatory7PublicKey = "";
    final String cosignatory8PublicKey = "";
    final String cosignatory4PublicKey = "";

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

    final SignedTransaction signedTransaction3 = multisigAccount3.sign(convertMultisigAccount3Transaction);

    transactionHttp.announce(signedTransaction3).toFuture().get();
```
<!--END_DOCUSAURUS_CODE_TABS-->

3. Create multisig account #1

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const multisig1PrivateKey = process.env.MULTISIG_1_PRIVATE_KEY as string;
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

const signedTransaction1 = multisigAccount1.sign(convertMultisigAccount1Transaction);

transactionHttp
    .announce(signedTransaction1)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const multisig1PrivateKey = process.env.MULTISIG_1_PRIVATE_KEY;
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

const signedTransaction1 = multisigAccount1.sign(convertMultisigAccount1Transaction);

transactionHttp
    .announce(signedTransaction1)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--Java-->
```java
    // Replace with the private key of the account that you want to convert into multisig
    final String multisig1PrivateKey = "";

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

    final SignedTransaction signedTransaction1 = multisigAccount1.sign(convertMultisigAccount1Transaction);

    transactionHttp.announce(signedTransaction1).toFuture().get();
```
<!--END_DOCUSAURUS_CODE_TABS-->

**Note:**

Who should co-sign the transaction if Account #5 initiates an aggregate bonded transaction? Multisig accounts are not capable of cosigning transactions, cosignatories are responsible for doing so.

![Multi-level multisig-account complex](/img/mlma-complex-2.png "Multi-level multisig-account complex")

<p class=caption>Sending an aggregate bonded transaction from a MLMA</p>