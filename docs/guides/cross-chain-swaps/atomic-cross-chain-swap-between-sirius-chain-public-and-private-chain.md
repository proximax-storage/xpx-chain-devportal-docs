---
id: atomic-cross-chain-swap-between-sirius-chain-public-and-private-chain
title: Atomic cross-chain swap between Sirius public and private chains
---

[Cross-chain swaps](../../built-in-features/cross-chain-swaps.md) enable trading tokens between different blockchains, without using an intermediary party in the process.

This exchange of tokens will succeed atomically. If some of the actors do not agree, each of them will receive the locked tokens back after a determined amount of time.

When talking about tokens in Sirius Chain, we are actually referring to [mosaics](../../built-in-features/mosaic.md). Sirius Chain enables atomic swaps through [secret lock](../../built-in-features/cross-chain-swaps.md#secretlocktransaction) / [secret proof transaction](../../built-in-features/cross-chain-swaps.md#secretprooftransaction) mechanism.

## Background Information 

Alice and Bob want to exchange **10 alice:token for 10 bob:token**. The problem is that they are not in the same blockchain. Alice:token is defined in Sirius public chain, whereas bob:token is only present in a private chain using Sirius Chain technology.

One non-atomic solution could be:

1. Alice sends 10 alice:token to Bob (private chain)
2. Bob receives the transaction
3. Bob sends 10 bob:token to Alice (public chain)
4. Alice receives the transaction

However, they do not trust each other that much. Bob could decide not to send his mosaics to Alice. Following this guide, you will observe how to make this swap possible using Sirius technology to remove the need for trust. 

## Prerequisites

- XPX-Chain-SDK
- A text editor or IDE
- Finish [getting started section](../../getting-started/setting-up-workstation.md)

## Getting into some code

Trading tokens directly from one blockchain to the other is not possible, due to the technological differences between each them.

In the case of Sirius public and private chains, the same mosaic name could have a different definition and distribution, or even not exist. Between Bitcoin and Sirius Chain, the difference is even more evident, as each blockchain uses an entirely different technology.

Instead of transferring tokens between different chains, the trade will be performed inside each chain. The Secret proof or secret lock mechanism guarantees the token swap occurs atomically.

![Cross-chain swap](/img/cross-chain-swap1.png "Cross-chain swap")

<p class=caption>Atomic cross-chain swap between public and private network</p>

For that reason, each actor involved should have at least one account in each blockchain.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
privateChainConf, err := sdk.NewConfig(context.Background(), []string{"http://localhost:3000"})
if err != nil {
    panic(err)
}
privateChainClient := sdk.NewClient(nil, privateChainConf)
publicChainConf, err := sdk.NewConfig(context.Background(), []string{"http://localhost:3001"})
if err != nil {
    panic(err)
}
publicChainClient := sdk.NewClient(nil, publicChainConf)

alicePublicChainAccount, err := publicChainClient.NewAccountFromPrivateKey("...")
if err != nil {
    panic(err)
}
alicePrivateChainAccount, err := privateChainClient.NewAccountFromPrivateKey("...")
if err != nil {
    panic(err)
}
bobPublicChainAccount, err := publicChainClient.NewAccountFromPrivateKey("...")
if err != nil {
    panic(err)
}
bobPrivateChainAccount, err := privateChainClient.NewAccountFromPrivateKey("...")
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const alicePublicChainAccount = Account.createFromPrivateKey('', NetworkType.MAIN_NET);
const alicePrivateChainAccount = Account.createFromPrivateKey('', NetworkType.PRIVATE);

const bobPublicChainAccount = Account.createFromPrivateKey('', NetworkType.MAIN_NET);
const bobPrivateChainAccount = Account.createFromPrivateKey('', NetworkType.PRIVATE);

const privateChainTransactionHttp = new TransactionHttp('http://localhost:3000');
const publicChainTransactionHttp = new TransactionHttp('http://localhost:3001');
```

<!--END_DOCUSAURUS_CODE_TABS-->

1. Alice picks a random number, called `proof`. Then, applies a Sha3-256 hash algorithm to it, obtaining the `secret`.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
proofB := make([]byte, 8)
_, _ = rand.Read(proofB)
proof := sdk.NewProofFromBytes(proofB)
secret, err := proof.Secret(sdk.SHA3_256)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
import {sha3_256} from 'js-sha3';

const random = crypto.randomBytes(8);
const hash = sha3_256.create();
const secret = hash.update(random).hex().toUpperCase();
const proof = random.toString('hex');
```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Alice creates a secret lock transaction TX1, including:

- Mosaic: 10 alice token (1234)
- Recipient: Bob’s address (Private Chain)
- Algorithm: SHA3-256
- Secret: SHA3-256(proof)
- Duration: 96h
- Network: Private Chain

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
mosaicId, err := sdk.NewMosaicId(1234)
if err != nil {
    panic(err)
}
mosaic, err := sdk.NewMosaic(mosaicId, 10)
if err != nil {
    panic(err)
}
tx1, err := privateChainClient.NewSecretLockTransaction(
    sdk.NewDeadline(time.Hour),
    mosaic,
    sdk.Duration(96 * 3600 / 15),
    secret,
    bobPrivateChainAccount.PublicAccount.Address,
)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const tx1 = SecretLockTransaction.create(
    Deadline.create(),
    new Mosaic(new MosaicId([1234,0]), UInt64.fromUint(10)),
    UInt64.fromUint(96 * 3600 / 15),
    HashType.SHA3_256,
    secret,
    bobPrivateChainAccount.address,
    NetworkType.PRIVATE);
```

<!--END_DOCUSAURUS_CODE_TABS-->

Once announced, this transaction will remain locked until someone discovers the proof that matches the secret. If after a determined period no one proved it, the locked funds will be returned to Alice.

3. Alice signs and announces TX1 to the private chain.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
signedTransaction, err := alicePrivateChainAccount.Sign(tx1)
_, err = privateChainClient.Transaction.Announce(context.Background(), signedTransaction)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const tx1Signed = alicePrivateChainAccount.sign(tx1);
privateChainTransactionHttp
    .announce(tx1Signed)
    .subscribe(x => console.log(x),err => console.error(err));
```
<!--END_DOCUSAURUS_CODE_TABS-->


4. Alice can tell Bob the secret. Also, he could retrieve it directly from the chain.
5. Bob creates a secret lock transaction TX2, which contains:

- Mosaic: 10 bob token (4321)
- Recipient: Alice’s address (Public Chain)
- Algorithm: SHA3-256
- Secret: SHA3-256(proof)
- Duration: 84h
- Network: Public Chain

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
mosaicId, err = sdk.NewMosaicId(4321)
if err != nil {
    panic(err)
}
mosaic, err = sdk.NewMosaic(mosaicId, 10)
if err != nil {
    panic(err)
}

tx2, err := publicChainClient.NewSecretLockTransaction(
    sdk.NewDeadline(time.Hour),
    mosaic,
    sdk.Duration(96 * 3600 / 15),
    secret,
    alicePublicChainAccount.PublicAccount.Address,
)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const tx2 = SecretLockTransaction.create(
    Deadline.create(),
    new Mosaic(new MosaicId([4321,0]), UInt64.fromUint(10)),
    UInt64.fromUint(96 * 3600 / 15),
    HashType.SHA3_256,
    secret,
    alicePublicChainAccount.address,
    NetworkType.MAIN_NET);
```

<!--END_DOCUSAURUS_CODE_TABS-->

<div class=info>

**Note:**

The amount of time in which funds can be unlocked should be a smaller time frame than TX1’s. Alice knows the secret, so Bob must be sure he will have some time left after Alice releases the secret.

</div>

6. Once signed, Bob announces TX2 to the public chain.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
signedTransaction, err = bobPublicChainAccount.Sign(tx2)
if err != nil {
    panic(err)
}
_, err = publicChainClient.Transaction.Announce(context.Background(), signedTransaction)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const tx2Signed = bobPublicChainAccount.sign(tx2);
publicChainTransactionHttp
    .announce(tx2Signed)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--END_DOCUSAURUS_CODE_TABS-->

7. Alice can announce the secret proof transaction TX3 to the public network. This transaction defines the encrypting algorithm used, the original proof and the secret. It will unlock TX2 transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
tx3, err := publicChainClient.NewSecretProofTransaction(
    sdk.NewDeadline(time.Hour),
    sdk.SHA3_256,
    proof,
    alicePrivateChainAccount.PublicAccount.Address,
)
if err != nil {
    panic(err)
}

signedTransaction, err = bobPublicChainAccount.Sign(tx3)
if err != nil {
    panic(err)
}
_, err = publicChainClient.Transaction.Announce(context.Background(), signedTransaction)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const tx3 = SecretProofTransaction.create(
    Deadline.create(),
    HashType.SHA3_256,
    secret,
    proof,
    NetworkType.MAIN_NET);

const tx3Signed = alicePublicChainAccount.sign(tx3);
publicChainTransactionHttp
    .announce(tx3Signed)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--END_DOCUSAURUS_CODE_TABS-->

8. The proof is revealed in the public chain. Bob does the same by announcing a secret proof transaction TX4 in the private chain.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
tx4, err := privateChainClient.NewSecretProofTransaction(
    sdk.NewDeadline(time.Hour),
    sdk.SHA3_256,
    proof,
    bobPrivateChainAccount.PublicAccount.Address,
)
if err != nil {
    panic(err)
}

signedTransaction, err = bobPrivateChainAccount.Sign(tx4)
if err != nil {
    panic(err)
}
_, err = privateChainClient.Transaction.Announce(context.Background(), signedTransaction)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const tx4 = SecretProofTransaction.create(
    Deadline.create(),
    HashType.SHA3_256,
    secret,
    proof,
    NetworkType.PRIVATE);

const tx4Signed = bobPrivateChainAccount.sign(tx4);
privateChainTransactionHttp
    .announce(tx4Signed)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--END_DOCUSAURUS_CODE_TABS-->

Bob receives TX1 funds, and the atomic cross-chain swap concludes.

## Is it atomic?

Consider the following scenarios:

<div class=cap-alpha-ol>

1. Bob does not want to announce TX2. Alice will receive her funds back after 94 hours.
2. Alice does not want to swap tokens by signing Tx3. Bob will receive his refund after 84h. Alice will unlock her funds as well after 94 hours.
3. Alice signs and announces TX3, receiving Bob’s funds. Bob will have time to sign TX4, as Tx1 validity is longer than Tx2.

The process is atomic but should be completed with lots of time before the deadlines.

</div>

