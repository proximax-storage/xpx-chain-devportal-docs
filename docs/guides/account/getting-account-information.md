---
id: getting-account-information
title: Getting account information
---
Get the public key and balance of an [account](../../built-in-features/account.md).

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md)
- Text editor or IDE
- XPX-Chain-SDK or XPX-Chain-CLI

## Getting into some code

1. Call `getAccountInfo` function, passing your account's address as a parameter.

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->
```typescript
const accountHttp = new AccountHttp('http://localhost:3000');
const address = Address.createFromRawAddress('SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54');

accountHttp
    .getAccountInfo(address)
    .subscribe(accountInfo => console.log(accountInfo), err => console.error(err));
```

<!--JavaScript-->
```javascript
const accountHttp = new AccountHttp('http://localhost:3000');
const address = Address.createFromRawAddress('SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54');

accountHttp
    .getAccountInfo(address)
    .subscribe(accountInfo => console.log(accountInfo), err => console.error(err));
```

<!--Java-->
```java
final AccountHttp accountHttp = new AccountHttp("http://localhost:3000");

// Replace with address
final String address = "SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54";

final AccountInfo accountInfo = accountHttp.getAccountInfo(Address.createFromRawAddress(address)).toFuture().get();

System.out.println(accountInfo);
```

<!--Golang-->
```go
conf, err := sdk.NewConfig(baseUrl, networkType, time.Second * 10)
if err != nil {
    panic(err)
}

client := sdk.NewClient(nil, conf)

address, err := sdk.NewAddressFromPublicKey("...", sdk.PUBLIC_TEST)
if err != nil {
    panic(err)
}

accountInfo, err := client.Account.GetAccountInfo(context.Background(), address)
if err != nil {
    panic(err)
}

fmt.Printf(accountInfo.String())
```

<!--bash-->
```sh
xpx2-cli account info --address VD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54
```

<!--END_DOCUSAURUS_CODE_TABS-->

Can you determine the account’s public key? The **public key** identifies your account publicly in the network. Your **address** is derived from it, which contains further information such as network and validity check.

If you don’t have a public key assigned, that means that your account has not announced or received any transaction yet. The `addressHeight` and `publicKeyHeight` specify the block where your address and public key first appeared.

2. How many different mosaics does your account hold? Call `mosaicsAmountViewFromAddress` function, passing your account’s address as a parameter.

The balance is the amount of the different mosaics owned by the account. How many different mosaics does your account own?

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->
```typescript
const url = 'http://localhost:3000';
const accountHttp = new AccountHttp(url);
const mosaicHttp = new MosaicHttp(url);
const namespaceHttp = new NamespaceHttp(url);
const mosaicService = new MosaicService(accountHttp, mosaicHttp, namespaceHttp);

const address = Address.createFromRawAddress("VD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54");

mosaicService
    .mosaicsAmountViewFromAddress(address)
    .pipe(
        mergeMap((_) => _)
    )
    .subscribe(mosaic => console.log('You have', mosaic.relativeAmount(), mosaic.fullName()),
        err => console.error(err));
```

<!--JavaScript-->
```javascript
const url = 'http://localhost:3000';
const accountHttp = new AccountHttp(url);
const mosaicHttp = new MosaicHttp(url);
const namespaceHttp = new NamespaceHttp(url);
const mosaicService = new MosaicService(accountHttp, mosaicHttp, namespaceHttp);

const address = Address.createFromRawAddress("VD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54");

mosaicService
    .mosaicsAmountViewFromAddress(address)
    .pipe(
        mergeMap((_) => _)
    )
    .subscribe(mosaic => console.log('You have', mosaic.relativeAmount(), mosaic.fullName()),
        err => console.error(err));
```

<!--Golang-->
```go
conf, err := sdk.NewConfig(baseUrl, networkType, time.Second * 10)
if err != nil {
    panic(err)
}

client := sdk.NewClient(nil, conf)

address, err := sdk.NewAddressFromPublicKey("...", sdk.PUBLIC_TEST)
if err != nil {
    panic(err)
}

accountInfo, err := client.Account.GetAccountInfo(context.Background(), address)
if err != nil {
    panic(err)
}

fmt.Println(accountInfo.Mosaic[0].Amount())
```

<!--Bash-->
```sh
xpx2-cli account info --address VD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54
```

<!--END_DOCUSAURUS_CODE_TABS-->

