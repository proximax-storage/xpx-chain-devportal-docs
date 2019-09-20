---
id: preventing-spam-attacks
title: Preventing spam attacks with account restrictions
---

Learn how to add and remove account restrictions.

## Background

Imagine you are a company using the public chain to certify the quality of your products.

When the quality verification process concludes, an operator sends a [quality seal][Mosaic] to the product account, which the customers can review by scanning a QR code. For the convenience of the customers, you only want to show relevant transactions and prevent spam from cluttering the product account.

The final customers can review the product mosaics scanning a QR code. For that reason, the company only wants to show related transactions, avoiding that others spam their products with non-related information.

![Blocking spam attacks](img/blocking-spam-attacks.png "Blocking spam attacks")

<p class=caption>Blocking spam attacks</p>


Thus, you opt to configure the product [account restrictions][Account-restriction] to only receive transactions that follow a set of conditions.

## Prerequisites

- XPX-Chain-SDK
- A text editor or IDE
- Finish sending a [transfer transaction guide][transfer-transaction-guide]
- Finish [creating a mosaic guide][mosaic-guide]
- An [account][Account] with `xpx`

## Getting into some code

Before starting solving the use case, you will need to set up two accounts with `xpx2-cli`.

1. Create an account to represent the product.

<!--DOCUSAURUS_CODE_TABS-->
<!--CLI-->
```sh
xpx2-cli account generate

Introduce network type (MIJIN_TEST, MIJIN, MAIN_NET, TEST_NET): TEST_NET
Do you want to save it? [y/n]: y
Introduce Sirius Chain Node URL. (Example: http://localhost:3000): http://localhost:3000
Insert profile name (blank means default and it could overwrite the previous profile): product

New Account:    SDFRDC-F6RXWX-EOOTVI-RLCNUK-KYRSU6-MXW2FC-OR4V
Public Key:     8DC55282AC40307C230F432EE29E52BD93860C167011B11FA1BAEE124B76AB19
Private Key:    123..456
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Create another account for the company.

<!--DOCUSAURUS_CODE_TABS-->
<!--CLI-->
```sh
xpx2-cli account generate

Introduce network type (MIJIN_TEST, MIJIN, MAIN_NET, TEST_NET): TEST_NET
Do you want to save it? [y/n]: y
Introduce Sirius Chain Node URL. (Example: http://localhost:3000): http://localhost:3000
Insert profile name (blank means default and it could overwrite the previous profile): company

New Account:    VBI774-YMFDZI-FPEPC5-4EKRC2-5DKDZJ-H2QVRW-4HBP
Public Key:     DBA5A88911D01CE951A5DEAFD86108A029EA359BB211B399FC53B8908D6AE272
Private Key:    654..321
```
<!--END_DOCUSAURUS_CODE_TABS-->

Next, you will configure the product’s account to only accept receiving transfer transactions that contain a specific mosaic.

### Blocking transaction by address

An account can decide to receive transactions only from an allowed list of [addresses][Account]. Similarly, an account can specify a blocked list of addresses to block transactions from.

<div class=info>

**Note**

Allow and block restrictions are mutually exclusive per restriction type. In other words, an account can only be configured to have either an allowed or blocked list per type of restriction.

</div>

By default, when there is no restriction set, all the accounts in the network can announce transactions to the stated account.

Returning to our previous example, let us imagine that you want to configure the product account to only accept receiving transactions that come from the company’s account. You might take the following steps to do so:

1. Define the account restriction modification. Add to the company’s address `SBI774-YMFDZI-FPEPC5-4EKRC2-5DKDZJ-H2QVRW-4HBP` to the allowed list.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
address, err := sdk.NewAddressFromRaw("VBI774-YMFDZI-FPEPC5-4EKRC2-5DKDZJ-H2QVRW-4HBP")
if err != nil {
    panic(err)
}

modification := sdk.AccountPropertiesAddressModification{ sdk.AddProperty, address, }
```

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

2. Create `AccountRestrictionTransaction`, with restriction type "AllowAddress". Add to the array the modification created in the previous step.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
transaction, err := client.NewAccountPropertiesAddressTransaction(
  sdk.NewDeadline(time.Hour),
  sdk.BlockAddress,
  []*sdk.AccountPropertiesAddressModification{ &modification },
)
if err != nil {
    panic(err)
}
```

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
<!--Golang-->
```go
productAccount, err := client.NewAccountFromPrivateKey(os.Getenv("PRODUCT_PRIVATE_KEY"))
if err != nil {
    panic(err)
}

signedTransaction, err := productAccount.Sign(transaction)
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

Now, if you send a [transfer transaction][transfer-transaction] from another account, you will get an error as only `VBI774-YMFDZI-FPEPC5-4EKRC2-5DKDZJ-H2QVRW-4HBP` is allowed to send the transactions to the product.

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
<!--Golang-->
```go
id, err := strconv.ParseInt("2b890153b7a18ff2", 16, 64)
if err != nil {
    panic(err)
}

companyShareMosaicId, err := sdk.NewMosaicId(uint64(id))
if err != nil {
    panic(err)
}

modification := &sdk.AccountPropertiesMosaicModification{ sdk.AddProperty, companyShareMosaicId, }
```

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

2. Create an `AccountRestrictionTransaction`, with restriction type `BlockMosaic`. Add to the array the modification created in the previous step.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
transaction, err := client.NewAccountPropertiesMosaicTransaction(
    sdk.NewDeadline(time.Hour),
    sdk.BlockMosaic,
    []*sdk.AccountPropertiesMosaicModification{modification},
)
if err != nil {
    panic(err)
}
```

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
<!--Golang-->
```go
productAccount, err := client.NewAccountFromPrivateKey(os.Getenv("PRODUCT_PRIVATE_KEY"))
if err != nil {
    panic(err)
}

signedTransaction, err := productAccount.Sign(transaction)
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


### Removing a restriction

After the company sells the product to the final client, they want to remove the condition that only allowed the company’s account to send transactions to the product. The account restrictions can be removed as easily as they were set up:

1. Define the account restriction modification. Remove from the allowed list the company’s address.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
address, err := sdk.NewAddressFromRaw("VBI774-YMFDZI-FPEPC5-4EKRC2-5DKDZJ-H2QVRW-4HBP")
if err != nil {
    panic(err)
}

modification := &sdk.AccountPropertiesAddressModification{ sdk.RemoveProperty, address, }

```

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
<!--Golang-->
```go
transaction, err := client.NewAccountPropertiesAddressTransaction(
  sdk.NewDeadline(time.Hour),
  sdk.AllowAddress,
  []*sdk.AccountPropertiesAddressModification{ modification },
)
if err != nil {
    panic(err)
}
```

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
<!--Golang-->
```go
productAccount, err := client.NewAccountFromPrivateKey(os.Getenv("PRODUCT_PRIVATE_KEY"))
if err != nil {
    panic(err)
}

signedTransaction, err := productAccount.Sign(transaction)
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

[Account]: ../../built-in-features/account.md
[Mosaic]: ../../built-in-features/mosaic.md
[Account-restriction]: ../../built-in-features/account-restriction.md
[transfer-transaction-guide]: ../transaction/sending-a-transfer-transaction.md
[mosaic-guide]: ../mosaic/creating-a-mosaic.md
[transfer-transaction]: ../../built-in-features/transfer-transaction.md