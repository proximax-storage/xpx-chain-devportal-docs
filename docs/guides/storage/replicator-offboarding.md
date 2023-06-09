---
id: replicator-offboarding
title: Replicator Offboarding
---

Offboarding a Replicator from a Drive.

## Prerequisites

- Sirius SDK
- A text editor or IDE
- [Have a Replicator onbarded on a Drive](replicator-onboarding.md)

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
	driveKey   = "29C27BE2C64BCCC8DDA934F8F4092CDF418CC160AF60D50EF74B263E6A5E9E41"
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

	drive, err := client.NewAccountFromPublicKey(driveKey)
	if err != nil {
		panic(err)
	}
	
	replicatorOffboardingTx, err := Client.NewReplicatorOffboardingTransaction(
		sdk.NewDeadline(Deadline),
		drive,
	)
	if err != nil {
		panic(err)
	}

	signedTx, err := replicatorAccount.Sign(replicatorOffboardingTx)
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
