---
id: Consensus-Algorithms
title: Consensus Algorithms
---

## Background Information 

Like any blockchain implementation, a fair and autonomous network ecosystem will always have a consensus mechanism that determines the different participating actors for a service. Sirius- Chain uses Proof-of-Stake and Proof-of-Greed.

## NXT's Proof-of-Stake Optimisation

ProximaX has selected Proof-of-Stake (“PoS”) as its consensus algorithm for Sirius Chain.  PoS is more economically efficient and has a higher performance than Proof-of-Work (“PoW”), making it a more attractive network for participants.  PoS is also relatively easier to scale up, which is vital for the continued expansion of ProximaX Sirius’ core services.

ProximaX has used NXT’s PoS as a reference, as it is arguable one of the most established and mature forms of a PoS implementation.  Sirius Chain has an enhanced version of NXT’s consensus mechanism.  Firstly, parameters were discovered that gave better control over the duration required to sign (validate) a block.  And secondly, its further expansion has solved the problem of long blocks by providing a more "concentrated" block time.  The selected parameters also helps prevent zero-fee Aattacks and encourage nodes to take an average commission fee for creating a block. 

In the standard version, Nxt blocks are generated every 60 seconds on average.  With ProximaX's modification, blocks are generated every 15 seconds on average.  Given that the full token supply already exists after the genesis block is validated, the blockchain state is redistributed through the inclusion of transaction fees which are awarded to an account when it successfully creates and validates a block.  This process is known as “validating”, and is similar to the mining concept found in PoW.

## Proof-of-Greed Extension

In the PoS model used by Sirius Chain, network security is governed by peers having a stake in the network.  Although the incentives provided by Nxt’S algorithm do not promote centralizsation in the same way that PoW algorithms do, ProximaX has created a new mechanism that decentralizses the block forging process even further.  This mechanism is called Proof-of-Greed (“PoG”).

In PoG, instead of indicating a fixed transaction fee, an end-user that wants to execute a transaction on Sirius Chain will need to first offer the maximum fee he is willing to pay.  Unconfirmed transactions form a Transactions Pool, from which Validators take transactions, form their own blocks, and request a fee that is not more than the maximum specified by the consumer end.  Then the selection process begins.  PoG’s algorithm takes into account not only the stake and age of the Validator, but also the size of the fee requested.  The less fee the Validator requests, the higher the possibility that its block will be recorded on the Sirius Chain. 

PoG also solves another major problem found in other blockchain networks, this being that there is no fee adjustment framework.  With PoG, the fee size is adjustable for both consumers end-users and Validators.

## Zero-fee Attack

If PoG’s focus is on penalizing greedy Validators, then the question that arises is whether there is a potential vulnerability if Validators behave in a complete opposite manner, by validating transactions for free.  The scenario of a Zero-fee Attack is where malicious Validators attempt to manipulate the PoG algorithm by taking zero fees, and as a result, forging the most blocks and potentially taking control of the network.  

To combat this, mathematical parameters have been included in the PoG algorithm to ensure that Validators that take an average fee have a higher chance of forging a block.  This eliminates the possibility of a Zero-fee Attack.   

## Large-stake Attack

In PoS, the wealthiest and oldest Vvalidators are more likely to be selected for validating transactions.  This could become a vulnerability for the network if a Validator with a 51% stake decides to launch a Large-stake Attack by maliciously attempting to take control of the network, earn the majority of fees, and even reverse transactions.  

With PoG, this can be prevented.  PoG ensures that there is a fair spread when it comes to selecting and rewarding Validators, meaning that even a Validators with a small stake has a chance of having their block recorded on the blockchain. 

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

