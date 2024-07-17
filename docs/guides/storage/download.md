---
id: download
title: Download Channel
---

Create a new Download Channel

## Prerequisites

- Sirius SDK
- A text editor or IDE
- [Have a Drive with enough Replicators](prepare-bc-drive)

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
	// drive pubKey
	pubKey = "809CD6699B7F38063E28F606BD3A8AECA6E13B1E688FE8E733D13DB843BC14B7"
)

func main() {
	conf, err := sdk.NewConfig(context.Background(), []string{baseUrl})
	if err != nil {
		fmt.Printf("NewConfig returned error: %s", err)
		return
	}

	// Use the default http client
	client := sdk.NewClient(nil, conf)

	driveAccount, err := client.NewAccountFromPrivateKey(pubKey)
	if err != nil {
		panic(err)
	}

	ownerAccount, err := client.NewAccountFromPrivateKey(priveaKey)
	if err != nil {
		panic(err)
	}

	// New Download Channel
	downloadTx, err := Client.NewDownloadTransaction(
		sdk.NewDeadline(Deadline),
		driveAccount.PublicAccount,
		sdk.StorageSize(100),   // Storage size in Mb
		sdk.Amount(100),        // Fee in XPX
		[]*sdk.PublicAccount{}, // List of keys that can download. The empty list means that only owner can download
	)
	if err != nil {
		panic(err)
	}

	// Could be sign by any account that has XPX
	signedTx, err := ownerAccount.Sign(downloadTx)
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
