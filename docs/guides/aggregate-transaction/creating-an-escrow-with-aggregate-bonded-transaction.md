---
id: creating-an-escrow-with-aggregate-bonded-transaction
title: Creating an escrow with aggregate-bonded transaction
sidebar_label: Creating an escrow with aggregate-bonded transaction
---
This guide will help you learn about [aggregate bonded transactions](../../built-in-features/aggregate-transaction.md), by creating an escrow.

## Background Information 

An **escrow** is a `contractual arrangement` in which a `third party receives and disburses money` or documents for the `primary transacting parties`. Transacting parties will agree to the conditions in which the disbursement depend on. For example, it can be an `account established by a broker for holding funds` on behalf of the broker’s principal or some other person `until the consummation or termination of a transaction.` An escrow can also be a trust account held in the borrower’s name to pay obligations such as property taxes and insurance premiums.

**Reference:**
- Wikipedia Contributors. "Escrow." Wikipedia, Wikipedia Foundation, 25 June 2019. en.wikipedia.org/wiki/Escrow.

In this example, imagine the two parties agree on a virtual service, implying that the **escrow can be immediate**.

**How does it work?**

1. Buyer and seller agree on terms
2. Buyer submits payment to escrow
3. Seller delivers goods or service to Buyer
4. Buyer approves goods or service
5. Escrow releases payment to the seller

**How is it applied to Proximax Sirius Chain?**

Normalizing the language into Sirius Chain related concepts:

- What is the **contractual arrangement**?

-- Aggregate Transaction

- Is there a **third party receives and disburses money**?

-- No third party

- What are the **primary transacting parties**?

-- Accounts

- What are the **conditions agreed to by the transacting parties**?

-- Sign transactions

- Is there an **account established by a broker for holding funds**?

-- No account, it will happen atomically using an aggregate transaction

- When will **the transaction begets terminated or consummated**?

-- The transaction gets included in a block

## Prerequisites

- Finish [creating a mosaic guide](../mosaic/creating-a-mosaic.md).
- Finish [sending payouts with aggregate complete transactions](./sending-payouts-with-aggregate-complete-transaction.md).
- tsjs-xpx-chain-sdk.
- A text editor or IDE.

## Let’s do some coding!

![Aggregate Escrow](/img/aggregate-escrow-1.png "Aggregate Escrow")

<p class=caption>Multi-Asset Escrowed Transactions</p>

### Setting up the required accounts and mosaics

In this example, Alice and a ticket distributor want to swap the following mosaics.

**Owner** |	**Mosaic Name** |	**Amount**
----------|-----------------|--------------
Alice |	prx:xpx |	100
Ticket distributor |	museum:ticket |	1

Before continuing, practice by setting up the namespaces and mosaics required.

### Mosaics swap

Alice will send a transaction to the ticket distributor exchanging 100 prx:xpx with 1 museum:ticket.

1. Create two [transfer transaction](../../built-in-features/transfer-transaction.md):

<div class=cap-alpha-ol>

- From Alice to the ticket distributor sending 100 prx:xpx
- From the ticket distributor to Alice sending 1 museum:ticket.

</div>

2. Add them as `innerTransactions` under an [aggregate transaction](../../built-in-features/aggregate-transaction.md).

An aggregate Transaction is *complete* if before announcing it to the network, all required cosigners have signed it. If it is valid, it will be included in a block.

In case that signatures are required from other participants and the transaction is announced to the network, it is considered an aggregate bonded.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const nodeUrl = 'http://localhost:3000';
const transactionHttp = new TransactionHttp(nodeUrl);
const listener = new Listener(nodeUrl);

const alicePrivateKey = process.env.PRIVATE_KEY as string;
const aliceAccount = Account.createFromPrivateKey(alicePrivateKey, NetworkType.TEST_NET);

const ticketDistributorPublicKey = 'F82527075248B043994F1CAFD965F3848324C9ABFEC506BC05FBCF5DD7307C9D';
const ticketDistributorPublicAccount = PublicAccount.createFromPublicKey(ticketDistributorPublicKey, NetworkType.TEST_NET);

const aliceToTicketDistributorTx = TransferTransaction.create(
    Deadline.create(),
    ticketDistributorPublicAccount.address,
    [NetworkCurrencyMosaic.createRelative(100)],
    PlainMessage.create('send 100 prx:xpx to distributor'),
    NetworkType.TEST_NET);

const ticketDistributorToAliceTx = TransferTransaction.create(
    Deadline.create(),
    aliceAccount.address,
    [new Mosaic(new MosaicId('museum:ticket'), UInt64.fromUint(1))],
    PlainMessage.create('send 1 museum:ticket to alice'),
    NetworkType.TEST_NET);
```

<!--JavaScript-->
```js
const nodeUrl = 'http://localhost:3000';
const transactionHttp = new TransactionHttp(nodeUrl);
const listener = new Listener(nodeUrl);

const alicePrivateKey = process.env.PRIVATE_KEY;
const aliceAccount = Account.createFromPrivateKey(alicePrivateKey, NetworkType.TEST_NET);

const ticketDistributorPublicKey = 'F82527075248B043994F1CAFD965F3848324C9ABFEC506BC05FBCF5DD7307C9D';
const ticketDistributorPublicAccount = PublicAccount.createFromPublicKey( ticketDistributorPublicKey, NetworkType.TEST_NET);

const aliceToTicketDistributorTx = TransferTransaction.create(
    Deadline.create(),
    ticketDistributorPublicAccount.address,
    [NetworkCurrencyMosaic.createRelative(100)],
    PlainMessage.create('send 100 prx:xpx to distributor'),
    NetworkType.TEST_NET);

const ticketDistributorToAliceTx = TransferTransaction.create(
    Deadline.create(),
    aliceAccount.address,
    [new Mosaic( new MosaicId('museum:ticket'), UInt64.fromUint(1))],
    PlainMessage.create('send 1 museum:ticket to alice'),
    NetworkType.TEST_NET);
```
<!--Java-->
```js
        // Replace with private key
        final String alicePrivateKey = "";

        // Replace with public key
        final String ticketDistributorPublicKey = "";

        final Account aliceAccount = Account.createFromPrivateKey(alicePrivateKey, NetworkType.TEST_NET);
        final PublicAccount ticketDistributorPublicAccount = PublicAccount.createFromPublicKey(ticketDistributorPublicKey, NetworkType.TEST_NET);

        final TransferTransaction aliceToTicketDistributorTx = TransferTransaction.create(
                Deadline.create(2, HOURS),
                ticketDistributorPublicAccount.getAddress(),
            Collections.singletonList(NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(100))),
                PlainMessage.create("send 100 prx:xpx to distributor"),
                NetworkType.TEST_NET
        );

        final TransferTransaction ticketDistributorToAliceTx = TransferTransaction.create(
                Deadline.create(2, HOURS),
                aliceAccount.getAddress(),
                Collections.singletonList(new Mosaic(new MosaicId("museum:ticket"), BigInteger.valueOf(1))),
                PlainMessage.create("send 1 museum:ticket to alice"),
                NetworkType.TEST_NET
        );

        final AggregateTransaction aggregateTransaction = AggregateTransaction.createBonded(
                Deadline.create(2, HOURS),
                Arrays.asList(
                        aliceToTicketDistributorTx.toAggregate(aliceAccount.getPublicAccount()),
                        ticketDistributorToAliceTx.toAggregate(ticketDistributorPublicAccount)
                ),
                NetworkType.TEST_NET
        );

        final SignedTransaction aggregateSignedTransaction = aliceAccount.sign(aggregateTransaction);
```

<!--END_DOCUSAURUS_CODE_TABS-->

3. When an aggregate transaction is bonded, Alice will need to lock at least 10 XPX. Once the ticket distributor signs the aggregate transaction, the amount of locked XPX becomes available again on Alice’s account, and the exchange will get through.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```js
const aggregateTransaction = AggregateTransaction.createBonded(Deadline.create(),
    [aliceToTicketDistributorTx.toAggregate(aliceAccount.publicAccount),
        ticketDistributorToAliceTx.toAggregate(ticketDistributorPublicAccount)],
    NetworkType.TEST_NET);

const signedTransaction = aliceAccount.sign(aggregateTransaction);

const lockFundsTransaction = LockFundsTransaction.create(
    Deadline.create(),
    NetworkCurrencyMosaic.createRelative(10),
    UInt64.fromUint(480),
    signedTransaction,
    NetworkType.TEST_NET);

const lockFundsTransactionSigned = aliceAccount.sign(lockFundsTransaction);

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
const aggregateTransaction = AggregateTransaction.createBonded(Deadline.create(),
    [aliceToTicketDistributorTx.toAggregate(aliceAccount.publicAccount),
        ticketDistributorToAliceTx.toAggregate(ticketDistributorPublicAccount)],
    NetworkType.TEST_NET);

const signedTransaction = aliceAccount.sign(aggregateTransaction);

const lockFundsTransaction = LockFundsTransaction.create(
    Deadline.create(),
    NetworkCurrencyMosaic.createRelative(10),
    UInt64.fromUint(480),
    signedTransaction,
    NetworkType.TEST_NET);

const lockFundsTransactionSigned = aliceAccount.sign(lockFundsTransaction);

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
```js
 // Creating the lock funds transaction and announce it

        final LockFundsTransaction lockFundsTransaction = LockFundsTransaction.create(
                Deadline.create(2, HOURS),
                NetworkCurrencyMosaic.createRelative(BigInteger.valueOf(10)),
                BigInteger.valueOf(480),
                aggregateSignedTransaction,
                NetworkType.TEST_NET
        );

        final SignedTransaction lockFundsTransactionSigned = aliceAccount.sign(lockFundsTransaction);

        final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

        transactionHttp.announce(lockFundsTransactionSigned).toFuture().get();

        System.out.println(lockFundsTransactionSigned.getHash());

        final Listener listener = new Listener("http://localhost:3000");

        listener.open().get();

        final Transaction transaction = listener.confirmed(aliceAccount.getAddress()).take(1).toFuture().get();

        transactionHttp.announceAggregateBonded(aggregateSignedTransaction).toFuture().get();
```

<!--END_DOCUSAURUS_CODE_TABS-->

<div class=info>

**Note:**

The [listener implementation changes](../monitoring/monitoring-a-transaction-status.md#troubleshooting-monitoring-transactions-on-the-client-side) when used on the client side (e.g., Angular, React, Vue).

</div>

## Is it possible without aggregate transactions?

**It is not secure**. Any event of the next list may happen:

- The buyer does not pay.
- The seller does not send the virtual goods.

## What’s next?

The distributor has not signed the aggregate bonded transaction yet, so exchange has not been completed. Consider reading [signing announced aggregate bonded transactions guide](./signing-announced-aggregate-bonded-transactions.md).

Afterwards, try to swap mosaics between multiple participants.

![Aggregate Escrow](/img/aggregate-escrow-2.png "Aggregate Escrow")

<p class=caption>Multi-Asset Escrowed Transactions</p>