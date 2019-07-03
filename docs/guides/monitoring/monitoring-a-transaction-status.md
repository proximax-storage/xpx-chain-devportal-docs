---
id: monitoring-a-transaction-status
title: Monitoring a transaction status
sidebar_label: Monitor transaction
---
Make sure a [transaction](../../protocol/transaction.md) gets included in the blockchain after being announced.

## Background

After calling an API method that changes the database state, you usually will receive a response if the change has been applied or failed due to some constraint. The application spends precious time waiting for the response, in the meanwhile other actions can be processed.

When working with blockchain technology, it is interesting to “fire” the transaction, let the node process it, and receive a notification if it succeeded or failed. Differently, from a traditional database, the average confirmation time of modification is higher, passing from milliseconds to seconds - or minutes in the worst case.

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md)
- Text editor or IDE
- XPX-Chain-SDK or CLI

## Let’s get into some code

Sirius-Chain enables asynchronous transaction announcement. After you publish a transaction, the API node will always accept it if it is well-formed.

At this time, the server does not ensure that the transaction is valid - for example, you don’t have the amount of asset units you want to send-, hence is not sure it will be added in a block.

To make sure the transaction is added in a block, you must track the [transaction status](../../protocol/transaction.md) using [Listeners](../../rest-api/websockets.md).

[Listeners](../../rest-api/websockets.md) enable receiving notifications possible when a change in the blockchain occurs. The notification is received in real time without having to poll the API waiting for a reply.

1. Define the transaction you want to announce. In this case, we are going to send the message `Test` to `SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54`.


<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const recipientAddress = Address.createFromRawAddress("SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54");
const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    recipientAddress,
    [],
    PlainMessage.create('Test'),
    NetworkType.PRIVATE_TEST);
```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Sign the transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const privateKey = process.env.PRIVATE_KEY as string;
const signer = Account.createFromPrivateKey(privateKey, NetworkType.PRIVATE_TEST);
const signedTransaction = signer.sign(transferTransaction);
```

<!--END_DOCUSAURUS_CODE_TABS-->

3. Open a new [Listeners](../../rest-api/websockets.md). This communicates with the API WebSocket, who will communicate you asynchronously the status of the transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const url = 'http://localhost:3000';
const listener = new Listener(url);
const transactionHttp = new TransactionHttp(url);

const amountOfConfirmationsToSkip = 5;

listener.open().then(() => {
```

<!--END_DOCUSAURUS_CODE_TABS-->

4. Start monitoring if the WebSocket connection is alive. [Blocks](../../protocol/block.md) are generated every `15` seconds in average, so a timeout can be raised if there is no response after 30 seconds approximately.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
    const newBlockSubscription = listener
        .newBlock()
        .pipe(timeout(30000)) // time in milliseconds when to timeout.
        .subscribe(block => {
            console.log("New block created:" + block.height.compact());
        },
        error => {
            console.error(error);
            listener.terminate();
        });
```

<!--Bash-->
```
xpx-cli monitor block
```

<!--END_DOCUSAURUS_CODE_TABS-->

5. Monitor if there is some validation error with the transaction issued. When you receive a message from status WebSocket channel, it always means the transaction did not meet the requirements. You need to handle the error accordingly, by reviewing the [error status list](../../rest-api/status-errors.md).

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
    listener
        .status(signer.address)
        .pipe(filter(error => error.hash === signedTransaction.hash))
        .subscribe(error => {
            console.log("❌:" + error.status);
            newBlockSubscription.unsubscribe();
            listener.close();
        },
        error => console.error(error));
```

<!--Bash-->
```
xpx-cli monitor status --address SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54
```

<!--END_DOCUSAURUS_CODE_TABS-->

6. Monitor as well if the transaction reaches the network. When you receive a message from unconfirmed WebSocket channel, the transaction is valid and is waiting to be included in a block. This does not mean necessarily that the transaction will be included, as a second validation happens before being finally confirmed.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
    listener
        .unconfirmedAdded(signer.address)
        .pipe(filter(transaction => (transaction.transactionInfo !== undefined
            && transaction.transactionInfo.hash === signedTransaction.hash)))
        .subscribe(ignored => console.log("⏳: Transaction status changed to unconfirmed"),
            error => console.error(error));
```

<!--Bash-->
```
xpx-cli monitor unconfirmed --address SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54
```

<!--END_DOCUSAURUS_CODE_TABS-->

7. Monitor when the transaction gets included in a block. When included, [transaction](../../protocol/transaction.md) can still be rolled-back because of forks. You can decide for yourself that after e.g. 6 blocks the [transaction is secured](https://gist.github.com/aleixmorgadas/3d856d318e60f901be09dbd23467b374).

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
    listener
        .confirmed(signer.address)
        .pipe(
            filter(transaction =>(transaction.transactionInfo !== undefined
                && transaction.transactionInfo.hash === signedTransaction.hash)),
            mergeMap(transaction => {
                return listener.newBlock()
                    .pipe(
                        skip(amountOfConfirmationsToSkip),
                        first(),
                        map( ignored => transaction))
            })
        )
        .subscribe(ignored => {
            console.log("✅: Transaction confirmed");
            newBlockSubscription.unsubscribe();
            listener.close();
        }, error => console.error(error));
```

<!--Bash-->
```
xpx-cli monitor confirmed --address SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54
```

<!--END_DOCUSAURUS_CODE_TABS-->

8. Finally, announce the transaction to the network.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
    transactionHttp
        .announce(signedTransaction)
        .subscribe(x => console.log(x),
            error => console.error(error));
});
```

<!--Bash-->
```
xpx-cli transaction transfer --recipient SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54 --mosaics prx:xpx::10000000 --message "Welcome to Sirius-Chain"
```

<!--END_DOCUSAURUS_CODE_TABS-->

If you missed the WebSocket response, check the transaction status after by calling the [transaction status endpoint](../../../endpoints#operation/getTransaction). The status of failed transactions is not persistent, meaning that eventually is pruned.

<div class=info>

**Note**

If you are developing a small application, and monitoring asynchronous transactions adds too much overhead to your project, consider [turning asynchronous transactions announcement into synchronous](../monitoring/turning-the-asynchronous-transaction-announcement-into-synchronous.md).

</div>

## Troubleshooting: Monitoring transactions on the client side

The xpx-chain-sdk for typescript base Listener was designed to work on Node.js backend environments.

To make the code work in the client side (e.g., Angular, React, Vue.), pass the browser implementation of the WebSocket to the Listener.

```js
const listener = new Listener('ws://localhost:3000', WebSocket);
listener.open().then(() => ...
```

## What’s next?

Run your application and try to [send a transfer transaction](../transaction/sending-a-transfer-transaction.html) to the selected account. If all goes well, you will see the transaction information in your terminal.

Author: [jorisadri](https://bcdocs.xpxsirius.io/guides/author/jorisadri.html)
