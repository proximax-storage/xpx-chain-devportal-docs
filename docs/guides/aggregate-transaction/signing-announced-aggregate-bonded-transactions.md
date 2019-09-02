---
id: signing-announced-aggregate-bonded-transactions
title: Signing announced aggregate-bonded transactions
---

This guide will show you how to cosign aggregate bonded transactions that require your account’s cosignature.

This guide will show you how to cosign aggregate bonded transactions that require being signed by your account.

## Prerequisites

- Finish [creating an escrow with aggregate bonded transaction guide](./creating-an-escrow-with-aggregate-bonded-transaction.md)
- Have received an aggregate bounded transaction
- XPX-Chain-SDK
- A text editor or IDE
- Have on account with `xpx`

## Getting into some code

You have announced an [aggregate bonded transaction](../../built-in-features/aggregate-transaction.md), but all required cosigners have not signed it yet.

1. Create a function to cosign any aggregate bonded transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
func cosignAggregateBoundedTransaction(signedAggregateBoundedTransaction *sdk.SignedTransaction, account *sdk.Account) *sdk.CosignatureSignedTransaction {
    cosignatureTransaction := sdk.NewCosignatureTransactionFromHash(signedAggregateBoundedTransaction.Hash)
    signedCosignatureTransaction , err := account.SignCosignatureTransaction(cosignatureTransaction)
    if err != nil {
        panic(err)
    }
    return signedCosignatureTransaction
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Fetch all aggregate bonded transactions pending to be signed by your account.

<div class=info>

**Note**

To fetch aggregate bonded transactions that must be signed by multisig cosignatories, refer to the multisig public key instead. See [how to get multisig accounts where an account is cosignatory](../multisig-account/converting-an-account-to-multisig.md#guide-get-multisig-account-info).

</div>

3. For each transaction, check if you have not already signed it. Cosign each pending transaction using the previously created function.

4. Announce `CosignatureSignedTransaction` to the network.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
_, err = client.Transaction.AnnounceAggregateBoundedCosignature(context.Background(), cosignatureSignedTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

