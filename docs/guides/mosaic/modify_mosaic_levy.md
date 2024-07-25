---
id: modify-mosaic-levy
title: Modify Mosaic Levy
---

Create or modify levy of a [mosaic](../../built-in-features/mosaic.md).

## Background

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
// an exist mosaicId. For example created ne one
mosaicId, err := sdk.NewMosaicIdFromNonceAndOwner(nonce, creator.PublicAccount.PublicKey)
if err != nil {
    panic(err)
}
// Add levy
levyTx, err := Client.NewMosaicModifyLevyTransaction(
	sdk.NewDeadline(Deadline),
	mosaicId,
	&sdk.MosaicLevy{
		Type:      sdk.LevyAbsoluteFee,
		Recipient: levyRecipient.Address,
		Fee:       levy,
		MosaicId:  mosaicId,
	},
)
if err != nil {
    panic(err)
}

// ** Anounnce levyTx and wait **

info, err = Client.Mosaic.GetMosaicLevy(context.TODO(), mosaicId)
if err != nil {
    panic(err)
}

println(info.String())
```
<!--END_DOCUSAURUS_CODE_TABS-->