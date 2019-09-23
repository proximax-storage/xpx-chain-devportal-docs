---
id: account-restriction
title: Account Restriction
---
[Accounts][Account] may configure a set of smart rules to block announcing or receiving transactions given a series of restrictions.

The account owners - plural in case of multisig accounts - can edit the account restrictions at a later time announcing the specific [account restriction transaction](#accountaddressrestrictionmodificationtransaction).

`Restriction types`

**Restriction** |	**Incoming Transactions** |	**Outgoing Transactions**
------------------------------------|----------------|-------------------------
AccountAddressRestriction |	✔️ |	❌
AccountMosaicRestriction  |	✔️ |	❌
AccountOperationRestriction |	❌ |	✔️

## Address restriction

An account can decide to **only receive** transactions from a list of allowed **addresses**. Alternatively, the account can define a list of blocked addresses.

Restricting **incoming transactions** is useful when the account will be only receiving transactions from known addresses, or when the account wants to block transactions coming from unknown senders.

<div class="caption">

![Accounts restriction](/img/account-properties-address.png "Accounts restriction")

</div>

<p class="caption">Address restriction diagram</p>

<div class=info>

**Note**

Allow and block restrictions are mutually exclusive. In other words, an account can only configure a block or an allow list per type of restriction.

</div>

By default, when there are no restrictions set, all the accounts in the network can announce transactions to the unrestricted account.

Additionally, an account can decide to apply address restrictions to the **outgoing transactions**, limiting the accounts allowed that are valid recipients.

## Mosaic restriction

Similar to address restrictions, an account can configure a restriction to permit **incoming** transactions only if all the [mosaics][Mosaic] attached are allowed. On the other hand, the account can refuse to accept transactions containing a mosaic listed as blocked.

Account mosaic restrictions are generally used to **prevent accounts being tagged with mosaics** not associated to their activity.

## Operation restriction

An account can allow/block announcing **outgoing** transactions with a [determined operation type][TransactionType]. By doing so, the account increases its security, preventing the announcement by mistake of undesired transactions.

## Examples

### Blocking spam transactions

A pharmaceutical company is using the public chain to certify the quality of their products.

When the quality verification process concludes, an operator sends a [quality seal][Mosaic] to the product account.

The final customers can review the product mosaics scanning a QR code. For that reason, the company only wants to show related transactions, avoiding that others spam their products with non-related information.

![Blocking spam transactions](/img/account-properties-spam.png "Blocking spam transactions")

<p class="caption">Blocking spam transactions</p>

The company opts to configure their product accounts restrictions, enabling only to receive transactions containing `pharmaceutical.quality.seal` mosaics.

### Enhancing the account security

Lately, Alice is only using her main account to cosign aggregate transactions where she is a cosignatory for the [multisig][Multisig] account.

As a temporary security measure, Alice opts to disable announcing transfer transactions from her main account. Doing so, Alice double-checks that the funds held in the main account are not going to be transferred by mistake.

## Guides

- [Preventing spam attacks with account restrictions][Prevent Spam]

Learn how to add and remove account restrictions.

## Schemas

### AccountAddressRestrictionModificationTransaction

Configure restrictions to prevent receiving or sending transactions from/to undesired addresses.

**Version**: 0x01

**Entity type**: 0x4150

Inlines:

- [Transaction][TransactionSchema] or [EmbeddedTransaction][Embedded-transactionSchema]

**Property** |	**Type** |	**Description**
-------------|-----------|---------------------
restrictionType |	[RestrictionType](#restrictiontype) |	Type of the account restriction.
modificationsCount |	uint8 |	Number of modifications in the transaction. A maximum of `255` modifications per transaction is allowed.
modifications |	array([AccountRestrictionModification](#accountrestrictionmodification)) |	Array of account address restriction modifications.

### AccountMosaicRestrictionModificationTransaction

Configure restrictions to prevent receiving transactions containing a specific mosaic.

**Version**: 0x01

**Entity type**: 0x4250

Inlines:

- [Transaction][TransactionSchema] or [EmbeddedTransaction][Embedded-transactionSchema]

**Property** |	**Type** |	**Description**
-------------|-----------|---------------------
restrictionType |	[RestrictionType](#restrictiontype) |	Type of the account restriction.
modificationsCount |	uint8 |	Number of modifications in the transaction. A maximum of `255` modifications per transaction is allowed.
modifications |	array([AccountRestrictionModification](#accountrestrictionmodification)) |	Array of account mosaic restriction modifications.

### AccountOperationRestrictionModificationTransaction

Configure restrictions to prevent announcing transactions by [type][TransactionSchema].

**Version**: 0x01

**Entity type**: 0x4350

Inlines:

- [Transaction][TransactionSchema] or [EmbeddedTransaction][Embedded-transactionSchema]

**Property** |	**Type** |	**Description**
-------------|-----------|---------------------
restrictionType |	[RestrictionType](#restrictiontype) |	Type of the account restriction.
modificationsCount |	uint8 |	Number of modifications in the transaction. A maximum of `255` modifications per transaction is allowed.
modifications |	array([AccountRestrictionModification](#accountrestrictionmodification)) |	Array of account operation restriction modifications.

### AccountRestrictionModification

**Property** |	**Type** |	**Description**
-------------|-----------|---------------------
restrictionModificationType |	[RestrictionModificationType](#restrictionmodificationtype) |	Type of the restriction modification, add or remove.
value | (Address, MosaicId or [Transaction Type][TransactionSchema]) | Modification value (Address, Mosaic or Transaction Type)

## RestrictionModificationType 

**Id** |	**Description**
-----------|---------------------
  0x00     | Add the selected restriction
  0x01     | Remove the selected restriction                 

## RestrictionType 

 **Id** |	**Description**
-------|---------------------
  0x01     | Allow only incoming transactions from a given address.
  0x02     | Allow only incoming transactions containing a given mosaic identifier. 
 0x04         |  Allow only outgoing transactions with a given transaction type.
 0x05     |   Account restriction sentinel.
 0x81     |  Block incoming transactions from a given address.
 0x82    | Block incoming transactions containing a given mosaic identifier.
 0x84 |  Block outgoing transactions with a given transaction type.

[Account]: ./account.md
[Mosaic]: ./mosaic.md
[Multisig]: ./multisig-account.md
[TransactionType]: ../protocol/transaction#transaction-types
[Prevent Spam]: ../guides/account-restriction/preventing-spam-attacks.md
[Embedded-transactionSchema]: ../protocol/transaction#embeddedtransaction
[TransactionSchema]: ../protocol/transaction#transaction