---
id: account
title: Account
---

An account is a *key pair* (private and public key) associated with a mutable state stored on the Sirius-Chain blockchain. In other words, you have a *deposit box*, which only you can modify with your private key.

Think of an account as *container for assets*. It can be used to hold XPX or other mosaics, whether they are tokens or specialized assets.

Moreover, Sirius-Chain accounts can also represent *non-fungible assets* that must be unique and updatable: a package to be shipped, a house deed or a document to be notarized.

# Properties

Accounts have the following properties:

*Private key*

A [private key](../protocol/cryptography.md#private-and-public-key) is a key to an account. Anyone with access to the private key, ultimately has control over the account. **Private key** <br>

>  <div class="info">
> **Note** <br>
>    The private key must be kept secret at all costs. Make sure your private key is backed up safely somewhere offline.
> </div><br>

*Public key*

The [public key](../protocol/cryptography.md#private-and-public-key) can be used to verify signatures of the account. The public key is stored in the blockchain with the first issued transaction. An account which has not issued any transaction has its public key field empty.

*Address*

Each account has a unique [address](../protocol/cryptography.md#address). You will normally share the derived address instead, as it is shorter and gathers more information.

*Mosaics*

The amount of different [mosaics](./mosaic.md) the account owns.

## Multisig Account

Accounts become truly smart when configured with special rules – directly on the Sirius-Chain blockchain – that define how they relate and control each other, as well as how their contents can be updated and transferred.

One crucial type of rule is [multisig](./multisig-account.md) control that allows ownership of account based assets to be shared in a variety of ways between multiple parties.

## Restrictions
Accounts may configure a set of smart rules to block announcing or receiving transactions [given a series of restrictions](./account-restriction.md).

## Guides

- [Creating and opening an account](../guides/account/creating-and-opening-an-account.md)

    Create a new [account](./account.md) and open it.

- [Getting account information](../guides/account/getting-account-information.md)

    Get the public key and balance of an [account](./account.md).

- [Getting the amount of xpx sent to an account](../guides/account/getting-the-amount-of-xpx-sent-to-an-account.md)

    Check the amount of XPX you have sent to any [account](./account.md).

- [Reading transactions from an account](../guides/account/reading-transactions-from-an-account.md)

    Get the list of transactions where an [account](./account.md) is involved.

- [Linking a namespace to an address](../guides/namespace/linking-a-namespace-to-account.md)

    Link a [namespace](./namespace.md) to an [account](./account.md).

