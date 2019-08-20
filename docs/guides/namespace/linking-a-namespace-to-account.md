---
id: linking-namespace-to-account
title: Linking namespace to Account
---

Link a [ namespace ](../../built-in-features/namespace.md) to an [ account ](../..built-in-features/account.md).

## Prerequisites

- XPX-Chain-SDK or XPX-Chain-CLI
- A text editor or IDE
- Have registered one [ namespace ](../../built-in-features/namespace.md)
- Have one account with name `xpx`
- Have namespace with name `foo`

## Getting into some code

An account can link a registered [ name ](../../built-in-features/namespace.md) (namespace or subnamespace) with an [ account ](../../built-in-features/account.md).

1. Define the namespaceId and the address you want to link.

<!--DOCUSAURUS_CODE_TABS-->
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

