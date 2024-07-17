---
id: finish-download
title: Finish Download Channel
---

Close a Download Channel

## Prerequisites

- Sirius SDK
- A text editor or IDE
- [Have a Drive with enough Replicators](prepare-bc-drive)
- [Have an active Download Channel](download)

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

	// Close Download Channel
	finishModificationTrx, err := Client.NewFinishDownloadTransaction(
		sdk.NewDeadline(Deadline),
		downloadChannelId,
		sdk.Amount(100), //Fee in XPX
	)
	
	signedTx, err := ownerAccount.Sign(finishModificationTrx)
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
