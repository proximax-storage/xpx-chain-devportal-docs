---
id: modifying-mosaic-supply
title: Modifying mosaic supply
---

Alter the supply of a mosaic following this guide.

## Prerequisites

- XPX-Chain-SDK or XPX-Chain-CLI
- A text editor or IDE
- Finish [creating a mosaic guide](./creating-a-mosaic.md)
- Have registered a supply mutable mosaic
- An account with `xpx`

## Getting into some code

If you have followed the previous guide, right now you should own a `supply mutable` [ mosaic ](../../built-in-features/mosaic.md).

To increase the initial supply to `2.000.000`, define a [mosaic supply change transaction](../../built-in-features/mosaic.md#mosaicsupplychangetransaction) setting the target mosaicId.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://localhost:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

mosaicId, err := sdk.NewMosaicIdFromNonceAndOwner(nonce, account.PublicKey)
if err != nil {
    panic(err)
}

mosaicSupplyChangeTrx, err := client.NewMosaicSupplyChangeTransaction(
    sdk.NewDeadline(time.Hour),
    mosaicId,
    sdk.Increase,
    sdk.Amount(2000000),
)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

Decrease your mosaic supply by changing `MosaicSupplyType.Increase` for `MosaicSupplyType.Decrease`.

