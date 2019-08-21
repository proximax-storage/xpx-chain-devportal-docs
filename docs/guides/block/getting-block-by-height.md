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
conf, err := sdk.NewConfig("http://localhost:3000", sdk.PUBLIC_TEST, time.Second * 10)
if err != nil {
    panic(err)
}

client := sdk.NewClient(nil, conf)

block, err := client.Blockchain.GetBlockByHeight(context.Background(), sdk.Height(1))
if err != nil {
    panic(err)
}
fmt.Printf(block.String())
```
<!--END_DOCUSAURUS_CODE_TABS-->

The following snippet returns the height of the latest block.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig("http://localhost:3000", sdk.PUBLIC_TEST, time.Second * 10)
if err != nil {
    panic(err)
}

client := sdk.NewClient(nil, conf)

height, err := client.Blockchain.GetBlockchainHeight(context.Background())
if err != nil {
    panic(err)
}
fmt.Printf("%s\n", height)
```
<!--END_DOCUSAURUS_CODE_TABS-->

