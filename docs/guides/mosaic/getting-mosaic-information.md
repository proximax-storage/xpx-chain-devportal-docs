---
id: getting-mosaic-information
title: Getting the mosaic information
---

Get the ownership, divisibility, duration, and flags for a given [mosaic](../../built-in-features/mosaic.md) identifier.

## Prerequisites

- XPX-Chain-SDK or XPX-Chain-CLI.
- A text editor or IDE.
- Finish [creating a mosaic guide](./creating-a-mosaic.md).

## Getting into some code

Call `getMosaic` function, passing the mosaicId you want to check as a parameter.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
mosaic, err := client.Mosaic.GetMosaicInfo(context.Background(), mosaicId)
if err != nil {
    panic(err)
}

fmt.Printf("%s\n", mosaic.String())
```
<!--END_DOCUSAURUS_CODE_TABS-->

