---
id: creating-a-mosaic
title: Creating a mosaic
---

Follow this guide to create a [mosaic](../../built-in-features/mosaic.md).

## Background

Mosaics can be used to represent any asset in the blockchain such as objects, tickets, coupons, stock share representation, and even your cryptocurrency.

## Prerequisites

- Finish [registering a namespace guide](../namespace/registering-a-namespace.md)
- have an `account` with `xpx`
- XPX-Chain-SDK or XPX-Chain-CLI
- A text editor or IDE
- An account with XPX and at least one namespace

## Getting into some code

Define two transactions to create a mosaic:

1. A [mosaic definition transaction](../../built-in-features/mosaic.md#mosaicdefinitiontransaction), to create the mosaic, with the following properties:

**Property**   |**Value**|**Description**
---------------|---------|---------------
Divisibility   |0        | The mosaic won’t be divisible. Determines up to what decimal place the mosaic can be divided.
Duration       |1000     | The mosaic will be created for the next 1000 blocks. If you want to create a non-expiring mosaic, do not set this property.
Supply mutable |true     | The mosaic supply can change at a later point.
Transferable   |true     | The mosaic can be transferred between arbitrary accounts. Otherwise, the mosaic can be only transferred back to the mosaic creator.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
nonce := rand.New(rand.NewSource(time.Now().UTC().UnixNano())).Uint32()

mosaicDefinitionTrx, err := client.NewMosaicDefinitionTransaction(
    sdk.NewDeadline(time.Hour),
    nonce,
    account.PublicAccount.PublicKey,
    sdk.NewMosaicProperties(true, true, 0, sdk.Duration(1000)),
)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. A [mosaic supply change transaction](../../built-in-features/mosaic.md#mosaicsupplychangetransaction), to set the supply. We are going to create 1.000.000 mosaic units.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
mosaic, err := sdk.NewMosaicIdFromNonceAndOwner(nonce, account.PublicAccount.PublicKey)
if err != nil {
    panic(err)
}

mosaicSupplyChangeTrx, err := client.NewMosaicSupplyChangeTransaction(
    sdk.NewDeadline(time.Hour),
    mosaic,
    sdk.Increase,
    sdk.Amount(1000000),
)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->
<div class=info>

**Note:**

Sirius-Chain mainly works with absolute amounts. To get an absolute amount, multiply the amount of assets you want to create by 10divisibility. For example, if the mosaic has divisibility 2, to create 10 units (relative) you should define 1000 (absolute) instead.

</div>


3. Both transactions can be announced together using an [aggregate transaction](../../built-in-features/aggregate-transaction.md#examples).

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
// Convert an aggregate transaction to an inner transaction including transaction signer.
mosaicDefinitionTrx.ToAggregate(account.PublicAccount)
mosaicSupplyChangeTrx.ToAggregate(account.PublicAccount)

// Create an aggregate complete transaction
aggregateTransaction, err := client.NewCompleteAggregateTransaction(
    // The maximum amount of time to include the transaction in the blockchain.
    sdk.NewDeadline(time.Hour),
    // Inner transactions
    []sdk.Transaction{mosaicDefinitionTrx, mosaicSupplyChangeTrx,},
)
```
<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

[Transfer](../transaction/sending-a-transfer-transaction.md) one mosaic created to another account or modify its properties following the next guide.



