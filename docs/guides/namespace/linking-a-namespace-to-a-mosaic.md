---
id: linking-a-namespace-to-a-mosaic
title: Linking a namespace to a mosaic
---

Link a [namespace](../../built-in-features/namespace.md) to a [ mosaic ](../../built-in-features/mosaic.md).

## Prerequisites

- XPX-Chain-SDK or XPX-Chain-CLI
- A text editor or IDE
- Have registered one [namespace](../../built-in-features/namespace.md)
- Have registered one [mosaic](../../built-in-features/mosaic.md)
- Have one account with `xpx`

## Getting into some code

An account can link a registered name (namespace or subnamespace) with a mosaic.

1. Define the namespaceId and the address you want to link.


<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://localhost:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

account, err := client.NewAccountFromPrivateKey(os.Getenv("PRIVATE_KEY"))
if err != nil {
    panic(err)
}

mosaicId, err := sdk.NewMosaicIdFromNonceAndOwner(nonce, account.PublicAccount.PublicKey)
if err != nil {
    panic(err)
}

namespace, _ := sdk.NewNamespaceIdFromName("foo")
if err != nil {
    panic(err)
}

transaction, err := client.NewMosaicAliasTransaction(
    sdk.NewDeadline(time.Hour),
    mosaicId,
    namespace,
    sdk.AliasLink,
  )

if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const namespaceId = new NamespaceId('foo');
const mosaicId = new MosaicId('7cdf3b117a3c40cc');

const mosaicAliasTransaction = AliasTransaction.createForMosaic(
    Deadline.create(),
    AliasActionType.Link,
    namespaceId,
    mosaicId,
    NetworkType.TEST_NET
);

const privateKey = process.env.PRIVATE_KEY as string;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH as string;

const signedTransaction = account.sign(mosaicAliasTransaction, networkGenerationHash);

```

<!--JavaScript-->
```js
const namespaceId = new NamespaceId('foo');
const mosaicId = new MosaicId('7cdf3b117a3c40cc');

const mosaicAliasTransaction = AliasTransaction.createForMosaic(
    Deadline.create(),
    AliasActionType.Link,
    namespaceId,
    mosaicId,
    NetworkType.TEST_NET
);

const privateKey = process.env.PRIVATE_KEY;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH;

const signedTransaction = account.sign(mosaicAliasTransaction, networkGenerationHash);

```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Announce the alias transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go

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

const transactionHttp = new TransactionHttp('http://localhost:3000');

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js

const transactionHttp = new TransactionHttp('http://localhost:3000');

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--END_DOCUSAURUS_CODE_TABS-->

If you want to unlink the alias, change alias action type to `AliasActionType.Unlink`.

## What’s next?

Now you can send transactions using the namespace linked to the mosaic instead of defining the complete mosaicId.


