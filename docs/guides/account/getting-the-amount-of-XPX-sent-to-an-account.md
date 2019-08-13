---
id: getting-xpx-amount-sent-to-account
title: Getting the amount of XPX sent to an account
---
Check the amount of XPX you have sent to any account.

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md)
- have one account with `xpx` currency
- have [sent mosaics](../../guides/transaction/sending-a-transfer-transaction.md) to another account
- Text editor or IDE
- XPX-Chain-SDK or XPX-Chain-CLI

## Getting into some code

In this example, we are going to check how many assets of a certain type have we sent to an account.

<!--DOCUSAURUS_CODE_TABS-->

<!--TypeScript-->
```javascript
const accountHttp = new AccountHttp('http://localhost:3000');

const originPublicKey = '7D08373CFFE4154E129E04F0827E5F3D6907587E348757B0F87D2F839BF88246';
const originAccount = PublicAccount.createFromPublicKey(originPublicKey, NetworkType.TEST_NET);

const recipientAddress = 'VDG4WG-FS7EQJ-KFQKXM-4IUCQG-PXUW5H-DJVIJB-OXJG';
const address = Address.createFromRawAddress(recipientAddress);

accountHttp
    .outgoingTransactions(originAccount)
    .pipe(
        mergeMap((_) => _), // Transform transaction array to single transactions to process them
        filter((_) => _.type === TransactionType.TRANSFER), // Filter transfer transactions
        map((_) => _ as TransferTransaction), // Map transaction as transfer transaction
        filter((_) => _.recipient.equals(address)), // Filter transactions from to account
        filter((_) => _.mosaics.length === 1 && _.mosaics[0].id.equals(NetworkCurrencyMosaic.MOSAIC_ID)), // Filter xpx transactions
        map((_) => _.mosaics[0].amount.compact() / Math.pow(10, NetworkCurrencyMosaic.DIVISIBILITY)), // Map only amount in xpx
        toArray(), // Add all mosaics amounts into one array
        map((_) => _.reduce((a, b) => a + b, 0))
    )
    .subscribe(
        total => console.log('Total xpx send to account', address.pretty(), 'is:', total),
        err => console.error(err)
    );
```

<!--Java-->
```java
// Replace with public key
final String originPublicKey = "";

// Replace with recipient address
final String recipientAddress = "VB2RPH-EMTFMB-KELX2Y-Q3MZTD-RV7DQG-UZEADV-CYKC";

// Replace with public key
final PublicAccount originAccount = PublicAccount.createFromPublicKey(originPublicKey, NetworkType.TEST_NET);

// Replace with address
final Address address = Address.createFromRawAddress(recipientAddress);

final AccountHttp accountHttp = new AccountHttp("http://localhost:3000");

final BigInteger total = accountHttp.outgoingTransactions(originAccount)
        .flatMapIterable(tx -> tx) // Transform transaction array to single transactions to process them
        .filter(tx -> tx.getType().equals(TransactionType.TRANSFER)) // Filter transfer transactions
        .map(tx -> (TransferTransaction) tx) // Map transaction as transfer transaction
        .filter(tx -> tx.getRecipient().equals(address)) // Filter transactions from to account
        .filter(tx -> tx.getMosaics().size() == 1 && tx.getMosaics().get(0).getId().equals(NetworkCurrencyMosaic.MOSAICID)) // Filter xpx transactions
        .map(tx -> tx.getMosaics().get(0).getAmount().divide(BigDecimal.valueOf(Math.pow(10, NetworkCurrencyMosaic.DIVISIBILITY)).toBigInteger())) // Map only amount in xpx
        .toList() // Add all mosaics amounts into one array
        .map(amounts -> amounts.stream().reduce(BigInteger.ZERO, BigInteger::add))
        .toFuture()
        .get();

System.out.println("Total xpx send to account " + address.pretty() + " is: " + total.toString());
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

for _, mosaic := range accountInfo.Mosaics {
    if mosaic.AssetId == sdk.XpxNamespaceId {
      fmt.Println(mosaic.String())
    }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

If you want to check another mosaic different than the native currency, change `mosaicId` for the target mosaic.

