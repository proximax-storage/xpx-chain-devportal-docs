---
id: receipt
title: Receipt
---
Conditional state changes in the background enable complex transactions.

For example, a [hash lock](../built-in-features/aggregate-transaction.md#hashlocktransaction) concludes as soon as the [aggregate bonded transaction](../built-in-features/aggregate-transaction.md) is confirmed. When the locked funds are automatically returned to the account, there is no additional [transaction](./transaction.md) recorded. This might appear as a hidden change that increases the [account](../built-in-features/account.md) balance. Receipts provide proof for every hidden change.

The collection of receipts are hashed into a [merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) and linked to a [block](./block.md). The block header stores the root hash, which is different from zero when the block has receipts.

## Transaction statement

A [transaction statement](./receipt.md) is a collection of receipts linked with a transaction in a particular block. Statements can include receipts with the following basic types:

- **Balance Transfer**: A mosaic transfer was triggered.
- **Balance Change**: A mosaic credit or debit was triggered.
- **Artifact Expiry**: An artifact (e.g. [namespace](../built-in-features/namespace.md), [mosaic](../built-in-features/mosaic.md)) expired.
- **Inflation Receipt**: Native currency mosaics were created due to [inflation][inflation].

## Alias resolution

When a transaction includes an [alias](../built-in-features/namespace.md), a so called [resolution statement](#resolutionstatement) reflects the resolved value for that block:

- **Address Resolution**: An account alias was used in the block.
- **Mosaic Resolution**: A mosaic alias was used in the block.

The alias receipts record the first occurrence of an (unresolved, resolved) alias pair used in a block.

## Recorded receipts

Sirius-Chain records invisible state changes for the following entities.

**Id** | 	**Receipt** |	**Type** |	**Description**
-------|----------------|------------|-------------------
**Core**  |  | |  |
0x2143 |	Validate_Fee |	[BalanceCredit](#balancechangereceipt) |	The recipient, account and amount of fees received for validating a block. It is recorded when a block is [validated](./validating.md).
0x5143 | Inflation | [Inflation](#inflationreceipt) | The amount of native currency mosaics created. The receipt is recorded when the network has inflation configured, and a new block triggers the creation of currency mosaics.
0xF143 |	Address_Alias_Resolution |	[Alias Resolution](#resolutionstatement) |	It is the unresolved and resolved [alias](../built-in-features/namespace.md). It is recorded when a transaction indicates a valid address alias instead of an address.
0xF243 |	Mosaic_Alias_Resolution |	[Alias Resolution](#resolutionstatement) |	It is the unresolved and resolved alias. It is recorded when a transaction indicates a valid mosaic alias instead of a mosaicId.
0xE143 |	Transaction_Group |	[Aggregate](#transactionstatement) |	A collection of state changes for a given source. It is recorded when a state change receipt is issued.
**Mosaic**	  	||||  	 
0x414D |	Mosaic_Expired |	[ArtifactExpiry](#artifactexpiryreceipt) |	The mosaicId expiring in this block. It is recorded when a [mosaic](../built-in-features/mosaic.md) expires.
0x124D |	Mosaic_Levy |	[BalanceTransfer](#balancetransferreceipt) |	The sender and recipient of the levied mosaic, the mosaicId and amount. It is recorded when a transaction has a levied mosaic.
0x134D |	Mosaic_Rental_Fee |	[BalanceTransfer](#balancetransferreceipt) |	The sender and recipient of the mosaicId and amount representing the cost of registering the mosaic. It is recorded when a mosaic is registered.
**Namespace** 	  	 |||| 	 
0x414E |	Namespace_Expired |	[ArtifactExpiry](#artifactexpiryreceipt) |	It is the namespaceId expiring in this block. It is recorded when a [namespace](../built-in-features/namespace.md) expires.
0x124E |	Namespace_Rental_Fee |	[BalanceTransfer](#balancetransferreceipt) |	The sender and recipient of the mosaicId and amount representing the cost of extending the namespace. It is recorded when a namespace is registered or its duration is extended.
**HashLock** 	||||  	  	 
0x3148 |	LockHash_Created |	[BalanceDebit](#balancetransferreceipt) |	It is the lockhash sender, mosaicId and amount locked. It is recorded when a valid [HashLockTransaction](../built-in-features/aggregate-transaction.md#hashlocktransaction) is announced.
0x2248 |	LockHash_Completed |	[BalanceCredit](#balancechangereceipt) |	It is the haslock sender, mosaicId and amount locked that is returned. It is recorded when an aggregate bonded transaction linked to the hash completes.
0x2348 |	LockHash_Expired |	[BalanceCredit](#balancechangereceipt) |	It is the account receiving the locked mosaic, the mosaicId and the amount. It is recorded when a lock hash expires.
**SecretLock** 	  	 |||| 	 
0x3152 |	LockSecret_Created |	[BalanceDebit](#balancetransferreceipt) |	It is the secretlock sender, mosaicId and amount locked. It is recorded when a valid [SecretLockTransaction](../built-in-features/cross-chain-swaps.md#secretlocktransaction) is announced.
0x2252 |	LockSecret_Completed |	[BalanceCredit](#balancechangereceipt) |	It is the secretlock sender, mosaicId and amount locked. It is recorded when a secretlock is proved.
0x2352 |	LockSecret_Expired |	[BalanceCredit](#balancechangereceipt) |	It is the account receiving the locked mosaic, the mosaicId and the amount. It is recorded when a secretlock expires.


## Schemas

### Receipt

**Inlines**:

- [SizePrefixedEntity](./transaction.md#sizeprefixedentity)

**Property** |	**Type** |	**Description**
-------------|-----------|------------------
version |	uint16 |	The receipt version.
type |	ReceiptType |	The receipt type.

### TransactionStatement

- **version**: 0x1
- **type**: Transaction_Group

**Inlines**:

- [Receipt](#receipt)

**Property** |	**Type** |	**Description**
-------------|-----------|------------------
m_source |	ReceiptSource |	The receipt source.
receipts |	array(ReceiptHeader, receiptsHeadersSize) |	The array of receipt headers.

### ResolutionStatement

- **version**: 0x1
- **type**: Address_Alias_Resolution or Mosaic_Alias_Resolution

**Inlines**:

- [Receipt](#receipt)

**Property** |	**Type** |	**Description**
-------------|-----------|------------------
unresolved |	25 bytes (binary) or uint64 |	An unresolved address or unresolved mosaicId.
m_entries |	array([ResolutionEntry](#resolutionentry), resolvedEntriesSize) |	The array of resolution entries.

### ResolutionEntry

**Property** |	**Type** |	**Description**
-------------|-----------|------------------
resolvedValue |	25 bytes (binary) or uint64 |	A resolved address or resolved mosaicId.
source | [ReceiptSource](#receiptsource) |	The receipt source.

### ReceiptSource

**Property** |	**Type** |	**Description**
-------------|-----------|------------------
primaryId |	uint32 	| The transaction primary source (e.g. index within block).
secondaryId |	uint32 	| The transaction secondary source (e.g. index within aggregate).

### BalanceTransferReceipt

- **version**: 0x1
- **basicType**: 0x1

**Inlines**:

- [Receipt](#receipt)

**Property** |	**Type** |	**Description**
-------------|-----------|------------------
sender |	32 bytes (binary) |	The public key of the sender.
recipient |	32 bytes (binary) |	The public key of the recipient.
mosaicId |	uint64 |	The mosaic id.
amount |	uint64 |	The amount of mosaics.

### BalanceChangeReceipt

- **version**: 0x1
- **basicType**: (0x2) credit or (0x3) debit

**Inlines**:

- [Receipt](#receipt)

**Property** |	**Type** |	**Description**
-------------|-----------|------------------
account |	32 bytes (binary) |	The target account public key.
mosaicId |	uint64 |	The mosaic id.
amount |	uint64 |	The amount of the mosaic.

### ArtifactExpiryReceipt

- **version**: 0x1
- **basicType**: 0x4

**Inlines**:

- [Receipt](#receipt)

**Property** |	**Type** |	**Description**
-------------|-----------|------------------
artifactId 	| uint64  |	The id of the artifact (eg. namespace, mosaic).

### InflationReceipt

- **version**: 0x1
- **basicType**: 0x5

**Inlines**:

- [Receipt](#receipt)

**Property** |	**Type** |	**Description**
-------------|-----------|------------------
mosaicId |	uint64 |	Identifier of the mosaic that has been created.
amount |	uint64 |	Number of mosaics created.

[inflation]: ./inflation.md