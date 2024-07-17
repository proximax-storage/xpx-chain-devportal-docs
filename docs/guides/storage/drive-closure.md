---
id: drive-closure
title: Drive Closure
---

Close an existing Drive

## Prerequisites

- Sirius SDK
- A text editor or IDE
- [Have a Drive](prepare-bc-drive)

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

	// Close Drive
	driveClosureTx, err := Client.NewDriveClosureTransaction(sdk.NewDeadline(Deadline), driveAccount.PublicAccount)
	if err != nil {
		panic(err)
	}

	signedTx, err := ownerAccount.Sign(driveClosureTx)
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
