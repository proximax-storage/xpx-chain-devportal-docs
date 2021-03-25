---
id: client-overview
title: Overview
sidebar_label: Overview
---
The Sirius Chain Command Line Interface is a unified tool to interact with the Sirius Chain.

This tool will enable you to perform the most common used actions to interact with the blockchain.

**XPX-Chain-CLI** is an open source tool built on top of the [XPX-Chain-SDK](../sdks/overview.md) Typescript. Use it in your favorite terminal program.

## Installation

XPX-Chain-CLI is distributed using the node package manager `npm`.

To install:

```bash
$> sudo npm install --global xpx2-cli
```

To update:

```bash
$> sudo npm update --global xpx2-cli
```

## Configuration

To start using XPX-Chain-CLI, configure a profile.

A profile holds an account and a node URL for a specific network. Profiles are used to set a base URL and have an account to sign transactions.

Configure default profile.

```bash
$> xpx2-cli profile create --privatekey your_private_key --network TEST_NET --url http://bctestnet1.brimstone.xpxsirius.io:3000
```

XPX-Chain-CLI supports named profiles. You can configure additional profiles by using the –profile option.

```bash
$> xpx2-cli profile create --privatekey your_private_key --network TEST_NET --url http://bctestnet1.brimstone.xpxsirius.io:3000 --profile test_net_profile
```

By default, XPX-Chain-CLI will always use the default profile. To use a named profile, add the –profile option to the command.
```bash
$> xpx2-cli account info --profile test_net_profile
```

If you are going to use named profile for multiple commands, you can use the XPX_PROFILE environment variable at the command line.

```bash
$> export XPX_PROFILE=_test_net_profile
```

If you do not have a private key to create a profile you can generate a new account, add a node url and save it as default or named profile.

```bash
$> xpx2-cli account generate --network TEST_NET -s --url http://bctestnet1.brimstone.xpxsirius.io:3000 --profile test_net_profile
```