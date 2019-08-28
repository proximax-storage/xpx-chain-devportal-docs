---
id: transfer-transaction
title: Transfer Transaction
---

Transfer transactions are used to send [mosaics](./mosaic.md) between two [accounts](./account.md).

![Transfer Transaction](/img/transfer-transaction.png "Transfer Transaction")

<p class="caption">Alice sends 10 cat.currency to Bob</p>


## Recipient

The recipient is the address of the [account](./account.md) that receives the transfer transaction.

It is possible to send mosaics to any valid address, even if the address has not previously participated in any transaction.

<div class="info">

**Note**

If nobody owns the private key of the recipient’s account, the funds are most likely lost forever.
</div>

## Mosaics

A [mosaic](./mosaic.md) could be a token, but it could also be more specialized assets such as reward points, shares of stock, signatures, status flags, votes or even other currencies.

You can send a combination of different mosaics in the same transaction.

## Message

A transfer transaction can hold a message up to `1023` characters in length, making them suitable for timestamping data permanently on the blockchain.

The messages attached are visible by default to all network participants.

## Encrypted message

Encrypted messages are only accessible by the sender and the recipient.

Sirius-Chain uses Bouncy Castle’s AES block cipher implementation in [CBC](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#CBC) mode to encrypt and decrypt messages.

The client-side handles the encryption and decryption of the message. You can find under the `crypto` module how to encode and decode encrypted messages, but we recommend you to use the available SDK public methods instead.

## Guides

- [Sending a transfer transaction](../guides/transaction/sending-a-transfer-transaction.md)

    Transfer [*mosaics*](./mosaic.md) and messages between two accounts.

- [Monitoring a transaction status](../guides/monitoring/monitoring-a-transaction-status.md)

    Make sure a [*transaction*](../protocol/transaction.md) gets included in the blockchain after being announced.

- [Sending an encrypted message](../guides/monitoring/sending-an-ecrypted-message.md)

    Send an enctypted message that only can be read by the recipient account.

## Schemas

<div class="info">

**Note**

Configuration parameters are [editable](https://github.com/proximax-storage/cpp-xpx-chain/blob/master/resources/config-network.properties) . Public network configuration may differ.

</div>

### TransferTransaction

Announce a transfer transaction to send [mosaics](./mosaic.md) or messages between two [accounts](./account.md).

**Version**: 0x03

**Entity type**: 0x4154

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

**Property** |	**Type** |	**Description**
-------------|-----------|--------------------
recipient |	25 bytes (binary) |	The address of the recipient account.
messageSize |	uint16 |	The size of the attached message.
mosaicsCount |	uint8 |	The number of attached mosaics.
message |	array(byte, messageSize) |	The message type (0) and a payload of up to `1023` bytes.
mosaics |	array([UnresolvedMosaic](./mosaic.md#unresolvedmosaic), mosaicsCount) |	The different mosaic to be sent.

