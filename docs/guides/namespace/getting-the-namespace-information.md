---
id: getting-the-namespace-information
title: Getting the Namespace information
---

Get the ownership and duration for a given [namespace](../../built-in-features/namespace.md) identifier.

## Prerequisites

- XPX-Chain-SDK or XPX-Chain-CLI
- A text editor or IDE
- Have registered one [ namespace ](../../built-in-features/namespace.md)
- Have namespace with name `foo`

## Getting into some code

Call `getNamespace` function, passing the namespace identifier you want to check as a parameter.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
baseUrl = "http://localhost:3000"
// Types of network.
networkType = sdk.MijinTest

conf, err := sdk.NewConfig(baseUrl, networkType, time.Second * 10)
if err != nil {
    fmt.Printf("NewConfig returned error: %s", err)
    return
}

// Use the default http client
client := sdk.NewClient(nil, conf)

// Generate Id from namespaceName
namespaceId, _ := sdk.NewNamespaceIdFromName("foo")

namespace, err := client.Namespace.GetNamespaceInfo(context.Background(), namespaceId)
if err != nil {
    fmt.Printf("Namespace.GetNamespaceInfo returned error: %s", err)
    return
}
fmt.Printf("%s\n", namespace.String())
```
<!--END_DOCUSAURUS_CODE_TABS-->
