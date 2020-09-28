---
id: super-contracts
title: Super Contracts
---

Super Contract (SC) guarantees that executors will get rewards if they completely execute and finish SC. If some executor does not execute the SC it does not get rewards.

## Schemas

### DeployTransaction

SC transactions suggest that an owner has an active drive with replicators who become SC executors. Then the owner can add a SC file to the drive with [`DriveFileSystemTransaction`](drive#drivefilesystemtransaction) and after that, the SC can be deployed with **DeployTransaction**. Deployed SC means that in BC there is the multisig account. This SC contains info about SC file hash, Virtual Machine version, info about the drive account to witch it linked, and other info.

**Version**: 0x01

**Entity type**: 0x4160

**Signer**: SC account

| **Property** | **Type**  |                 **Description**                  |
| :----------: | :-------: | :----------------------------------------------: |
|     Key      | 32 bytes  |                   Key of drive                   |
|     Key      | 32 bytes  |             Owner of super contract              |
|   FileHash   |  Hash256  | A hash of according super contract file on drive |
|  VmVersion   | VmVersion |           A version of super contract            |

### StartExecuteTransaction

Any user (initiator) can start SC execution. This should be created and announced a **StartExecuteTransaction** with pointed out a SC public account and a reward that will be charged and transferred to the SC account. If during execution mosaics are not enough SC will be terminated with the corresponded error. Note, in this case, spent mosaics will not be returned.

**Version**: 0x01

**Entity type**: 0x4260

**Signer**: initiator

| **Property** | **Type** |        **Description**        |
| :----------: | :------: | :---------------------------: |
|     Key      | 32 bytes | Key of super contract account |
| FunctionSize |  uint8   |    Function size in bytes     |
| MosaicCount  |  uint8   |       Number of mosaics       |
|   DataSize   |  uint8   |      Data size in bytes       |

### EndExecuteTransaction

A SC can have many operations, they can be started by [`StartExecuteTransaction`](#startexecutetransaction) without function name and ended by **EndOperationTransaction**

**Version**: 0x01

**Entity type**: 0x4360

**Signer**: SC account

### OperationIdentifyTransaction

**Version**: 0x01

**Entity type**: 0x415F

**Signer**: SC account

|  **Property**  | **Type** | **Description** |
| :------------: | :------: | :-------------: |
| OperationToken | Hash256  | Operation token |

### SuperContractFileSystemTransaction

This is the alias for [`DriveFileSystemTransaction`](drive#drivefilesystemtransaction)

**Version**: 0x01

**Entity type**: 0x4460

**Signer**: SC account

### EndOperationTransaction

**Version**: 0x01

**Entity type**: 0x435F

**Signer**: SC account

|  **Property**  |    **Type**     | **Description**  |
| :------------: | :-------------: | :--------------: |
| OperationToken |     Hash256     | Operation token  |
|     Result     | OperationResult | Operation result |

### DeactivateTransaction

When a SC is no longer needed the owner can deactivate it with **DeactivateTransaction** transaction. After that this SC cannot be executed

**Version**: 0x01

**Entity type**: 0x4560

**Signer**: owner

|   **Property**   | **Type** |  **Description**   |
| :--------------: | :------: | :----------------: |
| SuperContractKey | 32 bytes | Super contract key |
|     DriveKey     | 32 bytes |    Key of drive    |
