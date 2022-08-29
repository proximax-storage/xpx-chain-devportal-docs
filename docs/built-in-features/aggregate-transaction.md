---
id: aggregate-transaction
title: Aggregate Transaction
---

Aggregated Transactions merge multiple transactions into one, allowing **trustless swaps**, and other advanced logic. Sirius Chain does this by generating a one-time disposable smart contract.

![Trustless swap](/img/aggregate-trustless-swap.png)

<p class="caption">Example of an aggregate transaction between two participants</p>

When all involved [accounts](./account.md) have cosigned the aggregate transaction, all the inner transactions are executed at the same time.


## Aggregate complete

An aggregate transaction is *complete* when all the required participants have signed it.

The cosigners can sign the transaction without using the blockchain. Once it has all the required signatures, one of them can announce it to the network. If the inner transaction setup is valid, and there is no validation error, the transactions will get executed at the same time.

Aggregate complete transactions enable adding more transactions per block by gathering multiple inner transactions.

## Aggregate bonded

An aggregate transaction is **bonded** when it requires signatures from other participants.

<div class="info">

**Note**

Before announcing an **aggregate bonded transaction**, an account must announce and get confirmed a [hash lock transaction](#hashlocktransaction) locking `10 xpx`.

</div>

Once an aggregate bonded is announced, it reaches partial state and notifies its status through WebSockets or HTTP API calls.

Every time a cosignatory signs the transaction and [announces an aggregate bonded cosignature](#cosignature), the network checks if all the required cosigners have signed. When all signatures are acquired, the transaction changes to unconfirmed state until the network includes it in a block.

![Aggregate bonded transaction cycle](/img/aggregate-bonded-transaction-cycle.png "Aggregate bonded transaction cycle")
<p class="caption">Aggregate bonded transaction cycle</p>


## Examples

### Sending payouts

Dan announces an aggregate transaction that merges two transfer transactions.

As Dan is the only required signatory, the transaction is considered complete after he signed. After announcing it to the network, Alice and Bob will receive the mosaics at the same time.

![Aggregate sending payouts](/img/aggregate-sending-payouts.png "Aggregate sending payouts")
<p class="caption">Sending payouts with aggregate complete transactions</p>

### Multi-Asset Escrowed Transactions

In this example, Alice is buying tickets with `currency.euro` [mosaic](./mosaic.md). When the ticket distributor cosigns the aggregate transaction, the swap will happen atomically.

![Multi-Asset Escrowed Transactions](/img/aggregate-trustless-swap.png)
<p class="caption">Multi-Asset Escrowed Transaction</p>

### Paying for others fees

Alice sends 10 `currency.euro` to Bob using an app to make payments. But Alice doesn’t own xpx to pay the transaction fee.

By creating an aggregate bonded transaction, Alice can convert EUR to `xpx` to pay the fee. Now, Alice and Bob can use Sirius Chain without ever having to buy or hold `xpx`.

Since the app creator can put their own branding on the open source payment app, Alice and Bob may not even know they are using blockchain.

![Paying for others fees](/img/aggregate-paying-for-others-fees.png "Paying for others fees")
<p class="caption">Paying for other fees</p>

## Guides

<div class=info>

**Note:**

We recommend checking out [setting up your workstation][Workstation] before going through the guides.

</div>

- [Sending payouts with aggregate complete transaction][Aggregate-complete]

    HOw to seend transactions to different accounts atomically using an aggregate complete transaction.

- [Creating an escrow with aggregate bonded transaction][Aggregate-escrow]

    How to create an escrow with aggregate bonded transactions.

- [Asking for mosaics with aggregate bonded transaction][Aggregate-ask-mosaic]

    How to ask an account to send you funds using an aggregate bonded transaction.

- [Signing announced aggregate bonded transactions][Signing-aggregate]

    How to sign announced aggregate bonded transaction that all required co-signers have not signed it yet.

- [Sending a multisig transaction][Send-multisig]

    Send a transaction involving a multisig and learn how an aggregate bonded transaction works.

## Schemas

<div class=info>

**Note:**

Configuration parameters are [editable][Server-configurable] . Public network configuration may differ.

</div>

### AggregateTransaction

**Version**: 0x02

**Entity type**: 0x4141 ([complete](#aggregate-complete)), 0x4241 ([bonded](#aggregate-bonded))

**Inlines**:

- [Transaction][Transaction]

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
payloadSize |	uint8 |	The transaction payload size in bytes. In other words, the total number of bytes was occupied by all inner transactions.
transactions |	array(byte, payloadSize) |	The array of transactions initiated by different accounts. An aggregate transaction can contain up to `1000` inner transactions involving up to `15` different cosignatories. Other aggregate transactions are not allowed as inner transactions.
cosignatures |	array(byte, size - payloadSize) |	An array of transaction [cosignatures](#detachedcosignature).

### DetachedCosignature

Cosignature transactions are used to sign [announced aggregate bonded transactions](#examples) with missing cosignatures.

**Inlines**:

- [Cosignature](#cosignature)

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
parentHash |	32 bytes (binary) |	The aggregate bonded transaction hash to cosign.

### Cosignature

- [Transaction][Transaction] or [EmbeddedTransaction][EmbeddedTransaction]

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
signer |	32 bytes (binary) |	The cosigner public key.
signature |	64 bytes (binary) |	The transaction signature.

### HashLockTransaction

**Alias**: LockFundsTransaction

Announce a hash lock transaction before sending a signed [aggregate bonded transaction](#examples). This mechanism is required to prevent network spamming.

Once the related aggregate bonded transaction is confirmed, locked funds become available again in the account that signed the initial hash lock transaction.

If the aggregate bonded transaction duration is reached without being signed by all cosignatories, the locked amount is collected by the block Validator at the height where the lock expires.

**Version**: 0x01

**Entity type**: 0x4148

**Inlines**:

- [Transaction][Transaction] or [EmbeddedTransaction][EmbeddedTransaction]

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
mosaic |	[Mosaic][Mosaic#mosaic] |	Locked mosaic, must be at least `10 xpx`.
duration |	uint64 |	The lock duration.
hash |	32 bytes (binary) |	The aggregate bonded transaction hash that has to be confirmed before unlocking the mosaics.

[Server-configurable]: https://github.com/proximax-storage/cpp-xpx-chain/blob/master/resources/config-network.properties
[Mosaic#mosaic]: ./mosaic.md#mosaic
[Transaction]: ../protocol/transaction.md#transaction
[EmbeddedTransaction]: ../protocol/transaction.md#embeddedtransaction
[Account]: ./account.md
[Workstation]: ../getting-started/setting-up-workstation.md
[Aggregate-complete]: ../guides/aggregate-transaction/sending-payouts-with-aggregate-complete-transaction.md
[Aggregate-escrow]: ../guides/aggregate-transaction/creating-an-escrow-with-aggregate-bonded-transaction.md
[Aggregate-ask-mosaic]: ../guides/aggregate-transaction/asking-for-mosaics-with-aggregate-bonded-transaction.md
[Signing-aggregate]: ../guides/aggregate-transaction/signing-announced-aggregate-bonded-transactions.md
[Send-multisig]: ../guides/multisig-account/sending-a-multisig-transaction.md
