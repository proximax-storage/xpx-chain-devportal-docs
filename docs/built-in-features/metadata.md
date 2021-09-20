---
id: metadata
title: Metadata
---

Sirius Chain provides you with an option to associate metadata to an [account](./account.md), [mosaic](./mosaic.md) or [namespace](./namespace.md) with a transaction.

The most common uses of metadata are:

- Attach relevant information to your assets.
- Validate the value attached to an asset to enable users in your application to perform an off-chain action.

Metadata is uniquely identified by the tuple `{ signer, target-id, metadata-key }`. Including a signer in this composite identifier allows multiple accounts to specify the same metadata without conflict.

The value linked to an identifier is a string up to `1024` characters. The client application is responsible for encrypting the message or keeping it visible for every blockchain participant.

## Persistence

Metadata entries are stored in the blockchain—like the message of a regular [TransferTransaction](./transfer-transaction.md) — but also as a `key-value state`.

This feature reduces the reading time of client applications; metadata allows information to be accessed by keys instead of processing the entire account transaction history off-chain to obtain the latest transaction message value.

## Permissions

The account, namespace or mosaic owner must `opt-in` to all metadata requests received by giving explicit permission. In practice, this means that all MetadataTransactions must be wrapped in an AggregateTransaction.

The target account should cosign the aggregate to record the metadata on the blockchain and update the asset state.

## Examples

### Adding a certificate to an account

![Metadata used to attach relevant information to an asset](/img/metadata-certificate.png "Metadata used to attach relevant information to an asset")

<p class=caption>Metadata used to attach relevant information to an asset</p>

Bob works as a digital notary that stamp accounts on the Sirius Chain. When a customer comes to Bob to notarize a document, he checks the authentication of the customer’s documents then `tags the account with a MetadataTransaction`.

Alice a recent graduate and wants her educational certificate accredited to her Sirius Chain account to avoid the hassle of repeatedly providing verification of her degree. So she goes to Bob and provides him with proof of her degree. Once Alice pays Bob a fee, Bob verifies the authenticity and stamps Alice’s account with metadata that signifies her degree.

### Access management

![Validating metadata to restrict performing an off-chain action](/img/metadata-access-control.png "Validating metadata to restrict performing an off-chain action")

<p class=caption>Validating metadata to restrict performing an off-chain action</p>

The HR department of the SneakersCompany uses the Sirius Chain for `access management` of sensitive work resources. Each account is tagged with the metadata that regulates its access to the company apps suite.

When a new employee, Carol, is hired, the HR department creates a new work account for her. For security reasons, HR sets the metadata of the account to `{company, ACCESS, 9-18}`.

Each time Carol attempts to access the company apps suite, the company app validates that Carol has permission and that the time falls under 9:00-18:00 before granting her admission.

On the other hand, if Derek, who has no permissions, attempts to access the company apps suite, the company app will reject his request.

## Related transactions

| **Id** | **Type**                     | **Description**                             |
| ------ | ---------------------------- | ------------------------------------------- |
| 0x413f | AccountMetadataTransaction   | Associate a key-value state to an account.  |
| 0x423f | MosaicMetadataTransaction    | Associate a key-value state to a mosaic.    |
| 0x433f | NamespaceMetadataTransaction | Associate a key-value state to a namespace. |

## Guides

### Address

Since Address usually represents entities from the real world, it can be useful to attach some extra information to the address. 

[Guides on account metadata](../guides/metadata-nem/account-nem-metadata.md)

[Guides on deprecated account metadata](../guides/metadata/account-metadata.md)

### Mosaic

For Mosaic, metadata could be used to share where users can obtain or exchange an asset.

[Guides on mosaic metadata](../guides/metadata-nem/mosaic-nem-metadata.md)

[Guides on deprecated mosaic metadata](../guides/metadata/mosaic-metadata.md)

### Namespace

If users own a namespace, they can attach extra details with metadata for their own namespace.

[Guides on namespace metadata](../guides/metadata-nem/namespace-nem-metadata.md)

[Guides on deprecated namespace metadata](../guides/metadata/namespace-metadata.md)

## Schemas

### BasicMetadataTransactionBody

| **Property**   | **Type** | **Description**                           |
| -------------- | -------- | ----------------------------------------- |
| ValueSizeDelta | int16    | Difference between old and new value size |
| ValueSize      | uint16   | Value size                                |
| Value          | uint8    | Value                                     |

### AccountMetadataTransaction

**Version**: 0x01

**Entity type**: 0x413f

| **Property**                                                  | **Type**                     | **Description** |
| ------------------------------------------------------------- | ---------------------------- | --------------- |
| [BasicMetadataTransactionBody](#basicmetadatatransactionbody) | BasicMetadataTransactionBody |                 |

### MosaicMetadataTransaction

**Version**: 0x01

**Entity type**: 0x423f

| **Property**                                                  | **Type**                     | **Description**               |
| ------------------------------------------------------------- | ---------------------------- | ----------------------------- |
| [BasicMetadataTransactionBody](#basicmetadatatransactionbody) | BasicMetadataTransactionBody |                               |
| MosaicId                                                      | uint64                       | The id of the affected mosaic |

### NamespaceMetadataTransaction

**Version**: 0x01

**Entity type**: 0x433f

| **Property**                                                  | **Type**                     | **Description**         |
| ------------------------------------------------------------- | ---------------------------- | ----------------------- |
| [BasicMetadataTransactionBody](#basicmetadatatransactionbody) | BasicMetadataTransactionBody |                         |
| NamespaceId                                                   | uint64                       | The id of the namespace |

### MetadataType

| **Id** | **Type**  |
| ------ | --------- |
| 0x00   | Address   |
| 0x01   | Mosaic    |
| 0x02   | Namespace |

[Embedded-transactionSchema](../protocol/transaction#embeddedtransaction)

[TransactionSchema](../protocol/transaction#transaction)
