---
id: creating-a-multi-level-multisig-account
title: Creating a multi-level multisig-account
---

Create a [multi-level multisig account](../../built-in-features/multisig-account.md).

Following this guide you will learn to create the following 3-level multisig account.

![Multi-level multisig-account](/img/mlma-complex-1.png "Multi-level multisig-account")

<p class=caption>Three-level multisig account example</p>

## Background

[Multisig accounts](../../built-in-features/multisig-account.md) can have as cosignatories other multisig accounts. Multi-level multisig accounts add “AND/OR” logic to multi-signature transactions.

## Prerequisites

- Text editor or IDE
- XPX-Chain-SDK or XPX-Chain-CLI
- Finish [converting an account to multisig guide](./converting-an-account-to-multisig.md)

## Getting into some code

1. Define the multisig account #2

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
multisig2, err := sdk.NewAccountFromPrivateKey(os.Getenv("MULTISIG_2_ACCOUNT_PRIVATE_KEY"), networkType)
if err != nil {
    panic(err)
}

cosignatory5, err := sdk.NewAccountFromPublicKey(os.Getenv("COSIGNATORY_5_PUBLIC_KEY"), networkType)
if err != nil {
    panic(err)
}

cosignatory6, err := sdk.NewAccountFromPublicKey(os.Getenv("COSIGNATORY_6_PUBLIC_KEY"), networkType)
if err != nil {
    panic(err)
}

convertMultisigAccount2Transaction, err := client.NewModifyMultisigAccountTransaction(
    sdk.NewDeadline(deadline),
    1,
    1,
    []*sdk.MultisigCosignatoryModification{
        {sdk.Add, cosignatory5},
        {sdk.Add, cosignatory6},
    },
)
```
<!--END_DOCUSAURUS_CODE_TABS-->


2. Create multisig account #3

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
multisig3, err := sdk.NewAccountFromPrivateKey(os.Getenv("MULTISIG_3_ACCOUNT_PRIVATE_KEY"), networkType)
if err != nil {
    panic(err)
}

cosignatory7, err := sdk.NewAccountFromPublicKey(os.Getenv("COSIGNATORY_7_PUBLIC_KEY"), networkType)
if err != nil {
    panic(err)
}

cosignatory8, err := sdk.NewAccountFromPublicKey(os.Getenv("COSIGNATORY_8_PUBLIC_KEY"), networkType)
if err != nil {
    panic(err)
}

cosignatory4, err := sdk.NewAccountFromPublicKey(os.Getenv("COSIGNATORY_4_PUBLIC_KEY"), networkType)
if err != nil {
    panic(err)
}

convertMultisigAccount3Transaction, err := client.NewModifyMultisigAccountTransaction(
    sdk.NewDeadline(deadline),
    2,
    1,
    []*sdk.MultisigCosignatoryModification{
        {sdk.Add, cosignatory7},
        {sdk.Add, cosignatory8},
        {sdk.Add, cosignatory4},
    },
)
```
<!--END_DOCUSAURUS_CODE_TABS-->


3. Create multisig account #1

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
multisig1, err := sdk.NewAccountFromPrivateKey(os.Getenv("MULTISIG_1_ACCOUNT_PRIVATE_KEY"), networkType)
if err != nil {
    panic(err)
}

convertMultisigAccount1Transaction, err := client.NewModifyMultisigAccountTransaction(
    sdk.NewDeadline(deadline),
    3,
    1,
    []*sdk.MultisigCosignatoryModification{
        {sdk.Add, multisig2.PublicAccount},
        {sdk.Add, multisig3.PublicAccount},
        {sdk.Add, cosignatory4},
    },
)
```
<!--END_DOCUSAURUS_CODE_TABS-->

4. Announce the transactions together using an [aggregate bonded transaction](../../built-in-features/aggregate-transaction.md). Make sure that the account #1 owns at least `10 xpx`.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
convertMultisigAccount1Transaction.ToAggregate(multisig1)
convertMultisigAccount2Transaction.ToAggregate(multisig2)
convertMultisigAccount3Transaction.ToAggregate(multisig3)
aggregateTransaction, err := client.NewCompleteAggregateTransaction(
    sdk.NewDeadline(time.Hour),
    []sdk.Transaction{convertMultisigAccount1Transaction, convertMultisigAccount2Transaction, convertMultisigAccount3Transaction}
)
if err != nil {
    panic(err)
}

signedAggregateTransaction, err := multisig1.Sign(aggregateTransaction)
if err != nil {
    panic(err)
}

lockFundsTransaction, err := client.NewLockFundsTransaction(
    sdk.NewDeadline(time.Hour),
    sdk.XpxRelative(10),
    sdk.Duration(1000),
    signedAggregateTransaction
)
if err != nil {
    panic(err)
}

signedLockFundsTransaction, err := multisig1.Sign(lockFundsTransaction)
if err != nil {
    panic(err)
}

_, err := client.Transaction.Announce(context.Background(), signedLockFundsTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

5. The cosignatories must opt-in to become cosignatories. [Cosign the announced aggregate transaction](../aggregate-transaction/signing-announced-aggregate-bonded-transactions.md) with the accounts #5, #6, #7, #8, and #4.

<!--DOCUSAURUS_CODE_TABS-->
<!--Bash-->
```sh
xpx2-cli transaction cosign --hash A6A374E66B32A3D5133018EFA9CD6E3169C8EEA339F7CCBE29C47D07086E068C --profile <account>
```
<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

If the account #5 initiates an aggregate bonded transaction involving the account #1, which accounts should cosign the transaction?

![Multi-level multisig-account complex](/img/mlma-complex-2.png "Multi-level multisig-account complex")

<p class=caption>Sending an aggregate bonded transaction from a MLMA</p>
