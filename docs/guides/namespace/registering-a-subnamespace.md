---
id: registering-a-subnamespace
title: Registering a subnamespace
---
Register a [subnamespace](../../) following this guide.

## Background

Once you have a registered root namespace, you can create up to `3` levels of subnamespaces.

Subnamespaces do not have a renting duration on its own. They have the same one as their parent namespace.

It is possible to create multiple subnamespaces with the same name in different namespaces (example: `foo.bar` and `foo2.bar`).
Prerequisites

- Finish [registering a namespace guide](../namespace/registering-a-namespace.md)
- XPX-Chain-SDK or CLI
- A text editor or IDE
- An account with XPX and at least one namespace

## Let’s get into some code

The first step is to choose a name for your subnamespace.

In this example, we have registered a subnamespace called `bar` under `foo` namespace.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const privateKey = process.env.PRIVATE_KEY as string;
const account = Account.createFromPrivateKey(privateKey, NetworkType.PRIVATE_TEST);

const rootNamespaceName = 'foo';
const subnamespaceName = 'bar';

const registerNamespaceTransaction = RegisterNamespaceTransaction.createSubNamespace(
    Deadline.create(),
    subnamespaceName,
    rootNamespaceName,
    NetworkType.PRIVATE_TEST);

const signedTransaction = account.sign(registerNamespaceTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const privateKey = process.env.PRIVATE_KEY;
const account = Account.createFromPrivateKey(privateKey, NetworkType.PRIVATE_TEST);

const rootNamespaceName = 'foo';
const subnamespaceName = 'bar';

const registerNamespaceTransaction = RegisterNamespaceTransaction.createSubNamespace(
    Deadline.create(),
    subnamespaceName,
    rootNamespaceName,
    NetworkType.PRIVATE_TEST);

const signedTransaction = account.sign(registerNamespaceTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--Java-->
```java
    // Replace with private key
    final String privateKey = "";

    final Account account = Account.createFromPrivateKey(privateKey, NetworkType.PRIVATE_TEST);

    // Replace with root namespace name
    final NamespaceId rootNamespaceId = new NamespaceId("foo");

    //Replace with subnamespace name
    final String subnamespaceName = "bar";

    final RegisterNamespaceTransaction registerNamespaceTransaction = RegisterNamespaceTransaction.createSubNamespace(
        Deadline.create(2, ChronoUnit.HOURS),
        subnamespaceName,
        rootNamespaceId,
        NetworkType.PRIVATE_TEST
    );

    final SignedTransaction signedTransaction = account.sign(registerNamespaceTransaction);

    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    transactionHttp.announce(signedTransaction).toFuture().get();
```

<!--Bash-->
```bash
xpx-cli transaction namespace --subnamespace --parentname foo --name bar
```

<!--END_DOCUSAURUS_CODE_TABS-->