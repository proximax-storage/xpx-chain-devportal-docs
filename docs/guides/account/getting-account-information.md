---
id: getting-account-information
title: Getting account information
---
This guide will help you get the public key and balance of an [account](../../built-in-features/account.md).

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md).
- Text editor or IDE.
- XPX-Chain-SDK or XPX-Chain-CLI.

## Getting into some code

1. Call `getAccountInfo` function, passing your account's address as a parameter.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://localhost:3000"})
if err != nil {
    panic(err)
}

client := sdk.NewClient(nil, conf)

address, err := sdk.NewAddressFromPublicKey("...", client.NetworkType())
if err != nil {
    panic(err)
}

accountInfo, err := client.Account.GetAccountInfo(context.Background(), address)
if err != nil {
    panic(err)
}

fmt.Printf(accountInfo.String())

```
<!--END_DOCUSAURUS_CODE_TABS-->

Can you determine the account’s public key? The **public key** identifies your account publicly in the network. Your **address** is derived from it, which contains further information such as network and validity check.

If you don’t have a public key assigned, that means that your account has not announced or received any transaction yet. The `addressHeight` and `publicKeyHeight` specify the block where your address and public key first appeared.

2. How many different mosaics does your account hold? Call `mosaicsAmountViewFromAddress` function, passing your account’s address as a parameter.

The balance is the amount of the different mosaics owned by the account. How many different mosaics does your account own?

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://localhost:3000"})
if err != nil {
    panic(err)
}

client := sdk.NewClient(nil, conf)

address, err := sdk.NewAddressFromPublicKey("...", client.NetworkType())
if err != nil {
    panic(err)
}

accountInfo, err := client.Account.GetAccountInfo(context.Background(), address)
if err != nil {
    panic(err)
}

fmt.Println(accountInfo.Mosaics[0].Amount)
```
<!--END_DOCUSAURUS_CODE_TABS-->

