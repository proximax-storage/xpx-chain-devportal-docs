---
id: registering-a-subnamespace
title: Registering a subnamespace
---

Register a subnamespace following this guide.

## Background

Once you have a registered root namespace, you can create up to `3` levels of subnamespaces.

Subnamespaces do not have a renting duration on its own. They have the same one as their parent namespace.

It is possible to create multiple subnamespaces with the same name in different namespaces (example: `foo.bar` and `foo2.bar`).

## Prerequisites

- XPX-Chain-SDK or XPX-Chain-CLI
- A text editor or IDE
- An account with `xpx` and at least one namespace
- Finish [registering a namespace guide](./registering-a-namespace.md)

## Getting into some code

The first step is to choose a name for your subnamespace.

In this example, we have registered a subnamespace called `bar` under `foo` namespace.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://localhost:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

subNamespaceName := "bar"
parentNamespaceName := "foo"

// Create an account from a private key
account, err := client.NewAccountFromPrivateKey(os.Getenv("PRIVATE_KEY"))
if err != nil {
    panic(err)
}

// Create parent namespace id
parentNamespaceId, err := sdk.NewNamespaceIdFromName(parentNamespaceName)
if err != nil {
    panic(err)
}

// Create a new namespace type transaction
transaction, err := client.NewRegisterSubNamespaceTransaction(
    // The maximum amount of time to include the transaction in the blockchain.
    sdk.NewDeadline(time.Hour),
    // Name of namespace
    subNamespaceName,
    // Parent namespace id
    parentNamespaceId,
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
<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

When the transaction is confirmed, link a namespace with a [mosaic](./linking-a-namespace-to-a-mosaic.md) or [address](./linking-a-namespace-to-account.md).

