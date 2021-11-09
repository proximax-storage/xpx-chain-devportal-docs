---
id: mosaic-metadata-v2
title: Mosaic Metadata
---

## Add metadata to mosaic

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
package main

import (
	"context"
	"encoding/hex"
	"fmt"
	"time"

	"github.com/proximax-storage/go-xpx-chain-sdk/sdk"
)

const (
	// Sirius api rest server
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

	metadataAdder, err := client.NewAccountFromPrivateKey(privateKey)
	if err != nil {
		panic(err)
	}

	namespaceId, err := sdk.NewNamespaceIdFromName(hex.EncodeToString([]byte("Name")))
	if err != nil {
		panic(err)
	}

	// NOTE: before NewNamespaceMetadataTransaction namespace should be registered with NewRegisterRootNamespaceTransaction
	metadataTx, err := client.NewNamespaceMetadataTransaction(
		sdk.NewDeadline(1*time.Hour),
		namespaceId,
		metadataAdder.PublicAccount,
		1,
		"Hello world",
		"",
	)
	if err != nil {
		panic(err)
	}
	metadataTx.ToAggregate(metadataAdder.PublicAccount)

	abt, err := client.NewBondedAggregateTransaction(
		sdk.NewDeadline(time.Hour),
		[]sdk.Transaction{metadataTx},
	)
	if err != nil {
		panic(err)
	}

	signedAbt, err := metadataAdder.Sign(abt)
	if err != nil {
		panic(err)
	}

	// Create lock funds transaction for aggregate bounded
	lockFundsTransaction, err := client.NewLockFundsTransaction(
		// The maximum amount of time to include the transaction in the blockchain.
		sdk.NewDeadline(time.Hour*1),
		// Funds to lock
		sdk.XpxRelative(10),
		// Duration of lock transaction in blocks
		sdk.Duration(1000),
		// Aggregate bounded transaction for lock
		signedAbt,
	)
	if err != nil {
		panic(err)
	}

	signedLockFundsTrx, err := metadataAdder.Sign(lockFundsTransaction)
	if err != nil {
		panic(err)
	}

	_, err = client.Transaction.Announce(context.Background(), signedLockFundsTrx)
	if err != nil {
		panic(err)
	}
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Get metadata of mosaic

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
package main

import (
	"context"
	"fmt"
	math "math/rand"
	"time"

	"github.com/proximax-storage/go-xpx-chain-sdk/sdk"
)

const (
	// Sirius api rest server
	baseUrl = "http://localhost:3000"
	// an account thad added metadata
	privateKey = "809CD6699B7F38063E28F606BD3A8AECA6E13B1E688FE8E733D13DB843BC14B7"
	// another account for which metadata was added
	mosaicOwnerPrivateKey = "764B3AA022FB929CAA204670A817205DC08F2B172D501F36D4F0EC4EA50AFAE9"
)

// suppose that mosaic already exists
func main() {
	conf, err := sdk.NewConfig(context.Background(), []string{baseUrl})
	if err != nil {
		fmt.Printf("NewConfig returned error: %s", err)
		return
	}

	// Use the default http client
	client := sdk.NewClient(nil, conf)
	
	acc, err := client.NewAccountFromPrivateKey(privateKey)
	if err != nil {
		panic(err)
	}

	mosaicOwner, err := client.NewAccountFromPrivateKey(mosaicOwnerPrivateKey)
	if err != nil {
		panic(err)
	}

	r := math.New(math.NewSource(time.Now().UTC().UnixNano()))
	nonce := r.Uint32()
	mosaicId, err := sdk.NewMosaicIdFromNonceAndOwner(nonce, mosaicOwner.PublicAccount.PublicKey)
	if err != nil {
		panic(err)
	}

	hash, _ := sdk.CalculateUniqueMosaicMetadataId(acc.Address, mosaicOwner.PublicAccount, 1, mosaicId)
	if err != nil {
		panic(err)
	}

	metadata, err := client.MetadataV2.GetMetadataV2Info(context.Background(), hash)
	if err != nil {
		panic(err)
	}

	fmt.Println(metadata)
}
```

<!--END_DOCUSAURUS_CODE_TABS-->
