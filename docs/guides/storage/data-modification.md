---
id: data-modification
title: Data Modification
---

Create a new Data Modification

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
	// an account with XPX
	privateKey = "809CD6699B7F38063E28F606BD3A8AECA6E13B1E688FE8E733D13DB843BC14B7"
	minReplicatorsCount = 5
)

func main() {
	conf, err := sdk.NewConfig(context.Background(), []string{baseUrl})
	if err != nil {
		fmt.Printf("NewConfig returned error: %s", err)
		return
	}

	// Use the default http client
	client := sdk.NewClient(nil, conf)

	ownerAccount, err := client.NewAccountFromPrivateKey(privateKey)
	if err != nil {
		panic(err)
	}

	// Create drive
	prepareBcDriveTx, err := Client.NewPrepareBcDriveTransaction(
		sdk.NewDeadline(Deadline),
		sdk.StorageSize(100), // in Gb
		sdk.Amount(1000), // verification fee
		minReplicatorsCount,
	)
	if err != nil {
		panic(err)
	}

	signedTx, err := ownerAccount.Sign(prepareBcDriveTx)
	if err != nil {
		panic(err)
	}

	_, err = Client.Transaction.Announce(Ctx, signedTx)
	if err != nil {
		panic(err)
	}

	// you can subscribe on transaction with WebSocket
}

```
