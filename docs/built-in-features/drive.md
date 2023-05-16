---
id: drive
title: Drive
---

<div class="info">

**Note** \
Below are described only schemas of transactions related with Drive. For more detail about Drive see [storage docs](https://storagedocs.xpxsirius.io/docs/built_in_features/drive/overview/).

</div>

## Schemas

## PrepareDriveTransaction

Sends a new transaction for preparing a new drive with defined parameters.

**Version**: 0x01

**Entity type**: 0x415A

**Signer**: owner

|   **Property**   | **Type** |                               **Description**                               |
| :--------------: | :------: | :-------------------------------------------------------------------------: |
|      owner       | 32 bytes |           The PublicAccount of an owner who wants to create drive           |
|     duration     |  uint64  |                           The drive duration                                |
|  billingPeriod   |  uint64  |                              The payout frequency                           |
|   billingPrice   |  uint64  |                         The price of one billing period                     |
|    driveSize     |  uint64  |                            The size of drive                                |
|     replicas     |  uint16  |                          The count of drive copies                          |
|  minReplicators  |  uint16  |       The minimum count of replicators for starting to execute drive        |
| percentApprovers |  uint8   | The percentage of signatures for accepting any transaction (recommended 67) |

## JoinToDriveTransaction

Sends a new join transaction to drive.

**Version**: 0x01

**Entity type**: 0x425A

**Signer**: replicator

| **Property** | **Type** | **Description** |
| :----------: | :------: | :-------------: |
|   driveKey   | 32 bytes | Key of a drive  |

## DriveFileSystemTransaction

Changes a drive file system.

**Version**: 0x01

**Entity type**: 0x435A

**Signer**: driveAccount

|    **Property**    | **Type** |            **Description**             |
| :----------------: | :------: | :------------------------------------: |
|      driveKey      | 32 bytes |             Key of a drive             |
|      RootHash      | Hash256  |  A new file system hash after changes  |
|    XorRootHash     | Hash256  | An old file system hash before changes |
|  AddActionsCount   |  uint16  |          Count of add actions          |
| RemoveActionsCount |  uint16  |        Count of remove actions         |

## FilesDepositTransaction

Blocks mosaics at the rate of a file size.

**Version**: 0x01

**Entity type**: 0x445A

**Signer**: driveAccount

| **Property** | **Type** |  **Description**   |
| :----------: | :------: | :----------------: |
|   driveKey   | 32 bytes |   Key of a drive   |
|  FilesCount  |  uint16  | Count of new files |

## EndDriveTransaction

Terminates a drive execution.

**Version**: 0x01

**Entity type**: 0x455A

**Signer**: driveAccount or owner

| **Property** | **Type** | **Description** |
| :----------: | :------: | :-------------: |
|   driveKey   | 32 bytes | Key of a drive  |

## DriveFilesRewardTransaction

Sends rewards for files.

**Version**: 0x01

**Entity type**: 0x465A

**Signer**: driveAccount

|   **Property**   | **Type** |     **Description**     |
| :--------------: | :------: | :---------------------: |
| UploadInfosCount |  uint16  | Count of uploaded files |

## StartDriveVerificationTransaction

Starts verifying files storing.

**Version**: 0x01

**Entity type**: 0x475A

**Signer**: replicator or owner

| **Property** | **Type** | **Description** |
| :----------: | :------: | :-------------: |
|   driveKey   | 32 bytes | Key of a drive  |

## EndDriveVerificationTransaction

Ends verifying files storing.

**Version**: 0x01

**Entity type**: 0x485A

**Signer**: driveAccount
