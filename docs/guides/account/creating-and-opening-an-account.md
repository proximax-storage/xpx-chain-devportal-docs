---
id: creating-and-opening-an-account
title: Creating and opening an account
---
This guide will help you create a new [account](../../built-in-features/account.md) and open it.

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md).
- Text editor or IDE.
- XPX-Chain-SDK or XPX-Chain-CLI.

## Getting into some code

An account is a key pair (private and public key) associated with a mutable state stored in the Sirius-Chain.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
keyPair, _ := crypto.NewRandomKeyPair()

fmt.Printf("PublicKey:\t%x\n", keyPair.PublicKey.Raw)
fmt.Printf("PrivateKey:\t%x", keyPair.PrivateKey.Raw)
```
<!--END_DOCUSAURUS_CODE_TABS-->

The **private key** uniquely identifies a Sirius Chain account and holds all of its power. It is a priority to ensure it is stored safely somewhere **offline** and not to share it with anyone.

The **public key** is cryptographically derived from the private key and safe to be shared. Nonetheless, it is preferable to share the **address**, which contains further information such as network and validity check.

If you already have a private key, it is not necessary to generate a new account:

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
account, _ := sdk.NewAccountFromPrivateKey("...", sdk.TEST_NET)

fmt.Printf("Address:\t%v\n", account.Address)
fmt.Printf("PrivateKey:\t%x\n", account.KeyPair.PrivateKey.Raw)
fmt.Printf("PublicKey:\t%x", account.KeyPair.PublicKey.Raw)
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Using a Wallet

If the programming language of the SDK you are using allows client-side development, you can create a wallet.

A wallet enables you to store your account to sign transactions, encrypting your private key with a password.

Do you have a private key? You can create and open a wallet importing your private key.

