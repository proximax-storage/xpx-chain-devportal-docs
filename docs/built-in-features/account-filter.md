---
id: account-filter
title: Account filter
---

[Accounts][Account] may configure a set of smart rules to block announcing or receiving transactions given a series of constraints.

The editable on-chain constraints are called filters.

Accounts can configure the following types:
<ul>
<li>Address Filter<li>
<li>Mosaic Filter<li>
<li>Entity Type Filter<li>
</ul>

## Address Filter

An account can decide to receive transactions only from an allowed list of [addresses][Account]. Similarly, an account can specify a list of addresses from which it does not want to receive transactions.

![Account Properties Address](/img/account-properties-address.png "Account Properties Address")

<p class="caption">Address filter diagram</p>

<div class="info">

**Note:**

Allow and block filters are mutually exclusive. In other words, an account can only configure a block or an allow list per type of filter.

</div>

By default, when there is no filter set, all the accounts in the network can announce transactions to the stated account.

## Mosaic Filter

An account can configure a filter to permit incoming transactions only if all the [mosaics][Mosaic] attached are allowed. On the other hand, the account can refuse to accept transactions containing a mosaic listed as blocked.

## EntityType Filter

An account can allow or block announcing outgoing transactions with a [determined type][Transaction-type]. By doing so, it increases its security, preventing the announcement by mistake of undesired transactions.

## Examples

## Blocking Spam Transactions

A company is using the public chain to certify the quality of their products.

When the quality verification process concludes, an operator sends a [quality seal][Mosaic] to the product account.

The customers can review the product mosaics by scanning a QR code. In this way, the company only wants to show related transactions, avoiding others to spam their products with non-related information.

![Account Properties Spam](/img/account-properties-spam.png "Account Properties Spam")

The company opt to configure their product accounts filters in order to enable only receiving transactions containing company quality sealed mosaics.

## Enhancing Account Security

To enhance security, a multisig account can be used instead of a single account. This would require more than one user to sign-off before a transaction can be executed. 

## Schemas

<div class="info">

**Note:**

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
