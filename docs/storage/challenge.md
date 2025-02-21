---
id: storage-challenge
title: Challenge
---

The [Challenge](challenge.md) is the process when the [verifier](roles.md#verifier-responsibilities) checks that the [Storage Replicator Node](roles.md#replicator-node) is storing the expected file. [Challenge](challenge.md) process includes the following steps:

1. The [verifier](roles.md#verifier-responsibilities) requests some amount of randomly placed file blocks from the [Storage Replicator Node](roles.md#replicator-node).
2. The [Storage Replicator Node](roles.md#replicator-node) generates blocks of passed file indexes and sends them to the [verifier](roles.md#verifier-responsibilities).
3. The [verifier](roles.md#verifier-responsibilities) compares its blocks with the [Storage Replicator Node](roles.md#replicator-node)'s blocks.

If there are any differences between the [verifier](roles.md#verifier-responsibilities)'s and the [Storage Replicator Node](roles.md#replicator-node)'s blocks, the [Storage Replicator Node](roles.md#replicator-node) fails the [Challenge](challenge.md), and it is banned by all signers of the contract. After that, the [verifier](roles.md#verifier-responsibilities) searches for other [Storage Replicator Nodes](roles.md#replicator-node) and asks them to send file data.