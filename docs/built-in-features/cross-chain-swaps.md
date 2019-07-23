---
id: cross-chain-swaps
title: Cross-Chain Swaps
---

A cross-chain swap enables **trading tokens** across **different blockchains**, without using an intermediary party (eg. an exchange service) in the process.

![Cross-chain swap](/img/cross-chain-swap.png "Cross-chain swap")

<p class=caption>Atomic cross-chain swap between public and private network</p>

In order to create a trustless environment for an exchange, a specific transaction type is required that is commonly referred to as **Hashed TimeLock Contract** (HTLC). Two additional components characterise this transaction type: hashlocks and timelocks. A thorough explanation can be found on the [Bitcoin Wiki](https://en.bitcoin.it/wiki/Hashed_Timelock_Contracts).

In other words, to reduce counterparty risk, the receiver of a payment needs to present a proof for the transaction to execute. Failing to do so, the locked funds are released after the deadline is reached, even if just one actor does not agree.

## Protocol

Alice and Bob want to exchange `10 alice tokens for 10 bob tokens`. The problem is that they are not in the same blockchain: alice token is defined in Sirius-Chain public chain, whereas bob token is only present in a private chain using Catapult technology.

> **Note**
>
> Sirius-Chain’s private and future public chain share the SDK. You could implement atomic cross-chain swap between blockchains that use different technologies if they permit the [secret lock/proof mechanism](#lock-hash-algorithm).

![Cross-chain swap cycle](/img/cross-chain-swap-cycle.png "Cross-chain swap cycle")

<p class=caption>Atomic cross-chain swap sequence diagram</p>

1. Alice generates a random set of bytes called `proof`. The proof should have a size between `10` and `1000` bytes.
2. Alice hashes the obtained proof with one of the [available algorithms](#lock-hash-algorithm) to generate the `secret`.
3. Alice defines the secret lock transaction `TX1`:

- Mosaic: 10 alice token
- Recipient: Bob’s address (Private Chain)
- Algorithm: h
- Secret: h(proof)
- Duration: 96h
- Network: Private Chain

4. Alice announces TX1 to the private network and shares with Bob the secret.
5. Bob defines announces the following [secret lock transaction](#secret-lock-transaction) `TX2` to the public network:

- Mosaic: 10 bob token
- Recipient: Alice’s address (Public Chain)
- Algorithm: h
- Secret: h(proof)
- Duration: 84h
- Network: Public Chain

> **Note**
>
> The amount of time in which funds can be unlocked should be a smaller time frame than TX1’s. Alice knows the secret, so Bob must be sure he will have some time left after Alice releases the secret.

6. Alice announces the [secret proof transaction](#secret-proof-transaction) TX3 to the public network. This transaction defines the encrypting algorithm used, the original proof and the secret.
7. Once TX3 is confirmed, the proof is revealed. TX2 transaction is unlocked and Alice receives the locked funds.
8. Bob picks the proof and announces the [secret proof transaction](#secret-proof-transaction) TX4 to the private network, receiving the locked funds from TX1.

## Guides

<div class=info>

**Note**

We recommend checking out [setting up your workstation][Workstation] before going through the guides.

</div>

- [Atomic cross-chain swap between Sirius-Chain public and private chain](../guides/cross-chain-swaps/atomic-cross-chain-swap-between-sirius-chain-public-and-private-chain.md)

    Cross-chain swaps enable trading tokens between different blockchains, without using an intermediary party in the process.

## Schemas

<div class=info>

**Note**

Configuration parameters are [editable](https://github.com/proximax-storage/catapult-server/blob/master/resources/config-network.properties) . Public network configuration may differ.

</div>

### SecretLockTransaction

Use a secret lock transaction to start the cross-chain swap:

1. Define the mosaic units you want to transfer to a determined account.
2. Generate a random set of bytes called `proof`.
3. Hash the obtained proof with one of the available algorithms to generate the `secret`.
4. Select during how much time the mosaics will be locked and announce the transaction.

The specified mosaics remain locked until a valid [Secret Proof Transaction](#secretprooftransaction) unlocks them.

If the transaction duration is reached without being proved, the locked amount goes back to the initiator of the secret lock transaction.

**Version**: 0x01

**Entity type**: 0x4152

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
mosaic |	[Mosaic](./mosaic.md#mosaic) |	Locked mosaic.
duration |	uint64 |	The lock duration. If reached, the mosaics will be returned to the initiator.
hashAlgorithm |	[LockHashAlgorithm](#lockhashalgorithm) |	The algorithm used to hash the proof.
secret |	64 bytes (binary) |	The proof hashed.
recipient |	25 bytes (binary) |	The address who will receive the funds once unlocked.

### SecretProofTransaction

Use a secret proof transaction to unlock [secret lock transactions](#secretlocktransaction).

The transaction must prove that knows the proof that unlocks the mosaics.

**Version**: 0x01

**Entity type**: 0x4252

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
hashAlgorithm |	[LockHashAlgorithm](#lockhashalgorithm) |	The algorithm used to hash the proof.
secret |	64 bytes (binary) |	The proof hashed.
proofSize |	uint16 |	The proof size in bytes.
proof |	array(byte, proofSize) |	The original proof.

### LockHashAlgorithm

Enumeration: uint8

**Id** | **Description**
------|----------------------
0 (SHA_3) |	Input is hashed using sha3 256.
1 (Keccak) | Input is hashed using Keccak.
2 (Hash_160) | Input is hashed twice: first with Sha-256 and then with RIPEMD-160 (bitcoin’s OP_HASH160).
3 (Hash_256) |	Input is hashed twice with Sha-256 (bitcoin’s OP_HASH256).

[Workstation]: ../getting-started/setting-up-workstation.md
