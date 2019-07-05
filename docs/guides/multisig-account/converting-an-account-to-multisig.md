---
id: converting-an-account-to-multisig
title: Converting an account to multisig
---
Create a 1-of-2 [multisig account](../../built-in-features/multisig-account.md), by adding two cosignatories.

## Background

Alice and Bob live together and have separate [accounts](../../built-in-features/account.md). They also have a shared account so that if Bob is out shopping, he can buy groceries for both himself and Alice.

This shared account is in Sirius-Chain translated as 1-of-2 multisig, meaning that one cosignatory needs to cosign the transaction to be included in a block.

![Multisig 1 of 2](/img/multisig-1-of-2.png "Multisig 1 of 2")

<p class=caption>1-of-2 multisig account example</p>

Remember that a multisig account has cosignatories accounts, and it cannot start transactions itself. Only the cosignatories can initiate transactions.

## Prerequisites

- Finish [creating and opening accounts guide](../account/creating-and-opening-an-account.md)
- Text editor or IDE
- XPX-Chain-SDK or XPX-Chain-CLI
- Two accounts (public keys)
- One account with XPX

## Let’s get into some code

1. Define who will be the cosignatories of the multisig account. Then, open the account that will be converted into multisig by providing its private key.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const privateKey = process.env.PRIVATE_KEY as string; // Private key of the account to convert into multisig
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const cosignatory1PublicKey = '7D08373CFFE4154E129E04F0827E5F3D6907587E348757B0F87D2F839BF88246';
const cosignatory1 = PublicAccount.createFromPublicKey(cosignatory1PublicKey, NetworkType.TEST_NET);
const cosignatory2PublicKey = 'F82527075248B043994F1CAFD965F3848324C9ABFEC506BC05FBCF5DD7307C9D';
const cosignatory2 = PublicAccount.createFromPublicKey(cosignatory2PublicKey, NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const privateKey = process.env.PRIVATE_KEY; // Private key of the account to convert into multisig
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const cosignatory1PublicKey = '7D08373CFFE4154E129E04F0827E5F3D6907587E348757B0F87D2F839BF88246';
const cosignatory1 = PublicAccount.createFromPublicKey(cosignatory1PublicKey, NetworkType.TEST_NET);
const cosignatory2PublicKey = 'F82527075248B043994F1CAFD965F3848324C9ABFEC506BC05FBCF5DD7307C9D';
const cosignatory2 = PublicAccount.createFromPublicKey(cosignatory2PublicKey, NetworkType.TEST_NET);
```

<!--Java-->
```java
    // Replace with the private key of the account that you want to convert into multisig
    final String privateKey = "";

    // Replace with cosignatories public keys
    final String cosignatory1PublicKey = "";
    final String cosignatory2PublicKey = "";

    final Account account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

    final PublicAccount cosignatory1PublicAccount = PublicAccount.createFromPublicKey(cosignatory1PublicKey, NetworkType.TEST_NET);
    final PublicAccount cosignatory2PublicAccount = PublicAccount.createFromPublicKey(cosignatory2PublicKey, NetworkType.TEST_NET);
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Convert the account into a multisig account by setting a modify multisig account transaction. As they want a 1-of-2 multisig account, set the minimum signatures to 1.


<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const convertIntoMultisigTransaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    1,
    1,
    [
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory1,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory2,
        )],
    NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const convertIntoMultisigTransaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    1,
    1,
    [
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory1,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory2,
        )],
    NetworkType.TEST_NET);
```

<!--Java-->
```java
    final ModifyMultisigAccountTransaction convertIntoMultisigTransaction = ModifyMultisigAccountTransaction.create(
        Deadline.create(2, HOURS),
        1,
        1,
        Arrays.asList(
            new MultisigCosignatoryModification(
                MultisigCosignatoryModificationType.ADD,
                cosignatory1PublicAccount
            ),
            new MultisigCosignatoryModification(
                MultisigCosignatoryModificationType.ADD,
                cosignatory2PublicAccount
            )
        ),
        NetworkType.TEST_NET
    );
```
<!--END_DOCUSAURUS_CODE_TABS-->

3. Sign and announce the transaciton with the canidate multisig account.


<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const signedTransaction = account.sign(convertIntoMultisigTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const signedTransaction = account.sign(convertIntoMultisigTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--Java-->
```java
    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");
    final SignedTransaction signedTransaction = account.sign(convertIntoMultisigTransaction);
    transactionHttp.announce(signedTransaction).toFuture().get();
```
<!--END_DOCUSAURUS_CODE_TABS-->

If everything goes well, Alice and Bob should be cosignatories of the multisig account.

<div class=info>

**Note**

You could also get the list of the multisig accounts where Alice or Bob are cosignatories using <span id=getMultisigAccountInfo>`getMultisigAccountInfo`</span> function.

</div>

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const accountHttp = new AccountHttp('http://localhost:3000');

const address = Address.createFromRawAddress('SCSGBN-HYJD6P-KJHACX-3R2BI3-QUMMOY-QSNW5J-ICLK');

accountHttp
    .getMultisigAccountInfo(address)
    .subscribe(accountInfo => console.log(accountInfo), err => console.error(err));
```

<!--JavaScript-->
```js
const accountHttp = new AccountHttp('http://localhost:3000');

const address = Address.createFromRawAddress('SCSGBN-HYJD6P-KJHACX-3R2BI3-QUMMOY-QSNW5J-ICLK');

accountHttp
    .getMultisigAccountInfo(address)
    .subscribe(accountInfo => console.log(accountInfo), err => console.error(err));
```

<!--Java-->
```java
    final AccountHttp accountHttp = new AccountHttp("http://localhost:3000");

    // Replace with address
    final String addressRaw = "SB2RPH-EMTFMB-KELX2Y-Q3MZTD-RV7DQG-UZEADV-CYKC";

    final Address address = Address.createFromRawAddress(addressRaw);

    final MultisigAccountInfo multisigAccountInfo = accountHttp.getMultisigAccountInfo(address).toFuture().get();

    System.out.println(multisigAccountInfo);
```
<!--END_DOCUSAURUS_CODE_TABS-->


## What’s next?

Modify the account, converting it into a 2-of-2 multisig following [modifying a multisig account](./modifying-a-multisig-account.md) guide.

