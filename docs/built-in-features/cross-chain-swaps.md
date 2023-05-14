---
id: cross-chain-swaps
title: Cross-Chain Swaps
---

A cross-chain swap enables **token trading** across **different blockchains**, without using an intermediary party (eg. an exchange service) in the process.

![Cross-chain swap](/img/cross-chain-swap.png "Cross-chain swap")

<p class=caption>Atomic cross-chain swap between public and private network</p>

In order to create a trustless environment for an exchange, a specific transaction type is required and is commonly referred to as **Hashed TimeLock Contract** (HTLC). Two additional components characterize this transaction type: hashlocks and timelocks. A thorough explanation can be found on the [Bitcoin Wiki](https://en.bitcoin.it/wiki/Hashed_Timelock_Contracts).

In other words, to reduce counterparty risk, the receiver of a payment needs to present a proof for the transaction to be executed. Failure to do so will cause the locked funds to be released after the deadline is reached, despite even just one actor disagreeing.

## Protocol

Alice and Bob want to exchange `10 alice tokens for 10 bob tokens`. The problem is that they are not in the same blockchain: alice token is defined in Sirius private chain, whereas bob token is only present in Sirius public chain.

<div class="info">

**Note**

Sirius Chain’s private and future public chain share the SDK. You could implement atomic cross-chain swap between blockchains that use different technologies if they permit the [secret lock/proof mechanism](#lock-hash-algorithm).
</div>

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
5. Bob defines and announces the following [secret lock transaction](#secretlocktransaction) `TX2` to the public network:

- Mosaic: 10 bob token
- Recipient: Alice’s address (Public Chain)
- Algorithm: h
- Secret: h(proof)
- Duration: 84h
- Network: Public Chain

<div class="info">

**Note**

The amount of time in which funds can be unlocked should be a smaller time frame than TX1’s. Alice knows the secret, so Bob must be sure he will have some time left after Alice releases the secret.
</div>

6. Alice announces the [secret proof transaction](#secretprooftransaction) TX3 to the public network. This transaction defines the encrypting algorithm used, the original proof and the secret.
7. Once TX3 is confirmed, the proof is revealed. TX2 transaction is unlocked and Alice receives the locked funds.
8. Bob picks the proof and announces the [secret proof transaction](#secretprooftransaction) TX4 to the private network, receiving the locked funds from TX1.

## Concept Notes

The concept of a cross-chain swap is an open swap that involves a sender and a recipient. The secret is derived from the proof. There could be multiple actors in a swap. An example is, there may be an intermediary that does the swapping. It is important to note from the above cross-chain swap sequence diagram, TX2 and TX4 are two transactions after TX1 that can be fulfilled by any random signer. In other words, the random signer could be an intermediary or Alice herself. However, in order to generate a complete swap, particularly for TX2, the requisite number of assets should be locked for swap to fulfil the request of TX1 as sent by Alice. If in the event that this is not what Alice asked for, she does not sign TX3. TX3 is actually a step to announce the proof publicly so that the asset in the second chain is released to the recipient. Alice could also sign and announce TX4 herself as a single party transaction.

A critical step would be TX2 where Alice will check if the recipient and the amount is right in the public chain. If it is right, then Alice issues TX3 and announces the proof publicly, at the same time the chain releases the asset into Alice's account in the public chain unconditionally.

This concept of cross-chain swap gives us some flexibility with the use of an intermediary. A use case could be, Alice wishes to send an asset to Bob in the public chain from a prior agreement and arrangement. Bob does not want to receive Alice coin in the private chain as he has provided some services and wish to receive only Bob coin in the public chain. Intermediary John comes into the picture. Alice would lock Alice coin to be sent into John's account in the private chain and John will in turn lock Bob coin to be sent into Bob's account in the public chain. The signing parties are now Alice and John with Bob being the recipient in the public chain and John, the recipient in the private chain.

At TX1, Alice would announce and lock a quantity of Alice coin to be sent to John's account in the private chain plus the secret into the private chain. John sees the secret in the private chain, checks that the secret given to him and the requisite amount of Alice coin locked in the private chain are in order, and announces the TX2 transaction locking the number of Bob coin to be sent to Bob's account together with the secret. Alice sees the transaction in the public chain and checks likewise. Once in order and Alice agrees to the amount of Bob coin to be unlocked, she announces TX3 with the proof in the public chain, thereby activating the release of Bob coin into Bob's account. John, upon sighting the proof, makes a TX4 with the proof into the private chain to unlock the Alice coin.

## Guides

<div class=info>

**Note:**

We recommend checking out [setting up your workstation][Workstation] before going through the guides.

</div>

- [Atomic cross-chain swap between Sirius Chain public and private chain](../guides/cross-chain-swaps/atomic-cross-chain-swap-between-sirius-chain-public-and-private-chain.md)

    How to swap cross-chain swaps to enable token trading between different blockchains, without using an intermediary party in the process.

## Schemas

<div class=info>

**Note:**

Configuration parameters are [editable](https://github.com/proximax-storage/cpp-xpx-chain/blob/master/resources/config-network.properties) . Public network configuration may differ.

</div>

### SecretLockTransaction

Use a secret lock transaction to start the cross-chain swap:

1. Define the mosaic units you want to transfer to a determined account.
2. Generate a random set of bytes called `proof`.
3. Hash the obtained proof with one of the available algorithms to generate the `secret`.
4. Select how much time the mosaics will be locked and announce the transaction.

The specified mosaics remain locked until a valid [Secret Proof Transaction](#secretprooftransaction) unlocks them.

If the transaction duration is reached without being proved, the locked amount goes back to the initiator of the secret lock transaction.

**Version**: 0x01

**Entity type**: 0x4152

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**  | **Type**                                  | **Description**                                                               |
| ------------- | ----------------------------------------- | ----------------------------------------------------------------------------- |
| mosaic        | [Mosaic](./mosaic.md#mosaic)              | Locked mosaic.                                                                |
| duration      | uint64                                    | The lock duration. If reached, the mosaics will be returned to the initiator. |
| hashAlgorithm | [LockHashAlgorithm](#lock-hash-algorithm) | The algorithm used to hash the proof.                                         |
| secret        | 64 bytes (binary)                         | The proof hashed.                                                             |
| recipient     | 25 bytes (binary)                         | The address who will receive the funds once unlocked.                         |

### SecretProofTransaction

Use a secret proof transaction to unlock [secret lock transactions](#secretlocktransaction).

The transaction must prove that it knows the proof that unlocks the mosaics for the recipient.

**Version**: 0x01

**Entity type**: 0x4252

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**  | **Type**                                  | **Description**                                       |
| ------------- | ----------------------------------------- | ----------------------------------------------------- |
| hashAlgorithm | [LockHashAlgorithm](#lock-hash-algorithm) | The algorithm used to hash the proof.                 |
| secret        | 64 bytes (binary)                         | The proof hashed.                                     |
| recipient     | 25 bytes (binary)                         | The address who will receive the funds once unlocked. |
| proofSize     | uint16                                    | The proof size in bytes.                              |
| proof         | array(byte, proofSize)                    | The original proof.                                   |

### Lock Hash Algorithm

Enumeration: uint8

| **Id**       | **Description**                                                                            |
| ------------ | ------------------------------------------------------------------------------------------ |
| 0 (SHA_3)    | Input is hashed using sha3 256.                                                            |
| 1 (Keccak)   | Input is hashed using Keccak.                                                              |
| 2 (Hash_160) | Input is hashed twice: first with Sha-256 and then with RIPEMD-160 (bitcoin’s OP_HASH160). |
| 3 (Hash_256) | Input is hashed twice with Sha-256 (bitcoin’s OP_HASH256).                                 |

[Workstation]: ../getting-started/setting-up-workstation.md
