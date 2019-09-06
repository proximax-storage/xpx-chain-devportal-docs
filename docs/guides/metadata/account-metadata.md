---
id: account-metadata
title: Account Metadata
---

## Add metadata to account

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp(APIUrl);

const generationHash = process.env.NETWORK_GENERATION_HASH as string;

let private_key: string = "123...456";

const account = Account.createFromPrivateKey(private_key, NetworkType.TEST_NET);

const modifyMetadataTransaction = ModifyMetadataTransaction.createWithAddress(
    NetworkType.TEST_NET,
    Deadline.create(),
    undefined,
    account.address,
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

const modifyMetadataTransaction = ModifyMetadataTransaction.createWithAddress(
    NetworkType.TEST_NET,
    Deadline.create(),
    undefined,
    account.address,
    [new MetadataModification(MetadataModificationType.ADD, "key1", "value1")]
);

const signedTransaction = modifyMetadataTransaction.signWith(account, generationHash);

transactionHttp.announce(signedTransaction);
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Remove metadata from account

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const transactionHttp = new TransactionHttp(APIUrl);

const generationHash = process.env.NETWORK_GENERATION_HASH as string;

let private_key: string = "123...456";

const account = Account.createFromPrivateKey(private_key, NetworkType.TEST_NET);

const modifyMetadataTransaction = ModifyMetadataTransaction.createWithAddress(
    NetworkType.TEST_NET,
    Deadline.create(),
    undefined,
    account.address,
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

const modifyMetadataTransaction = ModifyMetadataTransaction.createWithAddress(
    NetworkType.TEST_NET,
    Deadline.create(),
    undefined,
    account.address,
    [new MetadataModification(MetadataModificationType.REMOVE, "key1")]
);

const signedTransaction = modifyMetadataTransaction.signWith(account, generationHash);

transactionHttp.announce(signedTransaction);
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Get metadata of account

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const metadataHttp = new MetadataHttp(APIUrl);

metadataHttp.getAccountMetadata('VBILTA367K2LX2FEXG5TFWAS7GEFYAGY7QLFBYKC')
    .subscribe((addressMetadata) => {
        console.log(addressMetadata);
    });

```

<!--JavaScript-->
```js
const metadataHttp = new MetadataHttp(APIUrl);

metadataHttp.getAccountMetadata('VBILTA367K2LX2FEXG5TFWAS7GEFYAGY7QLFBYKC')
    .subscribe((addressMetadata) => {
        console.log(addressMetadata);
    });
```

<!--END_DOCUSAURUS_CODE_TABS-->