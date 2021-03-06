---
id: cheatsheet
title: Sirius Chain Cheat Sheet
---

## Reading guides

- Documents under protocol category is categorized as basic/common concept for most of the blockchain 

- Documents under built-in-features are features specific for Sirius Chain  

- You do not need to understand the schema section of the documents if you are just using the SDKs, unless you need it for reference for SDK developments

- Check out the coding guides [here](./guides/overview.md), the cli and some SDKs guides are still missing. We will update it soon

- List of SDKs -> [here](./sdks/languages.md)

- Wallet and explorer -> [here](./wallets-explorers.md)

## Sirius Chain

- Use Proof-of-Stake and Proof-of-Greed consensus algorithms. [Read more](./protocol/consensus-algorithms.md)

- Each block will be generated every 15 seconds on average

- Chain network config can be found at `{API_URL}/config/{block_height}` 

    - All the fee, maximum duration and supported transaction information can be found here. eg. MosaicRentalFee, NamespaceRentalFee

    - The config might changes at different block height as the chain goes

    - eg. http://arcturus.xpxsirius.io:3000/config/177060 which is main net API looking for config at block 177060

    - If you clicked the link above, there is a height returned which is 132969. It mean the config is updated at height 132969 and block 177060 is following these config

- Please use [REST API](../endpoints) to debug or get information from Sirius Chain.

### Development and Debugging

- You can use [REST API](../endpoints) for debugging and retrieval of information.

- You can use the websocket listener and services provided in the SDKs to ease your development.

- If your transaction is not getting confirmed

    - please check the transaction status with the REST API or websocket listening to your public key for transaction status. For REST API, you can check the status at `{API_URL}/transaction/{transaction_hash}/status`

    - Transaction with error will not be synced across different nodes, so make sure to connect to the same API node to get the error message with the transaction hash

## Account


 From   | You can get 
------------|------------------
Private Key | Public Key, Address 
Public Key  | Address 
Address     | -

- Private key - the seed for the account

- Public key - it can be regenerate by private key but not vice versa, will be saved in the transaction info and visible for public

- Public key is used to represent owner of mosaic, owner of namespace and signer of transaction  

- Account can be represent by a public key or address

- Security concerns :

    - Signing of transaction with private key can be done locally, therefore not exposing the private key to external parties

    - Client app/ wallet must make sure the private key is stored and exposed only locally

    - With private key, it will have the full control over the account. For better security you can upgrade the account to multisig account

    - Please copy private key down and keep it safe, there will be no way to get it back if loss

    - Please use only trusted wallets

## Address

- Address is a string with 40 length or 46 length with dash in between. 

- The first character represent different network type

Network Type | Address Prefix
-------------|---------------
Main Net     | X
Test Net     | V
Private Test | W
Private      | Z

## REST API

- All response of REST API is in json format

- The value that will be returned by REST API
    - number in array
    - array
    - string
    - object

### Uint64 value

Since REST API is returned with json format, so uint64 number is not supported. So it need to be separated into 2 uint32 array.
The higher and lower part. 
```
[
    0 : lower
    1 : higher
]
```

### Uint64 id in hex

Refering to the above, the lower and higher, we can represent uint64 id in a hex string.

> hex id = (higher_in_hex_8_length ) + (lower_in_hex_8_length) 

## Mosaic

- Representation of asset

- Mosaic id is lower bracket of uint64, therefore the first mosaic id hex is represented by `00` to `7F`. 

  - All mosaic id hex will start from `00XXXXXXXXXXXXXX` to `7FXXXXXXXXXXXXXX`.

- Every time the mosaic id will be different as it is generated by a nounce and owner's public key 

- Only owner can make changes to their mosaic

- Default fee for creating new mosaic is 10,000 xpx

- Default max duration is 3650 days or proximate 10 years
  
  - duration is calculated by block, so 1 minute = 4 blocks, average block generation is 15 seconds


## Namespace

- The concept is similar to dns, which using domain name to represent IP address

- Likewise, a registered namespace is not necessary to be linked to any thing 

- Namespace id is upper bracket of uint64, therefore the first namespace id hex is represented by `80` to `FF`

  - All namespace id hex will start from `80XXXXXXXXXXXXXX` to `FFXXXXXXXXXXXXXX`.

- Namespace id will always be the same for the same name
  - prx will always be `b16d77fd8b6fb3be` hex id
  - prx.xpx will always be `bffb42a19116bdf6` hex id

- Namespace example :

  - `prx` - rootnamespace

  - `prx.xpx` - rootnamespace and subnamespace, `xpx` is the subnamespace

  - `mycompany.address.sea` - rootnamespace, subnamespace and subsubnamespace

### Rootnamespace

- Default

  - fee - 0.004576 xpx per block

  - max duration - 365 days or proximate 1 year

- Duration is calculated by block, so 1 minute = 4 blocks, average block generation is 15 seconds

### Subnamespace

- Default creation fee - 10,000 xpx 

- Duration will follow rootNamespace

- It have parent id linked to rootnamespace or subnamespace 

### Alias

- Use namespace to represent a single address or mosaic

- Use AliasTransaction to link or unlink the namespace to address or mosaic

- You can send transaction to linked namespace directly instead of address or mosaic id

- eg.
  - `mycompany.address` can be linked to mycompany's address
  - `mycompany.coin` can be linked to mycompany's utility coin mosaic
  - You can even use `mycompany` to link any address or mosaic 

## Fee

- *effective_fee* = transaction_final_size_in_bytes * fee_multiplier. eg. `213 * 100 = 21300 = 0.021300 xpx`

- fee_multiplier is integer value starting from 0

- if effective_fee >= max_fee(defined by user), validator can opt to include the transaction in the block

- Max_fee and effective_fee value is in the lowest currency absolute value. eg. `5000 max fee = 0.005000 xpx`

- Transaction sent might not be the final transaction size, the size might be increased due to more complex transaction such as aggregate transaction with multisig account with extra cosigner information. Fee_multiplier will calculate with the final transaction size

### For validator

- Validators need to define `fee_multiplier`, which considered as fee per byte. 

- You can read more on our [Proof-of-Greed Extension](./protocol/consensus-algorithms.md#proof-of-greed-extension) and [transaction fee](./protocol/transaction.md#fees) for `fee_multiplier` strategy.

### For User 

- Need to specify `max fee` or leave it to let the SDK calculate it. SDK will cap the fee at 5 xpx per transaction.

- SDK currently is using `max fee` of 250 per byte. 

- Transaction fee paid will always be less than or equal to the `max fee`, depend on the `fee_multiplier` used by validator.

## Our API node

### Mainnet

- https://arcturus.xpxsirius.io

- https://aldebaran.xpxsirius.io

- https://betelgeuse.xpxsirius.io

- https://bigcalvin.xpxsirius.io

- https://delphinus.xpxsirius.io

- https://lyrasithara.xpxsirius.io

### Testnet 1

- https://bctestnet1.brimstone.xpxsirius.io/

- https://bctestnet2.brimstone.xpxsirius.io/

- https://bctestnet3.brimstone.xpxsirius.io/

#### Testnet 1 Faucet

- https://bctestnetfaucet.xpxsirius.io

### Testnet 2

- https://api-1.testnet2.xpxsirius.io

#### Testnet 2 Faucet

- https://bctestnet2faucet.xpxsirius.io