---
id: modifying-a-multisig-account
title: Modifying a multisig-account
---

Modify an existing [multisig account](../../built-in-features/multisig-account.md).

First, you are going to turn a 1-of-2 multisig account into a 2-of-2. Then, you will **add a new cosignatory**, becoming a 2-of-3. Finally, **after removing a cosignatory**, you will know how to perform all sort of modifications to multisig accounts.

## Prerequisites

- Text editor or IDE
- XPX-Chain-SDK or XPX-Chain-CLI
- Finish [converting an account to multisig guide](./converting-an-account-to-multisig.md)
- Have on emultisignature account

## Getting into some code

### Editing minApproval

Alice and Bob are cosignatories of the 1-of-2 multisig account. This means that at least one of their account’s signatures is required to authorize multisig transactions. In other words, we can say that the `minApproval` parameter of the multisig is currently set to `1`.

Multisig accounts are editable at the blockchain level. In this case, we want to make both cosignatories required, shifting to a 2-of-2 multisig instead. You can achieve this by increasing `minApproval` parameter in one unit.

![Multisig 2 of 2](/img/multisig-2-of-2.png "Multisig 2 of 2")

<p class=caption>2-of-2 multisig account example</p>

One of the accounts, for example Alice’s, will announce a [modify multisig account transaction](../../built-in-features/multisig-account.md#modify-multisig-transaction) to increase minApprovalDelta.

1. First, define Alice account as the cosignatory and the multisig account using its public key.

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

cosignatory, err := client.NewAccountFromPrivateKey(os.Getenv("COSIGNATORY_PRIVATE_KEY"))
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Define a modify multisig account transaction to increase the `minAprovalDelta` in one unit.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
modifyMultisigAccountTransaction, err := client.NewModifyMultisigAccountTransaction(
    sdk.NewDeadline(time.Hour),
    1,
    0,
    []*sdk.MultisigCosignatoryModification{ },
)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

3. Wrap the modify multisig account transaction in an aggregate transaction, attaching the multisig public key as the signer.

An aggregate transaction is `complete` if, before announcing it to the network, all required cosignatories have signed it. If valid, it will be included in a block.

As only one cosignature is required (1-of-2), Alice can sign the transaction and announce it to the network.


<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
modifyMultisigAccountTransaction.ToAggregate(multisig)

aggregateTransaction, err := client.NewCompleteAggregateTransaction(sdk.NewDeadline(time.Hour), []sdk.Transaction{modifyMultisigAccountTransaction})
if err != nil {
    panic(err)
}

signedTransaction, err := cosignatory.Sign(aggregateTransaction)
if err != nil {
    panic(err)
}

_, err = client.Transaction.Announce(context.Background(), signedTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

Once confirmed, the `minApproval` value of the multisig will be set to 2, having our 2-of-2 multisig.

<div class=info>

**Note**

If you want to decrease the `minApproval` parameter, set `minApprovalDelta` with a negative value. In this case `-1`.

</div>

### Adding a new cosignatory

Alice and Bob want to add Carol as a cosignatory of the multisig account to achieve 2-of-3 cosignatures required.

![Multisig 2 of 3](/img/multisig-2-of-31.png "Multisig 2 of 3")

<p class=caption>2-of-3 multisig account example</p>

1. Create a [modify multisig account transaction](../../built-in-features/multisig-account.md#modifymultisigtransaction) adding Carol as a cosignatory. The multisig account will become a 2-of-3, since you are not increasing the `minApprovalDelta`.

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

cosignatory, err := client.NewAccountFromPrivateKey(os.Getenv("COSIGNATORY_PRIVATE_KEY"))
if err != nil {
    panic(err)
}

newCosignatory, err := client.NewAccountFromPrivateKey(os.Getenv("NEW_COSIGNATORY_PRIVATE_KEY"))
if err != nil {
    panic(err)
}

multisigCosignatoryModification := sdk.MultisigCosignatoryModification{sdk.Add, newCosignatory.PublicAccount}
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Create a modify multisig account transaction adding the previous modification.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
modifyMultisigTransaction, err := client.NewModifyMultisigAccountTransaction(
    sdk.NewDeadline(time.Hour),
    0,
    0,
    []*sdk.MultisigCosignatoryModification{
        &multisigCosignatoryModification,
    },
)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

3. Wrap the modify multisig account transaction in an [aggregate bonded transaction](../../built-in-features/aggregate-transaction.md) and sign it.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
modifyMultisigTransaction.ToAggregate(multisig)

aggregateTransaction, err := client.NewBondedAggregateTransaction(sdk.NewDeadline(time.Hour), []sdk.Transaction{modifyMultisigTransaction})
if err != nil {
    panic(err)
}

signedAggregateTransaction, err := cosignatory.Sign(aggregateTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

4. Before sending an aggregate bonded transaction, Alice needs to [lock](../../built-in-features/aggregate-transaction.md#hash-lock-transaction) at least `10 xpx`. This transaction is required to prevent network spamming and ensure that transactions are cosigned. After the hash lock transaction has been confirmed, announce the aggregate transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
lockFundsTransaction, err := client.NewLockFundsTransaction(
    sdk.NewDeadline(time.Hour),
    sdk.XpxRelative(10),
    sdk.Duration(1000),
    signedAggregateTransaction,
)
if err != nil {
    panic(err)
}

signedLockFundsTransaction, err := cosignatory.Sign(lockFundsTransaction)
if err != nil {
    panic(err)
}

_, err = client.Transaction.Announce(context.Background(), signedLockFundsTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

5. [Cosign the aggregate transaction](../aggregate-transaction/signing-announced-aggregate-bonded-transactions.md) hash with Carols’s account. She has to opt-in to become a multisig cosignatory.

<!--DOCUSAURUS_CODE_TABS-->
<!--Bash-->
```sh
xpx2-cli transaction cosign --hash A6A374E66B32A3D5133018EFA9CD6E3169C8EEA339F7CCBE29C47D07086E068C --profile carol
```
<!--END_DOCUSAURUS_CODE_TABS-->

6. [Cosign the aggregate transaction](../aggregate-transaction/signing-announced-aggregate-bonded-transactions.md) with Bob’s account. The amount of cat.currency locked becomes available again on Alice’s account and Carol is added to the multisig.

<!--DOCUSAURUS_CODE_TABS-->
<!--Bash-->
```sh
xpx2-cli transaction cosign --hash A6A374E66B32A3D5133018EFA9CD6E3169C8EEA339F7CCBE29C47D07086E068C --profile bob
```
<!--END_DOCUSAURUS_CODE_TABS-->


### Removing a cosignatory

Once you have finished this guide, delete a cosignatory from the multisig. Multisig accounts can be converted again into regular accounts by removing all cosignatories. Make sure you own the multisig private key!

The following code shows how to remove a cosignatory of a 2-of-3 multisig account with `minRemoval` set to `1`. The multisig modification transaction is wrapped in an aggregate complete, as only one account is required to delete others from the multisig.

<div class=info>

**Note**

The `minRemoval` parameter indicates the number of required signatures to delete an account from the multisig. You can increase or decrease it the same way you [modify minApproval parameter](./modifying-a-multisig-account.md#guide-modify-a-multisig-account-min-approval).

</div>

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

cosignatory, err := client.NewAccountFromPrivateKey(os.Getenv("COSIGNATORY_PRIVATE_KEY"))
if err != nil {
    panic(err)
}

cosignatoryToRemove, err := client.NewAccountFromPublicKey(os.Getenv("COSIGNATORY_PUBLIC_KEY"))
if err != nil {
    panic(err)
}

multisigCosignatoryModification := sdk.MultisigCosignatoryModification{sdk.Remove, cosignatoryToRemove}

modifyMultisigAccountTransaction, err := client.NewModifyMultisigAccountTransaction(
    sdk.NewDeadline(time.Hour),
    0,
    0,
    []*sdk.MultisigCosignatoryModification{ &multisigCosignatoryModification },
)
if err != nil {
    panic(err)
}
modifyMultisigAccountTransaction.ToAggregate(multisig)

aggregateTransaction, err := client.NewCompleteAggregateTransaction(sdk.NewDeadline(time.Hour), []sdk.Transaction{modifyMultisigAccountTransaction})
if err != nil {
    panic(err)
}

signedTransaction, err := cosignatory.Sign(aggregateTransaction)
if err != nil {
    panic(err)
}

_, err = client.Transaction.Announce(context.Background(), signedTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

Learn more about [multi-level multisig accounts](./creating-a-multi-level-multisig-account.md).

