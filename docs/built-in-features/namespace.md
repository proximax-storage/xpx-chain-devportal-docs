---
id: namespace
title: Namespace
---
Namespaces allow you to create an on-chain **unique place** for your business and your assets on the Sirius Chain.

A namespace starts with a name that you choose, similar to an internet domain name. If one [account](./account.md) creates a namespace, that will appear as unique in the Sirius Chain ecosystem.

You can associate a name with an account address or a [mosaic](./mosaic.md) identifier by announcing an [alias transaction](#addressaliastransaction). What binds namespaces and assets are called "long account addresses" and recognizable "mosaics identifiers."

## Subnamespaces

In the internet, a domain name can have a sub-domain name. In Sirius Chain, namespaces can have subnamespaces.

It is possible to create multiple subnamespaces with the same name. For example, if a domain name is `foo.bar` and another domain name is `foo2.bar`, the `bar` is the sub-domain. Namespaces can have up to three levels, which consists of a namespace and two levels of subnamespace domains.

Namespaces can have up to `3` levels, a namespace and its two levels of subnamespace domains.

## Examples of Namespaces
## Identifying an account

Every time a customer buys a ticket for an event, the ticket sales company sends a ticket to the customer account.

The seller company has assigned the namespace “ticketsales” to its vendo account. Customers can quickly recognize incoming transactions from the vendor account.

## Organizing mosaics

A distributor sells tickets for an event organized in different venues. The distributing company registers a non-transferable mosaic for each function. 

Namespaces and subnamespaces are used to organize the different mosaics. 

## Guides on Namespaces 

- [Registering a namespace](../guides/namespace/registering-a-namespace.md)

    How to register your own namespace.

- [Registering a subnamespace](../guides/namespace/registering-a-subnamespace.md)

    How to register a subnamespace.

## Schemas

<div class="info">

**Note:**

Configuration parameters are [editable](https://github.com/proximax-storage/catapult-server/blob/master/resources/config-network.properties) . Public network configuration may differ.

</div>

### Register Namespace Transaction

Announce a register namespace transaction to register and rent a namespace again.

**Version**: 0x02

**Entity type**: 0x414E

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
namespaceType |	[NamespaceType](#namespacetype) |	The type of the registered namespace.
duration | uint64 |	The renting duration represents the number of confirmed blocks we would like to rent our namespace for. During the renting period, it is possible to extend the rental by sending a [register namespace transaction](#registernamespacetransaction) with the extra-confirmed block to rent the namespace. When a renting period ends, the namespace will become inactive.
parentId |	uint64 |	If it is a subdomain, a reference to parent namespace name is required.
namespaceId |	uint64 |	The id of the namespace.
namespaceNameSize |	uint8 |	The size of the namespace name.
name |	array(bytes, namespaceNameSize) |	A namespace name must be unique and may have a maximum length of `64` characters. Allowed characters are a, b, c, …, z, 0, 1, 2, …, 9, ‘, _ , -.

### AddressAliasTransaction

Announce an alias transaction to attach a namespace to an account. A namespace can be assigned to any account present in the network.

**Version**: 0x01

**Entity type**: 0x424E

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
aliasAction |	[AliasAction](#alias-action) |	The alias action.
namespaceId |	uint64 |	The id of the namespace that will become an alias.
address |	25 bytes (binary) |	The aliased address.

### MosaicAliasTransaction

Announce an alias transaction to attach a namespace to a mosaic. Setting an alias to a mosaic is only possible if the account announcing the transaction has created the namespace and mosaic involved.

**Version**: 0x01

**Entity type**: 0x434E

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)


**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
aliasAction |	[AliasAction](#alias-action) |	The alias action.
namespaceId |	uint64 |	The id of the namespace that will become an alias.
mosaicId |	uint64 |	The aliased mosaic id.

### NamespaceType

Enumeration: uint8

**Id** |	**Description**
-------|-------------------
0 |	Root namespace.
1 |	Child namespace.

### Alias Action

Enumeration: uint8

**Id** |	**Description**
-------|-------------------
0 |	Link alias.
1 |	Unlink alias.