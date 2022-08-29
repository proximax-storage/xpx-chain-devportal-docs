---
id: modifying-mosaic-supply
title: Modifying Mosaic Supply
---

Alter the supply of a mosaic following this guide.

## Prerequisites

- XPX-Chain-SDK or XPX-Chain-CLI.
- A text editor or IDE.
- Finish [creating a mosaic guide](./creating-a-mosaic.md).
- Have a supply mutable mosaic registered.
- An account with `xpx`.

## Getting into some code

If you have followed the previous guide, right now you should own a `supply mutable` [ mosaic ](../../built-in-features/mosaic.md).

To increase the initial supply to `2.000.000`, define a [mosaic supply change transaction](../../built-in-features/mosaic.md#mosaicsupplychangetransaction) setting the target mosaicId.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://bctestnet1.brimstone.xpxsirius.io:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

mosaicId, err := sdk.NewMosaicIdFromNonceAndOwner(nonce, account.PublicKey)
if err != nil {
    panic(err)
}

mosaicSupplyChangeTrx, err := client.NewMosaicSupplyChangeTransaction(
    sdk.NewDeadline(time.Hour),
    mosaicId,
    sdk.Increase,
    sdk.Amount(2000000),
)
if err != nil {
    panic(err)
}
```

<!--JavaScript-->
```js
    const nodeURL = "http://bctestnet1.brimstone.xpxsirius.io:3000";

    const transactionHttp = new TransactionHttp(nodeURL);

    var mosaicDuration = (1 * 365 * 24 * 60 * 4 ); // 1 year - 15 sec per block 

    const privateKey = process.env.PRIVATE_KEY;
    const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

    // using mosaic Id / hex
    var mosaicId = new MosaicId("749e033f3371dee7");

    // using mosaicId, separated 32 bit integer
    var mosaicId = new MosaicId([863100647, 1956512575]);

    const mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
        Deadline.create(),
        mosaicId,
        MosaicSupplyType.Increase,
        UInt64.fromUint(2000000),
        NetworkType.TEST_NET
    );
```


<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

Decrease your mosaic supply by changing `MosaicSupplyType.Increase` for `MosaicSupplyType.Decrease`.

