---
id: storage
title: Storage
---

ProximaX provides decentralized data storage and distribution, media streaming, execution of Supercontracts, payments, and asset exchange that are closely linked into a single ecosystem based on the Sirius blockchain.

### Owner

To create the Drive, the Owner should send a [PrepareDriveTransaction](#preparedrivetransaction) indicating the size of the new Drive, the desired number of Replicators, and other parameters.

Once per `Billing Period (4 weeks)`, Harvesters make payment for the Storage, so the Drive account should have enough Storage Units. To replenish the Storage Units, the Drive Owner can send at any time [StoragePaymentTransaction](#storagepaymenttransaction).

To perform a modification, the Owner must form the action list that contains all actions which must be executed by the Replicators and post it on the blockchain via [DataModificationTransaction](#datamodificationtransaction). The Owner has the possibility to cancel the modification with [DataModificationCancelTransaction](#datamodificationcanceltransaction). In this case the Owner still has to pay the Replicators for the modification.

To close the Drive, the Owner should send a [DriveClosureTransaction](#driveclosuretransaction). Unspent funds will be returned to the Owner.

### Replicator

To provide the Storage, the Replicator should release [ReplicatorOnboardingTransaction](#replicatoronboardingtransaction) and prove its space with collateral. The real free space on the Replicator’s hard Drive MUST be at least twice larger than the mentioned in the [ReplicatorOnboardingTransaction](#replicatoronboardingtransaction) to provide the possibility of rollbacks.

With a special algorithm, the Replicator will be automatically attached to a Drive.

The replicator leaves the Drive if it was closed or the next `Billing Period` has not been paid. Also, the replicator could be excluded from the Drive based on the results of the verification.

To offboard the Replicator should release the [ReplicatorOffBoardingTransaction](#replicatoroffboardingtransaction). The Replicator receives the payments for the work at the end of the `Billing Period`, and returns the deposit for the Drive, but losses part of its Streaming Deposit. This amount compensates for further data uploading during substitution.

### Content Consumer

To be able to download data from a Drive, the Content Consumer should open a Download Channel on this Drive and prepay some amount via [DownloadTransaction](#downloadtransaction). Any node that can issue this transaction indicated the list of Public keys (Content Consumers) that can download files within this channel. If this node wants to grant free downloading to any interested node, it records zero-key in this field. Once per `Download Billing Period (24h)`, some amount of locked money will be paid to the Replicators.

The Content Consumer or another Sponsor can increase the locked amount of each currency by posting [DownloadPaymentTransaction](#downloadpaymenttransaction).

The units are locked until the node that opened the download channel doesn’t ask to return them via the [FinishDownloadTransaction](#finishdownloadtransaction).

## Guides

TODO

## Schemas

### ReplicatorOnboardingTransaction

**Version**: 0x01

**Entity type**: 

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property** | **Type** | **Description**                               |
| ------------ | -------- | --------------------------------------------- |
| Capacity     | uint64   | The Storage Size that the Replicator provides |

### PrepareDriveTransaction

**Version**: 0x01

**Entity type**: 

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**          | **Type** | **Description**                          |
| --------------------- | -------- | ---------------------------------------- |
| DriveSize             | uint64   | Size of drive                            |
| VerificationFeeAmount | uint64   | TAmount of XPXs to transfer to the drive |
| ReplicatorCount       | uint16   | Number of replicators                    |

### DriveClosureTransaction

**Version**: 0x01

**Entity type**: 

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property** | **Type** | **Description**         |
| ------------ | -------- | ----------------------- |
| DriveKey     | 32 bytes | Public key of the drive |

### StoragePaymentTransaction

**Version**: 0x01

**Entity type**: 

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property** | **Type** | **Description**                                  |
| ------------ | -------- | ------------------------------------------------ |
| DriveKey     | 32 bytes | Public key of the drive                          |
| StorageUnits | uint64   | Amount of storage units to transfer to the drive |

### ReplicatorOffBoardingTransaction

**Version**: 0x01

**Entity type**: 

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property** | **Type** | **Description**         |
| ------------ | -------- | ----------------------- |
| DriveKey     | 32 bytes | Public key of the drive |

### DataModificationTransaction

**Version**: 0x01

**Entity type**: 

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**      | **Type** | **Description**                         |
| ----------------- | -------- | --------------------------------------- |
| DriveKey          | 32 bytes | Public key of the drive                 |
| DownloadDataCdi   | 32 bytes | Download data CDI of modification       |
| UploadSize        | uint64   | Size of upload                          |
| FeedbackFeeAmount | uint64   | Amount of XPXs to transfer to the drive |

### DataModificationCancelTransaction

**Version**: 0x01

**Entity type**: 

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**    | **Type** | **Description**                                               |
| --------------- | -------- | ------------------------------------------------------------- |
| DriveKey        | 32 bytes | Public key of the drive                                       |
| DownloadDataCdi | 32 bytes | Identifier of the transaction that initiated the modification |

### DownloadTransaction

**Version**: 0x01

**Entity type**: 

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**         | **Type** | **Description**                     |
| -------------------- | -------- | ----------------------------------- |
| DriveKey             | 32 bytes | Public key of the drive             |
| DownloadSize         | uint64   | Prepaid Download Size               |
| FeedbackFeeAmount    | uint64   | XPXs to lock for future payment for |
| ListOfPublicKeysSize | uint16   | Size of the list of public keys     |
| ListOfPublicKeys     | 32 bytes | List of public keys                 |

### DownloadPaymentTransaction

**Version**: 0x01

**Entity type**: 

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**      | **Type** | **Description**                                                  |
| ----------------- | -------- | ---------------------------------------------------------------- |
| DownloadChannelId | 32 bytes | The identifier of the download channel                           |
| DownloadSize      | uint64   | Download size to add to the prepaid size of the download channel |
| FeedbackFeeAmount | uint64   | Amount of XPXs to transfer to the download channel               |

### FinishDownloadTransaction

**Version**: 0x01

**Entity type**: 

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**      | **Type** | **Description**                        |
| ----------------- | -------- | -------------------------------------- |
| DownloadChannelId | 32 bytes | The identifier of the download channel |

### VerificationPaymentTransaction

**Version**: 0x01

**Entity type**: 

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**          | **Type** | **Description**                         |
| --------------------- | -------- | --------------------------------------- |
| DriveKey              | 32 bytes | Public key of the drive                 |
| VerificationFeeAmount | uint64   | Amount of XPXs to transfer to the drive |

### EndDriveVerificationTransaction

**Version**: 0x01

**Entity type**: 

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**              | **Type**                                    | **Description**                                   |
| ------------------------- | ------------------------------------------- | ------------------------------------------------- |
| DriveKey                  | 32 bytes                                    | Public key of the drive                           |
| VerificationTrigger       | 32 bytes                                    | The hash of block that initiated the Verification |
| ProversCount              | uint16                                      | Number of Provers                                 |
| VerificationOpinionsCount | uint16                                      | Number of Verification opinions                   |
| Key                       | 32 bytes                                    | Public Keys of the Provers                        |
| VerificationOpinions      | [VerificationOpinion](#verificationopinion) | Verification opinions                             |


#### VerificationOpinion

| **Property** | **Type**          | **Description**                                                        |
| ------------ | ----------------- | ---------------------------------------------------------------------- |
| Verifier     | uint16            | Index of Prover from Provers array                                     |
| Signature    | 64 bytes          | Signatures of opinions                                                 |
| Results      | [Result](#result) | Opinion about verification results for each Prover. Success or Failure |

#### Result

| **Property** | **Type** | **Description**                                                      |
| ------------ | -------- | -------------------------------------------------------------------- |
| Prover       | uint16   | Index of Prover from Provers array                                   |
| Result       | bool     | Opinion about verification result for the Prover. Success or Failure |
