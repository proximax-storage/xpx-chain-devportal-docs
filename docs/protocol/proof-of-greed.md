---
id: proof-of-greed
title: Proof Of Greed
---

## Abstract


Bitcoin has proven that a peer-to-peer electronic cash system
can indeed work and fulfil payments processing without requiring
trust or a central mint. However, for an entire electronic economy
to be based on a fully decentralized, peer-to-peer solution, it
must be able to do the following: process transactions securely,
quickly and efficiently, at the rate of thousands per hour or more;
provide incentives for people to participate in securing the network;
scale globally with a minimal resource footprint; offer a range of
basic transaction types that launch cryptocurrencies past the core
feature of a payment system alone; provide an agile architecture
that facilitates the addition of new core features, and allows for
the creation and deployment of advanced applications; and be able
to run on a broad range of devices, including mobile ones. Nxt
algorithm satisfies all these requirements. That is why Nxt is
the basis of ProximaX's Proof-of-Stake algorithm.

Blocks are generated every 15 seconds, on average. Since the
full token supply already exists, the blockchain state is
redistributed through the inclusion of transaction fees which
are awarded to an account when it successfully creates a block.
This process is known as forging, and is akin to the mining concept
of the Proof-of-Work-based cryptocurrencies.

In the traditional Proof of Work model used by most cryptocurrencies,
network security is provided by peers doing work. They deploy their
resources (computation/processing time) to reconcile double-spending
transactions, and to impose an extraordinary cost on those who would
attempt to reverse transactions. Tokens are awarded to peers in exchange
for work, with the frequency and amount varying with each cryptocurrency's
operational parameters. This process is known as mining. The frequency of
block generation, which determines each cryptocurrency's available mining
reward, is generally intended to stay constant. As a result, the difficulty
of the required work for earning a reward must increase as the work
capacity of the network increases.

## Proof of Greed

As a Proof of Work network becomes stronger, there is less incentive
for an individual peer to support the network, because their
potential reward is split among a greater number of peers. In
search of profitability, miners keep adding resources in the form
of specialized, proprietary hardware that requires significant capital
investment and high ongoing energy demands. As time progresses, the
network becomes more and more centralized as smaller peers (those
who can do less work) drop out or combine their resources into pools.

In the Proof of Stake model used by ProximaX, network security is governed
by peers having a stake in the network. Although the incentives provided
by Nxt algorithm do not promote centralisation in the same way that
Proof of Work algorithms do, we have created a new mechanism that allows
decentralising the block forging process even more. This mechanism is Proof of Greed.

Instead of indicating a fixed transaction fee, a user will offer the
maximum fee that is affordable to pay. Transactions get into the
Transaction Pool, from there validators take transactions and form
their own blocks and take the commission as much as they want but not
more than the specified maximum. The algorithm of Proof of Greed takes
into account not only the steak of the node but also the size of the
interest taken by the validator. The less fee the validator takes, the
higher its chances to forge next block. This is achieved by modification
of Nxt Consensus. Now let's put it in mathematical words:

![](http://latex.codecogs.com/gif.latex?N) - the number of nodes.

![](http://latex.codecogs.com/gif.latex?numTr_i) - the number of transactions in the block from the node ![](http://latex.codecogs.com/gif.latex?i), ![](http://latex.codecogs.com/gif.latex?i%20=%201...N).

![](http://latex.codecogs.com/gif.latex?actFee_ij) - how much commission node  took from the transaction ![](http://latex.codecogs.com/gif.latex?j), ![](http://latex.codecogs.com/gif.latex?i%20=%201...N), ![](http://latex.codecogs.com/gif.latex?j=1...numTr_i).

![](http://latex.codecogs.com/gif.latex?maxFee_ij) - maximum that node ![](http://latex.codecogs.com/gif.latex?numTr_i) can take from the transaction ![](http://latex.codecogs.com/gif.latex?numTr_j), ![](http://latex.codecogs.com/gif.latex?i=1...N), ![](http://latex.codecogs.com/gif.latex?j=1...numTr_i).

![](http://latex.codecogs.com/gif.latex?g_i) - the greed of the node ![](http://latex.codecogs.com/gif.latex?i), ![](http://latex.codecogs.com/gif.latex?i%20=%201...N).

![](http://latex.codecogs.com/gif.latex?g_i=\frac{\epsilon+\sum^{numTr_i}_{j=1}actFee_ij}{\epsilon+\sum^{numTr_i}_{j=1}maxFee_ij})

where ![](http://latex.codecogs.com/gif.latex?\epsilon) is the average cost of block recording in blockchain for a validator.

If ![](http://latex.codecogs.com/gif.latex?\sum^{numTr_i}_{j=1}maxFee_ij) is less than or close to the ![](http://latex.codecogs.com/gif.latex?\epsilon), then ![](http://latex.codecogs.com/gif.latex?g_i\approx1).
In this case, the validator's behaviour strategy can be arbitrary, that is, it can take any
percentage of the maximum possible commission without reducing its probability of creating the next block.

The parameter ![](http://latex.codecogs.com/gif.latex?g_i) is set by the node for the whole block in the form of two variables ![](http://latex.codecogs.com/gif.latex?\sum^{numTr_i}_{j=1}actFee_ij) and ![](http://latex.codecogs.com/gif.latex?\sum^{numTr_i}_{j=1}maxFee_ij).

![](http://latex.codecogs.com/gif.latex?\lambda_i) - parameter of the node ![](http://latex.codecogs.com/gif.latex?i), ![](http://latex.codecogs.com/gif.latex?i=1...N).

![](http://latex.codecogs.com/gif.latex?\lambda_i=[1+\triangle(1-2g_i)]^k),

where ![](http://latex.codecogs.com/gif.latex?0\leq\triangle<1) and ![](http://latex.codecogs.com/gif.latex?k>0) is variable
parameters that are needed to be researched and modelled to get the best value.

Now we have a possibility of every node to be chosen. Because of new
parameters, even nodes with low stakes can get the right to forge a
block due to their generosity.

