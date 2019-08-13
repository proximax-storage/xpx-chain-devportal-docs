---
id: linking-namespace-to-account
title: Linking namespace to Account
---

Link a [ namespace ](../../built-in-features/namespace.md) to an [ account ](../..built-in-features/account.md).

## Prerequisites

- Have registered one [ namespace ](../../built-in-features/namespace.md)
- Have one account with name `xpx`
- Have namespace with name `foo`

## Getting into some code

An account can link a registered [ name ](../../built-in-features/namespace.md) (namespace or subnamespace) with an [ account ](../../built-in-features/account.md).

1. Define the namespaceId and the address you want to link.

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->
```typescript
const namespaceId = new NamespaceId('foo');
const address = Address.createFromRawAddress('SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54');
```

<!--JavaScript-->
```javascript
const namespaceId = new NamespaceId('foo');
const address = Address.createFromRawAddress('SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54');
```

<!--Golang-->
```go
address, err := sdk.NewAddressFromPublicKey("...", sdk.PUBLIC_TEST)
if err != nil {
    panic(err)
}

name := "foo"
namespace, err := sdk.NewNamespaceIdFromName(name)
if err != nil {
    panic(err)
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Announce the alias transaction.

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->
```typescript
const addressAliasTransaction = AliasTransaction.createForAddress(
    Deadline.create(),
    AliasActionType.Link,
    namespaceId,
    address,
    NetworkType.MIJIN_TEST
);

const privateKey = process.env.PRIVATE_KEY;
const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH;
const signedTransaction = account.sign(addressAliasTransaction, networkGenerationHash);

const transactionHttp = new TransactionHttp('http://localhost:3000');
transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```javascript
const addressAliasTransaction = AliasTransaction.createForAddress(
    Deadline.create(),
    AliasActionType.Link,
    namespaceId,
    address,
    NetworkType.MIJIN_TEST
);

const privateKey = process.env.PRIVATE_KEY;
const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH;
const signedTransaction = account.sign(addressAliasTransaction, networkGenerationHash);

const transactionHttp = new TransactionHttp('http://localhost:3000');
transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--Golang-->
```go
transaction, err := client.NewAddressAliasTransaction(
    sdk.NewDeadline(time.Hour),
    address,
    namespace,
    sdk.AliasLink,
  )

if err != nil {
    panic(err)
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

If you want to unlink the alias, change alias action type to` AliasActionType.Unlink`.

## What’s next?

Now you can send transactions to the namespace linked to the account instead of using the complete address.

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->
```typescript
const recipientAddress = new NamespaceId('foo');

const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    recipientAddress,
    [NetworkCurrencyMosaic.createRelative(10)],
    EmptyMessage,
    NetworkType.MIJIN_TEST);
```

<!--JavaScript-->
```javascript
const recipientAddress = new NamespaceId('foo');

const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    recipientAddress,
    [NetworkCurrencyMosaic.createRelative(10)],
    EmptyMessage,
    NetworkType.MIJIN_TEST);
```

<!--Golang-->
```go
name := "foo"
namespace, err := sdk.NewNamespaceIdFromName(name)
if err != nil {
    panic(err)
}

transferTransaction, err := client.NewTransferTransactionWithNamespace(
        sdk.NewDeadline(time.Hour),
        namespace,
        []*sdk.Mosaic{},
        sdk.NewPlainMessage("Test"),
    )
if err != nil {
    panic(err)
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

