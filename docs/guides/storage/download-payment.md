---
id: download-payment
title: Download Payment
---

Pay to a Download channel

## Prerequisites

- Sirius SDK
- A text editor or IDE
- [Have a Drive with enough Replicators](prepare-bc-drive)
- [Have a Download channel](download)

## Getting into some code

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->

```go
package main

import (
	"context"
	"fmt"
	"github.com/proximax-storage/go-xpx-chain-sdk/sdk"
)

const (
	// Sirius REST server
	baseUrl = "http://localhost:3000"
	// owner private Key
	priveaKey = "E8DAFF4218CC6E3185ABE506D084DCF387A1C9986F9ED9244D72110A7998FCCF"
	// hash of download transaction
	downloadTransactionHash = "A44F44D5B7FA91D8E6D1FD8FB51B21407DC94E7F0A6C7BBDBF82EC3547549C6F"
)

func main() {
	conf, err := sdk.NewConfig(context.Background(), []string{baseUrl})
	if err != nil {
		fmt.Printf("NewConfig returned error: %s", err)
		return
	}

	// Use the default http client
	client := sdk.NewClient(nil, conf)

	ownerAccount, err := client.NewAccountFromPrivateKey(priveaKey)
	if err != nil {
		panic(err)
	}

	// Download Channel id
	downloadChannelId, err := sdk.StringToHash(downloadTransactionHash)
	if err != nil {
		panic(err)
	}

	downloadPaymentTrx, err := Client.NewDownloadPaymentTransaction(
		sdk.NewDeadline(Deadline),
		downloadChannelId,
		sdk.StorageSize(100), // Storage size in Mb
		sdk.Amount(100), // Fee in XPX
	)
	if err != nil {
		panic(err)
	}

	signedTx, err := ownerAccount.Sign(downloadPaymentTrx)
	if err != nil {
		panic(err)
	}

	_, err = Client.Transaction.Announce(context.TODO(), signedTx)
	if err != nil {
		panic(err)
	}

	// you can subscribe on transaction with WebSocket
}
```
