---
id: storage
title: Storage
---

ProximaX provides decentralized data storage and distribution. More info by the [link](https://storagedocs.xpxsirius.io).

### Owner

To create the Drive, the Owner should send a [PrepareDriveTransaction](#preparedrivetransaction) indicating the size of
the new Drive, the desired number of Replicators, and other parameters.

Once per `Billing Period (4 weeks by default, value is saved in the BC config)`, Harvesters make payment for the Storage, so the Drive account should have enough
Storage Units. To replenish the Storage Units, the Drive Owner can send at any
time [StoragePaymentTransaction](#storagepaymenttransaction).

To perform a modification, the Owner must form the action list that contains all actions which must be executed by the
Replicators and post it on the blockchain via [DataModificationTransaction](#datamodificationtransaction). The Owner has
the possibility to cancel the modification with [DataModificationCancelTransaction](#datamodificationcanceltransaction).
In this case the Owner still has to pay the Replicators for the modification.

To close the Drive, the Owner should send a [DriveClosureTransaction](#driveclosuretransaction). Unspent funds will be
returned to the Owner.

### Replicator

To provide the Storage, the Replicator should
release [ReplicatorOnboardingTransaction](#replicatoronboardingtransaction) and prove its space with collateral. The
real free space on the Replicator’s hard drive MUST be at least twice larger than mentioned
in [ReplicatorOnboardingTransaction](#replicatoronboardingtransaction) to provide the possibility of rollbacks.

With a special algorithm, the Replicator will be automatically attached to a Drive.

The replicator leaves the Drive if it was closed or the next `Billing Period` has not been paid. Also, the replicator
could be excluded from the Drive based on the results of the verification.

To offboard Storage, the Replicator should
release [ReplicatorOffBoardingTransaction](#replicatoroffboardingtransaction). The Replicator receives the payments for
the work at the end of the `Billing Period`, and returns the deposit for the Drive, but loses part of its Streaming
deposit. This amount will be compensated for further data uploading during substitution.

### Content Consumer

To download data from a Drive, the Content Consumer should open a Download Channel on this Drive and prepay some amount
via [DownloadTransaction](#downloadtransaction). Nodes issuing this transaction should contain a list of Public keys (
Content Consumers) that can download files within this channel. If a node wants to grant free downloading to any
interested node, it should record zero-key in this field. Once per `Download Billing Period (24h)`, some amount of
locked money will be paid to the Replicators.

The Content Consumer or another Sponsor can increase the locked amount of each currency by
posting [DownloadPaymentTransaction](#downloadpaymenttransaction).

The units are locked until the node that opened the download channel doesn’t ask to return them via
the [FinishDownloadTransaction](#finishdownloadtransaction).

## Guides

- [Send Data Modification Cancel Transaction](../guides/storage/data-modification-cancel.md)
- [Send Data Modification Transaction](../guides/storage/data-modification.md)
- [Send Download Transaction](../guides/storage/download.md)
- [Send Download Payment Transaction](../guides/storage/download-payment.md)
- [Send Drive Closure Transaction](../guides/storage/drive-closure.md)
- [Send Finish Download Transaction](../guides/storage/finish-download.md)
- [Send Prepare Drive Transaction](../guides/storage/prepare-bc-drive.md)
- [Send Replicator Offboarding Transaction](../guides/storage/replicator-offboarding.md)
- [Send Replicator Onboarding Transaction](../guides/storage/replicator-onboarding.md)
- [Send Storage Payment Transaction](../guides/storage/storage-payment.md)
- [Send Verification Payment Transaction](../guides/storage/verification-payment.md)

## Schemas

### ReplicatorOnboardingTransaction

**Version**: 0x01

**Entity type**: 0x4662

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**     | **Type**   | **Description**                                                           |
|------------------|------------|---------------------------------------------------------------------------|
| Capacity         | uint64     | The Storage Size that the Replicator provides                             |
| NodeBootKey      | 32 bytes   | The boot public key of the node where this replicator will be running on  |
| Message          | Hash256    | The message signed by the boot private key of the node                    |
| MessageSignature | Signature  | The signature of the message                                              |

### PrepareBcDriveTransaction

**Version**: 0x01

**Entity type**: 0x4162

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**          | **Type** | **Description**                         |
|-----------------------|----------|-----------------------------------------|
| DriveSize             | uint64   | Size of drive in MB                     |
| VerificationFeeAmount | uint64   | Amount of XPXs to transfer to the drive |
| ReplicatorCount       | uint16   | Number of replicators                   |

### DriveClosureTransaction

**Version**: 0x01

**Entity type**: 0x4E62

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property** | **Type** | **Description**         |
|--------------|----------|-------------------------|
| DriveKey     | 32 bytes | Public key of the drive |

### StoragePaymentTransaction

**Version**: 0x01

**Entity type**: 0x4A62

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property** | **Type** | **Description**                                  |
|--------------|----------|--------------------------------------------------|
| DriveKey     | 32 bytes | Public key of the drive                          |
| StorageUnits | uint64   | Amount of storage units to transfer to the drive |

### ReplicatorOffBoardingTransaction

**Version**: 0x01

**Entity type**: 0x4762

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property** | **Type** | **Description**         |
|--------------|----------|-------------------------|
| DriveKey     | 32 bytes | Public key of the drive |

### DataModificationTransaction

**Version**: 0x01

**Entity type**: 0x4262

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**        | **Type** | **Description**                         |
|---------------------|----------|-----------------------------------------|
| DriveKey            | 32 bytes | Public key of the drive                 |
| DownloadDataCdi     | 32 bytes | Download data CDI of modification       |
| UploadSizeMegabytes | uint64   | Size of upload in MB                    |
| FeedbackFeeAmount   | uint64   | Amount of XPXs to transfer to the drive |

### DataModificationCancelTransaction

**Version**: 0x01

**Entity type**: 0x4562

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**       | **Type** | **Description**                                               |
|--------------------|----------|---------------------------------------------------------------|
| DriveKey           | 32 bytes | Public key of the drive                                       |
| DataModificationId | 32 bytes | Identifier of the transaction that initiated the modification |

### DownloadTransaction

**Version**: 0x01

**Entity type**: 0x4362

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**          | **Type** | **Description**                     |
|-----------------------|----------|-------------------------------------|
| DriveKey              | 32 bytes | Public key of the drive             |
| DownloadSizeMegabytes | uint64   | Prepaid Download Size in Mb         |
| FeedbackFeeAmount     | uint64   | XPXs to lock for future payment for |
| ListOfPublicKeysSize  | uint16   | Size of the list of public keys     |
| ListOfPublicKeys      | 32 bytes | List of public keys                 |

### DownloadPaymentTransaction

**Version**: 0x01

**Entity type**: 0x4962

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**          | **Type** | **Description**                                                        |
|-----------------------|----------|------------------------------------------------------------------------|
| DownloadChannelId     | 32 bytes | The identifier of the download channel                                 |
| DownloadSizeMegabytes | uint64   | Download size in Mb to add to the prepaid size of the download channel |
| FeedbackFeeAmount     | uint64   | Amount of XPXs to transfer to the download channel                     |

### FinishDownloadTransaction

**Version**: 0x01

**Entity type**: 0x4862

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**      | **Type** | **Description**                                    |
|-------------------|----------|----------------------------------------------------|
| DownloadChannelId | 32 bytes | The identifier of the download channel             |
| FeedbackFeeAmount | 32 bytes | Amount of XPXs to transfer to the download channel |

### VerificationPaymentTransaction

**Version**: 0x01

**Entity type**: 0x4C62

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**          | **Type** | **Description**                         |
|-----------------------|----------|-----------------------------------------|
| DriveKey              | 32 bytes | Public key of the drive                 |
| VerificationFeeAmount | uint64   | Amount of XPXs to transfer to the drive |
