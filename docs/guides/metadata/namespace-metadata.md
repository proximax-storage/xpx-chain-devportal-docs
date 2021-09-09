---
id: namespace-metadata
title: Namespace Metadata (Deprecated since 0.7.0 Sirius Chain release)
---

## Add metadata to namespace

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp(APIUrl);

const generationHash = process.env.NETWORK_GENERATION_HASH as string;

const testingNamespace = new NamespaceId('testing');

let private_key: string = "123...456";

const account = Account.createFromPrivateKey(private_key, NetworkType.TEST_NET);

const modifyMetadataTransaction = ModifyMetadataTransaction.createWithNamespaceId(
    NetworkType.TEST_NET,
    Deadline.create(),
    undefined,
    testingNamespace,
    [new MetadataModification(MetadataModificationType.ADD, "key1", "value1")]
);

const signedTransaction = modifyMetadataTransaction.signWith(account, generationHash);

transactionHttp.announce(signedTransaction);
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp(APIUrl);

const generationHash = process.env.NETWORK_GENERATION_HASH;

const testingNamespace = new NamespaceId('testing');

const private_key = "123...456";

const account = Account.createFromPrivateKey(private_key, NetworkType.TEST_NET);

const modifyMetadataTransaction = ModifyMetadataTransaction.createWithNamespaceId(
    NetworkType.TEST_NET,
    Deadline.create(),
    undefined,
    testingNamespace,
    [new MetadataModification(MetadataModificationType.ADD, "key1", "value1")]
);

const signedTransaction = modifyMetadataTransaction.signWith(account, generationHash);

transactionHttp.announce(signedTransaction);
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Remove metadata from namespace

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp(APIUrl);

const generationHash = process.env.NETWORK_GENERATION_HASH as string;

const testingNamespace = new NamespaceId('testing');

let private_key: string = "123...456";

const account = Account.createFromPrivateKey(private_key, NetworkType.TEST_NET);

const modifyMetadataTransaction = ModifyMetadataTransaction.createWithNamespaceId(
    NetworkType.TEST_NET,
    Deadline.create(),
    undefined,
    testingNamespace,
    [new MetadataModification(MetadataModificationType.REMOVE, "key1")]
);

const signedTransaction = modifyMetadataTransaction.signWith(account, generationHash);

transactionHttp.announce(signedTransaction);
```

<!--JavaScript-->
```js
const transactionHttp = new TransactionHttp(APIUrl);

const generationHash = process.env.NETWORK_GENERATION_HASH;

const testingNamespace = new NamespaceId('testing');

const private_key = "123...456";

const account = Account.createFromPrivateKey(private_key, NetworkType.TEST_NET);

const modifyMetadataTransaction = ModifyMetadataTransaction.createWithNamespaceId(
    NetworkType.TEST_NET,
    Deadline.create(),
    undefined,
    testingNamespace,
    [new MetadataModification(MetadataModificationType.REMOVE, "key1")]
);

const signedTransaction = modifyMetadataTransaction.signWith(account, generationHash);

transactionHttp.announce(signedTransaction);
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Get metadata of namespace

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const metadataHttp = new MetadataHttp(APIUrl);

const testingNamespace = new NamespaceId('testing');

metadataHttp.getNamespaceMetadata(testingNamespace)
    .subscribe((metadataInfo) => {
        console.log(metadataInfo);
    });

```

<!--JavaScript-->
```js
const metadataHttp = new MetadataHttp(APIUrl);

const testingNamespace = new NamespaceId('testing');

metadataHttp.getNamespaceMetadata(testingNamespace)
    .subscribe((metadataInfo) => {
        console.log(metadataInfo);
    });
```

<!--END_DOCUSAURUS_CODE_TABS-->