---
id: storage-verification
title: Verification and Decision Making
sidebar_label: Verification
---

The decision point is on the blockchain. The Replicators give their opinion in a multisignature transaction. Based on these opinions, Harvesters can compute a collective opinion. The concrete algorithm of collective opinion-making depends on the type of the transaction. Since each [Replicator](built_in_features/replicator.md) can send such a multisig transaction to the blockchain, but only one should be approved. Each [Replicator](roles.md#replicator-node) in the transaction defines its opinion about how much each other [Replicator](roles.md#replicator-node) should receive for its work. The reward for the [Replicator](roles.md#replicator-node) is defined as the median of all opinions about the reward for it.


# Verification

**Storage Verifications** are executed in a “many-to-many“ style that means that during the verification each [Replicator](roles.md#replicator-node) verifies all others.
In terms of the Verifications, the Replicator can play two roles:

- **Prover** — a Replicator that proves that it stores data.
- **Verifiers** — Replicators that check whether the Prover stores data.

Verifications are executed regularly, but randomly, depending on the hash of the block, the key of the [Drive](built_in_features/drive.md), and a special constant that is set in the network configuration and which regulates the frequency of the verifications. The result of the Verification for each Prover is defined as the median of the [Verifiers'](roles.md#verifier-responsibilities) opinions about that Prover.
