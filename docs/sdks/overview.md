---
id: sdks-overview
title: SDK Overview
sidebar_label : Overview
---
The Sirius Chain Software Development Kit is the primary software development tool to create chain components, such as additional tools, libraries or applications. Almost all, if not all, components should use **XPX-Chain-SDK** instead of raw API.

<div class=info>

**Note:**

The SDKs methods could change until it reaches the stable version 1.0.0.

</div>

The new SDK enables developers to focus on their product rather than on the Sirius Chain specific API details due to its higher abstraction.

XPX-Chain-SDK shares the same design/architecture between programming languages to accomplish the next properties:

- **Fast language adaptation**: There is a library for Java, but you need it for C# for example. As both SDKs share the same design, you can re-write the library faster, adapting the syntax to your language. It also applies to examples, projects and applications…
- **Cohesion/Shared knowledge cross Sirius Chain developers**: Be able to change between projects that use Sirius Chain, sharing the same design accompanied by the best practices.
- **Fast SDK updates**: Migrating any improvement from a XPX-Chain-SDK implementation to the rest is faster.
- **Fewer bugs**: If any bug appears in one language, it is faster to check and fix it.

The best way to learn about the SDKs is through [Guides](../guides/overview.md).
