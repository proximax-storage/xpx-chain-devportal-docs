---
id: exchange-market
title: Exchange Market
---

# Overview
A user can create an [exchange](exchange-market.md#exchange) offer. Also, any user can select a suitable offer and [exchange](exchange-market.md#exchange) its [mosaics](mosaic.md) for others using ProximaX Exchange Market. The market always has the ProximaX permanent offer for buying and selling any offical mosaic.

<div class="info">

**Note**

There is a possibility to exchange any mosaic to XPX and vice versa. For example, you can [exchange](exchange-market.md#exchange) [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx) to [SO](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#storage-units-so) or [SM](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#streaming-units-sm), but there is no possibility to [exchange](exchange-market.md#exchange) [SO](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#storage-units-so) to [SM](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#streaming-units-sm) or vice versa. It is possible in two-step exchange: [SO](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#storage-units-so) to [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx) and after [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx) to [SM](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#streaming-units-sm).

</div>

## Exchange

The [exchange](exchange-market.md#exchange) mechanism involves two types of actors with the following intentions:
1. The *Seller* offers to sell *M* [SO](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#storage-units-so) for *N* [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx). The formed price will be equal to *M/N*.
2. The *Buyer* is interested in buying *M* [SO](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#storage-units-so) at a price of no more than [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx) per [SO](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#storage-units-so).

The common structure of the [exchange](exchange-market.md#exchange) offer consists of:
- **Type**: Type of the offer (*buyOffer* or *sellOffer*).
- **Mosaic**: Type of [mosaics](mosaic.md) and its amount.
- **Cost**: Cost of the offer.

### SellOffer
Any user (in this case, the *Seller*) may have [mosaics](mosaic.md), so it can offer the price and sell [mosaics](mosaic.md). After creating the *sellOffer*, the specified number of [mosaics](mosaic.md) is deducted from the *Seller’s account*. As long as this offer exists, any *Buyer* can agree with the offer and buy [mosaics](mosaic.md). When the *sellOffer* time expires, unsold [mosaics](mosaic.md) are returned to the *Seller’s account*.

### BuyOffer
The process of buying is similar to the *sellOffer* process. The only difference is the transaction type *buyOffer* instead of *sellOffer*

<div class="info">

**Note**

If any user creates *sellOffer*, the other interested users cannot buy less than 1 [mosaic](mosaic.md) (**SellOffer Example**). In another case, when the user creates *buyOffer* and another interested user transfers more than the cost of 1 [mosaics](mosaic.md), it gets 1 [mosaic](mosaic.md) anyway (**BuyOffer Example**).

**SellOffer Example** \
If 1 [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx) cost 5 [SO](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#storage-units-so) and *Buyer* transfers less than 5 [SO](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#storage-units-so), he will get nothing.

**BuyOffer Example** \
If 1 [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx) cost 5 [SO](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#storage-units-so) and *Seller* transfers more than 5 and less than 10 [SO](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#storage-units-so) he gets 1 [XPX](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#xpx) anyway.

</div>