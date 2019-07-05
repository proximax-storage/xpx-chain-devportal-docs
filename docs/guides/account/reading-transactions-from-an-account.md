---
id: reading-account-transactions
title: Reading transactions from an account
---
Get the list of [transactions](../../protocol/transaction.md) where an [account](../../built-in-features/account.md) is involved.

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md)
- Text editor or IDE
- XPX-Chain-SDK or XPX-Chain-CLI
- An account that has received some transaction

## Let’s get into some code

In this example, you will fetch the latest confirmed transactions for a given account using the `accountHttp` repository.

By default, the SDK provides up to 10 transactions. The page size can be increased up to 100 transactions.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->

```ts
const accountHttp = new AccountHttp('http://localhost:3000');

const publicKey = '7D08373CFFE4154E129E04F0827E5F3D6907587E348757B0F87D2F839BF88246';
const publicAccount =  PublicAccount.createFromPublicKey(publicKey, NetworkType.TEST_NET);

const pageSize = 10; // Page size between 10 and 100, otherwise 10

accountHttp
    .transactions(publicAccount, new QueryParams(pageSize))
    .subscribe(transactions => console.log(transactions), err => console.error(err));
```

<!--JavaScript-->
```js
const accountHttp = new AccountHttp('http://localhost:3000');

const publicKey = '7D08373CFFE4154E129E04F0827E5F3D6907587E348757B0F87D2F839BF88246';
const publicAccount =  PublicAccount.createFromPublicKey(publicKey, NetworkType.TEST_NET);

const pageSize = 10; // Page size between 10 and 100, otherwise 10

accountHttp
    .transactions(publicAccount, new QueryParams(pageSize))
    .subscribe(transactions => console.log(transactions), err => console.error(err));
```

<!--Bash-->
```sh
xpx2-cli account transactions --publickey 7D08373CFFE4154E129E04F0827E5F3D6907587E348757B0F87D2F839BF88246 --numtransactions 10
```

<!--Java-->
```java
final AccountHttp accountHttp = new AccountHttp("http://localhost:3000");

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

**Note**

Get filtered the transactions received (incoming) from the ones sent (outgoing) checking the complete [accountHttp definition](https://proximax-storage.github.io/tsjs-xpx-chain-sdk/classes/_infrastructure_accounthttp_.accounthttp.html).

</div>

## What’s next

To [get more than 100 transactions](https://github.com/proximax-storage/proximax-bc-docs/blob/master/source/resources/examples/typescript/account/GettingAllConfirmedTransactions.ts), you will have to make further requests. For each additional call, add to the `QueryParams` the optional parameter `transactionId` with the latest transaction identifier known returned by the previous request.

```js
  new QueryParams(pageSize, transactions[transactions.length - 1].transactionInfo.id))
```