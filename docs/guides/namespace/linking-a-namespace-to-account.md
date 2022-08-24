---
id: linking-a-namespace-to-account
title: Linking namespace to account
---

Link a [ namespace ](../../built-in-features/namespace.md) to an [ account ](../../built-in-features/account.md).

## Prerequisites

- XPX-Chain-SDK or XPX-Chain-CLI.
- A text editor or IDE.
- Have registered one [ namespace ](../../built-in-features/namespace.md).
- Have one account with the name `XPX`.
- Have namespace with name `foo`.

## Getting into some code

An account can link a registered [ name ](../../built-in-features/namespace.md) (namespace or subnamespace) with an [ account ](../../built-in-features/account.md).

1. Define the namespaceId and the address you want to link.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://bctestnet1.brimstone.xpxsirius.io:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

account, err := client.NewAccountFromPrivateKey(os.Getenv("PRIVATE_KEY"))
if err != nil {
    panic(err)
}

address, err := sdk.NewAddressFromRaw(os.Getenv("ADDRESS"))
if err != nil {
    panic(err)
}

namespace, err := sdk.NewNamespaceIdFromName("foo")
if err != nil {
    panic(err)
}
```
<!--TypeScript-->
```js
const namespaceId = new NamespaceId('foo');
const address = Address.createFromRawAddress('VD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54');

const transactionHttp = new TransactionHttp('http://bctestnet1.brimstone.xpxsirius.io:3000');

const privateKey = process.env.PRIVATE_KEY as string;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH as string;

```

<!--JavaScript-->
```js
const namespaceId = new NamespaceId('foo');
const address = Address.createFromRawAddress('VD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54');

const transactionHttp = new TransactionHttp('http://bctestnet1.brimstone.xpxsirius.io:3000');

const privateKey = process.env.PRIVATE_KEY;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH;

```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Announce the alias transaction.

<!--DOCUSAURUS_CODE_TABS-->
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

signedTransaction, err := account.Sign(transaction)
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
const addressAliasTransaction = AliasTransaction.createForAddress(
    Deadline.create(),
    AliasActionType.Link,
    namespaceId,
    address,
    NetworkType.TEST_NET
);

const signedTransaction = account.sign(addressAliasTransaction, networkGenerationHash);


transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const addressAliasTransaction = AliasTransaction.createForAddress(
    Deadline.create(),
    AliasActionType.Link,
    namespaceId,
    address,
    NetworkType.TEST_NET
);

const signedTransaction = account.sign(addressAliasTransaction, networkGenerationHash);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--END_DOCUSAURUS_CODE_TABS-->

If you want to unlink the alias, change alias action type to` AliasActionType.Unlink`.

## What’s next?

Now you can send transactions to the namespace linked to the account instead of using the complete address.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
namespace, err := sdk.NewNamespaceIdFromName("foo")
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

<!--TypeScript-->
```js
const namespaceId = new NamespaceId('foo');

const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    namespaceId,
    [],
    PlainMessage.create('Test'),
    NetworkType.TEST_NET);

```

<!--END_DOCUSAURUS_CODE_TABS-->

