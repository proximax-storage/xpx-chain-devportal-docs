---
id: getting-block-by-height
title: Getting block by height
---

Get the [block](../../protocol/block.md) information given a height.

## Prerequisites

- Text editor or IDE
- XPX-Chain-SDK or XPX-Chain-CLI
- Finish the [getting started section](../../getting-started/setting-up-workstation.md)

## Getting into some code

Are you curious to see what happened in the genesis block?

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://bctestnet1.brimstone.xpxsirius.io:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

block, err := client.Blockchain.GetBlockByHeight(context.Background(), sdk.Height(1))
if err != nil {
    panic(err)
}
fmt.Printf(block.String())
```

<!--TypeScript-->
```js
const blockchainHttp = new BlockchainHttp('http://bctestnet1.brimstone.xpxsirius.io:3000');

const height = 1;

blockchainHttp
    .getBlockByHeight(height)
    .subscribe(block => console.log(block), err => console.error(err));
```

<!--JavaScript-->
```js
const blockchainHttp = new BlockchainHttp('http://bctestnet1.brimstone.xpxsirius.io:3000');

const height = 1;

blockchainHttp
    .getBlockByHeight(height)
    .subscribe(block => console.log(block), err => console.error(err));
```

<!--Java-->
```java
    final BlockchainHttp blockchainHttp = new BlockchainHttp("http://bctestnet1.brimstone.xpxsirius.io:3000");

    // Replace with block height
    final BigInteger blockHeight = BigInteger.valueOf(1);

    final BlockInfo blockInfo = blockchainHttp.getBlockByHeight(blockHeight).toFuture().get();

    System.out.print(blockInfo);
```

<!--END_DOCUSAURUS_CODE_TABS-->

The following snippet returns the height of the latest block.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://bctestnet1.brimstone.xpxsirius.io:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

height, err := client.Blockchain.GetBlockchainHeight(context.Background())
if err != nil {
    panic(err)
}
fmt.Printf("%s\n", height)
```

<!--TypeScript-->
```js
const blockchainHttp = new BlockchainHttp('http://bctestnet1.brimstone.xpxsirius.io:3000');

blockchainHttp
    .getBlockchainHeight()
    .subscribe(height => console.log(height.compact()), err => console.error(err));
```

<!--JavaScript-->
```js
const blockchainHttp = new BlockchainHttp('http://bctestnet1.brimstone.xpxsirius.io:3000');

blockchainHttp
    .getBlockchainHeight()
    .subscribe(height => console.log(height.compact()), err => console.error(err));
```

<!--Java-->
```java
    final BlockchainHttp blockchainHttp = new BlockchainHttp("http://bctestnet1.brimstone.xpxsirius.io:3000");

    final BigInteger blockchainHeight = blockchainHttp.getBlockchainHeight().toFuture().get();

    System.out.print(blockchainHeight);
```

<!--CLI-->
```sh
xpx2-cli blockchain height
```

<!--END_DOCUSAURUS_CODE_TABS-->

