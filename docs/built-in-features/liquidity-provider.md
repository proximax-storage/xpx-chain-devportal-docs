---
id: liquidity-provider
title: Liquidity Provider
---

# Overview

Liquidity Provider is intended for putting into circulation and decentralized exchange of various mosaics on XPX.
In particular, Storage, Streaming, Execution units, etc. An important feature is the ability to participate in the work
of any number of investors who contribute their XPX and receive passive income from the work of the Liquidity Provider.
The liquidity provider automatically manages the minting of mosaics and an exchange rate.

<div class="info">

**NOTE**

For now only Sirius Chain official can emplace the offers for service units like SO, SM and SC.

</div>

The essence of the method is that the organization which wants to organize the exchange market between currencies *A* and *B* 
should provide enough reserve of both the currencies and establish an initial rate. Later this rate will change 
in accordance with the market situation.

In the beginning, the Liquidity Provider provides *x* units of currency *A* and *y* units of currency *B*.
These values determine the constant of the system *k = xy*. After each exchange the product of amounts of A Units - *x*
and B units - *y* should equal this constant. This condition determines the amount of *B* units returned as an exchange for *A* Units. 

Also, see more details to understand the XYK model - [An Introduction to Automated Market Making](https://medium.com/codex/an-introduction-to-automated-market-making-994bc76c61f4). 