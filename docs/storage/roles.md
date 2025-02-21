---
id: storage-roles
title: The Roles within the Sirius Storage 
sidebar_label: Roles
---

# Director Node 

The **Storage Director Node**, or **Drive Owner**, is a role that initiates files storage in the network. It is essentially a client that accepts files and pushes them to [Replicators](#replicator-responsibilities). When initiating a [Drive](built_in_features/drive.md), a virtual drive is created for the customers to manage their files and directories. Before creating a new Drive, the Owner must prepare and create a new Drive account.

In an autonomous storage network, customers usually access their acquired storage via an easy to use interface. The inner workings of this interface is programmatically designed to accept files or even directories from the customer. The role of the Drive Owner is to provide an easy way for their customers to access the storage they provided.

## Price and Token Economy

Drive Owners as storage providers accept payments from the Drive customers. These payments, in turn, are used to pay for Replicators on the network. A Drive must have enough XPX before it can push files to Replicators. Exchange protocol kicks in that will convert XPX to [Service Units](economy.md#sirius-internal-digial-assets-sdas), which will then be accepted by Replicators.

## Drive Owner Responsibilities

* The Owner creates a [Drive](built_in_features/drive.md) account and prepares it with desired properties. When the Drive is prepared, the Owner must transfer [XPX](economy.md#sirius-platform-native-token--xpx) to the Drive balance that must be enough to pay for at least one billing period.

* The Owner can upload, remove, rename, move, and download files and directories to and from the Drive. Every action has its price and must be paid by the Owner.

* The Owner makes payments to the Drive account. When there is not enough XPX on the Drive balance to pay for the next billing period, the Drive will be automatically closed.


# Replicator Node

The **[Storage Replicator](#replicator-responsibilities)** and the **[Verifier](#verifier-responsibilities)** are the same node with different roles. This node stores the [Storage Director](#director-node)'s data (and gets paid for this), and also verifies other [Replicators](#replicator-responsibilities).

## Replicator Responsibilities

1. Replicator nodes search for and join active [Drives](built_in_features/drive.md). When a Replicator wants to join a Drive, that Replicator makes a deposit equal to the size of the Drive.

2. Replicator nodes store the [Storage Director](#director-node)'s files. When new data should be stored, the Storage Director sends this data to the Replicator nodes, and they store it until the [Drive](built_in_features/drive.md)'s contract is expired or the [Drive](built_in_features/drive.md) itself is closed.

3. Replicator nodes confirm that they actually store the files. [Verifiers](#verifier-responsibilities) regularly check that the Replicators store correct and undamaged files. To do this, [Verifiers](#verifier-responsibilities) use the [Challenge](challenge.md). Verified Replicator nodes, called **Provers**, must generate and send a response according to the verification protocol that is formed using the stored data. Replicators that fail the verification are removed from the Drive.

## Verifier Responsibilities

The **Verifier** is a node that checks that data stored by [Storage Replicator](#replicator-responsibilities) nodes is untouched and safe. It uses the [Challenge](challenge.md) to control Replicators and to prevent corruption and loss of the [Storage Director](#director-node)'s data. The Verifier begins [verifications](verification.md) automatically on specific blocks, depending on the hash of the block, the key of the [Drive](built_in_features/drive.md), and a special constant that is set in the network configuration and which regulates the frequency of the verifications.

According to the verification algorithm, a Verifier that fails verification loses its deposit. That deposit will be divided between Replicators of that Drive. Since the main goal of any Storage Replicator node is to make profit, it is interested in verifications.


# Supercontract Executor

One key role of a Sirius Storage node is being a **Supercontract Executor**. In Supercontracts, all contract files are stored on Sirius Storage, when a contract code is called upon for execution, the group of replicators who handles or stores the contract code becomes [executors](#supercontract-executor). The execution run through a consensus and in the end, the replicator who accepts to sign the execution will be the one assigned to execute the digital contract code.

**Here are the steps in contract execution:**

1. A [Drive owner](#director-node) uses the command line interface or the availabe tools to deploy [SC](built_in_features/supercontract.md).
2. Any DFMS user that is interested in the [SC](built_in_features/supercontract.md) function execution publishes to Blockchain the `execute transaction`.
3. [Executors](#supercontract-executor) get this transaction and automatically start the [SC](built_in_features/supercontract.md) execution.
4. When the function is finished all [Drive](built_in_features/drive.md) participants sign the execution result.

Executors are motivated to perform [SCs](built_in_features/supercontract.md) by rewards. They get rewards if they sign a transaction with the [SC](built_in_features/supercontract.md) results. It provides the consensus and clarity of the results obtaining mechanism during the execution of [SC](built_in_features/supercontract.md).

## Storage Executor Responsibilities

Bases on previous steps any [executor](#supercontract-executor) has next obligations:

1. Execute the particular function of the [SC](built_in_features/supercontract.md)
2. Sign all obtained results from Blockchain that are connected with [SC](built_in_features/supercontract.md).
