---
id: aggregate-transaction
title: Aggregate Transaction
---
Aggregated Transactions merge multiple transactions into one, allowing **trustless swaps**, and other advanced logic. Sirius Chain does this by generating a one-time disposable smart contract. When all involved [accounts][Account] have cosigned the aggregate transaction, all the inner transactions are executed at the same time.

## Examples
## Sending payouts

Dan announces an aggregate transaction that merges two transfer transactions.

As he is the only required signed, we say the aggregate transaction it is complete. After announcing it to the network, Alice and Bob will receive the mosaics at the same time.

![Aggregate sending payouts](/img/aggregate-sending-payouts.png "Aggregate sending payouts")

<p class="caption">Sending payouts with aggregate complete transactions</p>

## Multi-Asset Escrowed Transactions

In this example, Alice is buying tickets with currency:euro. When the ticket distributor cosigns the aggregate transaction, the swap will happen atomically.

![Aggregate escrow](/img/aggregate-escrow-1.png "Aggregate escrow")

<p class="caption">Multi-Asset Escrowed Transactions</p>

## Paying for others fees

Alice sends 10 € to Bob using an app to make payments. But she doesn’t have any XPX to pay the blockchain transaction fee.

By creating an aggregate bonded transaction, she can convert USD to XPX to pay the fee. Now Alice and Bob can use Sirius-Chain without ever having to buy or hold XPX.

Since the app creator can put their own branding on the open source payment app, Alice and Bob may not even know they are using blockchain.

![Aggregate paying for others fees](/img/aggregate-paying-for-others-fees.png "Aggregate paying for others fees")

<p class="caption">Paying for others fees</p>

## Aggregate complete

An aggregate transaction is **complete** when all cosigners have signed it.

The different participants can sign without using the blockchain the aggregate transaction. Once it has all the required signatures, one of them can announce it to the network. If the inner transaction setup is valid, and there is no validation error, the transactions will get executed at the same time.

Aggregate complete transactions enable adding more transactions per block by gathering multiple inner transactions between different participants in the same operation.

## Aggregate bonded

An aggregate transaction is **bonded** when it requires signatures from other participants.

<div class=info>

**Note**

When sending an **aggregate bonded transaction**, an account must first announce and get confirmed a [hash lock transaction](#hashlocktransaction) for this aggregate with at least `10` XPX.

</div>

Once an aggregate bonded is announced, it reaches partial state and notifies its status through WebSockets or HTTP API calls.

Every time a cosignatory signs the transaction and [announces an aggregate bonded cosignature](#cosignaturetransaction), the network checks if all the required cosigners have already signed. In this situation, the transaction changes to unconfirmed state until the network accepts it, and it is included in a block once processed.

![Aggregate bonded transaction cycle](/img/aggregate-bonded-transaction-cycle.png "Aggregate bonded transaction cycle")

<p class=caption>Aggregate bonded transaction cycle</p>


## Guides

<div class=info>

**Note**

⚠ The latest release introduces breaking changes. Until the SDKs are not aligned, we recommend using [catapult-service-bootstrap 0.1.0][Workstation] to run the guides.

</div>

- [Sending payouts with aggregate complete transaction][Aggregate-complete]

    Send transactions to different accounts atomically, using an aggregate complete transaction.

- [Creating an escrow with aggregate bonded transaction][Aggregate-escrow]

    Learn about aggregate bonded transactions, by creating an escrow.

- [Asking for mosaics with aggregate bonded transaction][Aggregate-ask-mosaic]

    Ask an account to send you funds using an aggregate bonded transaction.

- [Signing announced aggregate bonded transactions][Signing-aggregate]

    You have probably announced an aggregate bonded transaction, but all required cosigners have not signed it yet.

- [Signing announced aggregate bonded transactions automatically][Auto-sign-aggregate]

    Sign automatically transactions pending to be cosigned.

- [Sending a multisig transaction][Send-multisig]

    Send a transaction involving a multisig and learn how an aggregate bonded transaction works.

## Schemas

<div class=info>

**Note**

Configuration parameters are [editable][Server-configurable] . Public network configuration may differ.

</div>

### AggregateTransaction

**Version**: 0x02

**Entity type**: 0x4141 ([complete](#aggregate-complete)), 0x4241 ([bonded](#aggregate-bonded))

**Inlines**:

- [Transaction][Transaction]

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
payloadSize |	uint8 |	The transaction payload size in bytes. In other words, the total number of bytes occupied by all inner transactions.
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

If the aggregate bonded transaction duration is reached without being signed by all cosignatories, the locked amount is collected by the block validator at the height where the lock expires.

**Version**: 0x01

**Entity type**: 0x4148

**Inlines**:

- [Transaction][Transaction] or [EmbeddedTransaction][EmbeddedTransaction]

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
mosaic |	[Mosaic][Mosaic#mosaic] |	Locked mosaic, must be at least `10 prx:xpx`.
duration |	uint64 |	The lock duration.
hash |	32 bytes (binary) |	The aggregate bonded transaction hash that has to be confirmed before unlocking the mosaics.

[Server-configurable]: https://github.com/proximax-storage/catapult-server/blob/master/resources/config-network.properties
[Mosaic#mosaic]: ./mosaic.md#mosaic
[Transaction]: ../protocol/transaction.md#transaction
[EmbeddedTransaction]: ../protocol/transaction.md#embeddedtransaction
[Account]: ./account.md
[Workstation]: ../getting-started/setting-up-workstation.md
[Aggregate-complete]: ../guides/aggregate-transaction/sending-payouts-with-aggregate-complete-transaction.md
[Aggregate-escrow]: ../guides/aggregate-transaction/creating-an-escrow-with-aggregate-bonded-transaction.md
[Aggregate-ask-mosaic]: ../guides/aggregate-transaction/asking-for-mosaics-with-aggregate-bonded-transaction.md
[Signing-aggregate]: ../guides/aggregate-transaction/signing-announced-aggregate-bonded-transactions.md
[Auto-sign-aggregate]: ../guides/aggregate-transaction/signing-announced-aggregate-bonded-transactions-automatically.md
[Send-multisig]: ../guides/multisig-account/sending-a-multisig-transaction.md