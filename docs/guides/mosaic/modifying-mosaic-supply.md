---
id: modifying-mosaic-supply
title: Modifying Mosaic Supply
---
Did you register a [mosaic](../../built-in-features/mosaic.md) with supply mutable option set to true? In that case, you can increase or decrease your mosaic available supply by following this guide.

## Prerequisites

- Finish [creating a mosaic guide](./creating-a-mosaic.md).
- XPX-Chain-SDK or XPX-Chain-CLI.
- A text editor or IDE.
- An account with XPX.
- Have registered a supply mutable mosaic.

## Let’s do some coding!

If you have followed the previous guide, you should be able to own a `supply mutable` mosaic.

Proceed now to sign and announce a [mosaic supply change transaction](../../built-in-features/mosaic.md#mosaicsupplychangetransaction). This will increase to `2.000.000` initial supply.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const privateKey = process.env.PRIVATE_KEY as string;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const mosaicID = new MosaicId('foo:token');

const mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
    Deadline.create(),
    mosaicID,
    MosaicSupplyType.Increase,
    UInt64.fromUint(2000000),
    NetworkType.TEST_NET);

const signedTransaction = account.sign(mosaicSupplyChangeTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x=> console.log(x), err => console.error(err));
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const privateKey = process.env.PRIVATE_KEY;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const mosaicID = new MosaicId('foo:token');

const mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
    Deadline.create(),
    mosaicID,
    MosaicSupplyType.Increase,
    UInt64.fromUint(2000000),
    NetworkType.TEST_NET);

const signedTransaction = account.sign(mosaicSupplyChangeTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x=> console.log(x), err => console.error(err));
```

<!--Java-->
```java
    // Replace with private key
    final String privateKey = "";

    final Account account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

    // Replace with mosaic id
    final MosaicId mosaicId = new MosaicId("foo:token"); // replace with mosaic full name

    MosaicSupplyChangeTransaction mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
        new Deadline(2, ChronoUnit.HOURS),
        mosaicId,
        MosaicSupplyType.INCREASE,
        BigInteger.valueOf(2000000),
        NetworkType.TEST_NET
    );

    final SignedTransaction signedTransaction = account.sign(mosaicSupplyChangeTransaction);

    final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

    transactionHttp.announce(signedTransaction).toFuture().get();
```
<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

Decrease your mosaic supply by changing `MosaicSupplyType.Increase` for `MosaicSupplyType.Decrease`.
