---
id: sending-payouts-with-aggregate-complete-transaction
title: Sending payouts with aggregate-complete transaction
---

Send transactions to different accounts atomically, using an [aggregate complete transaction](../../built-in-features/aggregate-transaction.md#examples).

## Background

Dan wants to send mosaics to Alice and Bob. He chooses to send an aggregate complete transaction, so both will receive the funds at the same time.

![Aggregate Sending Payout](/img/aggregate-sending-payouts.png "Aggregate Sending Payout")

<p class=caption>Sending transactions to different recipients atomically</p>

He chooses to send an aggregate complete transaction, so both will receive the funds at the same time.

## Prerequisites

- XPX-Chain-SDK
- A text editor or IDE
- Finish [sending a transfer transaction guide](../transaction/sending-a-transfer-transaction.md)
- An account with `xpx`

## Geting into some code

1. Create two [transfer transaction](../../built-in-features/transfer-transaction.md) with two different recipients, wrapping them in an [aggregate transaction](../../built-in-features/aggregate-transaction.md#examples).

As one private key can sign all the transactions in the aggregate, define the aggregate as complete. That means that there is no need to lock funds to send the transaction. If valid, it will be accepted by the network.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
alicePrivateKey = "..."
aliceAccount, err := sdk.NewAccountFromPrivateKey(alicePrivateKey, sdk.MijinTest)
if err != nil {
    panic(err)
}

bobPrivateKey = "..."
bobAccount, err := sdk.NewAccountFromPrivateKey(bobPrivateKey, sdk.MijinTest)
if err != nil {
    panic(err)
}

amount := []*sdk.Mosaic{sdk.XpxRelative(10)}

aliceTransferTransaction, err := client.NewTransferTransaction(sdk.NewDeadline(time.Hour), aliceAccount.PublicAccount.Address, amount, sdk.NewPlainMessage("payout"))
aliceTransferTransaction.ToAggregate(account.PublicAccount)
if err != nil {
    panic(err)
}

bobTransferTransaction, err := client.NewTransferTransaction(sdk.NewDeadline(time.Hour), bobAccount.PublicAccount.Address, amount, sdk.NewPlainMessage("payout"))
bobTransferTransaction.ToAggregate(account.PublicAccount)
if err != nil {
    panic(err)
}

aggregateTransaction, err := client.NewCompleteAggregateTransaction(sdk.NewDeadline(time.Hour), []sdk.Transaction{aliceTransferTransaction, bobTransferTransaction})
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Sign and announce the transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
signedTransaction, err := account.Sign(aggregateTransaction)
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

Send an aggregate bonded transaction by following [creating an escrow with aggregate bonded transaction](./creating-an-escrow-with-aggregate-bonded-transaction.md) guide.

