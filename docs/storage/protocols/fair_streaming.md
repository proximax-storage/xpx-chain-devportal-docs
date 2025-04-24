---
id: fair-streaming
title: Fair Streaming
---

## Overview

The **fair streaming protocol** is used to transfer blocks of the file between [Storage Replicator Nodes](../roles.md#replicator-node) and pay for it. The main goal of this protocol is to ensure that the receiving node receives the block, and the user who transfers the block receives the confirmation of sending.

### Description

When the recipient wants to get a block, it initiates streaming. When the recipient received the block's hash, it starts to search for the sender that has it. When it has been found, the recipient requests this block. The sender transfers it to the recipient and waits for confirmation. At this time, the recipient compares the hash of the obtained block and the expected hash. If they are equal, it sends the confirmed and signed transaction with the private key. In case when the sender did not receive confirmation, it cannot send other blocks. When the sender gets approval, it checks the validity and, if everything is correct, the sender confirms it. Subsequently, the sender uses this confirmed transaction (receipts) to receive a reward, so it would be good to save receipts in a safe place. All of these transactions are sent from node to node on [DFMS](../overview.md) layer, not in the Blockchain.

<div class="info">

**Note** <br>
    Only the [Storage Replicator Node](../roles.md#replicator-node) that deposited [SO](../economy.md#storage-units--so) or a node that has paid a fee in [SM](../economy.md#streaming-units--sm) can download the file.
</div>

### Possible cases

- A node downloads less or more than file size. It is considered as cheating so the node will be knocked out of the contract.
- A node lost the block. There is a possibility to download it from another node outside of the contract.
- A node was knocked out of the contract. It can join the contract again and it is considered as a new node. The node should download the whole file from the beginning. Otherwise, it is knocked out again as a cheater.
- A node wants to download the file again. Every [Storage Replicator Node](../roles.md#director-node) has a history of downloadings, and the sender can check if the block was downloaded or not. If so, the sender transfers the message to the recipient's history that the block already exists.

## Payment

When the receiving process is completed, every user gets a reward. Every user has a history of how many bytes it received and sent to other users. Every file has a total price.

Let’s imagine that we have N users in the contract, the total streaming will be equal *N * file size* (the deposit will be returned when the [Drive](../built_in_features/drive.md) ends). We can find out the percent of participation of every user in transferring files by formula *P = sent byte/total streaming*. Thus, the final reward for the user will be equal to *file deposit \* P*.
