---
id: mosaic-metadata
title: Mosaic Metadata
---

## Add metadata to mosaic

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp(APIUrl);

const generationHash = process.env.NETWORK_GENERATION_HASH as string;

let private_key: string = "123...456";

const account = Account.createFromPrivateKey(private_key, NetworkType.TEST_NET);

const mosaicId = new MosaicId([2262289484, 3405110546]);

const modifyMetadataTransaction = ModifyMetadataTransaction.createWithMosaicId(
    NetworkType.TEST_NET,
    Deadline.create(),
    undefined,
    mosaicId,
    [new MetadataModification(MetadataModificationType.ADD, "key1", "value1")]
);

const signedTransaction = modifyMetadataTransaction.signWith(account, generationHash);

transactionHttp.announce(signedTransaction);
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp(APIUrl);

const generationHash = process.env.NETWORK_GENERATION_HASH;

const private_key = "123...456";

const account = Account.createFromPrivateKey(private_key, NetworkType.TEST_NET);

const mosaicId = new MosaicId([2262289484, 3405110546]);

const modifyMetadataTransaction = ModifyMetadataTransaction.createWithMosaicId(
    NetworkType.TEST_NET,
    Deadline.create(),
    undefined,
    mosaicId,
    [new MetadataModification(MetadataModificationType.ADD, "key1", "value1")]
);

const signedTransaction = modifyMetadataTransaction.signWith(account, generationHash);

transactionHttp.announce(signedTransaction);
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Remove metadata from mosaic

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp(APIUrl);

const generationHash = process.env.NETWORK_GENERATION_HASH as string;

let private_key: string = "123...456";

const account = Account.createFromPrivateKey(private_key, NetworkType.TEST_NET);

const mosaicId = new MosaicId([2262289484, 3405110546]);

const modifyMetadataTransaction = ModifyMetadataTransaction.createWithMosaicId(
    NetworkType.TEST_NET,
    Deadline.create(),
    undefined,
    mosaicId,
    [new MetadataModification(MetadataModificationType.REMOVE, "key1")]
);

const signedTransaction = modifyMetadataTransaction.signWith(account, generationHash);

transactionHttp.announce(signedTransaction);
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp(APIUrl);

const generationHash = process.env.NETWORK_GENERATION_HASH;

const private_key = "123...456";

const account = Account.createFromPrivateKey(private_key, NetworkType.TEST_NET);

const mosaicId = new MosaicId([2262289484, 3405110546]);

const modifyMetadataTransaction = ModifyMetadataTransaction.createWithMosaicId(
    NetworkType.TEST_NET,
    Deadline.create(),
    undefined,
    mosaicId,
    [new MetadataModification(MetadataModificationType.REMOVE, "key1")]
);

const signedTransaction = modifyMetadataTransaction.signWith(account, generationHash);

transactionHttp.announce(signedTransaction);
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Get metadata of mosaic

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const metadataHttp = new MetadataHttp(APIUrl);

const mosaicId = new MosaicId([2262289484, 3405110546]);

metadataHttp.getMosaicMetadata(mosaicId)
    .subscribe((metadataInfo) => {
        console.log(metadataInfo);
    });

```

<!--JavaScript-->
```js
const metadataHttp = new MetadataHttp(APIUrl);

const mosaicId = new MosaicId([2262289484, 3405110546]);

metadataHttp.getMosaicMetadata(mosaicId)
    .subscribe((metadataInfo) => {
        console.log(metadataInfo);
    });
```

<!--END_DOCUSAURUS_CODE_TABS-->