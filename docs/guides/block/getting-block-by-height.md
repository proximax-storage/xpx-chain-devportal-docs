---
id: getting-block-by-height
title: Getting block by height
---
This guide will help you get the [block](../../protocol/block.md) information given a height.

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md).
- Text editor or IDE.
- XPX-Chain-SDK or XPX-Chain-CLI.

## Let’s do some coding!

Are you curious to see what happened in the genesis block?

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const blockchainHttp = new BlockchainHttp('http://localhost:3000');

const height = 1;

blockchainHttp
    .getBlockByHeight(height)
    .subscribe(block => console.log(block), err => console.error(err));
```

<!--JavaScript-->
```js
const blockchainHttp = new BlockchainHttp('http://localhost:3000');

const height = 1;

blockchainHttp
    .getBlockByHeight(height)
    .subscribe(block => console.log(block), err => console.error(err));
```

<!--Java-->
```java
    final BlockchainHttp blockchainHttp = new BlockchainHttp("http://localhost:3000");

    // Replace with block height
    final BigInteger blockHeight = BigInteger.valueOf(1);

    final BlockInfo blockInfo = blockchainHttp.getBlockByHeight(blockHeight).toFuture().get();

    System.out.print(blockInfo);
```
<!--END_DOCUSAURUS_CODE_TABS-->

The following snippet returns the height of the latest block.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const blockchainHttp = new BlockchainHttp('http://localhost:3000');

blockchainHttp
    .getBlockchainHeight()
    .subscribe(height => console.log(height.compact()), err => console.error(err));
```

<!--JavaScript-->
```js
const blockchainHttp = new BlockchainHttp('http://localhost:3000');

blockchainHttp
    .getBlockchainHeight()
    .subscribe(height => console.log(height.compact()), err => console.error(err));
```

<!--Java-->
```java
    final BlockchainHttp blockchainHttp = new BlockchainHttp("http://localhost:3000");

    final BigInteger blockchainHeight = blockchainHttp.getBlockchainHeight().toFuture().get();

    System.out.print(blockchainHeight);
```

<!--Bash-->
```sh
xpx2-cli blockchain height
```

<!--END_DOCUSAURUS_CODE_TABS-->