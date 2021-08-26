---
id: mosaic
title: Mosaic
---

Mosaics are part of what makes the Smart Asset System unique and flexible. They are *fixed assets* on the Sirius Chain that can represent a set of multiple identical things that do not change.

A mosaic could be a token, but it could also be a collection of more specialized assets such as reward points, shares of stock, signatures, status flags, votes or even other currencies.

## Properties

Each mosaic has a unique identifier and a set of configurable properties. During the [mosaic creation](../guides/mosaic/creating-a-mosaic.md), you can define:

**Property**    |**Type** |	**Description**
----------------|---------|--------------------
Divisibility    |	Integer |	Determines up to what decimal place the mosaic can be divided. Divisibility of 3 means that a mosaic can be divided into smallest parts of 0.001 mosaics. The divisibility must be in the range of `0` and `6`.
Duration        |	Integer |	Specifies the number of confirmed blocks the mosaic is rented for. Duration is allowed to lie up to `3650` days (10 years). To create non-expiring mosaics, leave this property undefined.
Supply mutable  |	Boolean |	If set to true, the mosaic supply can change at a later point. Otherwise, the mosaic supply remains immutable.
Transferability |	Boolean |	If set to true, the mosaic can be transferred between arbitrary accounts. Otherwise, the mosaic can be only transferred back to the mosaic creator.

## Absolute and relative amounts

Sirius Chain works with absolute amounts, removing the comma when the mosaic can be divisible. To get an absolute amount, multiply the amount of assets you want to create or send by ![](http://latex.codecogs.com/gif.latex?10^{divisibility}).

For example, if the mosaic has divisibility 2, to create or send 10 units (relative) you should define 1000 (absolute) instead.

## Cost

The cost of creating a mosaic is configurable per network. By default, it has a cost of `500 xpx` plus transaction fees.

## Mosaic Levy

A levy allows the creator of a mosaic to set a tax on any subsequent transactions of that mosaic. This levy is sent to an account of the creators choosing. Any mosaic may be used as a levy.

## Example
A private company, ComfyClothingCompany, decides that it wants to go public. Instead of a traditional IPO, the company decides to do an STO to issue tokens through the Sirius Chain platform.

Thus, the company must create a mosaic to represent shares to their company. Here is how the company might configure the mosaic properties:

 **Property**  | **Configuration**
---------------|------------------------------
Duration       | undefined
Divisibility   | 2
Supply mutable | true
Transferable   | true

*Duration*: Shares of the company should exist as long as the company is in business. The ComfyClothingCompany leaves this property *undefined*, creating a non-expiring mosaic representing their assets.

*Divisibility*: Although brokerages and investment firms can fractionalize shares, the traditional minimum number of shares an investor can purchase from the open market is 1.

However, Sirius Chain mosaics offer more flexibility in tokenizing their company shares. ComfyClothingCompany chooses the divisibility to be `2`, allowing the smallest fraction of their shares to be 0.01.

Fractional ownership, along with the ability to trade 24/7, brings additional liquidity to the market. These same characteristics also open up the market to smaller investors.

*Supply*: ComfyClothingCompany sets the initial supply of the mosaic to a typical startup amount of `10,000,000` authorized shares. As the company grows, it could choose to increase the number of shares, so the supply mutable is set to `true`.

*Transferable*: Once the initial shares are distributed, the shares will be on the market to be traded in public. Thus, the transferability property needs to be set to `true`.

## Tips 

<div class="info">

MosaicId is lower bracket of uint64, therefore the first mosaicId hex is represented by `00` to `7F`. 

Eg. All mosaicId hex will start from `00XXXXXXXXXXXXXX` to `7FXXXXXXXXXXXXXX`.

</div>

## Guides

<div class=info>

**Note:**

We recommend checking out [setting up your workstation][Workstation] before going through the guides.

</div>

- [Creating a mosaic](../guides/mosaic/creating-a-mosaic.md)
  After creating a namespace, follow this guide to create a mosaic.

- [Modifying mosaic supply](../guides/mosaic/modifying-mosaic-supply.md)
  Alter the supply of a mosaic following this guide.

- [Linking a namespace to a mosaic](../guides/namespace/linking-a-namespace-to-a-mosaic.md)
  Link a namespace to a mosaic.

- [Getting the mosaic information](../guides/mosaic/getting-mosaic-information.md)
  Get the ownership, divisibility, duration, and flags for a given mosaic identifier.

- [Getting the asset identifier behind a namespace with receipts](../guides/mosaic/getting-the-mosaic-indentifier-behind-a-namespace-with-receipts.md)
  Get the resolution for a given alias and transaction using receipts.

- [Create(modify) and get mosaic levy](../guides/mosaic/modify_mosaic_levy.md)
  Create a new levy for a mosaic and get a mosaic levy info.

- [Remove mosaic levy](../guides/mosaic/remove_mosaic_levy.md)
  Remove a mosaic lecy.

## Schemas

<div class="info">

**Note:**

Configuration parameters are [editable](https://github.com/proximax-storage/cpp-xpx-chain/blob/master/resources/config-network.properties) . Public network configuration may differ.

</div>

### MosaicDefinitionTransaction

Announce a mosaic definition transaction to create a new mosaic.

**Version**: 0x02

**Entity type**: 0x414D

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
mosaicNonce |	uint32 |	Random nonce used to generate the mosaic id.
mosaicId |	uint64 |	The mosaic Id.
propertiesCount |	uint8 |	The number of elements in optional properties
flags |	[MosaicFlag](#mosaicflags) |	The mosaic flags.
divisibility |	uint8 |	The mosaic divisibility.
properties |	array([MosaicProperty](#mosaicproperty), count) |	The optional mosaic properties.

### MosaicSupplyChangeTransaction

Announce a supply change transaction to increase or decrease a mosaic’s supply.

**Version**: 0x02

**Entity type**: 0x424D

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
mosaicId | uint64 |	The id of the affected mosaic.
direction |	[MosaicSupplyChangeDirection](#mosaicsupplychangedirection) |	The supply change direction.
delta |	uint64 |	The amount of supply to increase or decrease.

### MosaicProperty

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
id |	uint8 |	The property id. (0x02) stands for duration.
mosaicId |	uint64 |	The mosaic property value.

### Mosaic

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
mosaicId |	uint64 |	The mosaic id.
amount |	uint64 |	The amount of the mosaic.

### UnresolvedMosaic

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
mosaicId |	uint64 |	The mosaic id.
amount |	uint64 |	The amount of the mosaic.

### MosaicFlags

Enumeration: uint8

**Id** | **Description**
------|----------------------
0x00 |	No flags present.
0x01 |	The mosaic supply is mutable.
0x02 |	The mosaic is transferable.

### MosaicSupplyChangeDirection

Enumeration: uint8

**Id** | **Description**
------|----------------------
0 |	Increase.
1 |	Decrease.

[Workstation]: ../getting-started/setting-up-workstation.md
