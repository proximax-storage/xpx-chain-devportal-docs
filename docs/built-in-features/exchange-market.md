---
id: exchange-market
title: Exchange Market
---

# Overview
A user can create an [exchange](exchange-market.md#exchange) offer. Also, any user can select a suitable offer and [exchange](exchange-market.md#exchange) its [mosaics](mosaic.md) for others using Sirius Exchange Market. The market always has the Sirius permanent offer for buying and selling any official mosaic.

<div class="info">

**Note**

It is not possible to exchange services mosaics such as [SO](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#storage-units-so), [SM](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#streaming-units-sm) and [SC](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#streaming-units-sc).

There is a possibility to exchange any mosaic to [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx) and vice versa. For example, you can exchange [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx) to *MosaicA* or *MosaicB*, but there is no possibility to exchange *MosaicA* to *MosaicB* or vice versa. It is possible in two-step exchange: *MosaicA* to [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx) and after [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx) to *MosaicB*.

</div>

## Exchange

The [exchange](exchange-market.md#exchange) mechanism involves two types of actors with the following intentions:
1. The *Seller* offers to sell *M* *MosaicA* for *N* [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx). The formed price will be equal to *M/N*.
2. The *Buyer* is interested in buying *M* *MosaicA* at a price of no more than [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx) per *MosaicA*.

### SellOffer
Any user (in this case, the *Seller*) may have [mosaics](mosaic.md), so it can offer the price and sell [mosaics](mosaic.md). After creating the *sellOffer*, the specified number of [mosaics](mosaic.md) is deducted from the *Seller’s account*. As long as this offer exists, any *Buyer* can agree with the offer and buy [mosaics](mosaic.md). When the *sellOffer* time expires, unsold [mosaics](mosaic.md) are returned to the *Seller’s account*.

### BuyOffer
The process of buying is similar to the *sellOffer* process. The only difference is the transaction type *buyOffer* instead of *sellOffer*

<div class="info">

**Note**

If any user creates *sellOffer*, the other interested users cannot buy less than 1 [mosaic](mosaic.md) (**SellOffer Example**). In another case, when the user creates *buyOffer* and another interested user transfers more than the cost of 1 [mosaics](mosaic.md), it gets 1 [mosaic](mosaic.md) anyway (**BuyOffer Example**).

**SellOffer Example** \
If 1 [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx) cost 5 *MosaicA* and *Buyer* transfers less than 5 *MosaicA*, he will get nothing.

**BuyOffer Example** \
If 1 [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx) cost 5 *MosaicA* and *Seller* transfers more than 5 and less than 10 *MosaicA* he gets 1 [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx) anyway.

</div>

<div class="info">

**Note**
Any user can create an exchange offer with a max duration of 10 days. But Sirius Chain can create offers with unlimited duration.
</div>

## Schemas

### AddExchangeOfferTransaction
Announces a new exchange offer transaction.

**Version**: 0x01

**Entity type**: 0x415D

| **Property** |                       **Type**                        |          **Description**           |
| :----------: | :---------------------------------------------------: | :--------------------------------: |
|   AddOffer   | array([OfferWithDuration](#offerwithduration), count) | A new offer that will be announced |

### ExchangeOfferTransaction
Announces an exchange transaction.

**Version**: 0x01

**Entity type**: 0x425D

| **Property**  |                  **Type**                   |       **Description**        |
| :-----------: | :-----------------------------------------: | :--------------------------: |
| confirmations | array([MatchedOffer](#matchedoffer), count) | Exchange offer confirmations |

### RemoveExchangeOfferTransaction
Announces a new remove exchange offer transaction.

**Version**: 0x01

**Entity type**: 0x435D

| **Property** |                 **Type**                  |       **Description**       |
| :----------: | :---------------------------------------: | :-------------------------: |
| removeOffers | array([OfferMosaic](#offermosaic), count) | Offers that will be removed |


### OfferWithDuration
| **Property** |    **Type**     |      **Description**       |
| :----------: | :-------------: | :------------------------: |
|    Offer     | [Offer](#offer) |       Extends offer.       |
|   Duration   |     uint64      | The duration of the offer. |


### MatchedOffer
| **Property** |    **Type**     |        **Description**          |
| :----------: | :-------------: | :----------------------------:  |
|    Offer     | [Offer](#offer) |         Extends offer.          |
|    Owner     |    32 bytes     | The owner of the matched offer. |

### OfferMosaic
| **Name**  |         **Value**         |     **Description**     |
| :-------: | :-----------------------: | :---------------------: |
| MosaicId  |    UnresolvedMosaicId     | Mosaic id of the offer. |
| OfferType | [OfferType](#offer-types) |       Offer type.       |

### Offer
| **Property** |         **Type**          |               **Description**               |
| :----------: | :-----------------------: | :-----------------------------------------: |
|    Mosaic    |     UnresolvedMosaic      |            Mosaic for exchange.             |
|     Cost     |          uint64           | Sum of XPX suggested to be paid for mosaic. |
|     Type     | [OfferType](#offer-types) |                 Offer type.                 |

### Offer types
Enumeration: uint8

| **Name**  | **Value** |
| :-------: | :-------: |
| SellOffer |     0     |
| BuyOffer  |     1     |
