---
id: transaction
title: Transaction
---
A transaction generally represents a unit of work within a database system. In the case of blockchain, a transaction is when an action signed by an [account](../built-in-features/account.md) changes its state.

Transactions accepted by the network are stored permanently on [blocks](./block.md).

## Transaction Types

There are different types of transactions. For example, you can transfer [mosaics](../built-in-features/mosaic.md) between accounts, transfer or configure the ownership of accounts (including the use of [multisig](../built-in-features/multisig-account.md) rules), and more.

|**Id** | 	**Type** | **Description**|
|-------|-------------|----------------|
|**Mosaic** |  |  |
|0x414D | [Mosaic Definition Transaction](../built-in-features/mosaic.md#mosaicdefinitiontransaction) | Register a new [mosaic](../built-in-features/mosaic.md).|
|0x424D | [Mosaic Supply Change Transaction](../built-in-features/mosaic.md#mosaicsupplychangetransaction) | Change an existent mosaic supply.|
|**Namespace** |  | |
|0x414E |	[Register Namespace Transaction](../built-in-features/namespace.md#register-namespace-transaction) | Register a [namespace](../built-in-features/namespace.md) to organize your assets. |
|0x424E | [Address Alias Transaction](../built-in-features/namespace.md#addressaliastransaction) |	Attach a namespace name to an account.|
|0x434E | [Mosaic Alias Transaction](../built-in-features/namespace.md#mosaicaliastransaction) |	Attach a namespace name to a mosaic.|
|**Transfer** | | |
|0x4154 | [Transfer Transaction](../built-in-features/transfer-transaction.md#transfer-transaction) | Send mosaics and messages between two accounts.|
|**Multisignature** 	| | 	 |
|0x4155 |	[Modify Multisig Account Transaction](../built-in-features/multisig-account.md#modify-multisig-transaction) |	Create or modify a [multisig contract](../built-in-features/multisig-account.md).|
|0x4141 |	[Aggregate Complete Transaction](../built-in-features/aggregate-transaction.md#aggregate-complete) |	Send transactions in batches to different accounts.|
|0x4241 |	[Aggregate Bonded Transaction](../built-in-features/aggregate-transaction.md#aggregate-bonded) |	Propose many transactions between different accounts.|
|0x4148 |	[Hash Lock Transaction](../built-in-features/aggregate-transaction.md#hashlocktransaction) | A deposit before announcing aggregate bonded transactions.|
|– |	[Cosignature Transaction](../built-in-features/aggregate-transaction.md#detachedcosignature) |	Cosign an aggregate bonded transaction.|
|**Account restrictions** |	 | 	 |
|0x4150 |	[Account Properties Address Transaction](../built-in-features/account-restriction.md#accountaddressrestrictionmodificationtransaction) |	Allow or block incoming transactions for a given set of addresses.|
|0x4250 |	[Account Properties Mosaic Transaction](../built-in-features/account-restriction.md#accountmosaicrestrictionmodificationtransaction) |	Allow or block incoming transactions containing a given set of mosaics.|
|0x4350 |	[Account Properties Entity Type Transaction](../built-in-features/account-restriction.md#accountoperationrestrictionmodificationtransaction) |	Allow or block outgoing transactions by transaction type.|
|**Cross-chain swaps** | | |	  	 
|0x4152 |	[Secret Lock Transaction](../built-in-features/cross-chain-swaps.md#secretlocktransaction)  |	Start a [token swap](../built-in-features/cross-chain-swaps.md) between different chains.|
|0x4252 |	[Secret Proof Transaction](../built-in-features/cross-chain-swaps.md#secretprooftransaction)  |	Conclude a token swap between different chains. |
|**Remote validating** | | |	  	 
|0x414C |	[Account Link Transaction](./validating.md#accountlinktransaction) |	Delegates the account to a proxy account to enable [delegated validating](./validating.md).|
|**Exchange** | | |
| 0x415D | [Add Exchange Offer Transaction](../built-in-features/exchange-market.md#addexchangeoffertransaction) | Create a new exhange offer.|
| 0x425D | [Exchange Offer Transaction](../built-in-features/exchange-market.md#exchangeoffertransaction) | Make exchanging.|
| 0x435D | [Remove Exchange Offer Transaction](../built-in-features/exchange-market.md#removeexchangeoffertransaction) | Remove a new exhange offer.|
|**Drive** | | |
|0x415A | [(Deprecated) Prepare Drive Transaction](../built-in-features/drive.md#preparedrivetransaction) | Preparing a new drive.|
|0x425A | [(Deprecated) Join To Drive Transaction](../built-in-features/drive.md#jointodrivetransaction) | Send a new join transaction to drive.|
|0x435A | [(Deprecated) Drive File System Transaction](../built-in-features/drive.md#drivefilesystemtransaction) | Change a drive file system.|
|0x445A | [(Deprecated) Files Deposit Transaction](../built-in-features/drive.md#filesdeposittransaction) | Block mocaics at the rate of a file size.|
|0x455A | [(Deprecated) End Drive Transaction](../built-in-features/drive.md#enddrivetransaction) | Terminate a drive execution.|
|0x465A | [(Deprecated) Drive Files Reward Transaction](../built-in-features/drive.md#drivefilesrewardtransaction) | Send rewarding for files.|
|0x475A | [(Deprecated) Start Drive Verification Transaction](../built-in-features/drive.md#startdriveverificationtransaction) | Start verifying files storing.|
|0x485A | [(Deprecated) End Drive Verification Transaction](../built-in-features/drive.md#enddriveverificationtransaction) | End verifying files storing.|
|**Super Contract** | | |
|- | [Deploy Transaction]() | Deploying super contract.|
|- | [Execute Transaction]() | Start contract executing.|
|- | [Start Operation Transaction]() | Starting executing operation.|
|- | [End Operation Transaction]() | Ending executing operation.|
|- | [Operation Identify Transaction]() | Identifying execute operation.|
|**Storage**|||
|0x4662| [Replicator Onboarding Transaction](../guides/storage/replicator-onboarding) | Replicator Onboarding|
|0x4162| [Prepare BcDrive Transaction](../guides/storage/prepare-bc-drive) | Prepare a New Drive|
|0x4262| [Data Modification Transaction](../guides/storage/data-modification) | New Data Modification|
|0x4462| [Data Modification Approval Transaction]() | Data Modification Approval. Inner transaction, sent by Replicators only |
|0x4B62| [Data Modification SingleApproval Transaction]() | Inner transaction, sends Only by Replicators |
|0x4562| [Data Modification Cancel Transaction](../guides/storage/data-modification-cancel) | Cancel Data Modification |
|0x4A62| [Storage Payment Transaction](../guides/storage/storage-payment) | Storage Payment |
|0x4962| [Download Payment Transaction](../guides/storage/download-payment) | Download Payment|
|0x4362| [Download Transaction](../guides/storage/download) | New Download Channel |
|0x4862| [Finish Download Transaction](../guides/storage/finish-download) | Close Download Channel |
|0x4C62| [Verification Payment Transaction](../guides/storage/verification-payment) | Verification Payment |
|0x4F62| [End Drive Verification V2 Transaction]() | End Drive Verification. Inner transaction, sends Only by Replicators |
|0x4D62| [Download Approval Transaction]() | Download Approval. Inner transaction, sends Only by Replicators |
|0x4E62| [Drive Closure Transaction](../guides/storage/drive-closure) | Drive Closure |
|0x4762| [Replicator Offboarding Transaction](../guides/storage/replicator-offboarding) | Replicator Offboarding |

## Defining a transaction

Transactions are defined in a [serialized form](../rest-api/serialization.md). Each transaction extends from the transaction schema definition, combining the type's particular properties. You can find the description of the additional properties under the `Schema` section, at the end of each built-in feature description.

We recommend to [use the xpx-chain-sdk to define](../sdks/overview.md) transactions.

## Fees

Transactions have an associated cost. This cost is necessary to provide an incentive for the [validator](./validating.md) who secures the network and runs the infrastructure.

The fee associated with a transaction primarily depends on the transaction’s size. The effective fee is the product of the size of the transaction, and a fee multiplier set by the Validator. The node owner can configure the latter value to all positive values, including zero.

> effective_fee = transaction::bytes_size_to_be_validated * block::fee_multiplier

A sender of a transaction must specify `max_fee` during the transaction definition, meaning the maximum fee the account allows to spend for this transaction.

If the `effective_fee` is smaller or equal to the `max fee`, the validator can opt to include the transaction in the block.

The `fee_multiplier` is defined by validators, it is an integer value. It is stored in the [block header](./block.md#blockheader), permitting to resolve which was the effective fee paid for every transaction included.

The validating nodes can decide their transaction inclusion strategy:

- **Prefer-oldest**: Preferred for networks with high transaction throughput requirements. Include first the oldest transactions.
- **Minimise-fees**: Philanthropic nodes. Include first transactions that other nodes do not want to include.
- **Maximise-fees**: Most common in public networks. Include first transactions with higher fees.

By default, the fee is paid in `xpx`, the underlying currency of the Sirius Chain network. Private chains can edit the configuration of the network to eliminate fees, or use another [mosaic](../built-in-features/mosaic.md) and [namespace](../built-in-features/namespace.md) that better suits their needs.

### Fee Tips 

<div class="info">

In short, validators need to define *fee_multiplier*, which is considered as fee per byte. 

Max fee value is the lowest currency absolute value. eg. `5000 max fee = 0.005000 xpx`.

The final transaction size might be increased from client/user site due to more complex transactions such as transactions with multisig accounts with extra cosigner information. Fee_multiplier will calculate with the final transaction size.

</div>

## Signing a transaction

Accounts must sign transactions before announcing them to the network. Signing a transaction expresses the account’s agreement to change the network state as defined.

For example, a transfer transaction describes who is the recipient and the quantity of mosaics to be transferred. In this case, signing the transaction means to accept moving those mosaics from one account’s balance to another.

An account has to follow the next steps to sign a transaction:

1. Get the `signing bytes`, which are all the bytes of the transaction except the size, signature and signer.
2. Get the nemesis block generation hash. You can query `http://bctestnet1.brimstone.xpxsirius.io:3000/block/1` and copy `meta.generationHash` value.
3. Prepend the nemesis block generation hash to the signing bytes.
4. Sign the resulting string with the signer's private key. This will give you the transaction `signature`.
5. Append the signer's signature and public key to the transaction to obtain the `payload`.
6. Calculate the hash of the transaction applying the network hashing algorithm to the first 32 bytes of signature, the signer public key, nemesis block generation hash, and the remaining transaction payload.

## Announcing a transaction

Signed transactions are ready to be announced to the network. You can either use the SDK `TransactionHttp` service or append the payload to the request of the transaction endpoint.

After announcing a transaction, the REST API will always return an OK response immediately. At this point, it is still unknown whether the transaction is valid.

![Transaction Cycle](/img/transaction-cycle.png "Transaction Cycle")
<p class="caption">Transaction cycle</p>

The first stage of validation happens in the API nodes. If the transaction presents some error, the WebSocket throws a notification through the status channel. In the positive case, the transaction reaches the P2P network with an **unconfirmed** status. Never rely on a transaction which has an unconfirmed state. It is not clear if it will get included in a block, as it should pass a second validation.

The second validation is done before the transaction is added in a validated block. If valid, the validator stores the transaction in a block, and it reaches the **confirmed** status.

Continuing the previous example, the transaction gets processed and the amount stated gets transferred from the signer's account to the recipient's account. Additionally, the transaction fee is deducted from the signer's account.

The transaction has **zero confirmations** at this point. When another block is added to the blockchain, the transaction has one confirmation. The next block added to the chain will give it two confirmations and so on.

## Rollbacks

Blockchains are designed in a way that under certain circumstances, recent blocks need to be rolled back. These are essential to resolve forks of the blockchain.

The `rewrite limit` is the maximum number of blocks that can be rolled back. Hence, forks can only be resolved up to a certain depth too.

Sirius Chain has a rewrite limit of `360` blocks. Once a transaction has more than 360 confirmations, it cannot be reversed.

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
