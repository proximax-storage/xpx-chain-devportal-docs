---
id: converting-an-account-to-multisig
title: Converting an account to multisig
---

Create a 1-of-2 [multisig account](../../built-in-features/multisig-account.md), by adding two cosignatories.

## Background

Alice and Bob live together and have separate [accounts](../../built-in-features/account.md). They also have a shared account so that if Bob is out shopping, he can buy groceries for both himself and Alice.

This shared account appears in Sirius-Chain as **1-of-2 multisig**. Multisig accounts permit Alice and Bob sharing funds in a separate account, requiring only the signature from one of them to transact.

![Multisig 1 of 2](/img/multisig-1-of-2.png "Multisig 1 of 2")

<p class=caption>1-of-2 multisig account example</p>

In this guide, you are going to create a 1-of-2 multisig account. In future guides, you will learn how to increase the minimum number of cosignatures required, as well as invite and remove cosignatories from the multisig account.

## Prerequisites

- Text editor or IDE
- XPX-Chain-SDK or XPX-Chain-CLI
- Finish [creating and opening accounts guide](../account/creating-and-opening-an-account.md)
- Have one account with `xpx`

## Getting into some code

1. First, define the accounts that will be cosginatories of the multisig account. In our case, these are Alice and Bob addresses. Then, open the account that will be converted into multisig using its private key.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://localhost:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

multisig, err := client.NewAccountFromPublicKey(os.Getenv("MULTISIG_ACCOUNT_PUBLIC_KEY"))
if err != nil {
    panic(err)
}

cosignatory1, err := client.NewAccountFromPrivateKey(os.Getenv("COSIGNATORY_1_PRIVATE_KEY"))
if err != nil {
    panic(err)
}

cosignatory2, err := client.NewAccountFromPrivateKey(os.Getenv("COSIGNATORY_2_PRIVATE_KEY"))
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Create a [modify multisig account transaction](../../built-in-features/multisig-account.md#modify-multisig-account-transaction) to convert the shared account into a multisig account. As you want to create a 1-of-2 multisig account, set the minimum signatures required to `1`.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
convertIntoMultisigTransaction, err := client.NewModifyMultisigAccountTransaction(
    sdk.NewDeadline(time.Hour),
    1,
    1,
    []*sdk.MultisigCosignatoryModification{
        {sdk.Add, cosignatory1.PublicAccount},
        {sdk.Add, cosignatory2.PublicAccount},
    },
)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

3. Create an [aggregate bonded transaction](../../built-in-features/aggregate-transaction.md), wrapping the modify multisig account transaction. This is necessary since Alice and Bob must opt-in to become cosignatories of the new multisig account.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
convertIntoMultisigTransaction.ToAggregate(multisig)

aggregateTransaction, err := client.NewBondedAggregateTransaction(sdk.NewDeadline(time.Hour), []sdk.Transaction{convertIntoMultisigTransaction})
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

4. Sign the aggregate transaction using the private key of the multisig account.

<div class=info>

**Note**

To make the transaction only valid for your network, include the first block generation hash. Open `http://localhost:3000/block/1` in a new tab and copy the `meta.generationHash` value.

</div>

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
signedAggregateBoundedTransaction, err := cosignatory1.Sign(aggregateTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

5. Before sending an aggregate bonded transaction, the future multisig account needs to [lock](../../built-in-features/aggregate-transaction.md#hash-lock-transaction) at least `10 xpx`. This transaction is required to prevent network spamming and ensure that the inner transactions are cosigned. After the hash lock transaction has been confirmed, announce the aggregate transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
lockFundsTransaction, err := client.NewLockFundsTransaction(
    sdk.NewDeadline(time.Hour),
    sdk.XpxRelative(10),
    sdk.Duration(1000),
    signedAggregateBoundedTransaction,
)
if err != nil {
    panic(err)
}

signedLockFundsTransaction, err := cosignatory1.Sign(lockFundsTransaction)
if err != nil {
    panic(err)
}

_, err := client.Transaction.Announce(context.Background(), signedLockFundsTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

6. [Cosign the aggregate transaction](../aggregate-transaction/signing-announced-aggregate-bonded-transactions.md) with Alice’s account.

<!--DOCUSAURUS_CODE_TABS-->
<!--Bash-->
```sh
xpx2-cli transaction cosign --hash A6A374E66B32A3D5133018EFA9CD6E3169C8EEA339F7CCBE29C47D07086E068C --profile alice
```
<!--END_DOCUSAURUS_CODE_TABS-->

7. [Cosign the aggregate transaction](../aggregate-transaction/signing-announced-aggregate-bonded-transactions.md) with Bob’s account.

<!--DOCUSAURUS_CODE_TABS-->
<!--Bash-->
```sh
xpx2-cli transaction cosign --hash A6A374E66B32A3D5133018EFA9CD6E3169C8EEA339F7CCBE29C47D07086E068C --profile bob
```
<!--END_DOCUSAURUS_CODE_TABS-->

8. If everything goes well, the account is now multisig, being Alice and Bob cosignatories. You can get the list of the multisig accounts where Alice or Bob are cosignatories using `getMultisigAccountInfo` function.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
multisigInfo, err := client.Account.GetMultisigAccountInfo(context.Background(), multisig.Address)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

Modify the multisig account you just created, converting it into a 2-of-2 multisig following the [next guide](./modifying-a-multisig-account.md).

