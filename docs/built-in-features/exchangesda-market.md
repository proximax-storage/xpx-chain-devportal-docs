---
id: exchangesda-market
title: Decentralized Exchange Market
---

# Overview
A user can create an [SDA-SDA offer](exchangesda-market.md#exchangesda) through the ProximaX Decentralized Exchange Market.

<div class="info">

**Note**

It is not possible to exchange services mosaics such as Review, [SO](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#storage-units-so), [SM](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#streaming-units-sm) and [SC](https://storagedocs.xpxsirius.io/docs/getting_started/economy/#streaming-units-sc).

</div>

## SDA-SDA Exchange

The [decentralized exchange](exchange-market.md) mechanism involves automatically exchanging whole units of Sirius Digital Assets (SDAs).

This feature can be used only when fast finality is enabled, and NXT PoS is disabled. It comes with the following constraints:
1. An offer that exchanges with the same unit types cannot be placed. For example, it is not allowed to place an offer to exchange SDA1 units with SDA1 units.
2. More than 1 offer that exchanges with the same unit types cannot be placed. For example, it is not allowed to place two offers to exchange SDA1 units with SDA2 units even with different amounts.
3. Offers containing 0 units cannot be placed. For example, it is not allowed to place an offer to exchange
   a. 0 SDA1 units with 0 SDA2 units, 
   b. 0 SDA2 units with 25 SDA1 units, or 
   c. 25 SDA2 units with 0 SDA1 units.
4. The mosaic must not expire during the duration of the offer.
Note: SDA1 and SDA2 are examples. These units do not exist.

## How SDA-SDA Offers Are Automatically Exchanged

The offers of the Sirius Digital Assets are exchanged based on the sorting policy and presence of matching offers in the blockchain. Sorting policy is the order in which the offers will be exchanged. Matching offers are offers which match the ratio of the exchange.

There are 6 Sorting Policies, whereby the sorting policy needs to be set in the config-network.properties of the node.
1. **Default** or **0**: no sorting, exchange with the matched existing offers as it is from the list.
2. **SmallToBig** or **1**: sort matched existing offers from the smallest to the biggest amount being offered.
3. **SmallToBigSortedByEarliestExpiry** or **2**: sort matched existing offers from the smallest amount being offered & earliest Duration to the biggest amount being offered & latest Duration.
4. **BigToSmall** or **3**: sort matched existing offers from the biggest to the smallest amount being offered.
5. **BigToSmallSortedByEarliestExpiry** or **4**: sort matched existing offers from the biggest amount being offered & earliest Duration to the smallest amount being offered & latest Duration.
6. **ExactOrClosest** or **5**: sort matched existing offers from the closest amount being offered with the amount being exchanged. 

### Example Use Case
1. Alice has SDA1 and wants to swap it for SDA2. Alice places an offer X SDA1 for Y SDA2. Alice’s SDA1 balance = current balance - X
2. Bob has SDA2 and wants to swap it for SDA1. Bob places P SDA2 for Q SDA1. Bob’s SDA2 balance = current balance - P

| **Alice - Balance: SDA1 1000, SDA2 100** | **Bob - Balance: SDA2 1000, SDA1 1000** |
| ---------------------------------------- | --------------------------------------- | 
|   Offers 100 SDA1 for 10 SDA2            |   Offers 20 SDA2 for 200 SDA1           |
|   Lock Amount: SDA1 1000-100 = 900       |   Lock Amount: SDA2 1000-20 = 980       |

### **Exchange Formula: P/Q = Y/X**
Bob SDA1/SDA2 = Alice SDA1/SDA2, and when applied, it is 200/20 = 100/10

3. Bob’s SDA1 balance = current balance + (Q <= X ? Q : X)
4. Alice’s SDA2 balance = current balance + (P <= Y ? P : Y)

| **Alice - New Balance** | **Bob - New Balance** |
| ----------------------- | --------------------- | 
|   SDA1 900              |   SDA2 980            |
|   SDA2 100+10=110       |   SDA1 1000+100=1100  |

## Schemas

### PlaceSdaExchangeOfferTransaction
Announces a new SDA-SDA exchange place offer transaction.

**Version**: 0x01

**Entity type**: 0x416A

|    **Property**    |                          **Type**                           |            **Description**             |
| :----------------: | :---------------------------------------------------------: | :------------------------------------: |
|    PlaceSdaOffer   | array([SdaOfferWithDuration](#sdaofferwithduration), count) |   A new offer that will be announced   |

### RemoveSdaExchangeOfferTransaction
Announces a new SDA-SDA exchange remove offer transaction.

**Version**: 0x01

**Entity type**: 0x426A

|    **Property**    |                    **Type**                     |       **Description**       |
| :----------------: | :---------------------------------------------: | :-------------------------: |
|   RemoveSdaOffer   | array([SdaOfferMosaic](#sdaoffermosaic), count) | Offers that will be removed |


### SdaOfferWithDuration
|  **Property**  |      **Type**       |             **Description**              |
| :------------: | :-----------------: | :--------------------------------------: |
|   MosaicGive   |  UnresolvedMosaic   |   Mosaic to be given for the exchange.   |
|   MosaicGet    |  UnresolvedMosaic   |   Mosaic to be gained from the exchange. |
|   Duration     |     uint64          |   The duration of the offer.             |

### SdaOfferMosaic
|    **Name**    |              **Value**               |                     **Description**                     |
| :------------: | :----------------------------------: | :-----------------------------------------------------: |
|   AssetIdGive  |   UnresolvedMosaicId or NamespaceId  |   MosaicId of the offer to be given for the exchange.   |
|   AssetIdGet   |   UnresolvedMosaicId or NamespaceId  |   MosaicId of the offer to be gained from the exchange. |