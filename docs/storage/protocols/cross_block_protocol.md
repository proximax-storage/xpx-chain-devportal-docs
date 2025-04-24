---
id: cross-block-protocol
title: Cross-Block Protocol
---

## Overview

The **cross-block protocol** is needed to check that [Storage Replicator Nodes](../roles.md#replicator-node) keep storing files through time. The protocol is developed to ensure data reliability and security. When the [owner](../roles.md#director-node) saves the new file, it forms the Merkle graph from its parts and applies it to the graph of the whole [Drive](../built_in_features/drive.md). Afterwards, the [owner](../roles.md#director-node) sends the [Upload](../built_in_features/drive.md#uploading) transaction to Blockchain with the newly generated root hash of the whole [Drive](../built_in_features/drive.md). Every [Storage Replicator Node](../roles.md#replicator-node) after transaction confirmation retrieves the difference including the new file from the [owner](../roles.md#director-node) and simultaneously verifies the validity of the formed Merkle graph. If everything is correct, then every [Storage Replicator Node](../roles.md#replicator-node) performs the next steps:

1. Encrypts every retrieved data block with a secret key.
2. Processes and prepares result block for future verifications through CPOR algorithm.
3. Sends the encrypted block to another [Storage Replicator Node](../roles.md#replicator-node) chosen using the formula below.
4. Waits for an encrypted block from another [Storage Replicator Node](../roles.md#replicator-node), also using the formula.
5. After the protocol round is finished every [Storage Replicator Node](../roles.md#replicator-node) stores the unique copy of the [Drive](../built_in_features/drive.md) with newly added file assembled from different pieces that were encrypted by different [Storage Replicator Nodes](../roles.md#replicator-node) with a secret key. That is, the stored data after the process can be easily fetched in the original form via decrypting the data with known public keys of [Storage Replicator Nodes](../roles.md#replicator-node).

> **Example**
>
> A [Drive](../built_in_features/drive.md) has 5 [Storage Replicator Nodes](../roles.md#replicator-node). Every _R_ splits each file into 4 parts. _R0_ requests from _R1_ the file part at number 1; from _R2_ the file part at number 2 and so on. Also, _R0_ sends the file part at number 1 to _R1_; the file part at number 2 to _R2_ and so on.

<div class="info">

**Note** <br>
    Every _R_ has its number on the [Drive](../built_in_features/drive.md) contract. It gets the number according to the consensus algorithm.
</div>

## Formulas

### Request a file

_Rk_ requests from _Ri_ the file part at the number (_k - i mod N_) where _N_ is the number of [Storage Replicator Nodes](../roles.md#replicator-node).

### Send a file

_Ri_ sends the _j_-th part to _R_ at the number (_(i + j) mod N_) where _N_ is the number of [Storage Replicator Nodes](../roles.md#replicator-node).

## Retransmitting protocol

The [Storage Replicator Node](../roles.md#replicator-node) that found a mismatch, creates the new transaction to ban the unfair [Storage Replicator Node](../roles.md#replicator-node). This transaction should be signed by a percentage of signers (defined when creating). Other [Storage Replicator Nodes](../roles.md#replicator-node) request the same parts of the file and check them. If the unfair [Storage Replicator Node](../roles.md#replicator-node) fails the check one more time, the [verifier](../roles.md#replicator-node) signs the ban transaction. If the minimum percentage of approval is collected, the unfair [Storage Replicator Node](../roles.md#replicator-node) will be banned. If there are not enough signatures, the initiator will receive the results.
