---
id: mosaic
title: Mosaic
---
Mosaics are part of what makes the Smart Asset System unique and flexible. They are **fixed assets** on the Sirius Chain that can represent a set of multiple identical assets that do not change.

A mosaic could be a token, but it could also be a collection of more specialized assets such as reward points, shares of stock, signatures, status flags, votes or even other currencies.

Each mosaic has a set of configurable properties. During the mosaic creation, you can define:

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
Divisibility |	Integer |	Determines up to what decimal place the mosaic can be divided. Divisibility of 3 means that a mosaic can be divided into smallest parts of 0.001 mosaics. The divisibility must be in the range of 0 and `6`.
Duration |	Integer |	Specifies the number of confirmed blocks the mosaic is rented for. Mosaics can be configured to not expire.
Initial supply |	Integer |	Indicates the amount of mosaic in circulation. The initial supply must be in the range of 0 and `9,000,000,000`.
Supply mutable |	Boolean |	If set to true, the mosaic supply can change at a later point. Otherwise, the mosaic supply remains immutable.
Transferability |	Boolean |	If set to true, the mosaic can be transferred between arbitrary accounts. Otherwise, the mosaic can be only transferred back to the mosaic creator.

## Guides in Using Mosaics

<div class=info>

**Note:**

We recommend checking out [setting up your workstation][Workstation] before going through the guides.

</div>

- [Creating a mosaic](../guides/mosaic/creating-a-mosaic.md)

    How to create a mosaic after creating a namespace.

- [Modifying mosaic supply](../guides/mosaic/modifying-mosaic-supply.md)

    How to increase or decrease the mosaic after registering a mosaic with supply Mutable option set to true. 

## Schemas

<div class="info">

**Note:**

Configuration parameters are [editable](https://github.com/proximax-storage/catapult-server/blob/master/resources/config-network.properties) . Public network configuration may differ.

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
0x04 |	The mosaic levy is mutable

### MosaicSupplyChangeDirection

Enumeration: uint8

**Id** | **Description**
------|----------------------
0 |	Increase.
1 |	Decrease.

[Workstation]: ../getting-started/setting-up-workstation.md