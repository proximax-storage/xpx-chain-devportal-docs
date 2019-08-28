---
id: reading-transactions-from-an-account
title: Reading transactions from an account
---

Get the list of [transactions](../../protocol/transaction.md) where an [account](../../built-in-features/account.md) is involved.

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md)
- Text editor or IDE
- XPX-Chain-SDK or XPX-Chain-CLI
- An account that has received some transaction

## Getting into some code

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
publicKey := "..."

conf, err := sdk.NewConfig(baseUrl, networkType, time.Second * 10)
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
<!--END_DOCUSAURUS_CODE_TABS-->

<div class="info">

**Note**

By default, the SDK provides up to 10 transactions. The page size can be increased up to 100 transactions.

</div>

To get more than 100 transactions, you will have to make further requests. For each additional call, add to the `QueryParams` the optional parameter `transactionId` with the latest transaction identifier known returned by the previous request.

