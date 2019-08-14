---
id: account
title: Account
---
An account is a **key pair**, which consists of two types: private and public key. It is associated with a mutable state stored on the Sirius Chain. In other words, you have a deposit box in the blockchain, which only you can modify with your key pair. As the name suggests, the private key has to be kept secret always. Anyone with access to the private key, ultimately has control over the account.

You can think about Sirius Chain accounts as a **container for assets** in the blockchain. An account could represent a deposit of tokens, like in most blockchains. However, it could also represent a **single object** that must be unique and can be updated: a package to be shipped, a deed to a house or a document to be notarised.

Accounts have the following properties:

> **Private key** <br>
> A [private key](../protocol/cryptography.md#private-and-public-key) is a key to an account. Anyone having the private key to an account can initiate any account related action. <br>
>
>  <div class="info">
>
> **Note:** <br>
>    The private key must be kept secret at all costs. Make sure your private key is backed up safely somewhere offline.
> </div><br>
>
> **Public key** <br>
> The [public key](../protocol/cryptography.md#private-and-public-key) can be used to verify signatures of the account. The public key is stored in the blockchain with the first issued transaction. An account which has not issued any transaction has its public key field empty. <br>
>
> **Address** <br>
> Each account has a unique [address](../protocol/cryptography.md#address). You will normally share the derived address instead, as it is shorter and gathers more information. <br>
>
> **Mosaics** <br>
> The amount of different [mosaics](./mosaic.md) the account owns. <br>

## Multisig Account

Multisignature or multisig require more than one key for authorization. Multisig accounts allow ownership of account-based assets to be shared in a variety of ways between multiple parties. This has evolved into smart accounts that configured with special rules, directly on the Sirius Chain. It defines how they relate and control each other, as well as how their contents can be updated and transferred. 

## Filters

Accounts may configure a set of smart rules to block announcing or receiving transactions [given a series of constraints](./account-filter.md).


## Guides

- [Creating and opening an account](../guides/account/creating-and-opening-an-account.md)

    Create a new account and open it.

- [Getting account information](../guides/account/getting-account-information.md)

    Get the public key and balance of an account.

- [Getting the amount of XPX sent to an account](../guides/account/getting-the-amount-of-XPX-sent-to-an-account.md)

    Check the amount of XPX you have sent to any account.

- [Reading transactions from an account](../guides/account/reading-transactions-from-an-account.md)

    Get the list of transactions where an account is involved.

