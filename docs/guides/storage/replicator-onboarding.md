---
id: replicator-onboarding
title: Replicator Onboarding
---

Mark an account as a Replicator.

## Prerequisites

- Sirius SDK
- A text editor or IDE
- Have an account with XPX

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
	// an account thad added metadata
	privateKey = "809CD6699B7F38063E28F606BD3A8AECA6E13B1E688FE8E733D13DB843BC14B7"
)

func main() {
	conf, err := sdk.NewConfig(context.Background(), []string{baseUrl})
	if err != nil {
		fmt.Printf("NewConfig returned error: %s", err)
		return
	}

	// Use the default http client
	client := sdk.NewClient(nil, conf)

	replicatorAccount, err := client.NewAccountFromPrivateKey(privateKey)
	if err != nil {
		panic(err)
	}

	replicatorOnboardingTx, err := Client.NewReplicatorOnboardingTransaction(
		sdk.NewDeadline(Deadline),
		sdk.Amount(1), //capacity of and Replicator
	)
	if err != nil {
		panic(err)
	}

	signedTx, err := replicatorAccount.Sign(replicatorOnboardingTx)
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
