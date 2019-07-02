---
id: transaction
title: Transaction
---
A transaction generally represents a unit of work within a database system. In the case of blockchain, that is when an action signed by an [account](../built-in-features/account.md) changes its state.

Transactions accepted by the network are stored permanently on [blocks](./block.md).

## Transaction Types

There are different types of transactions. For example, you can transfer [mosaics](../built-in-features/mosaic.md) between accounts, transfer or configure the ownership of accounts (including the use of [multisig](../built-in-features/multisig-account.md) rules), and more.

|**Id** | 	**Type** | **Description**|
|-------|-------------|----------------|
|**Mosaic** |  |  |
|0x414D | [Mosaic Definition Transaction](#mosaic-definition-transaction) | Register a new [mosaic](../built-in-features/mosaic.md).|
|0x424D | [Mosaic Supply Change Transaction](#mosaic-supply-change-transaction) | Change an existent mosaic supply.|
|**Namespace** |  | |
|0x414E |	[Register Namespace Transaction](#register-namespace-transaction) | Register a [namespace](../built-in-features/namespace.md) to organize your assets. |
|0x424E | [Address Alias Transaction](#address-alias-transaction) |	Attach a namespace name to an account.|
|0x434E | [Mosaic Alias Transaction](#mosaic-alias-transaction) |	Attach a namespace name to a mosaic.|
|**Transfer** | | |
|0x4154 | [Transfer Transaction](../built-in-features/transfer-transaction.md#transfertransaction) | Send mosaics and messages between two accounts.|
|**Multisignature** 	| | 	 |
|0x4155 |	[Modify Multisig Account Transaction](../built-in-features/multisig-account.md#modify-multisig-account-transaction) |	Create or modify a [multisig contract](../built-in-features/multisig-account.md).|
|0x4141 |	[Aggregate Complete Transaction](../built-in-features/aggregate-transaction.md) |	Send transactions in batches to different accounts.|
|0x4241 |	[Aggregate Bonded Transaction](../built-in-features/aggregate-transaction.md) |	Propose many transactions between different accounts.|
|0x4148 |	[Hash Lock Transaction](../built-in-features/aggregate-transaction.md#hashlocktransaction) | A deposit before announcing aggregate bonded transactions.|
|– |	[Cosignature Transaction](../built-in-features/aggregate-transaction.md#detachedcosignature) |	Cosign an aggregate bonded transaction.|
|**Account filters** |	 | 	 |
|0x4150 |	[Account Properties Address Transaction](../built-in-features/account-filter.md#accountpropertiesaddresstransaction) |	Allow or block incoming transactions for a given a set of addresses.|
|0x4250 |	[Account Properties Mosaic Transaction](../built-in-features/account-filter.md#accountpropertiesmosaictransaction) |	Allow or block incoming transactions containing a given set of mosaics.|
|0x4350 |	[Account Properties Entity Type Transaction](../built-in-features/account-filter.md#accountpropertiesentitytypetransaction) |	Allow or block outgoing transactions by transaction type.|
|**Cross-chain swaps** | | |	  	 
|0x4152 |	[Secret Lock Transaction](../built-in-features/cross-chain-swaps.md#secretlocktransaction)  |	Start a [token swap](../built-in-features/cross-chain-swaps.md) between different chains.|
|0x4252 |	[Secret Proof Transaction](../built-in-features/cross-chain-swaps.md#secretprooftransaction)  |	Conclude a token swap between different chains. |
|**Remote validating** | | |	  	 
|0x414C |	[Account Link Transaction](./validating.md#accountlinktransaction) |	Delegates the account importance to a proxy account to enable [delegated validating](./validating.md).|

## Defining a transaction

Every transaction shares some common properties. Each transaction extends from the [transaction schema definition](./transaction.md#transaction), adding the type’s particular properties.

Transactions are defined in a [serialized form](../rest-api/serialization.md). We recommend to [use the XPX-Chain-SDK to define](https://github.com/proximax-storage/proximax-bc-docs/blob/master/source/resources/examples/typescript/transaction/SendingATransferTransaction.ts#L30) transactions.

## Fees

Transactions have an associated cost. This cost is necessary to provide an incentive for the [validator](./validating.md) who secure the network and run the infrastructure.

The fee associated with a transaction primarily depends on the transaction’s size. The effective fee is the product of the size of the transaction, and a fee multiplier set by the validator. The node owner can configure the latter value to all positive values, including zero.

> effective_fee = transaction::size * block::fee_multiplier

A sender of a transaction must specify during the transaction definition a `max_fee`, meaning the maximum fee the account allows to spend for this transaction.

If the `effective_fee` is smaller or equal to the `max_fee`, the validator can opt to include the transaction in the block. The `fee_multiplier` is stored in the [block header](./block.md#blockheader), permitting to resolve which was the effective fee paid for every transaction included.

The validating nodes can decide their transaction inclusion strategy:

- **Prefer-oldest**: Preferred for networks with high transaction throughput requirements. Include first the oldest transactions.
- **Minimize-fees**: Philanthropic nodes. Include first transactions that other nodes do not want to include.
- **Maximize-fees**: Most common in public networks. Include first transactions with higher fees.

By default, the fee is paid in `XPX`, the underlying currency of the Sirius-Chain network. Private chains can edit the configuration of the network to eliminate fees, or use another [mosaic](../built-in-features/mosaic.md) that better suits their needs.

## Signing a transaction

Accounts must sign transactions before announcing them to the network. [Signing a transaction](https://github.com/proximax-storage/proximax-bc-docs/blob/master/source/resources/examples/typescript/transaction/SendingATransferTransaction.ts#L40) expresses the account’s agreement to change the network state as defined.

For example, a transfer transaction describes who is the recipient and the quantity of mosaics to transfer. In this case, signing the transaction means to accept moving those mosaics from one account’s balance to another.

The account generates the signature [signing the first 100 bytes of the defined transaction](https://github.com/proximax-storage/js-xpx-chain-library/blob/f171afb516a282f698081aea407339cfcd21cd63/src/transactions/VerifiableTransaction.js#L64) with its private key. Then, the signature is appended to the transaction’s body, resulting in a signed transaction.

The hash of the transaction is generated once [the sha3-256 algorithm](https://github.com/proximax-storage/js-xpx-chain-library/blob/f171afb516a282f698081aea407339cfcd21cd63/src/transactions/VerifiableTransaction.js#L76) is applied to the serialized transaction.

## Announcing a transaction

Signed transactions are ready to be announced to the network.

![Transaction Cycle](/img/transaction-cycle.png "Transaction Cycle")
<p class="caption">Transaction cycle</p>

After [announcing a transaction](https://github.com/proximax-storage/proximax-bc-docs/blob/master/source/resources/examples/typescript/transaction/SendingATransferTransaction.ts#L47), the REST API will always return an OK response immediately. At this point, it is still unknown whether the transaction is valid.

The first stage of validation happens in the API nodes. If the transaction presents some error, the WebSocket throws a notification through the status channel. In the positive case, the transaction reaches the P2P network with an **unconfirmed** status. Never rely on a transaction which has an unconfirmed state. It is not clear if it will get included in a block, as it should pass a second validation.

The second validation is done before the transaction is added in a validated block. If valid, the validator stores the transaction in a block, and it reaches the **confirmed** status.

Continuing the previous example, the transaction gets processed and the amount stated gets transferred from the signer’s account to the recipient’s account. Additionally, the transaction fee is deducted from the signer’s account.

The transaction has **zero confirmations** at this point. When another block is added to the blockchain, the transaction has one confirmation. The next block added to the chain will give it two confirmations and so on.

## Rollbacks

Blockchains are designed in a way that under certain circumstances recent blocks need to be rolled back. These are essential to resolve forks of the blockchain.

The “rewrite limit” is the maximum number of blocks that can be rolled back. Hence, forks can only be resolved up to a certain depth too.

Sirius-Chain has a rewrite limit of `360` blocks. Once a transaction has more than 360 confirmations, it cannot be reversed.

From experience, forks that are deeper than 20 blocks do not happen, unless there is a severe problem with the blockchain due to a bug in the code or an attack.

## Guides

- [Monitoring a transaction status](../guides/monitoring/monitoring-a-transaction-status.md)

    Make sure a transaction gets included in the blockchain after being announced.

## Schemas

### Transaction

Inlines:

- [SizePrefixedEntity](#sizeprefixedentity)
- [VerifiableEntity](./block.md#verifiableentity)
- [EntityBody](./block.md#entitybody)

**Property** | **Type** |	**Description**
-------------|----------|------------------
max_fee |	uint64 |	The maximum fee allowed to spend for the transaction.
deadline |	uint64 |	The maximum amount of time to include the transaction in the blockchain.

### EmbeddedTransaction

Inlines:

- [SizePrefixedEntity](#sizeprefixedentity)
- [EntityBody](./block.md#entitybody)

### SizePrefixedEntity

**Property** | **Type** |	**Description**
-------------|----------|------------------
size | unit32 |	The size of the transaction.