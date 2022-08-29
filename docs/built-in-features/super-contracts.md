---
id: super-contracts
title: Super Contracts
---

Super Contract (SC) guarantees that executors will get rewards if they completely execute and finish SC. If some executor does not execute the SC it does not get rewards.

## Schemas

### DeployTransaction

Any file on a drive can be presented like a SC with **DeployTransaction**. This will mark the file in blockchain as the new SC. Also, it will be created a new multisig account where the participants are replicators from a drive.

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

A new operation can be started by [`StartExecuteTransaction`](#startexecutetransaction) with function name and possible arguments and ended by **EndOperationTransaction**

**Version**: 0x01

**Entity type**: 0x4360

**Signer**: SC account

### OperationIdentifyTransaction

During SC execution can be generated a range of transactions. With **OperationIdentifyTransaction** the transactions can be marked by identifier as related to some certain function (StartExecutionTransaction).

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
