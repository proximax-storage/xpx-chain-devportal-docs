---
id: listening-new-blocks
title: Listening New Blocks
---

Get notified when a new [block](../../protocol/block.md) is included.

## Prerequisites

- Text editor or IDE
- XPX-Chain-SDK or XPX-Chain-CLI
- Finish the [getting started section](../../getting-started/setting-up-workstation.md)

## Getting into some code

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://localhost:3000"})
if err != nil {
    panic(err)
}

wsClient, err := websocket.NewClient(context.Background(), conf)
if err != nil {
  panic(err)
}

err := wsClient.AddBlockHandlers(func(block *sdk.BlockInfo) bool {
  fmt.Println(block.String())
  return true
})
```

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

<!--CLI-->
```sh
xpx2-cli monitor block
```

<!--END_DOCUSAURUS_CODE_TABS-->


