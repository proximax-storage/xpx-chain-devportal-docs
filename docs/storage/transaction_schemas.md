---
id: storage-transaction-schemas
title: Transaction Schemas
---

## ReplicatorOnboardingTransaction

**Version**: `0x01`

**Entity type**: `0x4662`

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**     | **Type**    | **Description**                                                           |
|------------------|-------------|---------------------------------------------------------------------------|
| Capacity         | `uint64`    | The Storage Size that the Replicator provides                             |
| NodeBootKey      | `Key` (32 bytes)    | The boot public key of the node where this replicator will be running on  |
| Message          | `Hash256` (32 bytes) | The message signed by the boot private key of the node                    |
| MessageSignature | `Signature` (64 bytes) | The signature of the message                                              |


## PrepareBcDriveTransaction

**Version**: `0x01`

**Entity type**: `0x4162`

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**          | **Type** | **Description**                         |
|-----------------------|----------|-----------------------------------------|
| DriveSize             | `uint64` | Size of drive in MB                     |
| VerificationFeeAmount | `uint64` | Amount of XPXs to transfer to the drive |
| ReplicatorCount       | `uint16` | Number of replicators                   |


## DriveClosureTransaction

**Version**: `0x01`

**Entity type**: `0x4E62`

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property** | **Type**         | **Description**         |
|--------------|------------------|-------------------------|
| DriveKey     | `Key` (32 bytes) | Public key of the drive |


## StoragePaymentTransaction

**Version**: `0x01`

**Entity type**: `0x4A62`

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property** | **Type**         | **Description**                                  |
|--------------|------------------|--------------------------------------------------|
| DriveKey     | `Key` (32 bytes) | Public key of the drive                          |
| StorageUnits | `uint64`         | Amount of storage units to transfer to the drive |


## ReplicatorOffBoardingTransaction

**Version**: `0x01`

**Entity type**: `0x4762`

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property** | **Type**         | **Description**         |
|--------------|------------------|-------------------------|
| DriveKey     | `Key` (32 bytes) | Public key of the drive |


## DataModificationTransaction

**Version**: `0x01`

**Entity type**: `0x4262`

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**        | **Type**             | **Description**                         |
|---------------------|----------------------|-----------------------------------------|
| DriveKey            | `Key` (32 bytes)     | Public key of the drive                 |
| DownloadDataCdi     | `Hash256` (32 bytes) | Download data CDI of modification       |
| UploadSizeMegabytes | `uint64`             | Size of upload in MB                    |
| FeedbackFeeAmount   | `uint64`             | Amount of XPXs to transfer to the drive |


## DataModificationCancelTransaction

**Version**: `0x01`

**Entity type**: `0x4562`

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**       | **Type**             | **Description**                                               |
|--------------------|----------------------|---------------------------------------------------------------|
| DriveKey           | `Key` (32 bytes)     | Public key of the drive                                       |
| DataModificationId | `Hash256` (32 bytes) | Identifier of the transaction that initiated the modification |


## DownloadTransaction

**Version**: `0x01`

**Entity type**: `0x4362`

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**          | **Type**                | **Description**                     |
|-----------------------|-------------------------|-------------------------------------|
| DriveKey              | `Key` (32 bytes)        | Public key of the drive             |
| DownloadSizeMegabytes | `uint64`                | Prepaid Download Size in Mb         |
| FeedbackFeeAmount     | `uint64`                | XPXs to lock for future payment for |
| ListOfPublicKeysSize  | `uint16`                | Size of the list of public keys     |
| ListOfPublicKeys      | `Key[]` (32 bytes each) | List of public keys                 |


## DownloadPaymentTransaction

**Version**: `0x01`

**Entity type**: `0x4962`

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**          | **Type**             | **Description**                                                        |
|-----------------------|----------------------|------------------------------------------------------------------------|
| DownloadChannelId     | `Hash256` (32 bytes) | The identifier of the download channel                                 |
| DownloadSizeMegabytes | `uint64`             | Download size in Mb to add to the prepaid size of the download channel |
| FeedbackFeeAmount     | `uint64`             | Amount of XPXs to transfer to the download channel                     |


## FinishDownloadTransaction

**Version**: `0x01`

**Entity type**: `0x4862`

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**      | **Type**             | **Description**                                    |
|-------------------|----------------------|----------------------------------------------------|
| DownloadChannelId | `Hash256` (32 bytes) | The identifier of the download channel             |
| FeedbackFeeAmount | `uint64`             | Amount of XPXs to transfer to the download channel |


## VerificationPaymentTransaction

**Version**: `0x01`

**Entity type**: `0x4C62`

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction)
  or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

| **Property**          | **Type**         | **Description**                         |
|-----------------------|------------------|-----------------------------------------|
| DriveKey              | `Key` (32 bytes) | Public key of the drive                 |
| VerificationFeeAmount | `uint64`         | Amount of XPXs to transfer to the drive |
