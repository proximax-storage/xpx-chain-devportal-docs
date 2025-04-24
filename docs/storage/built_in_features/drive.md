---
id: storage-drive
title: Drive
---

The **Drive** in a nutshell is a representation of a client drive that handles file management system commands. From the Drive [Owner](../roles.md#director-node) perspective, Drive is represented by a local directory, where the Owner can manage their files that are subsequently pushed to [Replicators](../roles.md#replicator-node).

In order for a Drive to become usable, a minimum number of [Replicators](../roles.md#replicator-node) must be assigned to it. This number is governed by Network configuration, and is currently set to `4`.

## Properties

The [Drive](drive.md) has the following properties:

|Property|Description|
|---|---
|Key|Every Drive has a unique identifier.
|Owner|Every Drive has a user who created it.
|RootHash|Unique identifier of the drive state.
|Size|Total Drive space in megabytes.
|UsedSizeBytes|Used Drive space in bytes.
|ReplicatorCount|The amount of [Replicators](replicator.md) that store the Drive's data.
|ActiveDataModifications|List of active Data Modifications.
|CompletedDataModifications|List of completed Data Modifications.
|ConfirmedUsedSizes|Drive Replicators' confirmed used sizes.
|Replicators|List of Replicators' public key assigned to the Drive.
|OffboardingReplicators|List of Replicators that have applied for offboarding.
|Verification|Information about verifications of Replicators.
|DownloadShards|List of Download Channels and Replicators that belong to respective Download Shards.
|DataModificationShards|List of Data Modification Shards.


# Lifecycle

<div class="info">

**Note** <br>
    See [this page](../transaction_schemas.md) for detailed information about transactions schemas.
</div>

## Creating Drive

To create a [Drive](drive.md), the [Owner](../roles.md#director-node) must define *Drive Size* and *Replicators Count*, and then send a `PrepareDrive` transaction.

- ***Drive Size*** is an integer size (in megabytes) of the Drive and must not be less than 1 MB.
- ***Replicators Count*** must be greater than or equal to the minimum count of [Replicators](replicator.md) defined in the Blockchain configuration, which is set to `4` by default.

Drive preparation has no strict time bounds, and the Owner has to wait until Replicators are assigned to the Drive. Any Replicator node can be assigned to the Drive at any time, provided that Replicator has enough free space.

## Billing Period

The duration of the Billing Period is defined to be equal to **4 weeks** by default, but it can be changed in the Blockchain configuration. Once per Billing Period, **Harvesters** make payment for the Storage, so the Drive Owner should pay attention if there are enough Storage Units on the Drive account.

To replenish the Drive account, the Drive Owner can send `StoragePayment` transaction at any time. To prepay the Drive for the next Billing Period, the Drive Owner (or any other user) should release the StoragePayment Transaction and specify the desired amount of Storage units it wants to pay for the Drive.

As soon as the Billing Period since the last payment according to the time mentioned in the block passes, Harvesters make an automatic payment for the Storage for the past period. If there are not enough [SO units](../economy.md#storage-units--so) for the Drive prolongation, or not enough Verifications were prepaid, then the Drive is closed in compliance with all procedures mentioned in the `DriveClosure` transaction. Since Sirius blockchain is public, there is no possibility to encourage the Replicators to work free of charge, so there is no a so-called buffer zone when the Billing Period has already finished, but the Drive still works.

## Interacting with Drive

During the execution of the [Drive](drive.md), the [Storage Director](../roles.md#director-node) can interact with it, like on other cloud storage. It means that the [Owner](../roles.md#director-node) can upload, remove, rename, move or download files, and create or remove directories (empty directories are not uploaded to the Drive).

Whenever a [Storage Director](../roles.md#director-node) makes any file operation, it changes the [Root Hash](#properties) of the Drive. Blockchain stores this hash publicly, and anyone can get current root hash of any Drive. So, all [Replicator](../roles.md#replicator-node) nodes can easily monitor Drive changes.

To modify the Drive data, the Drive Owner must generate an **Action List** in which all necessary modifications are listed in the required order. The **Content Download Information** (or **CDI**) is generated for the content to be downloaded by the Replicators. This content includes modified files and the Action List. This CDI, along with the size of the content to download (including the Action List), is posted on the blockchain via `DataModification` transaction. The Drive Owner should not lie about the size of data to upload; otherwise, the Replicators will reject the modification. The Drive Owner **must not delete** any of the files that are to be downloaded by the Replicators until the modification is finished.

Data Modification begins with a `DataModificationApproval` transaction being posted on the blockchain. Until this transaction is approved, the Drive Owner is allowed to cancel the Modification with `DataModificationCancel` transaction. If Data Modification is cancelled for any reason (either via `DataModificationCancel` transaction, or by being discarded by the Replicators), the Drive Owner still has to pay the Replicators for the Modification.

When the Replicator begins to process the Modification, it tries to download necessary data based on the CDI mentioned in the transaction. This data consists of two parts:

- **Action List**, which contains all the actions which should be executed during Data Modification.
- **Modified Files** that should be downloaded by the Replicator to fulfill the requirements of the Action List.

#### The possible actions in the Action List are:
- File Creation;
- File Modification;
- File Removal;
- File Renaming/Moving;
- Folder Creation (must contain at least one file or one non-empty folder);
- Folder Removal;
- Folder Renaming/Moving.

### Uploading

When a [Storage Director](../roles.md#director-node) node uploads new files, it fills the Actions List, where file hashes and their sizes are indicated. Blockchain automatically transfers *fileSize \* replicatorCount* [SM units](../economy.md#streaming-units--sm) for each file from the [Storage Director](../roles.md#director-node) account to the [Drive](drive.md) account. These SDAs are rewards for [Replicator](../roles.md#replicator-node) nodes and the Storage Director node for file spreading (the Storage Director can also receive part of its SDAs back).

The transaction can be rejected in the following cases:

- The Storage Director doesn't have enough [SDAs](../economy.md);
- The blockchain already contains the Modification with the same hash;
- Not enough space left on the Drive.

As soon as the File Structure is generated, each Replicator signs the `DataModificationApproval` transaction and mentions a new File Structure CDI and other necessary information. If the Modification fails, then the Replicator mentions the necessary information based on the old Drive State.

The Data Modification is considered as a failed one if any of the following conditions is satisfied:

- The actual size of the downloaded data exceeds the size declared in the `DataModification` transaction (such download should be interrupted as soon as the excess is discovered).
- The downloaded data does not contain the Action List.
- The Action List is corrupted or contains invalid actions.
- An error with the interaction with the File System has occurred.
- The size of the Drive after applying the action list exceeds the ordered Drive Size.

If the Data Modification has not failed, as soon as the `DataModificationApproval` transaction is added to the blockchain, the [Replicators](../roles.md#replicator-node) now apply the Action List not virtually. It works with the real state of the [Drive](drive.md), loading the necessary files and applying the changes to the Drive file system.

### Downloading

In this procedure, two roles are distinguished:

- **Downloader** — a [Replicator](../roles.md#replicator-node) which downloads the file.
- **Uploader** — a node which can upload the requested piece of the file. They can be Replicators who already downloaded the piece or the Drive Owner.

To be able to download data from the desired Drive, a **Content Consumer** or a **Sponsor** must open a **Download Channel** on this Drive and prepay some amount via `Download` transaction. Any node that can issue this transaction must also indicate a list of Public Keys (Content Consumers) that are allowed to download files within this channel. If this node wants to grant free downloading to any interested node, it must put a zero-key in this field.

In this transaction, the Content Consumer or a Sponsor locks:

- [SM units](../economy.md#streaming-units--sm) — needed to pay for the Replicators' work,
- [XPX](../economy.md#sirius-platform-native-token--xpx) - needed to pay for the `DownloadApproval` transaction made by the Replicators.

The Content Consumer or another Sponsor can increase the locked amount of each currency by posting `DownloadPayment` transaction.

### Drive Closure

If the Drive Owner wishes to close the Drive, they posts the `DriveClosure` transaction. When the `DriveClosure` transaction is posted on the blockchain, besides closing the Drive, all pending Data Modifications are canceled as via `DataModificationCancel` transaction with one caveat: only the first pending Data Modification is paid, as it is mentioned in `DataModificationCancel` transaction, and others are canceled free of charge. The reason for this policy is simple: we do not want the Drive Owner to be able to force the Replicators to download a large amount of data free of charge, so we make the Owner pay for the first pending modification. However, since all modifications are executed sequentially, we can be sure that the Replicators have not started executing all other pending modifications. So, the payment for them can be returned to the Drive Owner. Those Replicators who have not approved modifications that have been approved by the `DataModificationApproval` transaction receive rewards for these modifications.

The Drive contract is finished when the Drive duration is over. Besides that, the Drive can be terminated before the deadline. It can happen when:

- The [Director Node](../roles.md#director-node) decides to terminate the Drive.
- The [Drive](drive.md) does not have enough [SDAs](../economy.md) to start the next [Billing Period](#billing-period).

After the end of the Drive duration, all [Replicator](../roles.md#replicator-node) nodes receive their deposits back.
