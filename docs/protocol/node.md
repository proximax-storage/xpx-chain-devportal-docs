---
id: node
title: Node
---
The Sirius-Chain platform is built from a network of nodes. These nodes provide a powerful, stable, and secure platform where Smart Assets transactions are conducted, searched, and immutably logged to the blockchain ledger.

![Four Layer Architecture](/img/four-layer-architecture.png "Four Layer Architecture")

<p class="caption">Sirius-Chain’s Performance Advantage: A Four-Layered Architecture</p>

The four-layered architecture allows developers to update any of these tiers without disrupting the others, which improves security.

## P2P Component

**Repository**: [Sirius-Chain Server](https://github.com/proximax-storage/catapult-server)

The P2P nodes form the backbone of the blockchain, making the network robust since it cannot be shut down by eliminating a single entity. The role of the node is to [verify transactions](./transaction.md#announcing-a-transaction) and [blocks](./block.md), run the consensus algorithm, create new blocks, and propagate the changes through the network.

The API push new transactions to the P2P network, where they are [included in a block](./validating.md) or discarded. After the block is processed:

- The binary of the block is saved on disk as a flat file.
- The updated chain state is saved in memory or RocksDB (configurable).

## Node reputation

Public networks enable anyone to run a node. Some of these nodes could share invalid information or try to disturb the network.

To reduce communication attempts, the nodes keep track of the results of preceding communications.

When a node connects to a remote peer, the first increments the trust towards the remote. Otherwise, the node increments the failure counter. Likewise, the node updates the trust counters accordingly after processing the data requested.

From these interactions, the node assigns a weight between 500 and 10000 to every peer reached.

The probability of selecting a remote node depends linearly on its weight. Every four rounds of node selections, the criteria changes to prevent [Sybil attacks](https://en.wikipedia.org/wiki/Sybil_attack). The node selects a peer with high importance instead.

## RocksDB

[RocksDB](https://en.wikipedia.org/wiki/RocksDB) stores the chain state. The data structures cached are serialized and stored as value to a corresponding key. For example, a column maps the public keys to addresses. Another one, the account state entries as the value to corresponding address keys.

Storing the state in memory is usually faster than using RocksDB. However, storing state information in RocksDB demands less memory of the network nodes.

<div class="info">

**Note**

Persisting the state is convenient in networks with a large number of accounts.

</div>

## API Component

**Repository**: [Sirius-Chain REST](https://github.com/proximax-storage/catapult-rest)

The primary responsibility of the API is to store the data in a readable form. Each API instance maintains a MongoDB, and optionally a RocksDB to save the state.

The layer [validates the transactions](./transaction.md#announcing-a-transaction) received from the REST component. Additionally, the API throws the errors back via ZMQ in binary.

This component is also responsible for collecting the cosignatures of [aggregated bonded transactions](../built-in-features/aggregate-transaction.md), that are only pushed to P2P nodes once they are complete.

An API component can connect to multiple P2P nodes, but at least must connect to one.

## MongoDB

[MongoDB](https://es.wikipedia.org/wiki/MongoDB) stores blocks, transactions and chain state for high query performance.

The API updates the MongoDB when:

- A new block / a bunch of blocks finished processing.
- New unconfirmed transactions completed processing.

<div class="info">

**Note**

MongoDB should not be accessed externally.

</div>

## ZMQ

[ZeroMQ](https://en.wikipedia.org/wiki/ZeroMQ) is an asynchronous messaging library, which enables real-time subscriptions. It transports notifications from the API server to the ZMQ endpoint, where the Sirius-Chain REST component listens. It is an alternative to REST WebSockets, aimed to be used when performance is critical.


## REST Component

**Repository**: [Sirius-Chain REST](https://github.com/proximax-storage/catapult-rest)

The REST component handles JSON API client requests. This reads from MongoDB, formats the response, and returns it to the client. This component is responsible as well to return events to the client using [WebSockets](../rest-api/websockets.md).

Each REST component connects to one API instance, sending new transactions using sockets.

## Guides

- [Running Sirius-Chain locally](#)

Deploy a Sirius-Chain full node for learning and development purposes.
