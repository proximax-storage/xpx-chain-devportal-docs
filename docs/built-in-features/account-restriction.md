---
id: account-restriction
title: Account restriction
---

[Accounts](./account.md) may configure a set of smart rules to block announcing or receiving transactions given a series of restrictions.

The account owners - plural in case of multisig accounts - can edit the account restrictions at a later time announcing the specific [account restriction transaction](./account-restriction.md#account-address-restriction-transaction).

## Address restrictions

An account can decide to **receive** transactions only from an allowed list of [addresses](./account.md). Similarly, the account can define a list of blocked addresses.

![Account Properties Address](/img/account-properties-address.png "Account Properties Address")

<p class="caption">Address restriction diagram</p>

<div class="info">

**Note**

Allow and block restrictions are mutually exclusive. In other words, an account can only configure a block or an allow list per type of restriction.

</div>

By default, when there are no restrictions set, all the accounts in the network can announce transactions to the unrestricted account.

## Mosaic restriction

An account can configure a filter to permit **incoming** transactions only if all the [mosaics](./mosaic.md) attached are allowed. On the other hand, the account can refuse to accept transactions containing a mosaic listed as blocked.

## Operation restriction

An account can allow/block announcing **outgoing** transactions with a [determined type](../protocol/transaction.md). By doing so, it increases its security, preventing the announcement by mistake of undesired transactions.

## Examples

## Blocking spam transactions

A pharmaceutical company is using the public chain to certify the quality of their products.

When the quality verification process concludes, an operator sends a [quality seal](./mosaic.md) to the product account.

The final customers can review the product mosaics scanning a QR code. For that reason, the company only wants to show related transactions, avoiding that others spam their products with non-related information.

![Account Properties Spam](/img/account-properties-spam.png "Account Properties Spam")

<p class="caption">Blocking spam transactions</p>

The company opts to configure their product accounts filters, enabling only to receive transactions containing `pharmaceutical.quality.seal` mosaics.

## Enhancing the account security

Lately, Alice is only using her main account to cosign aggregate transactions where a [multisig]( ./multisig-account.md ) she is a cosignatory is involved.

As a temporary security measure, Alice opts to disable announcing transfer transactions from her main account. Doing so, Alice double-checks that the funds held in the main account are not going to be transferred by mistake.

## Guides

- [Preventing spam attacks with account restrictions](../guides/account-restriction/preventing-spam-attacks.md)

    Send transactions to different accounts atomically, using an aggregate complete transaction.


## Schemas

<div class="info">

**Note**

Configuration parameters are [editable][Server-configurable] . Public network configuration may differ.

</div>

### AccountPropertiesAddressTransaction

Configure filters to prevent receiving transactions from undesired addresses.

**Version**: 0x01

**Entity type**: 0x4150

**Inlines**:

- [Transaction][Transaction] or [EmbeddedTransaction][EmbeddedTransaction]

**Property** |	**Type** |	**Description**
-------------|-----------|-------------------
propertyType |	[PropertyType](#propertytype) |	The property type.
modificationsCount |	uint8 |	The number of modifications.
modifications |	array([AddressModification](#addressmodification), modificationsCount) |	The array of modifications.

### AccountPropertiesMosaicTransaction

Configure filters to prevent receiving transactions containing a specific mosaic.

**Version**: 0x01

**Entity type**: 0x4250

**Inlines**:

- [Transaction][Transaction] or [EmbeddedTransaction][EmbeddedTransaction]

**Property** |	**Type** |	**Description**
-------------|-----------|-------------------
propertyType |	[PropertyType](#propertytype) |	The property type.
modificationsCount |	uint8 |	The number of modifications.
modifications |	array([MosaicModification](#mosaicmodification), modificationsCount) |	The array of modifications.

### AccountPropertiesEntityTypeTransaction

Configure filters to prevent announcing transactions by type.

**Version**: 0x01

**Entity type**: 0x4350

**Inlines**:

- [Transaction][Transaction] or [EmbeddedTransaction][EmbeddedTransaction]

**Property** |	**Type** |	**Description**
-------------|-----------|-------------------
propertyType |	[PropertyType](#propertytype) |	The property type.
modificationsCount |	uint8 |	The number of modifications.
modifications |	array([EntityTypeModification](#entitytypemodification), modificationsCount) |	The array of modifications.

### AddressModification

**Inlines**:

- [AccountPropertiesModification](#accountpropertiesmodification)

**Property** |	**Type** |	**Description**
-------------|-----------|-------------------
value |	25 bytes (binary) |	The address to allow/block.

### MosaicModification

**Inlines**:

- [AccountPropertiesModification](#accountpropertiesmodification)

**Property** |	**Type** |	**Description**
-------------|-----------|-------------------
value |	uint64 |	The mosaic id to allow/block.

### EntityTypeModification

**Inlines**:

- [AccountPropertiesModification](#accountpropertiesmodification)

**Property** |	**Type** |	**Description**
-------------|-----------|-------------------
value |	uint16 	| The [entity type][Transaction-type] to allow/block.

### AccountPropertiesModification

**Property** |	**Type** |	**Description**
-------------|-----------|-------------------
modificationType |	[PropertyModificationType](#propertymodificationtype) |	The modification type.

### PropertyType

Enumeration: uint8
**Id**  |	**Description**
--------|------------------
0x01 |	The property type is an address.
0x02 |	The property type is mosaic id.
0x03 |	The property type is a transaction type.
0x04 |	Property type sentinel.
0x80 + type |	The property is interpreted as a blocking operation.

### PropertyModificationType

Enumeration: uint8

**Id**  |	**Description**
--------|------------------
0x00 |	Add property value.
0x01 |	Remove property value.

[EmbeddedTransaction]: ../protocol/transaction.md#embeddedtransaction
[Transaction]: ../protocol/transaction.md#transaction
[Transaction-type]: ../protocol/transaction.md#transaction-types
[Account]: ./account.md
[Mosaic]: ./mosaic.md
[Server-configurable]: https://github.com/proximax-storage/catapult-server/blob/master/resources/config-network.properties
[Multisig]: ./multisig-account.md
