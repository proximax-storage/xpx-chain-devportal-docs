---
id: registering-a-namespace
title: Registering a namespace
---

Register your own [namespace](../../built-in-features/namespace.md).

## Background Information 

Namespaces allow you to create an on-chain **unique place** for your business and your assets on the Sirius Chain.

A namespace starts with a name that you choose, similar to an internet domain name. If one [account](../../built-in-features/account.md) creates a namespace, that will appear as unique in the network.

An account can link a registered name (namespace or subnamespace) with an account or a [ mosaic ](../../built-in-features/mosaic.md) identifier.

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md).
- XPX-Chain-SDK or XPX-Chain-CLI.
- A text editor or IDE.
- An account with XPX.

## Getting into some code

1. Choose a name you like. One common option is to use your company’s or own name. In this example, we will register a namespace called `foo`.
2. Check if this namespace name is available.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://bctestnet1.brimstone.xpxsirius.io:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

namespaceId, err := sdk.NewNamespaceIdFromName("foo")
if err != nil {
    panic(err)
}

namespaceInfo, err := client.Namespace.GetNamespaceInfo(context.Background(), namespaceId)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const namespaceHttp = new NamespaceHttp('http://bctestnet1.brimstone.xpxsirius.io:3000');

const namespace = new NamespaceId('foo');

namespaceHttp
    .getNamespace(namespace)
    .subscribe(namespace => console.log(namespace), err => console.error(err));
```

<!--JavaScript-->
```js
const namespaceHttp = new NamespaceHttp('http://bctestnet1.brimstone.xpxsirius.io:3000');

const namespace = new NamespaceId('foo');

namespaceHttp
    .getNamespace(namespace)
    .subscribe(namespace => console.log(namespace), err => console.error(err));
```

<!--CLI-->
```sh
xpx2-cli namespace info --name foo
```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Is the namespace available? Try to register it before someone else does it! Announce a [register namespace transaction](../../built-in-features/namespace.md#registernamespacetransaction) with the chosen name and renting duration expressed in blocks.

<div class=info>

**Note:**

In Sirius Chain, blocks are complete every `15` seconds in average. You will have to renew your namespace before it expires.

</div>

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
// Create an account from a private key
account, err := client.NewAccountFromPrivateKey(os.Getenv("PRIVATE_KEY"))
if err != nil {
    panic(err)
}

// Create a new namespace type transaction
transaction, err := client.NewRegisterRootNamespaceTransaction(
    // The maximum amount of time to include the transaction in the blockchain.
    sdk.NewDeadline(time.Hour),
    // Name of namespace
    "foo",
    // Duration of namespace life in blocks
    sdk.Duration(1000),
)
if err != nil {
    panic(err)
}

// Sign transaction
signedTransaction, err := account.Sign(transaction)
if err != nil {
    panic(err)
}

// Announce transaction
_, err = client.Transaction.Announce(context.Background(), signedTransaction)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp('http://bctestnet1.brimstone.xpxsirius.io:3000');

const privateKey = process.env.PRIVATE_KEY as string;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const namespaceName = "foo"; //Replace with an unique namespace name

const registerNamespaceTransaction = RegisterNamespaceTransaction.createRootNamespace(
    Deadline.create(),
    namespaceName,
    UInt64.fromUint(1000),
    NetworkType.TEST_NET);

const signedTransaction = account.sign(registerNamespaceTransaction, generationHash);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp('http://bctestnet1.brimstone.xpxsirius.io:3000');

const privateKey = process.env.PRIVATE_KEY;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const namespaceName = "foo"; //Replace with an unique namespace name

const registerNamespaceTransaction = RegisterNamespaceTransaction.createRootNamespace(
    Deadline.create(),
    namespaceName,
    UInt64.fromUint(1000),
    NetworkType.TEST_NET);

const signedTransaction = account.sign(registerNamespaceTransaction, generationHash);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

When the transaction is confirmed, [register a subnamespace](../namespace/registering-a-subnamespace.md) following the next guide.

