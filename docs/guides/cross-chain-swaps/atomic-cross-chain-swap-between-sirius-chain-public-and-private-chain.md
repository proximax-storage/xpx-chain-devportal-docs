---
id: atomic-cross-chain-swap-between-sirius-chain-public-and-private-chain
title: Atomic cross-chain swap between Sirius public and private chains
---
[Cross-chain swaps](../../built-in-features/cross-chain-swaps.md) enables trading tokens between different blockchains, without using an intermediary party in the process.

This exchange of tokens will succeed atomically. If some of the actors do not agree, each of them will receive the locked tokens back after a determined amount of time.

When talking about tokens in Sirius-Chain, we are actually referring to [mosaics](../../built-in-features/mosaic.md). Sirius-Chain enables atomic swaps through [secret lock](../../built-in-features/cross-chain-swaps.md#secretlocktransaction) / [secret proof transaction](../../built-in-features/cross-chain-swaps.md#secretprooftransaction) mechanism.

## Background Information 

Alice and Bob want to exchange **10 alice:token for 10 bob:token**. The problem is that they are not in the same blockchain. Alice:token is defined in Sirius public chain, whereas bob:token is only present in a private chain using Sirius Chain technology.

<div class=info>

**Note:**

These two chain shares are SDK. You could implement atomic cross-chain swap between Sirius public chain and other blockchains if they permit the secret lock/proof mechanism.

</div>

One non-atomic solution could be:

1. Alice sends 10 alice:token to Bob (private chain)
2. Bob receives the transaction
3. Bob sends 10 bob:token to Alice (public chain)
4. Alice receives the transaction

However, they do not trust each other that much. Bob could decide not to send his mosaics to Alice. Following this guide, you will observe how to make this swap possible using Sirius technology to remove the need for trust. 

## Prerequisites

- Finish [creating an escrow with aggregate bonded transaction guide](../aggregate-transaction/.creating-an-escrow-with-aggregate-bonded-transaction.md)
- XPX-Chain-SDK.
- A text editor or IDE.

## Let’s do some coding!

Trading tokens directly from one blockchain to the other is not possible, due to the technological differences between each them.

In the case of Sirius public and private chains, the same mosaic name could have a different definition and distribution, or even not exist. Between Bitcoin and Sirius Chain, the difference is even more evident, as each blockchain uses an entirely different technology.

Instead of transferring tokens between different chains, the trade will be performed inside each chain. The Secret proof or secret lock mechanism guarantees the token swap occurs atomically.

![Cross-chain swap](/img/cross-chain-swap1.png "Cross-chain swap")

<p class=caption>Atomic cross-chain swap between public and private network</p>

For that reason, each actor involved should have at least one account in each blockchain.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const alicePublicChainAccount = Account.createFromPrivateKey('', NetworkType.MAIN_NET);
const alicePrivateChainAccount = Account.createFromPrivateKey('', NetworkType.PRIVATE);

const bobPublicChainAccount = Account.createFromPrivateKey('', NetworkType.MAIN_NET);
const bobPrivateChainAccount = Account.createFromPrivateKey('', NetworkType.PRIVATE);

const privateChainTransactionHttp = new TransactionHttp('http://localhost:3000');
const publicChainTransactionHttp = new TransactionHttp('http://localhost:3000');
```

<!--END_DOCUSAURUS_CODE_TABS-->

1. Alice picks a random number, called `proof`. Then, applies a SHA512 hash algorithm to it, obtaining the `secret`.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const random = crypto.randomBytes(10);
const hash = sha3_512.create();
const secret = hash.update(random).hex().toUpperCase();
const proof = random.toString('hex');
```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Alice creates a secret lock transaction, including:

- The mosaic and amount to be sent: 10 alice:token
- The recipient address: Bob’s address in private chain
- The secret: Hashed proof.
- The amount of time in which funds can be unlocked: 96h
- The network: Private Chain

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const tx1 = SecretLockTransaction.create(
    Deadline.create(),
    new Mosaic(new MosaicId('alice:token'), UInt64.fromUint(10)),
    UInt64.fromUint(96*60), // assuming one block per minute
    HashType.SHA3_512,
    secret,
    bobPrivateChainAccount.address,
    NetworkType.PRIVATE);
```

<!--END_DOCUSAURUS_CODE_TABS-->

Once announced, this transaction will remain locked until someone discovers the proof that matches the secret. If after a determined period no one proved it, the locked funds will be returned to Alice.

3. Alice signs and announces TX1 to the private chain.

<!--DOCUSAURUS_CODE_TABS-->
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

- The mosaic and amount to be sent: 10 bob:token
- A recipient address: Alice’s address in public chain
- The secret that should be achieved to unlock the funds.
- The amount of time in which funds can be unlocked: 84h
- The network: Public Chain

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const tx2 = SecretLockTransaction.create(
    Deadline.create(),
    new Mosaic(new MosaicId('bob:token'), UInt64.fromUint(10)),
    UInt64.fromUint(84*60), // assuming one block per minute
    HashType.SHA3_512,
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
<!--TypeScript-->
```js
const tx2Signed = bobPublicChainAccount.sign(tx2);
publicChainTransactionHttp
    .announce(tx2Signed)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--END_DOCUSAURUS_CODE_TABS-->

7. Alice can announce the secret proof transaction TX3 on the public network. This transaction defines the encrypting algorithm used, the original proof and the secret. It will unlock the TX2 transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const tx3 = SecretProofTransaction.create(
    Deadline.create(),
    HashType.SHA3_512,
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
<!--TypeScript-->
```js
const tx4 = SecretProofTransaction.create(
    Deadline.create(),
    HashType.SHA3_512,
    secret,
    proof,
    NetworkType.PRIVATE);

const tx4Signed = bobPrivateChainAccount.sign(tx4);
privateChainTransactionHttp
    .announce(tx4Signed)
    .subscribe(x => console.log(x), err => console.error(err));
```

<!--END_DOCUSAURUS_CODE_TABS-->

It is at that moment when Bob unlocks TX1 funds, and the atomic cross-chain swap concludes.


## Is it atomic?

Consider the following scenarios:

<div class=cap-alpha-ol>

1. Bob does not want to announce TX2. Alice will receive her funds back after 94 hours.
2. Alice does not want to swap tokens by signing Tx3. Bob will receive his refund after 84h. Alice will unlock her funds as well after 94 hours.
3. Alice signs and announces TX3, receiving Bob’s funds. Bob will have time to sign TX4, as Tx1 validity is longer than Tx2.

</div>

The process is atomic but should be completed with lots of time before the deadlines.
