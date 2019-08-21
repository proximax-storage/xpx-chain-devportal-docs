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

Alice wants to ask Bob for `20 xpx`.

1. Set up both Alice’s and Bob’s accounts.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig("http://localhost:3000", sdk.PUBLIC_TEST, time.Second * 10)
if err != nil {
    panic(err)
}

client := sdk.NewClient(nil, conf)

alicePrivateKey := os.GetEnv("PRIVATE_KEY")
aliceAccount := sdk.NewAccountFromPrivateKey(alicePrivateKey, sdk.PUBLIC_TEST)

bobPublicKey := 'F82527075248B043994F1CAFD965F3848324C9ABFEC506BC05FBCF5DD7307C9D';
bobAccount := sdk.NewAccountFromPublicKey(bobPublicKey, sdk.PUBLIC_TEST)
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Create an aggregate bonded transaction with two inner transactions:

<div class=cap-alpha-ol>

1. From Alice to Bob with the message `send me 20 xpx`

</div>

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
transferTransaction1, err := client.NewTransferTransaction(sdk.NewDeadline(2), bobAccount.PublicAccount.Address, []*sdk.Mosaic{}, sdk.NewPlainMessage("send me 20 XPX"))
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

<div class=cap-alpha-ol>

2. From Bob to Alice sentind `20 xpx`

</div>
<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
transferTransaction2, err := client.NewTransferTransaction(sdk.NewDeadline(2), aliceAccount.Address, []*sdk.Mosaic{sdk.XpxRelative(20)}, sdk.NewPlainMessage(""))
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

3. Wrap the defined transactions in an [aggregate bonded transaction](../../built-in-features/aggregate-transaction.md):

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
aggregateTransaction, err := client.NewBondedAggregateTransaction(sdk.NewDeadline(10), []sdk.Transaction{transferTransaction1, transferTransaction2})
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

_, err := client.Transaction.Announce(context.Background(), signedLockFundsTransaction)
if err != nil {
    panic(err)
}

time.Sleep(time.Second * 30)

_, err := client.Transaction.AnnounceAggregateBonded(context.Background(), signedAggregateBoundedTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

5. If all goes well, [Bob receives a notification to cosign the transaction](../monitoring/monitoring-a-transaction-status.md). Check how to [cosign the transaction](./signing-announced-aggregate-bonded-transactions.md) with Bob's account in the following guide.

