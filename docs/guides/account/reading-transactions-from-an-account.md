---
id: reading-transactions-from-an-account
title: Reading transactions from an account
---

Get the list of [transactions](../../protocol/transaction.md) where an [account](../../built-in-features/account.md) is involved.

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md).
- Text editor or IDE.
- XPX-Chain-SDK or XPX-Chain-CLI.
- An account that has received some transaction.

## Getting into some code

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
publicKey := "..."

conf, err := sdk.NewConfig(context.Background(), []string{"http://bctestnet1.brimstone.xpxsirius.io:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

// Get transaction informations for transactionIds or transactionHashes
transactions, err := client.Transaction.GetTransactions(context.Background(), []string{publicKey})
if err != nil {
    panic(err)
}

for _, transaction := range transactions {
    fmt.Printf("%s\n\n", transaction.String())
}
```

<!--TypeScript-->

```ts
const accountHttp = new AccountHttp('http://bctestnet1.brimstone.xpxsirius.io:3000');

const publicKey = '7D08373CFFE4154E129E04F0827E5F3D6907587E348757B0F87D2F839BF88246';
const publicAccount =  PublicAccount.createFromPublicKey(publicKey, NetworkType.TEST_NET);

const pageSize = 10; // Page size between 10 and 100, otherwise 10

accountHttp
    .transactions(publicAccount, new QueryParams(pageSize))
    .subscribe(transactions => console.log(transactions), err => console.error(err));
```

<!--JavaScript-->
```js
const accountHttp = new AccountHttp('http://bctestnet1.brimstone.xpxsirius.io:3000');

const publicKey = '7D08373CFFE4154E129E04F0827E5F3D6907587E348757B0F87D2F839BF88246';
const publicAccount =  PublicAccount.createFromPublicKey(publicKey, NetworkType.TEST_NET);

const pageSize = 10; // Page size between 10 and 100, otherwise 10

accountHttp
    .transactions(publicAccount, new QueryParams(pageSize))
    .subscribe(transactions => console.log(transactions), err => console.error(err));
```

<!--CLI-->
```sh
xpx2-cli account transactions --publickey 7D08373CFFE4154E129E04F0827E5F3D6907587E348757B0F87D2F839BF88246 --numtransactions 10
```

<!--Java-->
```java
final AccountHttp accountHttp = new AccountHttp("http://bctestnet1.brimstone.xpxsirius.io:3000");

// Replace with public key
final String publicKey = "";

final PublicAccount publicAccount = PublicAccount.createFromPublicKey(publicKey, NetworkType.TEST_NET);

// Page size between 10 and 100, otherwise 10
int pageSize = 20;

final List<Transaction> transactions = accountHttp.transactions(publicAccount, new QueryParams(pageSize, null)).toFuture().get();

System.out.print(transactions);
```

<!--END_DOCUSAURUS_CODE_TABS-->

<div class="info">

**Note:**

By default, the SDK provides up to 10 transactions. The page size can be increased up to 100 transactions.

</div>

To get more than 100 transactions, you will have to make further requests. For each additional call, add to the `QueryParams` the optional parameter `transactionId` with the latest transaction identifier known returned by the previous request.

