---
id: storage-reward
title: Rewards
---

## Storage Rewards

[Storage Replicators](roles.md#replicator-node)' payment share for data storage is calculated as its time of confirmed storage (a sum over all time periods between the moment when the Replicator signed `DataModificationApproval` transaction personally and the next `DataModificationApproval` transaction signed with a multi-sig) divided by the total time of the billing period. The obtained rewards are rounded up. For a partial honest Replicator, the end of its billing period is the last verification it passed. Its reward is rounded down.

## Formula

![alt-text](/img/storage/formula_reward_v2.png)

## Examples

![alt-text](/img/storage/formula_reward_v2_example_1.png)
![alt-text](/img/storage/formula_reward_v2_example_2.png)
