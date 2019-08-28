---
id: sending-an-encrypted-message
title: Sending an encrypted message
---

Send an encrypted message that only can be read by the recipient account.

## Prerequisites
- Finish the [getting started section](../../getting-started/setting-up-workstation.md)
- Finish the [sending a transfer transaction guide](./sending-a-transfer-transaction.md)
- XPX-Chain-SDK or XPX-Chain-CLI
- A text editor or IDE
- An account with `xpx`

## Background

Imagine that Alice wants to timestamp a sensitive message to send to an account representing her academic certificate.

Alice knows that sending a transfer transaction with a plain message through the public network will make the content of the message publicly available.

Thus, Alice sends an encrypted message that is only readable by herself and those with access to the academic certificate.

## Getting into some code

1. Create an account for Alice, and another for the certificate using `xpx2-cli`.

```sh
nem2-cli account generate --save

Introduce network type (MIJIN_TEST, MIJIN, MAIN_NET, TEST_NET): MIJIN_TEST
Do you want to save it? [y/n]: y
Introduce NEM 2 Node URL. (Example: http://localhost:3000): http://localhost:3000
Insert profile name (blank means default and it could overwrite the previous profile): alice
```

```sh
nem2-cli account generate --save

Introduce network type (MIJIN_TEST, MIJIN, MAIN_NET, TEST_NET): MIJIN_TEST
Do you want to save it? [y/n]: y
Introduce NEM 2 Node URL. (Example: http://localhost:3000): http://localhost:3000
Insert profile name (blank means default and it could overwrite the previous profile): certificate
```

2. Create an encrypted message for the certificate, signing it with Alice’s account.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
alicePrivateKey := "..."
aliceAccount, err := sdk.NewAccountFromPrivateKey(alicePrivateKey, sdk.TEST_NET)
if err != nil {
    panic(err)
}

certificatePublicKey := "..."
certicicatePublicAccount, err := sdk.NewAccountFromPublicKey(certificatePublicKey, sdk.PUBLIC_TEST)
if err != nil {
    panic(err)
}

enctyptedMessage, err := aliceAccount.EncryptMessage("This message is secret", certicicatePublicAccount)
if err != nil {
    panic(err)
}

```
<!--END_DOCUSAURUS_CODE_TABS-->

3. Attach the encrypted message to a transfer transaction, setting the certificate address as the recipient.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
transferTransaction, err := client.NewTransferTransaction(
  sdk.NewDeadline(time.Hour),
  recipient1,
  []*sdk.Mosaic{sdk.XpxRelative(10)},
  enctyptedMessage
)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

4. Sign the transaction with Alice’s account.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
aliceAccount, err := account.sign(transferTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

5. Once signed, announce the transaction to the network.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
transactionHash, err = client.Transaction.Announce(context.Background(), signedTransaction)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

6. After the transaction gets confirmed, fetch it using the transaction hash output from (5). You can now decrypt the message using either the certificate account or address account.

<!--DOCUSAURUS_CODE_TABS-->
<!--Golang-->
```go
transactionInfo, err := client.Transaction.GetTransaction(context.Background(), transactionHash)
if err != nil {
    panic(err)
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

If you managed to read the message, try to decrypt it using another unrelated account to ensure that only the defined participants can read the encrypted content.

