---
id: rest-api-overview
title: REST API Overview
sidebar_label: Overview
---
**Sirius Chain REST API** combines HTTP and Web Sockets to perform read and write actions in the Sirius Chain.

## Requests

Sirius Chain REST uses port `3000`. It accepts both HTTP **GET**, **PUT** and **POST** requests.

Assuming that Sirius Chain REST is running locally, HTTP GET requests can be executed from a browser and have the form:

[http://bctestnet1.brimstone.xpxsirius.io:3000/](http://bctestnet1.brimstone.xpxsirius.io:3000/)<path-to-API-request>

HTTP PUT and POST requests use JSON structures in the request body. Request returns data (if any is returned) using JSON structures. This request cannot usually be executed from within the browser unless you use a [plugin](./tools.md) which enables you to do it.

[Sirius Chain REST API Endpoints](/endpoints)

## HTTP Errors

**Status code** |	**Description**
----------------|-------------------
200 |	Ok. The request has succeeded.
202 |	Accepted. The request has been accepted for processing but the processing has not been completed.
400 |	Bad request. Check your request syntax.
404 |	Not found. The resource does not exist.
409 |	Conflict. Check your arguments.
500 |	Internal error. Unexpected condition.

## Http status

**Key** |	**Description**
--------|---------------------
code |	Error identifier in camelCase.
message |	Error explained in human-readable format.

## Example
```js
{
  "code": "InvalidArgument",
  "message": "accountId has an invalid format"
}
```

## uint64: lower and higher

Javascript operates on 32 bit values. To enable representation up to 64 bits, the API returns numbers encoded in two parts: `lower` and `higher`.

Check [how to compact lower and higher into a single value](https://github.com/proximax-storage/tsjs-xpx-chain-sdk/blob/322960aab44b4e1d0485920c697b85a88e548674/src/core/format/RawUInt64.ts#L34).

