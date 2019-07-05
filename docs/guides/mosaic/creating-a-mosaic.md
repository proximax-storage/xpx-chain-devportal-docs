---
id: creating-a-mosaic
title: Creating a mosaic
---
After creating a namespace, follow this guide to create a [mosaic](../../built-in-features/mosaic.md) .

## Background

Mosaics can be used to represent any asset in the blockchain such as objects, tickets, coupons, stock share representation, and even your cryptocurrency.

A mosaic is like a file hosted on a domain and it represents an asset. Like a website and directory, a mosaic can have the same name as other files on other domains. However, a namespace + mosaic is always unique.

## Prerequisites

- Finish [registering a namespace guide](../namespace/registering-a-namespace.md)
- XPX-Chain-SDK or XPX-Chain-CLI
- A text editor or IDE
- An account with XPX and at least one namespace

## Let’s get into some code

The first step is to choose a name for your mosaic. The name of the mosaic, up to a size limit of `64` characters, must be unique under the domain name.

Our mosaic will be called `token`, and its parent namespace will be `foo`.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const privateKey = process.env.PRIVATE_KEY as string;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

// Replace with namespace name and mosaic name
const namespaceName = 'foo';
const mosaicName = 'token';
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp('http://localhost:3000');

const privateKey = process.env.PRIVATE_KEY;
const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

// Replace with namespace name and mosaic name
const namespaceName = 'foo';
const mosaicName = 'token';
```

<!--Java-->
```java
    // Replace with private key
    final String privateKey = "";

    final Account account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

    // Replace with namespace name and mosaic name
    final String namespaceName = "foo";
    final String mosaicName = "token";
```
<!--END_DOCUSAURUS_CODE_TABS-->

It is necessary to announce two transactions when creating a mosaic:

1. A [mosaic definition transaction](../../built-in-features/mosaic.md#mosaicdefinitiontransaction), to create the mosaic.

Under mosaic properties, we define a mosaic with `supplyMutable`, `transferable` among accounts other than the creator and registered for `1000 blocks`. `foo:token` won’t be `divisible`.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const mosaicDefinitionTransaction = MosaicDefinitionTransaction.create(
    Deadline.create(),
    mosaicName,
    namespaceName,
    MosaicProperties.create({
        supplyMutable: true,
        transferable: true,
        levyMutable: false,
        divisibility: 0,
        duration: UInt64.fromUint(1000)
    }),
    NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const mosaicDefinitionTransaction = MosaicDefinitionTransaction.create(
    Deadline.create(),
    mosaicName,
    namespaceName,
    MosaicProperties.create({
        supplyMutable: true,
        transferable: true,
        levyMutable: false,
        divisibility: 0,
        duration: UInt64.fromUint(1000)
    }),
    NetworkType.TEST_NET);
```

<!--Java-->
```js
MosaicDefinitionTransaction mosaicDefinitionTransaction = MosaicDefinitionTransaction.create(
    new Deadline(2, ChronoUnit.HOURS),
    mosaicName,
    namespaceName,
    new MosaicProperties(true, true, false, 0, BigInteger.valueOf(1000)),
    NetworkType.TEST_NET
);
```
<!--END_DOCUSAURUS_CODE_TABS-->

2. A [mosaic supply change transaction](../../built-in-features/mosaic.md#mosaicsupplychangetransaction), to set the supply. `foo:token` initial supply is 1.000.000

<div class=info>

**Note**

Once you announce a MosaicSupplyChangeTransaction, you cannot change mosaic properties for this mosaic.

</div>

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
    Deadline.create(),
    mosaicDefinitionTransaction.mosaicId,
    MosaicSupplyType.Increase,
    UInt64.fromUint(1000000),
    NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
    Deadline.create(),
    mosaicDefinitionTransaction.mosaicId,
    MosaicSupplyType.Increase,
    UInt64.fromUint(1000000),
    NetworkType.TEST_NET);
```

<!--Java-->
```java
MosaicSupplyChangeTransaction mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
    new Deadline(2, ChronoUnit.HOURS),
    mosaicDefinitionTransaction.getMosaicId(),
    MosaicSupplyType.INCREASE,
    BigInteger.valueOf(1000000),
    NetworkType.TEST_NET
);
```
<!--END_DOCUSAURUS_CODE_TABS-->

3. Both transactions can be announced together using an [aggregate transaction](../../built-in-features/aggregate-transaction.md#examples).

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [
        mosaicDefinitionTransaction.toAggregate(account.publicAccount),
        mosaicSupplyChangeTransaction.toAggregate(account.publicAccount)
    ],
    NetworkType.TEST_NET,
    []);

const signedTransaction = account.sign(aggregateTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x=> console.log(x),err => console.error(err));
```

<!--JavaScript-->
```js
const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [
        mosaicDefinitionTransaction.toAggregate(account.publicAccount),
        mosaicSupplyChangeTransaction.toAggregate(account.publicAccount)
    ],
    NetworkType.TEST_NET,
    []);

const signedTransaction = account.sign(aggregateTransaction);

transactionHttp
    .announce(signedTransaction)
    .subscribe(x=> console.log(x),err => console.error(err));
```

<!--Java-->
```java
AggregateTransaction aggregateTransaction = AggregateTransaction.createComplete(
    new Deadline(2, ChronoUnit.HOURS),
    Arrays.asList(
        mosaicDefinitionTransaction.toAggregate(account.getPublicAccount()),
        mosaicSupplyChangeTransaction.toAggregate(account.getPublicAccount())
    ),
    NetworkType.TEST_NET
);

final SignedTransaction signedTransaction = account.sign(aggregateTransaction);

final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

transactionHttp.announce(signedTransaction).toFuture().get();
```

<!--Bash-->
```
xpx2-cli transaction mosaic --mosaicname token --namespacename foo --amount 1000000 --transferable --supplymutable --divisibility 0 --duration 1000
```

<!--END_DOCUSAURUS_CODE_TABS-->

## What’s next?

[Transfer](../transaction/sending-a-transfer-transaction.md) one mosaic created to another account or modify its properties following the next guide.



