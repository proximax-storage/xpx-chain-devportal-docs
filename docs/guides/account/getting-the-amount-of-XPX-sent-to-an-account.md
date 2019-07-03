---
id: getting-xpx-amount-sent-to-account
title: Getting the amount of XPX sent to an account
---
Check the amount of XPX you have sent to any account.

## Prerequisites

- Finish the [getting started section](../../getting-started/setting-up-workstation.md)
- Text editor or IDE
- XPX-Chain-SDK or CLI

## Let’s get into some code

<!--DOCUSAURUS_CODE_TABS-->
<!--TypesSript-->

```javascript
const accountHttp = new AccountHttp('http://localhost:3000');

const originPublicKey = '7D08373CFFE4154E129E04F0827E5F3D6907587E348757B0F87D2F839BF88246';
const originAccount = PublicAccount.createFromPublicKey(originPublicKey, NetworkType.PRIVATE_TEST);

const recipientAddress = 'SDG4WG-FS7EQJ-KFQKXM-4IUCQG-PXUW5H-DJVIJB-OXJG';
const address = Address.createFromRawAddress(recipientAddress);

accountHttp
    .outgoingTransactions(originAccount)
    .pipe(
        mergeMap((_) => _), // Transform transaction array to single transactions to process them
        filter((_) => _.type === TransactionType.TRANSFER), // Filter transfer transactions
        map((_) => _ as TransferTransaction), // Map transaction as transfer transaction
        filter((_) => _.recipient.equals(address)), // Filter transactions from to account
        filter((_) => _.mosaics.length === 1 && _.mosaics[0].id.equals(NetworkCurrencyMosaic.MOSAIC_ID)), // Filter xpx transactions
        map((_) => _.mosaics[0].amount.compact() / Math.pow(10, NetworkCurrencyMosaic.DIVISIBILITY)), // Map only amount in xpx
        toArray(), // Add all mosaics amounts into one array
        map((_) => _.reduce((a, b) => a + b, 0))
    )
    .subscribe(
        total => console.log('Total xpx send to account', address.pretty(), 'is:', total),
        err => console.error(err)
    );
```

<!--Java-->
```javascript
        // Replace with public key
        final String originPublicKey = "";

        // Replace with recipient address
        final String recipientAddress = "SB2RPH-EMTFMB-KELX2Y-Q3MZTD-RV7DQG-UZEADV-CYKC";

        // Replace with public key
        final PublicAccount originAccount = PublicAccount.createFromPublicKey(originPublicKey, NetworkType.PRIVATE_TEST);

        // Replace with address
        final Address address = Address.createFromRawAddress(recipientAddress);

        final AccountHttp accountHttp = new AccountHttp("http://localhost:3000");

        final BigInteger total = accountHttp.outgoingTransactions(originAccount)
                .flatMapIterable(tx -> tx) // Transform transaction array to single transactions to process them
                .filter(tx -> tx.getType().equals(TransactionType.TRANSFER)) // Filter transfer transactions
                .map(tx -> (TransferTransaction) tx) // Map transaction as transfer transaction
                .filter(tx -> tx.getRecipient().equals(address)) // Filter transactions from to account
                .filter(tx -> tx.getMosaics().size() == 1 && tx.getMosaics().get(0).getId().equals(NetworkCurrencyMosaic.MOSAICID)) // Filter xpx transactions
                .map(tx -> tx.getMosaics().get(0).getAmount().divide(BigDecimal.valueOf(Math.pow(10, NetworkCurrencyMosaic.DIVISIBILITY)).toBigInteger())) // Map only amount in xpx
                .toList() // Add all mosaics amounts into one array
                .map(amounts -> amounts.stream().reduce(BigInteger.ZERO, BigInteger::add))
                .toFuture()
                .get();

        System.out.println("Total xpx send to account " + address.pretty() + " is: " + total.toString());
```

<!--END_DOCUSAURUS_CODE_TABS-->

The amount of XPX sent is displayed in your terminal.
What’s next?

Repeat the example by changing filter for another [mosaic](../../built-in-features/mosaic.md).
