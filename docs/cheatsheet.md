---
id: cheatsheet
title: Sirius Chain Cheat Sheet
---

## Reading guides

- Documents under the "Protocol" category are categorized as a basic/common concept for most of the blockchain.

- Documents under the "Built-in features" are features specifically for Sirius Chain.  

- You do not need to understand the "Schema" sections of the documents if you are just using the SDKs, unless you need it for reference for SDK developments.

- Check out the coding guides [here](./guides/overview.md), the client and some SDKs guides are still missing. We will update it soon.

- List of SDKs -> [here](./sdks/languages.md).

- Wallet and explorer -> [here](./wallets-explorers.md).

## Sirius Chain

- Use Proof-of-Stake and Proof-of-Greed consensus algorithms. [Read more](./protocol/consensus-algorithms.md).

- Each block will be generated every 15 seconds on average.

- Chain network config can be found at `{API_URL}/config/{block_height}` 

    - All the fee, maximum duration and supported transaction information can be found here. eg. MosaicRentalFee, NamespaceRentalFee

    - The config might change at different block heights as the chain goes.

    - eg. http://arcturus.xpxsirius.io:3000/config/177060 which is main net API looking for config at block 177060

    - If you clicked the link above, there is a height returned which is 132969. It means that config is updated at height 132969 and block 177060 is following these config,

- Please use [REST API](../endpoints) to debug or get information from Sirius Chain.

### Development and Debugging

- You can use [REST API](../endpoints) for debugging and retrieval of information.

- You can use the websocket listener and services provided in the SDKs to ease your development.

- If your transaction is not getting confirmed,

    - please check the transaction status with the REST API or websocket listening to your public key for transaction status. For REST API, you can check the status at `{API_URL}/transaction/{transaction_hash}/status`

    - Transactions with errors will not be synced across different nodes, so make sure to connect to the same API node to get the error message with the transaction hash.

## Account


 From   | You can get 
------------|------------------
Private Key | Public Key, Address 
Public Key  | Address 
Address     | -

- Private key - the seed for the account.

- Public key - it can be regenerated by the private key but not vice versa, will be saved under transaction info and is visible to the public.

- Public key is used to represent the owner of mosaic, owner of namespace and signer of transaction.  

- Account can be represented by a public key or address.

- Security concerns :

    - Signing of transactions with a private key can be done locally, to avoid exposing the private key to external parties.

    - Client app/wallet must make sure the private key is stored and exposed only locally.

    - With the private key, it will have full control over the account. For better security, you can upgrade the account to a multisig account.

    - Please copy the private key down and keep it safe, there will be no way to get it back once lost.

    - Please use only trusted wallets.

## Address

- An address is a string with 40 characters or 46 characters with a dash in between. 

- The first character represents the different network types.

Network Type        | Address Prefix
--------------------|---------------
Public Mainnet      | X
Public Testnet      | V
Private Test        | W
Private             | Z

## REST API

- All response of REST API is in json format

- The value that will be returned by REST API
    - number in array
    - array
    - string
    - object

### Uint64 value

Since REST API is returned with json format, the uint64 number is not supported. Hence, it needs to be separated into 2 uint32 arrays: the higher and lower part. 
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

- Representation of an asset.

- Mosaic id is the lower bracket of uint64, therefore the first mosaic id hex is represented by `00` to `7F`. 

  - All mosaic id hex will start from `00XXXXXXXXXXXXXX` to `7FXXXXXXXXXXXXXX`.

- The mosaic id will always be different as it is generated by a nonce and the owner's public key. 

- Only owners can make changes to their mosaics.

- The default fee for creating a new mosaic is 10,000 XPX.

- The default max duration is 3650 days or approximately 10 years.
  
  - Duration is calculated by block, so 1 minute = 4 blocks and an average block generation is 15 seconds.


## Namespace

- The concept is similar to dns, which uses the domain name to represent the IP address.

- Likewise, a registered namespace is not necessarily linked to anything. 

- Namespace id is the upper bracket of uint64, therefore the first namespace id hex is represented by `80` to `FF`.

  - All namespace id hex will start from `80XXXXXXXXXXXXXX` to `FFXXXXXXXXXXXXXX`.

- Namespace id will always be the same for the same names:
  - prx will always be `b16d77fd8b6fb3be` hex id.
  - prx.xpx will always be `bffb42a19116bdf6` hex id.

- Namespace example :

  - `prx` - rootnamespace

  - `prx.xpx` - rootnamespace and subnamespace, `xpx` is the subnamespace

  - `mycompany.address.sea` - rootnamespace, subnamespace and subsubnamespace

### Rootnamespace

- Default.

  - Fee - 0.004576 XPX per block.

  - Max duration - 365 days or approximately 1 year.

- Duration is calculated by block, so 1 minute = 4 blocks, average block generation is 15 seconds.

### Subnamespace

- Default creation fee - 10,000 XPX.

- Duration will follow rootNamespace.

- It has a parent id linked to the rootnamespace or subnamespace. 

### Alias

- Use namespace to represent a single address or mosaic.

- Use AliasTransaction to link or unlink the namespace to address or mosaic.

- You can send transactions to linked namespaces directly instead of using addresses or mosaic ids.

- eg.
  - `mycompany.address` can be linked to mycompany's address.
  - `mycompany.coin` can be linked to mycompany's utility coin mosaic.
  - You can even use `mycompany` to link any address or mosaic.

## Fee

- *effective_fee* = transaction_final_size_in_bytes * fee_multiplier. eg. `213 * 100 = 21300 = 0.021300 XPX`.

- fee_multiplier is an integer value starting from 0.

- If effective_fee >= max_fee(defined by user), the validator can opt to include the transaction in the block.

- Max_fee and effective_fee value is in the lowest currency absolute value. eg. `5000 max fee = 0.005000 XPX`.

- Transactions sent might not be the final transaction size; the size might be increased due to more complex transactions such as aggregate transactions with multisig accounts that come with extra cosigner information. Fee_multiplier will calculate with the final transaction size.

### For validator

- Validators need to define `fee_multiplier`, which considered as fee per byte. 

- You can read more on our [Proof-of-Greed Extension](./protocol/consensus-algorithms.md#proof-of-greed-extension) and [transaction fee](./protocol/transaction.md#fees) for `fee_multiplier` strategy.

### For User 

- Need to specify `max fee` or leave it to let the SDK calculate it. SDK will cap the fee at 5 XPX per transaction.

- SDK currently is using a `max fee` of 250 per byte. 

- Transaction fee paid will always be less than or equal to the `max fee`, depending on the `fee_multiplier` used by the validator.

## Our API node

### Mainnet

- https://arcturus.xpxsirius.io

- https://aldebaran.xpxsirius.io

- https://betelgeuse.xpxsirius.io

- https://bigcalvin.xpxsirius.io

- https://delphinus.xpxsirius.io

- https://lyrasithara.xpxsirius.io

### Testnet 2

- https://api-1.testnet2.xpxsirius.io
- https://api-2.testnet2.xpxsirius.io

#### Testnet 2 Faucet

- https://bctestnet2faucet.xpxsirius.io