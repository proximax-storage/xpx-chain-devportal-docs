---
id: getting-the-amount-of-xpx-sent-to-an-account
title: Getting the amount of XPX sent to an account
---
Check the amount of XPX you have sent to any account.

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md)
- have one account with `xpx` currency
- have [sent mosaics](../../guides/transaction/sending-a-transfer-transaction.md) to another account
- Text editor or IDE
- XPX-Chain-SDK or XPX-Chain-CLI

## Getting into some code

In this example, we are going to check how many assets of a certain type have we sent to an account.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://localhost:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

address, err := sdk.NewAddressFromPublicKey("...", client.NetworkType())
if err != nil {
    panic(err)
}

accountInfo, err := client.Account.GetAccountInfo(context.Background(), address)
if err != nil {
    panic(err)
}

for _, mosaic := range accountInfo.Mosaics {
    if mosaic.AssetId == sdk.XpxNamespaceId {
      fmt.Println(mosaic.String())
    }
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

If you want to check another mosaic different than the native currency, change `mosaicId` for the target mosaic.

