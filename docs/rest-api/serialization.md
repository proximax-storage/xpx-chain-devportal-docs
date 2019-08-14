---
id: serialization
title: Serialization
---
[Catbuffer library](https://github.com/proximax-storage/catbuffer) defines the protocol to serialize and deserialize Sirius-Chain entities. The library comes with code generators for different languages. SDKs and applications use the generated code to interact with REST transaction endpoint.

![Catbuffer](/img/catbuffer.png "Catbuffer")

<p class=caption>XPX-Chain-SDK serialization module</p>

The library accomplishes the following properties:

## Memory Efficiency

Large networks comprise a large number of transactions. Working with binary optimized in size makes the communication faster. Furthermore, reading entities from memory buffers -or just a part of them - is memory efficient.

## Flexibility

REST [transaction endpoints](https://proximax-storage.github.io/api/endpoints.html#operation/announceTransaction) handle the calls to update the blockchain state. The serialized payload of a transaction is appended to the body of the POST call. These endpoints allow the addition of new functionality to the server side without modifying the API contract.

## Reusability

Applications can embed the generated code, without managing dependencies. This is particularly desirable in highly-secure environments. Besides, sharing a common code base enables the addition of new features with less effort.

At the current moment, you can generate buffers for **C++**. Javascript and Python are under development. If you are developing an SDK in another language, please consider coding a new generator.

## Schema

A schema file defines the entity data structure. The library generates the leanest code necessary to serialize and deserialize defined entities.

The following entities are currently supported:

**Schema file** |	**Description**
----------------|-------------------
[entity.cats](https://github.com/proximax-storage/catbuffer/blob/master/schemas/entity.cats) |	Describes an [entity](../protocol/transaction.md#transaction-types).
[accountlink.cats](https://github.com/proximax-storage/catbuffer/blob/master/schemas/accountlink.cats) |	Describes account link transaction.
[hashlock.cats](https://github.com/proximax-storage/catbuffer/blob/master/schemas/hashlock.cats) |	Describes a [hash lock transaction](../built-in-features/aggregate-transaction.md#hashlocktransaction).
[secretlock.cats](https://github.com/proximax-storage/catbuffer/blob/master/schemas/secretlock.cats) |	Describes a [secret lock transaction](../built-in-features/aggregate-transaction.md#secretlocktransaction).
[lockhashtypes.cats](https://github.com/proximax-storage/catbuffer/blob/master/schemas/lockhashtypes.cats) |	Describes the available [hash algorithms](../built-in-features/cross-chain-swaps.md#secretlocktransaction).
[secretproof.cats](https://github.com/proximax-storage/catbuffer/blob/master/schemas/secretproof.cats) |	Describes a [secret proof transaction](../built-in-features/cross-chain-swaps.md#secretprooftransaction).
[transfer.cats](https://github.com/proximax-storage/catbuffer/blob/master/schemas/transfer.cats) |	Describes a [transfer](../built-in-features/transfer-transaction.md#transfertransaction) transaction.
[transaction.cats](https://github.com/proximax-storage/catbuffer/blob/master/schemas/transaction.cats) | Describes a transaction.
[types.cats](https://github.com/proximax-storage/catbuffer/blob/master/schemas/types.cats) |	Describe field types used by other schemas.

## Parsing a schema and generating code

Generate the code for a determined schema in one of the available languages. For example, run the following command to generate C++ code to serialize and deserialize a transfer transaction:

```
$> python main.py -i schemas/transfer.cats -g cpp-builder
```
The generator creates a new file under `_generated/cpp` folder. Repeat the process using a different input schema `(-i)` or generator `(-g)` as needed.

## Writing a schema

Are you writing a new Sirius-Chain plugin that includes a new transaction type?

In this example, we are examining how the [transfer.cats](https://github.com/proximax-storage/catbuffer/blob/master/schemas/transfer.cats) schema works. Follow the same steps to define a new schema.

First off, create a new file under `schemas` folder and define a struct for the transaction body. Think of a struct as a set of properties that we want to store in the same block of memory.

The transaction body contains the extra properties which differ from a basic transaction. Each attribute can have one of the types defined in [types.cats](https://github.com/proximax-storage/catbuffer/blob/master/schemas/types.cats).

```c
# binary layout for a transfer transaction
struct TransferTransactionBody
    # transaction recipient
    recipient = UnresolvedAddress
    # size of attached message
    messageSize = uint16
    # number of attached mosaics
    mosaicsCount = uint8
    # transaction message
    message = array(byte, messageSize)
    # attached mosaics
    mosaics = array(UnresolvedMosaic, mosaicsCount, sort_key=mosaicId)
```

Secondly, define a second transaction struct in the same file. This will contain information about the version of the entity and its identifier. The underlying transaction properties and the particular transaction body are appended as inline.

```c
# binary layout for a non-embedded transfer transaction
struct TransferTransaction
    const uint8 version = 3
    const EntityType entityType = 0x4154

    inline Transaction
    inline TransferTransactionBody
```

Finally, define an EmbeddedTransaction struct. This struct is used to serialize inner transactions. The embedded transaction and the body transaction are added as inline.

```c
# binary layout for an embedded transaction
struct EmbeddedTransaction
    inline SizePrefixedEntity
    inline EntityBody
```

## Integration

### Adding generated code to an SDK

After compiling all the schemas for a selected language, move the generated files to your `model/transaction` SDK folder.

<div class=info>

**Note:**

This section is incomplete. More information will be published once the XPX-Chain-SDK is updated.

</div>
