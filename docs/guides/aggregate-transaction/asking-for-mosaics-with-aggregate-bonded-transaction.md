---
id: asking-for-mosaics-with-aggregate-bonded-transaction
title: Asking for mosaics with aggregate-bonded transaction
---

Ask an account to send you funds using an [aggregate bonded transaction](../../built-in-features/aggregate-transaction.md).

## Prerequisites

- A text editor or IDE
- An account with XPX
- Finish [creating an escrow with aggregate bonded transaction guide](./creating-an-escrow-with-aggregate-bonded-transaction.md)
- Have account with `xpx`

## Getting into some code

![Aggregate asking for mosaics](/img/aggregate-asking-for-mosaics.png "Aggregate asking for mosaics")

<p class=caption>Asking for mosaics with an aggregate bonded transaction</p>

Bob wants to ask Alice for `20 xpx`.

1. Set up both Alice’s and Bob’s accounts.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://localhost:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

alicePrivateKey := os.Getenv("PRIVATE_KEY")
aliceAccount, err := client.NewAccountFromPrivateKey(alicePrivateKey)
if err != nil {
    panic(err)
}

bobPublicKey := "F82527075248B043994F1CAFD965F3848324C9ABFEC506BC05FBCF5DD7307C9D";
bobAccount, err := client.NewAccountFromPublicKey(bobPublicKey)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Create an aggregate bonded transaction with two inner transactions:

<div class=cap-alpha-ol>

1. From Bob to Alice with the message `send me 20 xpx`

</div>

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
transferTransaction1, err := client.NewTransferTransaction(sdk.NewDeadline(time.Hour), aliceAccount.PublicAccount.Address, []*sdk.Mosaic{}, sdk.NewPlainMessage("send me 20 XPX"))
if err != nil {
    panic(err)
}
transferTransaction1.ToAggregate(bobAccount)
```
<!--END_DOCUSAURUS_CODE_TABS-->

<div class=cap-alpha-ol>

2. From Alice to Bob sending `20 xpx`

</div>
<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
transferTransaction2, err := client.NewTransferTransaction(sdk.NewDeadline(time.Hour), bobAccount.Address, []*sdk.Mosaic{sdk.XpxRelative(20)}, sdk.NewPlainMessage(""))
if err != nil {
    panic(err)
}
transferTransaction2.ToAggregate(aliceAccount.PublicAccount)
```
<!--END_DOCUSAURUS_CODE_TABS-->

3. Wrap the defined transactions in an [aggregate bonded transaction](../../built-in-features/aggregate-transaction.md):

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
aggregateTransaction, err := client.NewBondedAggregateTransaction(sdk.NewDeadline(time.Hour), []sdk.Transaction{transferTransaction1, transferTransaction2})
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

4. Sign the aggregate bonded transaction with Alice’s account and announce it to the network. Remember to [lock 10 cat.currency](../../built-in-features/aggregate-transaction.md#hash-lock-transaction) first. Alice will recover the locked mosaics if the aggregate transaction completes.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
signedAggregateBoundedTransaction, err := aliceAccount.Sign(aggregateTransaction)
if err != nil {
    panic(err)
}

lockFundsTransaction, err := client.NewLockFundsTransaction(
    sdk.NewDeadline(time.Hour),
    sdk.XpxRelative(10),
    sdk.Duration(1000),
    signedAggregateBoundedTransaction
)
if err != nil {
    panic(err)
}

signedLockFundsTransaction, err := aliceAccount.Sign(lockFundsTransaction)
if err != nil {
    panic(err)
}

_, err = client.Transaction.Announce(context.Background(), signedLockFundsTransaction)
if err != nil {
    panic(err)
}

time.Sleep(time.Second * 30)

_, err = client.Transaction.AnnounceAggregateBonded(context.Background(), signedAggregateBoundedTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

5. If all goes well, [Bob receives a notification to cosign the transaction](../monitoring/monitoring-a-transaction-status.md). Check how to [cosign the transaction](./signing-announced-aggregate-bonded-transactions.md) with Bob's account in the following guide.

