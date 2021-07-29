---
id: remove-mosaic-levy
title: Remove Mmosaic Levy
---

Remove levy of a [mosaic](../../built-in-features/mosaic.md).

## Background

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
// an exist mosaicId. For example created ne one
mosaicId, err := sdk.NewMosaicIdFromNonceAndOwner(nonce, creator.PublicAccount.PublicKey)
if err != nil {
    panic(err)
}
// Remove levy
removeTx, err := Client.NewMosaicRemoveLevyTransaction(sdk.NewDeadline(Deadline), mosaicId)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->