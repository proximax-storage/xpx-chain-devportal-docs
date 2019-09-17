---
id: sending-a-transfer-transaction
title: Sending a transfer transaction
sidebar_label: Transfer transaction
---

Transfer [mosaics](../../built-in-features/mosaic.md) and messages between two accounts.

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md)
- XPX-Chain-SDK or XPX-Chain-CLI
- A text editor or IDE
- An account with `xpx`

## Background Information 

![Transfer Transaction](/img/transfer-transaction1.png "Transfer Transaction")

<p class=caption>Sending a transfer Transaction</p>

Alice wants to send 10 `xpx` to Bob, whose address is `SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54`.

### Monitoring the transaction

Once an account announces a transaction, the server will always return an OK response. Receiving an OK response does not mean the transaction is valid. A good practice is to [monitor transactions](../monitoring/monitoring-a-transaction-status.md) before being announced.

To understand the transaction lifecycle, we recommend you to open three new terminals. The first terminal monitors announced transactions validation errors.

```sh
xpx2-cli monitor status
```

Monitoring `unconfirmed` shows you which transactions have reached the network, but not are not included in a block yet.

```sh
xpx2-cli monitor unconfirmed
```

Once a transaction is included, you will see it under the `confirmed` terminal.

```sh
xpx2-cli monitor confirmed
```

## Getting into some code

1. Create the transfer transaction, including Bob address as the recipient and 10 `xpx`.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://localhost:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

account, err := client.NewAccountFromPrivateKey(os.Getenv("PRIVATE_KEY"))
if err != nil {
    panic(err)
}
address, err := sdk.NewAddressFromRaw("SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54")
if err != nil {
    panic(err)
}

transferTransaction, err := client.NewTransferTransaction(
    sdk.NewDeadline(time.Hour),
    address,
    []*sdk.Mosaic{sdk.XpxRelative(10)},
    sdk.NewPlainMessage("Welcome to Sirius-Chain"),
)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

As you may have noticed, transfer transactions require an array of mosaics as a parameter, allowing to send transfer transactions with multiple mosaics at the same time.

If you own more than one mosaic, you can send them together in the same transaction:

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
mosaicId, err := sdk.NewMosaicIdFromNonceAndOwner(nonce, account.PublicAccount.PublicKey)
if err != nil {
    panic(err)
}

myMosaic, err := sdk.NewMosaic(mosaicId, 10)
if err != nil {
    panic(err)
}

mosaics := []*sdk.Mosaic{sdk.XpxRelative(10), myMosaic}
```
<!--END_DOCUSAURUS_CODE_TABS-->

<div class=info>

**Note**

Sirius-Chain mainly works with absolute amounts. To get an absolute amount, multiply the amount of assets you want to send by 10divisibility. For example, if the mosaic has divisibility 2, to send 10 units (relative) you should define 1000 (absolute) instead.

</div>

2. Sign the transaction with Alice account.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
signedTransaction, err := account.Sign(transferTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->


3. Once signed, you can [announce the transaction](../../protocol/transaction.md) to the network.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
_, err = client.Transaction.Announce(context.Background(), signedTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->


4. Open the terminal where you are monitoring account transactions `status`. It should be vacant. If there is an error, you can [check the error code here](../../rest-api/status-errors.md).

A new transaction should have appeared in the terminal where you are monitoring `unconfirmed`. At this point, the transaction has reached the network, but it is not clear if it will get included in a block.

If it is included in a block, the transaction gets processed, and the amount stated in the transaction gets transferred from the sender’s account to the recipient’s account.

