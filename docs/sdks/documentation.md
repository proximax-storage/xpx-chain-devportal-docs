---
id: sdk-documentation
title: SDK Documentation
---
SDKs need to be adopted by other developers. As a contributor, no one knows better than you how a determined SDK works. Provide the content for its documentation to help spread the use of your SDK. 

## Readme

Check if your repository has a complete Readme Notes. Consider using the template <a href="/downloads/README_SDK.md" >here</a> used by some SDKs.

Required sections are the following:

- Requirements
- Installation
- Contributing
- License

## Comments and Reference Docs

Document the functions and classes with the comments while you write your code. A reference generator should be able to read this comments and generate HTML as an output.

Some examples of reference generators are [TypeDoc](https://typedoc.org/) for Javascript, while in Java, we are using [Javadoc](https://www.oracle.com/technetwork/java/javase/javadoc-137458.html). Research which is the reference generator is most convenient for your language.

## Guides 

The ProximaX Sirius Chain Developer Center gathers a collection of [guides](../built-in-features/account.md). They show developers how to use Sirius Chain built-in features through step-by-step use cases.

Each guide comes with at least one snippet. Snippets are executable pieces of code that solve the proposed use case.

Writing snippets helps you to compare how the SDK code looks like in contrast with others. Furthermore, you will be testing manually if the SDK behaves correctly.

1. [Fork](https://help.github.com/articles/fork-a-repo/#fork-an-example-repository) and clone [proximax-bc-docs repository](https://github.com/proximax-storage/proximax-bc-docs).

```
$> git clone https://github.com/<YOUR_USERNAME>/proximax-bc-docs.git
```

2. Create a new folder under `source/resources/examples/` called .
3. Code each example. Take [typescript snippets](https://github.com/proximax-storage/proximax-bc-docs/tree/master/source/resources/examples/typescript) as a reference.
4. Push the changes, and [create a pull request](https://services.github.com/on-demand/intro-to-github/es/crear-pull-request).

