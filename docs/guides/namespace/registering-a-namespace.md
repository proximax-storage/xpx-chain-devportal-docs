---
id: registering-a-namespace
title: Registering a namespace
---

Register your own [namespace](../../built-in-features/namespace.md).

## Background

Namespaces allow you to create an on-chain **unique place** for your business and your assets on the Sirius-Chain.

A namespace starts with a name that you choose, similar to an internet domain name. If one [account](../../built-in-features/account.md) creates a namespace, that will appear as unique in the network.

An account can link a registered name (namespace or subnamespace) with an account or a [ mosaic ](../../built-in-features/mosaic.md) identifier.

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md)
- XPX-Chain-SDK or XPX-Chain-CLI
- A text editor or IDE
- An account with XPX

## Getting into some code

1. Choose a name you like. One common option is to use your company’s or own name. In this example, we will register a namespace called `foo`.
2. Check if this namespace name is available.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
namespace, err := sdk.NewNamespaceIdFromName("foo")
if err != nil {
    panic(err)
}

namespaceInfo, err := client.Namespace.GetNamespaceInfo(context.Background(), namespaceId)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Is the namespace available? Try to register it before someone else does it! Announce a [register namespace transaction](../../built-in-features/namespace.md#registernamespacetransaction) with the chosen name and renting duration expressed in blocks.

<div class=info>

**Note**

In Sirius-Chain, blocks are complete every `15` seconds in average. You will have to renew your namespace before it expires.

</div>

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
networkType := sdk.MijinTest
privateKey := "3B9670B5CB19C893694FC49B461CE489BF9588BE16DBE8DC29CF06338133DEE6"
namespaceName := "foo"

conf, err := sdk.NewConfig(baseUrl, networkType, time.Second * 10)
if err != nil {
    fmt.Printf("NewConfig returned error: %s", err)
    return
}

// Use the default http client
client := sdk.NewClient(nil, conf)

// Create an account from a private key
account, err := sdk.NewAccountFromPrivateKey(privateKey, networkType)
if err != nil {
    fmt.Printf("NewAccountFromPrivateKey returned error: %s", err)
    return
}

// Create a new namespace type transaction
transaction, err := sdk.NewRegisterRootNamespaceTransaction(
    // The maximum amount of time to include the transaction in the blockchain.
    sdk.NewDeadline(time.Hour),
    // Name of namespace
    namespaceName,
    // Duration of namespace life in blocks
    sdk.Duration(1000),
    networkType,
)
if err != nil {
    fmt.Printf("NewRegisterRootNamespaceTransaction returned error: %s", err)
    return
}

// Sign transaction
signedTransaction, err := account.Sign(transaction)
if err != nil {
    fmt.Printf("Sign returned error: %s", err)
    return
}

// Announce transaction
_, err = client.Transaction.Announce(context.Background(), signedTransaction)
if err != nil {
    fmt.Printf("Transaction.Announce returned error: %s", err)
    return
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

When the transaction is confirmed, [register a subnamespace](../namespace/registering-a-subnamespace.md) following the next guide.

