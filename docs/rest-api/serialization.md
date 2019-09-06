---
id: serialization
title: Serialization
---
[Flatbuffer library](https://google.github.io/flatbuffers/) defines the protocol to serialize and deserialize Sirius-Chain entities. The library comes with code generators for different languages. SDKs and applications use the generated code to interact with REST transaction endpoint.

![Flatbuffer](/img/catbuffer.png "Flatbuffer")

<p class=caption>XPX-Chain-SDK serialization module</p>

The library accomplishes the following properties:

## Memory Efficiency

Large networks compute a large number of transactions. Working with binary optimised in size makes the communication faster. Furthermore, reading entities from memory buffers -or just a part of them - is memory efficient.

## Flexibility

REST [transaction endpoints](/endpoints) handle the calls to update the blockchain state. The serialized payload of a transaction is appended to the body of the POST call. These endpoints allow the addition of new functionality to the server side without modifying the API contract.

## Reusability

You can generate transaction's serializer by using the same [defined schema](https://github.com/proximax-storage/go-xpx-chain-sdk/tree/master/transactions/schemas).

<div class=info>

**Note**

This section is incomplete. More information will be published once the XPX-Chain-SDK is updated.

</div>
