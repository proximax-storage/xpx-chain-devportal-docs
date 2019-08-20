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
mosaic, err := sdk.NewMosaicIdFromNonceAndOwner(nonce, account.PublicAccount.PublicKey)
if err != nil {
    panic(err)
}

namespace, _ := sdk.NewNamespaceIdFromName("foo")
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Announce the alias transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
transaction, err := client.NewAddressAliasTransaction(
    sdk.NewDeadline(time.Hour),
    mosaic,
    namespace,
    sdk.AliasLink,
  )

if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

If you want to unlink the alias, change alias action type to `AliasActionType.Unlink`.

## What’s next?

Now you can send transactions using the namespace linked to the mosaic instead of defining the complete mosaicId.


