---
id: multisig-account
title: Multisig Account
---

Multisig [accounts](./account.md) require additional signatures to initiate actions/transfers.

## Cosignatories

A Sirius-Chain [account](./account.md) can be [converted to multisig](../guides/multisig-account/converting-an-account-to-multisig.md). The cosignatories - other accounts - of the multisig will become the account managers.

From that moment on, the multisig account cannot announce transactions by itself. A multisig cosignatory has to propose a transaction involving the multisig, wrapping it in an [aggregate transaction](./aggregate-transaction.md).

To record the transaction in the block, the other cosignatories will have to agree.

## Minimum approval and removal

It is not always necessary to force all cosignatories to cosign transactions associated with the multisig account. Sirius-Chain allows to set up the minimum number of cosignatory agreements. These properties can be [edited](../guides/multisig-account/modifying-a-multisig-account.md) afterward to suit almost all needs.

Sirius-Chain’s current implementation of multisig is “M-of-N”. This means that M can be any number equal to or less than N, i.e., 1-of-4, 2-of-2, 4-of-9, 9-of-10 and so on.

Similarly, cosignatories can [invite other accounts to take part in the multisig](../guides/multisig-account/modifying-a-multisig-account.md#adding-a-new-cosignatory), or [propose to remove others](../guides/multisig-account/modifying-a-multisig-account.md#removing-a-cosignatory when the defined conditions are fulfilled.

<div class=info>

**Note**

Multisig accounts are a powerful tool, but please use this tool with caution. If the cosignatories keys get lost and minimum approval is not reached, it would result in the permanent loss of access to the funds held by the multisig account. Choose wisely `minimum removal` parameter to avoid this situation.

</div>

## Constraints

- Multisig accounts can have up to `10` cosignatories.
- An account can be cosigner of up to `5` multisig accounts.
- Multisig accounts can have as a cosigner another multisig, up to `3` levels. Multi-level multisig accounts add “AND/OR” logic to multi-signature transactions.
- [Multisig modification transactions](./multisig-account.md#modify-multisig-account-transaction) must be wrapped in an [aggregate transaction](./aggregate-transaction.md). New cosignatories added to the multisig must opt-in by cosigning the aggregate.

## Examples

There is a broad range of useful applications for multisig accounts. Let’s take a look at some of the most common use cases.

## Shared accounts

Several families are members of the local philatelist society and use a shared account to buy stamps.

To ensure that all agree on which old stamps they should buy and on the right price, they use a multisig account. This way, all members of the society need to approve the transaction before it is included in the blockchain.

![Multisig 2-of-3](/img/multisig-2-of-3.png "Multisig 2-of-3")

<p class="caption">M-of-N multisig account</p>

## Multi-factor authorization

Alice wants to make sure her funds are not compromised in any way. Therefore she sets up a multisig account with her funds and attaches two accounts (signer accounts) to control her multisig account as a form of 2-factor authentication.

Both of her signer accounts need to approve the transaction, and her signer accounts are located on different computer platforms with different passwords. This means that even if an evil hacker or virus should compromise one of her accounts, the funds are still kept secure.

![Multisig multifactor auth](/img/multisig-multifactor-auth.png "Multisig multifactor auth")

<p class="caption">Multi-factor authorisation using multisig accounts</p>

## Assets ownership

Multisig accounts can be used to represent the ownership of assets.

A company could create a 1-of-1 multisig account for each of their products, adding themselves as the cosignatory. When the company sells the product to Alice, she becomes the owner through the action of being added as the cosigner, and the company is removed in the same transaction.

![Multisig asset ownership](/img/multisig-asset-ownership.png "Multisig asset ownership")

<p class="caption">Transferring an account</p>

## Manufacturing and supply chains

In this example, a manufacturer is shipping a pharmaceutical product.

The product receives its quality approval [mosaic](./mosaic.md) only when its blockchain record shows it has a production date, safety inspection, and was shipped at the correct temperature.

Sensors in the shipping container report temperature data every 5 minutes and consolidate it into a daily report.

![Multi-level supply chain](/img/mlma-supply-chain.png "Multi-level supply chain")

<p class="caption">Manufacturing and Supply Chains</p>

## Fraud Detection

This example shows how a high-security account can be made easier to use.

Transactions are only approved from a hardware wallet OR your phone AND a fraud detection AI. MLMA allows a variety of security configurations at the protocol level to keep businesses and their customers hack-free.

![Multi-level fraud detection](/img/mlma-fraud-detection.png "Multi-level fraud detection")

<p class="caption">Fraud Detection</p>

## Guides

- [Signing announced aggregate bonded transactions](../guides/multisig-account/signing-announced-aggregate-bonded-transactions.md)

    You have probably announced an aggregate bonded transaction, but all required cosigners have not signed it yet.

- [Converting an account to multisig](../guides/multisig-account/converting-an-account-to-multisig.md)

    Create a 1-of-2 multisig account, by adding two cosignatories.

- [Modifying a multisig account](../guides/multisig-account/modifying-a-multisig-account.md)

    Modify an existing multisig account.

- [Creating a multi-level multisig account (MLMA)](../guides/multisig-account/creating-a-multi-level-multisig-account.md)

    Create a multi-level multisig account.

- [Sending a multisig transaction](../guides/multisig-account/sending-a-multisig-transaction.md)

    Send a transaction involving a multisig and learn how an aggregate bonded transaction works.

## Schemas

<div class="info">

**Note**

Configuration parameters are [editable](https://github.com/proximax-storage/catapult-server/blob/master/resources/config-network.properties) . Public network configuration may differ.

</div>

### ModifyMultisigTransaction

Announce a modify multisig account transaction to:

<div class="alpha-ol">

1. Transform an account to multisig.

2. Change the configurable properties of a multisig account.

</div>

**Version**: 0x03

**Entity type**: 0x4155

**Inlines**:

- [Transaction](../protocol/transaction.md#transaction) or [EmbeddedTransaction](../protocol/transaction.md#embeddedtransaction)

**Property** |	**Type** |	**Description**
-------------|-----------|---------------------
minRemovalDelta |	int8 |	The number of signatures needed to remove a cosignatory. If we are modifying an existing multisig account, this indicates the relative change of the minimum cosignatories.
minApprovalDelta |	int8 |	The number of signatures needed to approve a transaction. If we are modifying an existing multisig account, this indicates the relative change of the minimum cosignatories.
modificationsCount |	uint8 |	The number of modifications.
modification |	array([CosignatoryModification](#cosignatorymodification), modificationsCount) |	The array of cosignatory [accounts](./account.md) to add or delete.

### CosignatoryModification

**Property** |	**Type** |	**Description**
-------------|-----------|---------------------
modificationType |	[CosignatoryModificationType](#cosignatorymodificationtype) |	The cosignatory modification type.
cosignatoryPublicKey |	32 bytes (binary) |	The public key of the cosignatory.

### CosignatoryModificationType

Enumeration: uint8
**Id** | 	**Description**
-------|----------------------
0 |	Add cosignatory.
1 |	Remove cosignatory.
