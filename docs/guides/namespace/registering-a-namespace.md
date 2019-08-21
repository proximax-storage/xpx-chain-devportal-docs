---
id: registering-a-namespace
title: Registering a namespace
---
This guide will help you register your own [namespace](../../built-in-features/namespace.md).

## Background Information 

A [namespace](../../built-in-features/namespace.md) is an on-chain unique domain for your assets. The easiest way to understand it is by means of the domain-file analogy on the internet.

A mosaic is like a file hosted on a domain and represents an asset. Like a website and directory, a mosaic can have the same name as other files on other domains. However, a namespace and a mosaic is always unique.

If an [account](../../built-in-features/account.md) creates a namespace, that namespace will appear as unique in the Sirius Chain ecosystem. For example, if one were to create a namespace called `foo`, a second person cannot create the same namespace.

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md).
- XPX-Chain-SDK or XPX-Chain-CLI.
- A text editor or IDE.
- An account with XPX.

## Let’s do some coding!

Register your namespace by choosing a name you like. One common option is to use your company’s or own name. In this example, we will register a namespace called `foo`.

1. Check if this nampespace name is available.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const namespaceHttp = new NamespaceHttp('http://localhost:3000');

const namespace = new NamespaceId('foo');

namespaceHttp
    .getNamespace(namespace)
    .subscribe(namespace => console.log(namespace), err => console.error(err));
```

<!--JavaScript-->
```js
const namespaceHttp = new NamespaceHttp('http://localhost:3000');

const namespace = new NamespaceId('foo');

namespaceHttp
    .getNamespace(namespace)
    .subscribe(namespace => console.log(namespace), err => console.error(err));
```

<!--Java-->
```java
final NamespaceId namespaceId = new NamespaceId("foo");

        final NamespaceHttp namespaceHttp = new NamespaceHttp("http://localhost:3000");

        final NamespaceInfo namespaceInfo = namespaceHttp.getNamespace(namespaceId).toFuture().get();

        System.out.println(namespaceInfo);
```

<!--Bash-->
```bash
xpx2-cli namespace info --name foo
```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Is the namespace available? Try to register it before someone else does it! Announce a [register namespace transaction](../../built-in-features/namespace.md#registernamespacetransaction) with the chosen name and renting duration expressed in blocks.

<div class=info>

**Note:**

In Sirius Chain, Sirius Chain blocks are complete every `15` seconds in average.

</div>

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const privateKey = process.env.PRIVATE_KEY as string;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const namespaceName = "foo"; //Replace with an unique namespace name

const registerNamespaceTransaction = RegisterNamespaceTransaction.createRootNamespace(
    Deadline.create(),
    namespaceName,
    UInt64.fromUint(1000),
    NetworkType.TEST_NET);

const signedTransaction = account.sign(registerNamespaceTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const privateKey = process.env.PRIVATE_KEY;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const namespaceName = "foo"; //Replace with an unique namespace name

const registerNamespaceTransaction = RegisterNamespaceTransaction.createRootNamespace(
    Deadline.create(),
    namespaceName,
    UInt64.fromUint(1000),
    NetworkType.TEST_NET);

const signedTransaction = account.sign(registerNamespaceTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--Java-->
```java
    // Replace with private key
    final String privateKey = "";

    final Account account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

    // Replace with namespace name
    final String namespaceName = "foo";

    final RegisterNamespaceTransaction registerNamespaceTransaction = RegisterNamespaceTransaction.createRootNamespace(
        Deadline.create(2, ChronoUnit.HOURS),
        namespaceName,
        BigInteger.valueOf(1000),
        NetworkType.TEST_NET
    );

    final SignedTransaction signedTransaction = account.sign(registerNamespaceTransaction);

    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    transactionHttp.announce(signedTransaction).toFuture().get();
```

<!--Bash-->
```bash
xpx2-cli transaction namespace --name foo --rootnamespace --duration 1000
```

<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

Now that you have registered your namespace, check how you can [create mosaics](../mosaic/creating-a-mosaic.md).

When the transaction is confirmed, you can [register a subnamespace](../namespace/registering-a-subnamespace.md) following the next guide.

