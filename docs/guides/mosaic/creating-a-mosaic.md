---
id: creating-a-mosaic
title: Creating a mosaic (SDA)
---

Follow this guide to create a [mosaic (SDA)](../../built-in-features/mosaic.md).

## Background

A mosaic is synonomously known as Sirius Digital Asset - SDA - are used interchangeably. SDAs can be used to represent any asset in the blockchain such as objects, tickets, coupons, stock share representation, and even your cryptocurrency.

## Prerequisites

- Finish [registering a namespace guide](../namespace/registering-a-namespace.md).
- Have an `account` with `XPX`.
- XPX-Chain-SDK or XPX-Chain-CLI.
- A text editor or IDE.
- An account with XPX and at least one namespace.

## Getting into some code

Define two transactions to create an SDA:

1. An [SDA definition transaction](../../built-in-features/mosaic.md#mosaicdefinitiontransaction), to create the SDA, with the following properties:

**Property**   |**Value**|**Description**
---------------|---------|---------------
Divisibility   |0        | The SDA won’t be divisible. Determines up to what decimal place the mosaic can be divided.
Duration       |1000     | The SDA will be created for the next 1000 blocks. If you want to create a non-expiring SDA, do not set this property.
Supply mutable |true     | The SDA supply can change at a later point.
Transferable   |true     | The SDA can be transferred between arbitrary accounts. Otherwise, the SDA can only be transferred back to the SDA creator.

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

<!--JavaScript-->
```js
    const nodeURL = "http://bctestnet1.brimstone.xpxsirius.io:3000";

    const transactionHttp = new TransactionHttp(nodeURL);

    var mosaicDuration = (1 * 365 * 24 * 60 * 4 ); // 1 year - 15 sec per block 

    const privateKey = process.env.PRIVATE_KEY;
    const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

    const nonce = MosaicNonce.createRandom();
    var mosaicId = MosaicId.createFromNonce(nonce, account.publicAccount);

    const mosaicDefinitionTransaction = MosaicDefinitionTransaction.create(
        Deadline.create(),
        nonce,
        mosaicId,
        MosaicProperties.create({
            supplyMutable: true,
            transferable: true,
            divisibility: 0,
            duration: UInt64.fromUint(mosaicDuration),
        }),
        NetworkType.TEST_NET
    )
```

<!--END_DOCUSAURUS_CODE_TABS-->

2. An [SDA supply change transaction](../../built-in-features/mosaic.md#mosaicsupplychangetransaction), to set the supply. We are going to create 1.000.000 SDA units.

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

<!--JavaScript-->
```js
const mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
    Deadline.create(),
    mosaicId,
    MosaicSupplyType.Increase,
    UInt64.fromUint(1000000),
    NetworkType.TEST_NET
);
```

<!--END_DOCUSAURUS_CODE_TABS-->
<div class=info>

**Note:**

Sirius Chain mainly works with absolute amounts. To get an absolute amount, multiply the amount of assets you want to create by power of 10 with divisibility as exponent. For example, if the mosaic has a divisibility of 2, to create 10 units (relative) you should define 1000 (absolute) instead.

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

<!--JavaScript-->
```js
const aggregateTransaction = AggregateTransaction.createComplete(
        Deadline.create(),
        [
            mosaicDefinitionTransaction.toAggregate(account.publicAccount),
            mosaicSupplyChangeTransaction.toAggregate(account.publicAccount)
        ],
        NetworkType.TEST_NET,
        []);

```
<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

[Transfer](../transaction/sending-a-transfer-transaction.md) one mosaic created to another account or modify its properties following the next guide.

