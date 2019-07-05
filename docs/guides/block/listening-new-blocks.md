---
id: listening-new-blocks
title: Listening New Blocks
---
Get notified when a new [block](../../protocol/block.md) is included.

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md)
- Text editor or IDE
- XPX-Chain-SDK or XPX-Chain-CLI

## Let’s get into some code

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const listener = new Listener('http://localhost:3000');

listener.open().then(() => {

    listener
        .newBlock()
        .subscribe(block => console.log(block), err => console.error(err));

});
```

<!--JavaScript-->
```js
const listener = new Listener('http://localhost:3000');

listener.open().then(() => {

    listener
        .newBlock()
        .subscribe(block => console.log(block), err => console.error(err));

});
```

<!--Java-->
```java
    Listener listener = new Listener("http://localhost:3000");

    listener.open().get();

    BlockInfo blockInfo = listener.newBlock().take(1).toFuture().get();

    System.out.println(blockInfo);
```

<!--Bash-->
```sh
xpx2-cli monitor block
```

<!--END_DOCUSAURUS_CODE_TABS-->


<div class=info>

**Note**

The [listener implementation changes](../monitoring/monitoring-a-transaction-status.md#troubleshooting-monitoring-transactions-on-the-client-side) when used on the client side (e.g., Angular, React, Vue).

</div>

