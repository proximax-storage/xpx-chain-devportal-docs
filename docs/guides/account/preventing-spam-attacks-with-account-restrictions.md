---
id: preventing-spam-attacks-with-account-restrictions
title: Preventing spam attacks with account restrictions
---
Learn how to add and remove account restrictions.

## Background

Imagine you are a company using the public chain to certify the quality of your products.

When the quality verification process concludes, an operator sends a [quality seal][Mosaic] to the product account, which the customers can review by scanning a QR code. For the convenience of the customers, you only want to show relevant transactions and prevent spam from cluttering the product account.

The final customers can review the product mosaics scanning a QR code. For that reason, the company only wants to show related transactions, avoiding that others spam their products with non-related information.

![Blocking spam transactions](/img/account-restrictions-spam.png "Blocking spam transactions")

<p class="caption">Blocking spam attacks</p>

Thus, you opt to configure the product [account restrictions][Account-restriction] to only receive transactions that follow a set of conditions.


## Prerequisites

- Finish [sending a transfer transaction guide][transfer-transaction-guide]
- Finish [creating a mosaic guide][mosaic-guide]

## Getting into some code

Before starting solving the use case, you will need to set up two accounts.

1. Create an account to represent the product.
2. Create another account for the company.

Next, you will configure the product’s account to only accept receiving transfer transactions that contain a specific mosaic.

### Blocking transactions by address

An account can decide to receive transactions only from an allowed list of [addresses][Account]. Similarly, an account can specify a blocked list of addresses to block transactions from.

<div class=info>

**Note**

Allow and block restrictions are mutually exclusive per restriction type. In other words, an account can only be configured to have either an allowed or blocked list per type of restriction.

</div>

By default, when there is no restriction set, all the accounts in the network can announce transactions to the stated account.

Returning to our previous example, let us imagine that you want to configure the product account to only accept receiving transactions that come from the company’s account. You might take the following steps to do so:

1. Define the account restriction modification. Add to the company’s address `VBI774-YMFDZI-FPEPC5-4EKRC2-5DKDZJ-H2QVRW-4HBP` to the allowed list.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const companyAddress = Address.createFromRawAddress('VBI774-YMFDZI-FPEPC5-4EKRC2-5DKDZJ-H2QVRW-4HBP');
const addressRestriction = AccountRestrictionModification.createForAddress(RestrictionModificationType.Add, companyAddress);
```

<!--JavaScript-->
```js
const companyAddress = Address.createFromRawAddress('VBI774-YMFDZI-FPEPC5-4EKRC2-5DKDZJ-H2QVRW-4HBP');
const addressRestriction = AccountRestrictionModification.createForAddress(RestrictionModificationType.Add, companyAddress);
```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Create an `AccountRestrictionTransaction`, with restrictionType “AllowAddress”. Add to the array the modification created in the previous step.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transaction = AccountRestrictionTransaction
    .createAddressRestrictionModificationTransaction(
        Deadline.create(),
        RestrictionType.AllowAddress,
        [addressRestriction],
        NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const transaction = AccountRestrictionTransaction
    .createAddressRestrictionModificationTransaction(
        Deadline.create(),
        RestrictionType.AllowAddress,
        [addressRestriction],
        NetworkType.TEST_NET);
```

<!--END_DOCUSAURUS_CODE_TABS-->

3. Sign and announce the transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const productPrivateKey = process.env.PRIVATE_KEY as string;
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH as string;
const productAccount = Account.createFromPrivateKey(productPrivateKey, NetworkType.TEST_NET);
const signedTransaction = productAccount.sign(transaction, networkGenerationHash);

const transactionHttp = new TransactionHttp('http://localhost:3000');
transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const productPrivateKey = process.env.PRIVATE_KEY;
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH;
const productAccount = Account.createFromPrivateKey(productPrivateKey, NetworkType.TEST_NET);
const signedTransaction = productAccount.sign(transaction, networkGenerationHash);

const transactionHttp = new TransactionHttp('http://localhost:3000');
transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--END_DOCUSAURUS_CODE_TABS-->

Now, if you send a [transfer transaction][transfer-transaction-guide] from another account, you will get an error as only `VBI774-YMFDZI-FPEPC5-4EKRC2-5DKDZJ-H2QVRW-4HBP` is allowed to send the transactions to the product.

On the other hand, if you send a transaction from your company account, you will receive a confirmation message as you would normally.

### Blocking transactions by mosaic id

Imagine that the account that represents the company owns the following mosaics:

- `company.share`: represents shares of the company.
- `company.quality.seal`: represents that the product has passed a quality test.
- `company.safety.seal`: represents that the product has passed a safety test.

In this case, it might be useful if the product could only receive seals and not company shares.

Thus, you could narrow the type of transactions that the product can receive from the company’s account through the use of negation. Instead of specifically allowing the seals, the product can be set up to block receiving transactions that contain `company.share`. This is how it can be done:

1. Define the account restriction modification. Add the mosaic id you want to block to the blocked list.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const companyShareMosaicId = new MosaicId('2b890153b7a18ff2'); // Replace with the mosaic id representing the company share.
const mosaicRestriction = AccountRestrictionModification.createForMosaic(RestrictionModificationType.Add, companyShareMosaicId);
```

<!--JavaScript-->
```js
const companyShareMosaicId = new MosaicId('2b890153b7a18ff2'); // Replace with the mosaic id representing the company share.
const mosaicRestriction = AccountRestrictionModification.createForMosaic(RestrictionModificationType.Add, companyShareMosaicId);
```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Create an `AccountRestrictionTransaction`, with restrictionType `BlockMosaic`. Add to the array the modification created in the previous step.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transaction = AccountRestrictionTransaction
    .createMosaicRestrictionModificationTransaction(
        Deadline.create(),
        RestrictionType.BlockMosaic,
        [mosaicRestriction],
        NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const transaction = AccountRestrictionTransaction
    .createMosaicRestrictionModificationTransaction(
        Deadline.create(),
        RestrictionType.BlockMosaic,
        [mosaicRestriction],
        NetworkType.TEST_NET);
```

<!--END_DOCUSAURUS_CODE_TABS-->

3. Sign and announce the transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const productPrivateKey = process.env.PRIVATE_KEY;
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH;
const productAccount = Account.createFromPrivateKey(productPrivateKey, NetworkType.TEST_NET);
const signedTransaction = productAccount.sign(transaction, networkGenerationHash);

const transactionHttp = new TransactionHttp('http://localhost:3000');
transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const productPrivateKey = process.env.PRIVATE_KEY;
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH;
const productAccount = Account.createFromPrivateKey(productPrivateKey, NetworkType.TEST_NET);
const signedTransaction = productAccount.sign(transaction, networkGenerationHash);

const transactionHttp = new TransactionHttp('http://localhost:3000');
transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--END_DOCUSAURUS_CODE_TABS-->

If the process was successful, the product account can now only receive transactions from the company’s account that does not include any `company.share` mosaic.

### Removing a restriction

After the company sells the product to the final client, they want to remove the condition that only allowed the company’s account to send transactions to the product. The account restrictions can be removed as easily as they were set up:

1. Define the account restriction modification. Remove from the allowed list the company’s address.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const companyAddress = Address.createFromRawAddress('VBI774-YMFDZI-FPEPC5-4EKRC2-5DKDZJ-H2QVRW-4HBP');
const addressRestriction = AccountRestrictionModification.createForAddress(RestrictionModificationType.Remove, companyAddress);
```

<!--JavaScript-->
```js
const companyAddress = Address.createFromRawAddress('VBI774-YMFDZI-FPEPC5-4EKRC2-5DKDZJ-H2QVRW-4HBP');
const addressRestriction = AccountRestrictionModification.createForAddress(RestrictionModificationType.Remove, companyAddress);
```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Create an `AccountRestrictionTransaction`, setting the type `AllowAddress`. Add as well the modification created.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transaction = AccountRestrictionTransaction
    .createAddressRestrictionModificationTransaction(
        Deadline.create(),
        RestrictionType.AllowAddress,
        [addressRestriction],
        NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const transaction = AccountRestrictionTransaction
    .createAddressRestrictionModificationTransaction(
        Deadline.create(),
        RestrictionType.AllowAddress,
        [addressRestriction],
        NetworkType.TEST_NET);
```

<!--END_DOCUSAURUS_CODE_TABS-->

3. Sign and announce the transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const productPrivateKey = process.env.PRIVATE_KEY as string;
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH as string;
const productAccount = Account.createFromPrivateKey(productPrivateKey, NetworkType.TEST_NET);
const signedTransaction = productAccount.sign(transaction,networkGenerationHash);

const transactionHttp = new TransactionHttp('http://localhost:3000');
transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const productPrivateKey = process.env.PRIVATE_KEY;
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH;
const productAccount = Account.createFromPrivateKey(productPrivateKey, NetworkType.TEST_NET);
const signedTransaction = productAccount.sign(transaction,networkGenerationHash);

const transactionHttp = new TransactionHttp('http://localhost:3000');
transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--END_DOCUSAURUS_CODE_TABS-->

After the transaction gets confirmed, you should be able to send transactions from any account to the product account once again.

[Account]: ../../built-in-features/account.md
[Mosaic]: ../../built-in-features/mosaic.md
[Account-restriction]: ../../built-in-features/account-restriction.md
[transfer-transaction-guide]: ../transaction/sending-a-transfer-transaction.md
[mosaic-guide]: ../mosaic/creating-a-mosaic.md