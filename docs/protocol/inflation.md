---
id: inflation
title: Inflation
---

Sirius Chain engine supports increasing the native currency supply as time passes. The creation of an **inflationary mosaic** empowers consortium and private networks to apply new token economic models that suit their needs.

## Distribution

Networks with inflation configured can increase the currency mosaic **per block**. In this case, the block reward includes the mosaics created due to inflation. The [validator](./validating.md) collects the newly created mosaics, sharing them with the beneficiary when set.

The block creating currency mosaics record an inflation receipt. The receipt gathers the amount of mosaics created.

## Configuration

The [inflation configuration](https://github.com/proximax-storage/cpp-xpx-chain/blob/master/resources/config-inflation.properties) defines the amount of currency mosaics created per block. Besides, the incrementing ratio can vary depending on the block height. The last height determines the amount of inflation per block that will be created from then on.

```
starting-at-height-1 = 500
starting-at-height-100 = 400
starting-at-height-1250 = 0
```

The previous configuration example inflates 500 currency mosaics per block from height 1 until the next `starting-at-height-entry`. Between the blocks 100 and 1250, the currency mosaic supply increases by 400 units per block. Starting at height 1250, new blocks will not trigger the creation of mosaics.

The [network configuration](https://github.com/proximax-storage/cpp-xpx-chain/blob/master/resources/config-network.properties) also describes the initial and **maximum supply** of the native currency mosaic. The maximum supply takes into account the inflation generated per-block.

```
initialCurrencyAtomicUnits = 8'999'999'998'000'000
maxMosaicAtomicUnits = 9'000'000'000'000'000
```

