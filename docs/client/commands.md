---
id: commands
title: Commands
---
## Profile

### Create

Creates a new profile.

**Options**

    -p, --privatekey <privatekey> - Private key
    -n, --network <network>       - Network Type: MAIN_NET, TEST_NET, MIJIN, MIJIN_TEST, PRIVATE, PRIVATE_TEST
    -u, --url <url>               - Sirius-Chain Node URL. Example: http://localhost:3000
    --profile <profile>           - (Optional) profile name, if not private key will be stored as default

**Command**
```
$> xpx2-cli profile create -p 206CE7E4B16B48430FD2C216E4BB105564B21E21DEE196267B4B33C54F1023FC -n MIJIN_TEST -u http://localhost:3000
```

### List

Gets the list of stored accounts.

**Command**

```
$> xpx2-cli profile list
```

<div class=info>

**Note**

By default, XPX2-CLI will always use the default profile to connect to a node and set default options such as: address, public key and sign transactions with private key. To use a named profile, add the –profile option to any command.

</div>

## Account

### Generate new account

Generates a new [account](../built-in-features/account.md). This command generates a private key, public key and address.

Generated accounts can be stored as named profiles by adding a node url.

**Options**

    -s, --save              - (Optional) Save profile
    -u, --url <url>         - (Optional) When saving profile, provide a Sirius-Chain Node URL
    --profile <profile>     - (Optional) When saving profile you can add profile name, if not will be stored as default
    -n, --network <network> - Network Type: MAIN_NET, TEST_NET, MIJIN, MIJIN_TEST

**Command**
```
$> xpx2-cli account generate --network MIJIN_TEST
```

### Get account info

Returns the account information, such as the public key, importance and [mosaics](../built-in-features/mosaic.md) balance.

**Options**

    -a, --address <address> - Address

**Command**

```
$> xpx2-cli account info --address SDAUTVFWMVXVWWKTTEFTLGUO6HP6MR4GLEK6POJ4
```

### Get confirmed transactions

Gets an array of transactions for which an account is the sender or receiver.

**Options**

    -p, --publickey <publickey>             - Account public key
    -n, --numtransactions <numtransactions> - (optional) Number of transactions
    -i, --id <id>                           - (optional) Identifier of the transaction after which we want the transactions to be returned

**Command**

```
$> xpx2-cli account transactions --publickey C811AC654B77522D5283640CDA7A222AED49B08FF74445F3CD1FD27CD4FB75E3

$> xpx2-cli account transactions --publickey C811AC654B77522D5283640CDA7A222AED49B08FF74445F3CD1FD27CD4FB75E3 --numtransactions 40 --id 5A69C893FD331300012A001C
```

### Get incoming transactions

Gets an array of incoming transactions. A transaction is said to be incoming with respect to an account if the account is the recipient of the transaction.

**Options**

    -p, --publickey <publickey>             - Account public key
    -n, --numtransactions <numtransactions> - (optional) Number of transactions
    -i, --id <id>                           - (optional) Identifier of the transaction after which we want the transactions to be returned

**Command**

```
$> xpx2-cli account incoming --publickey C811AC654B77522D5283640CDA7A222AED49B08FF74445F3CD1FD27CD4FB75E3
```

### Get outgoing transactions

Gets an array of outgoing transactions. A transaction is said to be outgoing with respect to an account if the account is the sender of the transaction.

**Options**

    -p, --publickey <publickey>             - Account public key
    -n, --numtransactions <numtransactions> - (optional) Number of transactions
    -i, --id <id>                           - (optional) Identifier of the transaction after which we want the transactions to be returned

**Command**
```
$> xpx2-cli account outgoing --publickey C811AC654B77522D5283640CDA7A222AED49B08FF74445F3CD1FD27CD4FB75E3
```

### Get unconfirmed transactions

Gets the array of transactions for which an account is the sender or receiver and which have not yet been included in a block.

**Options**

    -p, --publickey <publickey>             - Account public key
    -n, --numtransactions <numtransactions> - (optional) Number of transactions
    -i, --id <id>                           - (optional) Identifier of the transaction after which we want the transactions to be returned

**Command**
```
$> xpx2-cli account unconfirmedtransactions --publickey C811AC654B77522D5283640CDA7A222AED49B08FF74445F3CD1FD27CD4FB75E3
```

### Get Aggregate bonded transactions

Gets an array of aggregate bonded transactions where the account is the sender or requires to cosign the transaction.

**Options**

    -p, --publickey <publickey>             - Account public key
    -n, --numtransactions <numtransactions> - (optional) Number of transactions
    -i, --id <id>                           - (optional) Identifier of the transaction after which we want the transactions to be returned

**Command**
```
$> xpx2-cli account aggregatebonded --publickey C811AC654B77522D5283640CDA7A222AED49B08FF74445F3CD1FD27CD4FB75E3
```

## Blockchain

### Blockchain height

Returns the current height of the block chain.

**Command**
```
$> xpx2-cli blockchain height
```
### Blockchain score

Gets the current score of the block chain. The higher the score, the better the chain. During synchronization, nodes try to get the best block chain in the network.

**Command**
```
$> xpx2-cli blockchain score
```

## Transaction

Transactions are signed with the profiles configured with `xpx2-cli profile create`.

### Cosign aggregate bonded transaction

Cosigns and announces an [aggregate bonded transaction](../built-in-features/aggregate-transaction.md#examples).

**Options**

    -h, --hash <hash>       - Aggregate bonded transaction hash to be signed

**Command**
```
$> xpx2-cli transaction cosign --hash AF92D0A1DC40F786DF455A54F3754E6ACBCEC1B590646404B5ACC85403A92690
```

### Transaction info

Returns transaction information given a hash.

**Options**

    -h, --hash <hash>       - Transaction hash

**Command**

```
$> xpx2-cli transaction info --hash AF92D0A1DC40F786DF455A54F3754E6ACBCEC1B590646404B5ACC85403A92690
```

### Send transfer transaction

Announces a [transfer transaction](../built-in-features/transfer-transaction.md#transfertransaction) to an account exchanging value and/or data. For this transaction provide recipient, message and [mosaics](../built-in-features/mosaic.md).

You can send `multiple mosaics` splitting them with a comma, e.g: prx:xpx::10,nps:msc::10. The `mosaic amount` after :: is in `absolute value` so 1 XPX is 1000000.

**Options**

    -r, --recipient <recipient> - Recipient
    -m, --message <message>     - Transaction message
    -t, --mosaics <mosaics>     - Mosaic in the format namespaceName:mosaicName::absoluteAmount, add multiple mosaics splitting them with a comma

**Command**
```
$> xpx2-cli transaction transfer --recipient SDBDG4-IT43MP-CW2W4C-BBCSJJ-T42AYA-LQN7A4-VVWL --message "payout of 10 xpx" --mosaics prx:xpx::10000000
```

### Send pull transaction

Requests [mosaics](../built-in-features/mosaic.md) from an account. The other account has to cosign the transaction.

**Options**

    -r, --recipient <recipient>   - Recipient public key
    -m, --message <message>       - Message to the funds holder
    -x, --mosaic <mosaic>         - Mosaic you want to get in the format namespaceName:mosaicName::absoluteAmount

**Command**

```
$> xpx2-cli transaction pullfunds --recipient SDBDG4-IT43MP-CW2W4C-BBCSJJ-T42AYA-LQN7A4-VVWL --message "invoice 10 xpx" --mosaic prx:xpx::10000000
```

### Register root namespace

Registers a root [namespace](../built-in-features/namespace.md).

**Options**

    -n, --name <name>             - Namespace name
    -r, --rootnamespace           - Root namespace
    -d, --duration <duration>     - Duration (use it with --rootnamespace)
    -p, --parentname <parentname> - Parent namespace name (use it with --subnamespace)

**Command**
```
$> xpx2-cli transaction namespace --rootnamespace --duration 100000 --name new-namespace
```

### Register subnamespace

Registers a [subnamespace](../built-in-features/namespace.md#subnamespaces).

**Options**

    -n, --name <name>             - Namespace name
    -s, --subnamespace            - Sub namespace
    -p, --parentname <parentname> - Parent namespace name (use it with --subnamespace)

**Command**

```
$> xpx2-cli transaction namespace --subnamespace --parentname new-namespace --name new-subnamespace
```

### Create a mosaic

Creates a new [mosaic](../built-in-features/mosaic.md).

**Options**

    -m, --mosaicname <mosaicname>       - Mosaic name
    -n, --namespacename <namespacename> - Parent namespace name
    -a, --amount <amount>               - Amount of tokens
    -t, --transferable                  - Mosaic transferable
    -s, --supplymutable                 - Mosaic supply mutable
    -l, --levymutable                   - Mosaic levy mutable
    -d, --divisibility <divisibility>   - Mosaic divisibility, from 0 to 6
    -u, --duration <duration>           - Mosaic duration in amount of blocks

**Command**

```
$> xpx2-cli transaction mosaic --mosaicname token --namespacename new-namespace --amount 1000000 --transferable --supplymutable --divisibility 0 --duration  100000
```

## Namespace

### Info

Gets information from a [namespace](../built-in-features/namespace.md). Use this command providing the namespace name or the mosaic uint ID in the form of [3646934825,3576016193].

**Options**

    -n, --name <name>   - Namespace Id in string format
    -u, --uint <uint>   - Namespace id in uint64 format. [number, number]

**Command**

```
$> xpx2-cli namespace info --uint [929036875,2226345261]
```

## Mosaic

### Info

Gets information from a [mosaic](../built-in-features/mosaic.md). Use this command providing the mosaic identifier name in the form of namespaceName:mosaicName (ex: prx:xpx) or the mosaic uint ID in the form of [3646934825,3576016193].

**Options**

    -n, --name <name>   - Mosaic Id in string format
    -u, --uint <uint>   - Mosaic id in uint64 format. [number, number]

**Command**
```
$> xpx2-cli mosaic info --name prx:xpx
```

## Monitoring

The Sirius-Chain command line interface has a set of monitoring commands to track events in the Sirius-Chain.

### Block

Monitors new confirmed [blocks](../protocol/block.md) validated in the blockchain.

**Command**
```
$> xpx2-cli monitor block
```

### Confirmed transactions

Monitors new confirmed [transactions](../protocol/transaction.md) signed or received by an [account](../built-in-features/account.md).

**Options**

    -a, --address <address> - Address

**Command**
```
$> xpx2-cli monitor confirmed --address SCEKUG-H2IJBF-7JZRNK-ECMW52-E66SZ6-ODLB4W-NI7K
```

### Unconfirmed transactions

Monitors new unconfirmed [transactions](../protocol/transaction.md) signed or received by an [account](../built-in-features/account.md).

**Options**

    -a, --address <address> - Address

**Command**
```
$> xpx2-cli monitor unconfirmed --address SCEKUG-H2IJBF-7JZRNK-ECMW52-E66SZ6-ODLB4W-NI7K
```

### Aggregate bonded transactions

Monitors new [aggregate transactions](../built-in-features/aggregate-transaction.md) with missing signatures added to an [account](../built-in-features/account.md).

**Options**

    -a, --address <address> - Address

**Command**
```
$> xpx2-cli monitor aggregatebonded --address SCEKUG-H2IJBF-7JZRNK-ECMW52-E66SZ6-ODLB4W-NI7K
```

### Transaction status

Monitors [account](../built-in-features/account.md) validation errors.

**Options**

    -a, --address <address> - Address

**Command**
```
$> xpx2-cli monitor status --address SCEKUG-H2IJBF-7JZRNK-ECMW52-E66SZ6-ODLB4W-NI7K
```
