---
id: storage-setting-up
title: Participate
---
This guide explains what software you need to install and how to start using the [Sirius Storage](overview.md).

## Sirius Storage nodes

It's important to understand that there are two types of storage nodes, Client and a Replicator. This two types are all in the different binary and each has its own purpose.

- Client Node is primarily used by the client to access Sirius Storage management commands. This is the tool to allow users to manage files on Sirius Storage platform which are then pushed (flushed) to replicators.

- Replicator Node are primarily the replication node where content uploaded by the Sirius Storage node client is propagated. Replicators are inherently verifiers and executors as well.

## Participate in the Storage Sirius network ecosystem

### Run a Client node
In a fact Client node it is a native pre-build application (Storage Tool). Web-client will be added in future.
You can configure and download it via the [reference](https://github.com/proximax-storage/xpx-testnet-chain-onboarding/blob/storage-tool/storage-tool/README.md)

### Run a Replicator Node
In order to run a replicator node, we need to install the additional tools first. Install `docker` and `git`
```
$ curl -fsSL https://get.docker.com -o get-docker.sh
$ sh get-docker.sh
$ sudo apt install git
```

Clone the onboarding repository (choose between mainnet and testnet <network> )
```
$ git clone https://github.com/proximax-storage/sirius-storage-<network>-onboarding.git // testnet
$ cd sirius-storage<network>-onboarding
```

At this point, we now have the entire binary on your local environment. We now need to run a few commands to properly participate as a Replicator Node.
Go to the onboarding document for further steps:

|Network|Link|
|---|---
|Test Network|https://github.com/proximax-storage/sirius-storage-testnet-onboarding/blob/master/drive/README.md
|Main Network|https://github.com/proximax-storage/sirius-storage-mainnet-onboarding/blob/master/drive/README.md

### Run a Replicator Node
In order to run a storage drive node, we need to install the [`dfmsr`](https://storagedocs.xpxsirius.io/docs/cli/dfmsr/dfmsr/).
For more details about Replicator Node, follow the [reference](https://storagedocs.xpxsirius.io/docs/cli/dfmsr/dfmsr/).

### SuperContract
For the correct work with SC a user should install the [wabt](https://github.com/WebAssembly/wabt/tree/1.0.13). This toolkit needed for the correct compilation from **_\*.wat_** to **_\*.wasm_**. After instalation it should be added to the **_$PATH_** env var. More about wabt you can find by [reference](https://github.com/WebAssembly/wabt/tree/1.0.13).

### More commands
More commands are availabe via the links below.
- For [dfms](https://storagedocs.xpxsirius.io/docs/cli/dfms/dfms/)
- For [dfmsr](https://storagedocs.xpxsirius.io/docs/cli/dfmsr/dfmsr/)


