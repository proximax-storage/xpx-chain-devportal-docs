---
id: websockets
title: Websockets
---
WebSockets make receiving notifications possible when a transaction or event occurs in the blockchain. The notification is received in real time without having to poll the API waiting for a reply.

Interaction with API WebSockets in [XPX-Chain-SDK](../sdks/overview.md) is done with **Listeners**.

## Channels

**block**

The block channel notifies for every new block. The message contains the block information.

**confirmedAdded/<ADDRESS>**

The confirmedAdded channel notifies when a transaction related to an address is included in a block. The message contains the transaction.

**unconfirmedAdded/<ADDRESS>**

The unconfirmedAdded channel notifies when a transaction related to an address is in unconfirmed state and waiting to be included in a block. The message contains the transaction.

Possible scenarios when this channel notifies are when the transaction is announced to the network via `PUT /transaction` HTTP endpoint or when an aggregate bonded transaction has all required co-signers and changed its state from *partial* to *unconfirmed*.

**unconfirmedRemoved/<ADDRESS>**

The unconfirmedRemoved channel notifies when a transaction related to an address was in unconfirmed state but is not anymore. The message contains the transaction hash.

Possible scenarios when this channel notifies are: when the transaction now is confirmed or when the deadline has been reached and it was not included in a block.

**partialAdded/<ADDRESS>**

The partialAdded channel notifies when an aggregate bonded transaction related to an address is in partial state and waiting to have all required cosigners. The message contains a transaction.

The scenario when this channel notifies is when an aggregate bonded transaction is announced to the network via `PUT /transaction/partial` HTTP endpoint.

**partialRemoved/<ADDRESS>**

The partialRemoved channel notifies when a transaction related to an address was in partial state but is not anymore. The message contains the transaction hash.

Possible scenarios when this channel notifies are when the transaction now is in unconfirmed or the deadline has been reached and it was not included in a block.

**cosignature/<ADDRESS>**

The cosignature channel notifies when a cosignature signed transaction relates to an address is added to an aggregate bonded transaction with partial state. The message contains the co-signature signed transaction.

**status/<ADDRESS>**

The status channel notifies when a transaction related to an address rises an [errors](./status-errors.md). The message contains the error message and the transaction hash.