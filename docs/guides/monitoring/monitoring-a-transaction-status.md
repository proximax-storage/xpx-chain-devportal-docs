---
id: monitoring-a-transaction-status
title: Monitoring a transaction status
sidebar_label: Monitor transaction
---

Make sure a [transaction](../../protocol/transaction.md) gets included in the blockchain after being announced.

## Background Information 

After calling an API method that changes the database state, you usually will receive a responsible if the change has been applied or failed due to some constraint. The application spends precious time waiting for the response, in the meanwhile other actions can be processed.

When working with blockchain technology, it is interesting to “fire” the transaction, let the node process it, and receive a notification if it succeeded or failed. Differently, from a traditional database, the average confirmation time of modification is higher, passing from milliseconds to seconds - or minutes in the worst case.

## Prerequisites

- Text editor or IDE
- XPX-Chain-SDK or XPX-Chain-CLI
- Finish the [getting started section](../../getting-started/setting-up-workstation.md)

## Getting into some code

Sirius Chain enables asynchronous transaction announcement. After you publish a transaction, the API node will always accept it if it is well-formed.

At this time, the server does not ensure that the transaction is valid. For example, you don’t have the amount of asset units you want to send, hence, it is not certain it will be added in a block.

To ensure the transaction is added in a block, you must track the [transaction status](../../protocol/transaction.md) using [Listeners](../../rest-api/websockets.md).

[Listeners](../../rest-api/websockets.md) enable receiving notifications possible when a change in the blockchain occurs. The notification is received in real time without having to poll the API waiting for a reply.

1. Define the transaction you want to announce. In this case, we are going to send the message `Test` to `SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54`.


<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://localhost:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

address, err := sdk.NewAddressFromRaw("SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54")
if err != nil {
    panic(err)
}

transferTransaction, err := client.NewTransferTransaction(sdk.NewDeadline(time.Hour), address, []*sdk.Mosaic{}, sdk.NewPlainMessage("Test"))
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. Sign the transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
signer, err := client.NewAccountFromPrivateKey(os.Getenv("PRIVATE_KEY"))
if err != nil {
    panic(err)
}

signedTransaction, err := signer.Sign(transferTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

3. Open a new [Listener](../../rest-api/websockets.md). This communicates with the API WebSocket, who will communicate you asynchronously the status of the transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
wsClient, err := websocket.NewClient(context.Background(), conf)
if err != nil {
    panic(err)
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

4. Start monitoring if the WebSocket connection is alive. [Blocks](../../protocol/block.md) are generated every `15` seconds in average, so a timeout can be raised if there is no response after 30 seconds approximately.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
err = wsClient.AddBlockHandlers(func (info *sdk.BlockInfo) bool {
    fmt.Printf("Block received with height: %v \n", info.Height)
    return true
})

if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

5. Monitor if there is some validation error with the transaction issued. When you receive a message from status WebSocket channel, it always means the transaction did not meet the requirements. You need to handle the error accordingly, by reviewing the [error status list](../../rest-api/status-errors.md).

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
err = wsClient.AddStatusHandlers(signer.Address, func (info *sdk.StatusInfo) bool {
    fmt.Printf("Status: %v \n", info.Status)
    fmt.Printf("Hash: %v \n", info.Hash)
    return true
})
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

6. Monitor as well if the transaction reaches the network. When you receive a message from unconfirmed WebSocket channel, the transaction is valid and is waiting to be included in a block. This does not mean necessarily that the transaction will be included, as a second validation happens before being finally confirmed.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
err = wsClient.AddUnconfirmedAddedHandlers(signer.Address, func (info sdk.Transaction) bool {
    fmt.Printf("UnconfirmedAdded Tx Hash: %v \n", info.GetAbstractTransaction().TransactionHash)
    return true
})
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

7. Monitor when the transaction gets included in a block. When included, the [transaction](../../protocol/transaction.md) can still be rolled-back because of forks. You can decide for yourself that after e.g. 6 blocks the [transaction is secured](https://gist.github.com/aleixmorgadas/3d856d318e60f901be09dbd23467b374).

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
err = wsClient.AddConfirmedAddedHandlers(signer.Address, func (info sdk.Transaction) bool {
    fmt.Printf("ConfirmedAdded Tx Hash: %v \n", info.GetAbstractTransaction().TransactionHash)
    return true
})
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

8. Finally, announce the transaction to the network.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
_, err = client.Transaction.Announce(ctx, signedTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

If you missed the WebSocket response, check the transaction status after by calling the [transaction status endpoint](../../../endpoints#operation/getTransaction). The status of failed transactions is not persistent, meaning that eventually is pruned.

## What’s next?

Run your application and try to [send a transfer transaction](../transaction/sending-a-transfer-transaction.html) to the selected account. If all goes well, you will see the transaction information in your terminal.

