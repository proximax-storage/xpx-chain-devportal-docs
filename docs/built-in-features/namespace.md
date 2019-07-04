---
id: namespace
title: Namespace
---
Namespaces allow you to create an on-chain **unique place** for your business and your assets on the Sirius-Chain.

A namespace starts with a name that you choose, similar to an internet domain name. If one [account](./account.md) creates a namespace, that will appear as unique in the Sirius-Chain ecosystem.

You can associate a name with an account address or a [mosaic](./mosaic.md) identifier by announcing an [alias transaction](#addressaliastransaction). The binding between namespaces and assets makes long account addresses rememberable and mosaics identifiers recognisable.

## Subnamespaces

On the internet, a domain can have a sub-domain. In Sirius-Chain, namespaces can have subnamespaces.

It is possible to create multiple subnamespaces with the same name (example: `foo.bar` and `foo2.bar`, `bar` is the subnamespace/sub-domain).

Namespaces can have up to `3` levels, a namespace and its two levels of subnamespace domains.

## Examples
## Identifying an account

Every time a customer buys a ticket for an event, a ticket sales company sends a ticket to the customer account.

The seller company has assigned the namespace “ticketsales” to its main account. Customers can quickly recognise incoming transactions from the vendor account.

## Organising mosaics

The same distributor sells tickets for an event organised in different venues. The company registers a non-transferable mosaic for each function.

Namespaces and subnamespaces are used to organise the different mosaics. Customers can send 1 `ticketsales.eventname.ticket` to `alice` instead of 1 `0xE4EEB491` to `SCVG35-ZSPMYP-L2POZQ-JGSVEG-RYOJ3V-BNIU3U-N2E6`.

## Guides

- [Registering a namespace](../guides/namespace/registering-a-namespace.md)

    Rregister your own namespace.

- [Registering a subnamespace](../guides/namespace/registering-a-subnamespace.md)

    Register a subnamespace following this guide.

## Schemas

<div class="info">

**Note**

Configuration parameters are [editable](https://github.com/proximax-storage/catapult-server/blob/master/resources/config-network.properties) . Public network configuration may differ.

</div>

### RegisterNamespaceTransaction

Announce a register namespace transaction to register and re-rent a namespace.

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