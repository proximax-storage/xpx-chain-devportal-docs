---
id: getting-the-mosaic-identifier-behind-a-namespace-with-recepits
title: Getting the asset identifier behind a namespace with receipts
---

Get the ownership, divisibility, duration, and flags for a given [mosaic](../../built-in-features/mosaic.md) identifier.

## Background

In the Sirius Chain, accounts can link their registered namespaces to other accounts or mosaics by announcing an [alias transaction](../../built-in-features/namespace.md#mosaic-alias-transaction). This feature allows you to replace long and complex identifiers with short and familiar names for your accounts and mosaics.

Imagine a ticket vendor sending tickets to their customers on the NEM blockchain. The company needs to send `1 0dc67fbe1cad29e3` to `SCVG35-ZSPMYP-L2POZQ-JGSVEG-RYOJ3V-BNIU3U-N2E6`. With aliases, it can define the same transaction as sending `1 ticketsales.event1.ticket` to `@alice` instead.

![Recognizable mosaics and addresses](/img/recognizable-mosaics-and-addresses.png "Recognizable mosaics and addresses")

<p class=caption>Recognizable mosaics and addresses</p>

To ensure the transactions are being sent to the correct place with the correct mosaic, you can directly query the network about the current mosaic identifier behind a namespace by running the following snippet:

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://bctestnet1.brimstone.xpxsirius.io:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

namespaceId, err := sdk.NewNamespaceIdFromName("xpx")
if err != nil {
    panic(err)
}

mosaicId, err := client.Namespace.GetLinkedMosaicId(context.Background(), namespaceId)
if err != nil {
    panic(err)
}
fmt.Println(mosaicId.String())

```
<!--END_DOCUSAURUS_CODE_TABS-->

However, the same method cannot be used to verify transactions of the past. This is due to the facts that:

- Transactions using aliased mosaics or accounts are stored in the blockchain using the namespace identifier, not the real address or mosaic id behind it.
- Links are editable. The namespace owner can link its namespace to another asset.
- Namespaces expire. The namespace link could be deleted.

At this point, you might be wondering: how then can we get the accurate relation between a namespace and its real identifier for a past transaction? The answer lies with [receipts](../../protocol/receipt.md). For each block, Sirius Chain nodes store receipts that contain every invisible state change that cannot be retrieved directly from the transaction or block header.

## Prerequisites

- XPX-Chain-SDK or XPX-Chain-CLI.
- A text editor or IDE.
- Finish [creating a mosaic guide](./creating-a-mosaic.md).
- Have an account with `xpx`.

## Getting into some code

In this example, we are going to announce a transfer transaction using `xpx` instead of the native currency mosaic id. Once the network confirms the transaction, we will get the block height where the transaction has been recorded. With this information, we will then get the namespace-mosaic relation by looking into the block receipts.

1. Define the mosaic you want to send. Use a linked namespace identifier (e.g. xpx) instead of the mosaic identifier.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://bctestnet1.brimstone.xpxsirius.io:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

namespaceId, err := sdk.NewNamespaceIdFromName("xpx")
if err != nil {
  panic(err)
}
aliasedMosaic, err := sdk.NewMosaic(namespaceId, 1000000)
if err != nil {
  panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Attach the mosaic to a transfer transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
address, err := sdk.NewAddressFromRaw("VD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54")
if err != nil {
  panic(err)
}

transferTransaction, err := client.NewTransferTransaction(sdk.NewDeadline(time.Hour), address, []*sdk.Mosaic{aliasedMosaic}, sdk.NewPlainMessage("Test aliased mosaic"))
if err != nil {
  panic(err)
}

account, err := client.NewAccountFromPrivateKey(os.Getenv("PRIVATE_KEY"))
if err != nil {
  panic(err)
}

signedTransaction, err := account.Sign(transferTransaction)
if err != nil {
    panic(err)
}

fmt.Println("Transaction hash:", signedTransaction.Hash)
```
<!--END_DOCUSAURUS_CODE_TABS-->

3. Announce the transfer transaction, and wait until it is confirmed.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
_, err = client.Transaction.Announce(context.Background(), signedTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

4. Then, retrieve the receipts attached to the block where the receipt was confirmed.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
// TBD
```
<!--END_DOCUSAURUS_CODE_TABS-->

The previous snippet outputs the resolved mosaic identifier for the namespace `xpx` and the transaction you have just sent.

```
Resolved MosaicId:  0dc67fbe1cad29e3
PrimaryId:  1
SecondaryId:  0
```

It is technically possible to get more than one `resolutionEntry` for the same `namespaceId`. This situation is common when a namespace owner changes the link to another mosaic, leading to two different resolutions in the same block.

The receipt source `primaryId` references the transaction where the alias first appears within the block. The `secondaryId` is a non 0 when the transaction is part of an [aggregate transaction](../../built-in-features/aggregate-transaction.md), and it will indicate the index position within the aggregate.

## What is next?

Receipts do not only store resolutions for aliases, but also every invisible state change that is not directly retrievable from transactions or the block header. You can check under the [receipts documentation](../../protocol/receipt.md) for the complete list of changes logged.

