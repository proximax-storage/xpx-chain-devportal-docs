---
id: creating-an-escrow-with-aggregate-bonded-transaction
title: Creating an escrow with aggregate bonded transaction
sidebar_label: Creating an escrow with aggregate bonded transaction
---

Learn about [aggregate bonded transactions](../../built-in-features/aggregate-transaction.md), by creating an escrow contract.

## Background

An **escrow** is a `contractual arrangement` in which a `third party receives and disburses money` or documents for the `primary transacting parties`. Transacting parties will agree to the conditions in which the disbursement depends on. For example, it can be an `account established by a broker for holding funds` on behalf of the broker’s principal or some other person `until the consummation or termination of a transaction.` An escrow can also be a trust account held in the borrower’s name to pay obligations such as property taxes and insurance premiums.

**Reference:**
- Wikipedia Contributors. "Escrow." Wikipedia, Wikipedia Foundation, 25 June 2019. en.wikipedia.org/wiki/Escrow.

For this example, imagine the two parties agree on a virtual service, implying that the escrow can be executed immediately:

1. Buyer and seller agree on terms.
2. Buyer submits payment to escrow.
3. Seller delivers goods or services to buyer.
4. Buyer approves goods or services.
5. Escrow releases payment to the seller.

**How is it applied to Proximax Sirius Chain?**

Normalizing the language into Sirius Chain related concepts:

- **Contractual arrangement**: A new type of transaction called Aggregate Transaction.
- **Third party receives and disburses money**: There is no third party; we are going to use blockchain technology.
- **Primary transacting parties**: Sirius Chain accounts will represent the participants.
- **Conditions agreed to by the transacting parties**: Whe nevery participant signs the aggregate transaction.
- **Account established by a broker for holding funds**: There will not be an intermediate account, the exchange will happen atomically using an aggregate transaction.
- **Until the consummation or termination of a transaction**: The transaction gets included in a block or expires.

## Prerequisites

- XPX-Chain-SDK.
- A text editor or IDE.
- Finish [creating a mosaic guide](../mosaic/creating-a-mosaic.md).
- Finish [sending payouts with aggregate complete transactions](./sending-payouts-with-aggregate-complete-transaction.md).
- An account with `xpx`.


## Getting into some code

![Aggregate Escrow](/img/aggregate-escrow-1.png "Aggregate Escrow")

<p class=caption>Multi-Asset Escrowed Transactions</p>

### Setting up the required accounts and mosaics

Alice and a ticket distributor want to swap the following mosaics.

**Owner**         |**Amount**|**MosaicId**    |**Description**
------------------|----------|----------------|---------------
Alice             |100       |`xpx`           |Native currency mosaic
Ticket distributor|1         |7cdf3b117a3c40cc|Represents a museum ticket.

Before continuing, [create the two accounts](../../getting-started/setting-up-workstation.md#setup-getting-a-test-account) loaded with `xpx`.

Then, [create a mosaic](../mosaic/creating-a-mosaic.md) with the ticket distributor account. This new mosaic will represent the ticket.


### Creating the escrow contract

Alice will send a transaction to the ticket distributor exchanging 100 `xpx` for 1 `7cdf3b117a3c40cc` (museum ticket).

1. Create two [transfer transactions](../../built-in-features/transfer-transaction.md):

A. From Alice to the ticket distributor sending 100 `xpx`.
B. From the ticket distributor to Alice sending 1 `7cdf3b117a3c40cc`.

<div class=info>
**Note**

The museum ticket does not have the id 7cdf3b117a3c40cc in your network. Replace the MosaicId for the one you have created in the previous step.
</div>

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
conf, err := sdk.NewConfig(context.Background(), []string{"http://bctestnet1.brimstone.xpxsirius.io:3000"})
if err != nil {
    panic(err)
}

// Use the default http client
client := sdk.NewClient(nil, conf)

aliceAccount, err := client.NewAccountFromPrivateKey(os.Getenv("ALICE_PRIVATE_KEY"))
if err != nil {
    panic(err)
}

ticketDistributorPublicAccount, err := client.NewAccountFromPublicKey(os.Getenv("TICKET_DISTRIBUTOR_PUBLIC_KEY"))
if err != nil {
    panic(err)
}

aliceTransferTransaction, err := client.NewTransferTransaction(sdk.NewDeadline(time.Hour), ticketDistributorPublicAccount.Address, []*sdk.Mosaic{sdk.XpxRelative(100)}, sdk.NewPlainMessage("send 100 xpx to distributor"))
if err != nil {
    panic(err)
}

id, err := strconv.ParseInt("7cdf3b117a3c40cc", 16, 64)
if err != nil {
    panic(err)
}
mosaicId, err := sdk.NewMosaicId(uint64(id))
if err != nil {
    panic(err)
}
mosaic, err := sdk.NewMosaic(mosaicId, 1)
if err != nil {
    panic(err)
}

ticketDistributorTransferTransaction, err := client.NewTransferTransaction(sdk.NewDeadline(time.Hour), aliceAccount.PublicAccount.Address, []*sdk.Mosaic{mosaic}, sdk.NewPlainMessage("send 1 museum ticket to alice"))
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const nodeUrl = 'http://bctestnet1.brimstone.xpxsirius.io:3000';
const transactionHttp = new TransactionHttp(nodeUrl);
const listener = new Listener(nodeUrl);

const alicePrivateKey = '<privateKey>';
const aliceAccount = Account.createFromPrivateKey(alicePrivateKey, NetworkType.TEST_NET);

const ticketDistributorPublicKey = '<publicKey>';
const ticketDistributorPublicAccount = PublicAccount.createFromPublicKey(ticketDistributorPublicKey, NetworkType.TEST_NET);

const aliceToTicketDistributorTx = TransferTransaction.create(
    Deadline.create(),
    ticketDistributorPublicAccount.address,
    [NetworkCurrencyMosaic.createRelative(100)],
    PlainMessage.create('send 100 xpx to distributor'),
    NetworkType.TEST_NET);

const ticketDistributorToAliceTx = TransferTransaction.create(
    Deadline.create(),
    aliceAccount.address,
    [new Mosaic(new MosaicId('7cdf3b117a3c40cc'), UInt64.fromUint(1))],
    PlainMessage.create('send 1 museum ticket to alice'),
    NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const nodeUrl = 'http://bctestnet1.brimstone.xpxsirius.io:3000';
const transactionHttp = new TransactionHttp(nodeUrl);
const listener = new Listener(nodeUrl);

const alicePrivateKey = '<privateKey>';
const aliceAccount = Account.createFromPrivateKey(alicePrivateKey, NetworkType.TEST_NET);

const ticketDistributorPublicKey = '<publicKey>';
const ticketDistributorPublicAccount = PublicAccount.createFromPublicKey( ticketDistributorPublicKey, NetworkType.TEST_NET);

const aliceToTicketDistributorTx = TransferTransaction.create(
    Deadline.create(),
    ticketDistributorPublicAccount.address,
    [NetworkCurrencyMosaic.createRelative(100)],
    PlainMessage.create('send 100 xpx to distributor'),
    NetworkType.TEST_NET);

const ticketDistributorToAliceTx = TransferTransaction.create(
    Deadline.create(),
    aliceAccount.address,
    [new Mosaic( new MosaicId('7cdf3b117a3c40cc'), UInt64.fromUint(1))],
    PlainMessage.create('send 1 museum ticket to alice'),
    NetworkType.TEST_NET);
```

<!--Java-->
```java
    // Replace with private key
    final String alicePrivateKey = "<privateKey>";

    // Replace with public key
    final String ticketDistributorPublicKey = "<publicKey>";

    final Account aliceAccount = Account.createFromPrivateKey(alicePrivateKey, NetworkType.TEST_NET);
    final PublicAccount ticketDistributorPublicAccount = PublicAccount.createFromPublicKey(ticketDistributorPublicKey, NetworkType.TEST_NET);

    final TransferTransaction aliceToTicketDistributorTx = TransferTransaction.create(
            Deadline.create(2, HOURS),
            ticketDistributorPublicAccount.getAddress(),
            Collections.singletonList(NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(100))),
            PlainMessage.create("send 100 xpx to distributor"),
            NetworkType.TEST_NET
    );

    final TransferTransaction ticketDistributorToAliceTx = TransferTransaction.create(
            Deadline.create(2, HOURS),
            aliceAccount.getAddress(),
            Collections.singletonList(new Mosaic(new MosaicId("7cdf3b117a3c40cc"), BigInteger.valueOf(1))),
            PlainMessage.create("send 1 museum ticket to alice"),
            NetworkType.TEST_NET
    );

```

<!--END_DOCUSAURUS_CODE_TABS-->

2. Wrap the defined transactions in an [aggregate transaction](../../built-in-features/aggregate-transaction.md) and sign it.

An aggregate transaction is complete if before announcing it to the network, all required cosigners have signed it. If valid, it will be included in a block.

In the case that signatures are required from other participants and the transaction is announced to the network, it is considered an aggregate bonded.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
aliceTransferTransaction.ToAggregate(aliceAccount.PublicAccount)
ticketDistributorTransferTransaction.ToAggregate(ticketDistributorPublicAccount)

aggregateTransaction, err := client.NewBondedAggregateTransaction(sdk.NewDeadline(time.Hour), []sdk.Transaction{aliceTransferTransaction, ticketDistributorTransferTransaction})
if err != nil {
    panic(err)
}

signedAggregateBoundedTransaction, err := aliceAccount.Sign(aggregateTransaction)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const aggregateTransaction = AggregateTransaction.createBonded(Deadline.create(),
    [aliceToTicketDistributorTx.toAggregate(aliceAccount.publicAccount),
        ticketDistributorToAliceTx.toAggregate(ticketDistributorPublicAccount)],
    NetworkType.TEST_NET);

const signedTransaction = aliceAccount.sign(aggregateTransaction, generationHash);

```

<!--JavaScript-->
```js
const aggregateTransaction = AggregateTransaction.createBonded(Deadline.create(),
    [aliceToTicketDistributorTx.toAggregate(aliceAccount.publicAccount),
        ticketDistributorToAliceTx.toAggregate(ticketDistributorPublicAccount)],
    NetworkType.TEST_NET);

const signedTransaction = aliceAccount.sign(aggregateTransaction, generationHash);

```

<!--Java-->
```java

    final AggregateTransaction aggregateTransaction = new TransactionBuilderFactory().aggregateBonded()
            .innerTransactions(Arrays.asList(
                    aliceToTicketDistributorTx.toAggregate(aliceAccount.getPublicAccount()),
                    ticketDistributorToAliceTx.toAggregate(ticketDistributorPublicAccount)
            )).deadline(new Deadline(2, ChronoUnit.HOURS)).networkType(NetworkType.TEST_NET);

    final SignedTransaction aggregateSignedTransaction = aliceAccount.sign(aggregateTransaction, generationHash);
```

<!--END_DOCUSAURUS_CODE_TABS-->

3. When an aggregate transaction is bonded, Alice will need to [lock](../../built-in-features/aggregate-transaction.md#hashlocktransaction) at least 10 `xpx`. Once the ticket distributor signs the aggregate transaction, the amount of locked xpx becomes available again on Alice’s account, and the exchange will get through.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
lockFundsTransaction, err := client.NewLockFundsTransaction(
    sdk.NewDeadline(time.Hour),
    sdk.XpxRelative(10),
    sdk.Duration(1000),
    signedAggregateBoundedTransaction,
)
if err != nil {
    panic(err)
}

signedLockFundsTransaction, err := aliceAccount.Sign(lockFundsTransaction)
if err != nil {
    panic(err)
}
// Announce transaction
_, err = client.Transaction.Announce(context.Background(), signedLockFundsTransaction)
if err != nil {
    panic(err)
}
```

<!--TypeScript-->
```js
const lockFundsTransaction = LockFundsTransaction.create(
    Deadline.create(),
    NetworkCurrencyMosaic.createRelative(10),
    UInt64.fromUint(1000),
    signedTransaction,
    NetworkType.TEST_NET);

const lockFundsTransactionSigned = aliceAccount.sign(lockFundsTransaction, generationHash);

listener.open().then(() => {

    transactionHttp
        .announce(lockFundsTransactionSigned)
        .subscribe(x => console.log(x), err => console.error(err));

    listener
        .confirmed(aliceAccount.address)
        .pipe(
            filter((transaction) => transaction.transactionInfo !== undefined
                && transaction.transactionInfo.hash === lockFundsTransactionSigned.hash),
            mergeMap(ignored => transactionHttp.announceAggregateBonded(signedTransaction))
        )
        .subscribe(announcedAggregateBonded => console.log(announcedAggregateBonded),
            err => console.error(err));
});
```

<!--JavaScript-->
```js
const lockFundsTransaction = LockFundsTransaction.create(
    Deadline.create(),
    NetworkCurrencyMosaic.createRelative(10),
    UInt64.fromUint(480),
    signedTransaction,
    NetworkType.TEST_NET);

const lockFundsTransactionSigned = aliceAccount.sign(lockFundsTransaction, generationHash);

listener.open().then(() => {

    transactionHttp
        .announce(lockFundsTransactionSigned)
        .subscribe(x => console.log(x), err => console.error(err));

    listener
        .confirmed(aliceAccount.address)
        .pipe(
            filter((transaction) => transaction.transactionInfo !== undefined
                && transaction.transactionInfo.hash === lockFundsTransactionSigned.hash),
            mergeMap(ignored => transactionHttp.announceAggregateBonded(signedTransaction))
        )
        .subscribe(announcedAggregateBonded => console.log(announcedAggregateBonded),
            err => console.error(err));
});
```

<!--Java-->
```java
 // Creating the lock funds transaction and announce it

        final LockFundsTransaction lockFundsTransaction = LockFundsTransaction.create(
                Deadline.create(2, HOURS),
                NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(10)),
                BigInteger.valueOf(480),
                aggregateSignedTransaction,
                NetworkType.TEST_NET
        );

        final SignedTransaction lockFundsTransactionSigned = aliceAccount.sign(lockFundsTransaction, generationHash);

        final TransactionHttp transactionHttp = new TransactionHttp("http://bctestnet1.brimstone.xpxsirius.io:3000");

        transactionHttp.announce(lockFundsTransactionSigned).toFuture().get();

        System.out.println(lockFundsTransactionSigned.getHash());

        final Listener listener = new Listener("http://bctestnet1.brimstone.xpxsirius.io:3000");

        listener.open().get();

        final Transaction transaction = listener.confirmed(aliceAccount.getAddress()).take(1).toFuture().get();

        transactionHttp.announceAggregateBonded(aggregateSignedTransaction).toFuture().get();
```

<!--END_DOCUSAURUS_CODE_TABS-->

The distributor has not signed the aggregate bonded transaction yet, so the exchange has not been completed.

Copy the aggregate transaction hash, and check how to [cosign the aggregate transaction](./signing-announced-aggregate-bonded-transactions.md) in the following guide.

## Is it possible without aggregate transactions?

**It is not secure**, since:

- Alice could decide not to pay the distributor after receiving the ticket.
- The distributor could choose not to send the ticket after receiving the payment.

Using the aggregate transaction feature, we ensure that multiple transactions are executed at the same time when all the participants agree. The seller does not send the virtual goods.

## What’s next?

Afterwards, try to swap mosaics between multiple participants.

![Aggregate Escrow](/img/aggregate-escrow-2.png "Aggregate Escrow")

<p class=caption>Multi-Asset Escrowed Transactions</p>

