---
id: metadata
title: Metadata
---

Metadata is a way for storing custom data in a Sirius Chain.
Metadata can be added, updated and deleted for the following entities:

- Address - an account can add metadata to its own address
- Mosaic - an account can add metadata to a Mosaic it owns
- Namespace - an account can add metadata to a Namespace it owns

## Examples of Metadata

### Address

Since Address usually represents entities from the real world,
it can be useful to attach some extra information to the address. 

[Guides on account metadata](../guides/metadata/account-metadata.md)

### Mosaic

For Mosaic, metadata could be used to share where users can obtain or exchange an asset.

[Guides on mosaic metadata](../guides/metadata/mosaic-metadata.md)

### Namespace

If users own a namespace, they can attach extra details with metadata for their own namespace.

[Guides on namespace metadata](../guides/metadata/namespace-metadata.md)

## Schemas

### ModifyMetadataTransaction

Announce an modify metadata transaction to associate a key-value state to an account, mosaic or namespace.

**Version**: 0x01

**Entity type**| **Description**
---------------|-----------------
0x413D         | Modify account metadata
0x423D         | Modify mosaic metadata
0x433D         | Modify namespace metadata

Inlines:

- [Transaction][TransactionSchema] or [EmbeddedTransaction][Embedded-transactionSchema]

**Property** |	**Type** |	**Description**
-------------|-----------|---------------------
metadataType |	[MetadataType](#metadatatype) |	Type of the metadata to be associated.
metadataId |	string |	It can be plain address, mosaicId in hex and namespaceId in hex. Depend on the metadataType.
modifications |	array([MetadataModification](#metadatamodification)) |	Array of metadata modifications.

### MetadataType

**Id** |	**Type**
-------|---------------------
0 | None
1 | Address
2 | Mosaic
3 | Namespace

### MetadataModification

**Property** |	**Type** |	**Description**
-------------|-----------|---------------------
type |	[MetadataModificationType](#metadatamodificationtype) |	Type of the metadata modification.
key |	string |	Key of the metadata.
value |	string &#124; undefined | Value to be associate to the key.

### MetadataModificationType

**Id** |	**Type**
-------|---------------------
0 | Add
1 | Remove

[Embedded-transactionSchema]: ../protocol/transaction#embeddedtransaction
[TransactionSchema]: ../protocol/transaction#transaction



