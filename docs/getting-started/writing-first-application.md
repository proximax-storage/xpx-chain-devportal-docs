---
id: writing-first-application
title: Writing your first application
---
This guide will take you through the Sirius Chain development cycle. You will send your first transaction to the blockchain after combining some Sirius Chain [built-in features](../built-in-features/account.md).

## Background Information

The secondary ticket market, also known as the resale market, is the exchange of tickets that happens between individuals after they have purchased a ticket from an initial vendor. The initial vendor could be the event website, an online ticket vending platform, a shop or a stall at the entrance of the event.

Buying a ticket from someone that is not the initial vendor does not necessarily only mean the buyer needs to pay more for the ticket. There is the chance that the buyer can become a victim of buying a fake or duplicate ticket, where the initial original vendor can’t do anything to solve the issue.

**What do we want to solve?**

![Getting Started](/img/getting-started.png "Getting Started")

<p class="caption">Authorisation model</p>

The ticket vendor wants to set up a system to:

<div class="alpha-ol">

1. Identify each ticket buyer.

2. Avoid ticket reselling.

3. Avoid non-authentic tickets and duplicate ones.
</div>

**Why should we use Sirius Chain?**

Blockchain technology makes sense in cases where:

- There are different participants involved.
- These participants need to trust each other.
- There is the need to keep track of an immutable set of events.

Sirius Chain is a **flexible blockchain** technology. Instead of uploading all the application logic into the blockchain, you can use its tested features through **API calls** for transfer and storage of value, authorization, traceability, and identification.

The rest of the code remains **off-chain**. This reduces the inherent immutability risk, as you could change the process when necessary.

## Prerequisites

- Finish [getting started section](./setting-up-workstation.md).
- Text editor or IDE.
- XPX-Chain-SDK and XPX-Chain-CLI.
- An account with XPX.

## Let’s do some coding!

**1. Creating an account for each participant**

First, we identify the actors involved in the problem we want to solve:

- The ticket vendor.
-  The ticket buyer.

We have decided to represent the ticket vendor and buyer as separate [accounts](../built-in-features/account.md). Each account is unique and identified by an address. An account has access to a deposit box in the blockchain, which can be modified with an appropriate private key.

Have you loaded an account with test XPX? If not, go back to the  [getting started section](./setting-up-workstation.md). The account you have created represents the ticket vendor.

1. After running the following command, you should see on your screen a line similar to:
```
$> xpx2-cli account info


New Account: VCVG35-ZSPMYP-L2POZQ-JGSVEG-RYOJ3V-BNIU3U-N2E6

[...]

Mosaics

3628d0b327fb1dd8:       1000000
```

2. This account owns 1,000,000 XPX. If your own mosaics is empty, follow the [previous guide instructions](./setting-up-workstation.md).
3. Create a second account to identify the ticket buyer.
```
$> xpx2-cli account generate --network TEST_NET --save --url http://localhost:3000 --profile buyer
```

**2. Monitoring the blockchain** 

Accounts change the blockchain state through transactions. Once an account announces a transaction, if properly formed, the server will return an OK response.

Receiving an OK response does not mean the transaction is valid, as it may not be included in a block. A good practice is to monitor transactions before being announced.

We suggest opening three new terminals:

1. The first terminal [monitors announced transactions](../guides/monitoring/monitoring-a-transaction-status.md) validation errors.

```
$> xpx2-cli monitor status
```

2. Monitoring `unconfirmed` shows you which transactions have reached the network, but are not included in a block yet.
```
$> xpx2-cli monitor unconfirmed
```

3. Once a transaction is included, you will see it under the confirmed terminal.
```
$> xpx2-cli monitor confirmed
```

**3. Creating the ticket**

We are representing the ticket as a mosaic. [Mosaics](../built-in-features/mosaic.md) can be used to represent any asset in the blockchain, such as objects, tickets, coupons, stock share representation, and even cryptocurrency. They have configurable properties, which are defined at the moment of their creation. For example, we opt to set **transferable property to false**. This means that the ticket buyer can only send back the ticket to the creator of the mosaic, avoiding the ticket reselling.

Before creating a mosaic with the ticket vendor account, you need to register a [namespace](../built-in-features/namespace.md). A namespace is a unique name in the network that gives a recognisable name to your assets.

1. Register the namespace called `company`. Let’s check if this name is available.

```
$> xpx2-cli namespace info --name company
```

Did you check what happened in terminals where you are monitoring your account transactions? The transaction first appeared under `unconfirmed` terminal and, after a while, got `confirmed`.

3. Create a mosaic named `ticket`.

- It should be under the company namespace , with a total supply of 100.
- The mosaic is configured with transferability set so false.
- Divisibility should be set to 0, as no one should be able to send “0.5 company:tickets”.

```
$> xpx2-cli transaction mosaic --mosaicname ticket--namespacename company--amount 1000000 --supplymutable --divisibility 0 --duration 1000
```

**4. Sending the ticket**

Send one `company:ticket` to the ticket vendor account announcing a [transfer transaction](../built-in-features/transfer-transaction.md), one of the most commonly used actions in Sirius-Chain.

1. Prepare the transfer transaction. Three main attributes form a transfer transaction:

- The recipient account address: VC7A4H-7CYCSH-4CP4XI-ZS4G2G-CDZ7JP-PR5FRG-2VBU.
- A message: enjoy your ticket.
- An array of mosaics: [1 company:ticket].

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->

```ts
import {
    Account, Address, Deadline, UInt64, NetworkType, PlainMessage, TransferTransaction, Mosaic, MosaicId,
    TransactionHttp
} from 'tsjs-xpx-chain-sdk';

const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    Address.createFromRawAddress('VC7A4H-7CYCSH-4CP4XI-ZS4G2G-CDZ7JP-PR5FRG-2VBU'),
    [new Mosaic(new MosaicId(company:ticket'), UInt64.fromUint(1))],
    PlainMessage.create(‘enjoy your ticket’'),
    NetworkType.TEST_NET
);
```

<!--java-->
```java
import io.proximax.sdk.model.account.Address;
import io.proximax.sdk.model.blockchain.NetworkType;
import io.proximax.sdk.model.mosaic.Mosaic;
import io.proximax.sdk.model.mosaic.MosaicId;
import io.proximax.sdk.model.transaction.Deadline;
import io.proximax.sdk.model.transaction.PlainMessage;
import io.proximax.sdk.model.transaction.TransferTransaction;

import java.math.BigInteger;
import java.util.Arrays;

import static java.time.temporal.ChronoUnit.HOURS;

final TransferTransaction transferTransaction = TransferTransaction.create(
    Deadline.create(2, HOURS),
    Address.createFromRawAddress("VC7A4H-7CYCSH-4CP4XI-ZS4G2G-CDZ7JP-PR5FRG-2VBU"),
    Arrays.asList(new Mosaic(new MosaicId("company:ticket"), BigInteger.valueOf(1))),
    PlainMessage.create("enjoy your ticket"),
    NetworkType.TEST_NET
);
```
<!--END_DOCUSAURUS_CODE_TABS-->

Although the transaction is created, it has not been announced to the network yet.

2. Sign the transaction with the ticket vendor account first, so that the network can verify the authenticity of the transaction.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```ts
const privateKey = process.env.PRIVATE_KEY;

const account = Account.createFromPrivateKey(privateKey, NetworkType.TEST_NET);

const signedTransaction = account.sign(transferTransaction);
```
<!--Java-->
```java
final String privateKey = "";

final Account account = Account.createFromPrivateKey(privateKey,NetworkType.TEST_NET);

final SignedTransaction signedTransaction = account.sign(transferTransaction);
```
<!--END_DOCUSAURUS_CODE_TABS-->

3. Once signed, announce the transaction to the network.

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->
```ts
const transactionHttp = new TransactionHttp('http://localhost:3000');

transactionHttp.announce(signedTransaction).subscribe(
    x => console.log(x),
    err => console.log(err)
);
```
<!--Java-->
```java
final TransactionHttp transactionHttp = new TransactionHttp("http://localhost:3000");

transactionHttp.announceTransaction(signedTransaction).toFuture().get();
```

<!--Bash-->
```
$> xpx2-cli transaction transfer --recipient VD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54 --mosaics company:ticket::1 --message enjoy_your_ticket
```

<!--END_DOCUSAURUS_CODE_TABS-->

4. When the transaction is confirmed, check that the ticket buyer has received the ticket.

```
$> xpx2-cli account info --profile buyer
```

## What’s next?

Did you solve the proposed use case?

- Identify each ticket buyer: Creating Sirius Chain accounts for each buyer.
- Avoid ticket reselling: Creating a non-transferable mosaic.
- Avoid non-authentic tickets and duplicate ones: Creating a unique namespace and a mosaic named `company:ticket`.

Continue learning about more [Sirius Chain built-in features](../built-in-features/account.md).