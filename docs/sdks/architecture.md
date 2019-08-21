---
id: architecture
title: Architecture
---
## Characteristics of Architecture 

- **Standardised Contracts**: Guaranteeing interoperability and harmonization of data models.
- **Loose Coupling**: Reducing the degree of component coupling fosters.
- **Abstraction**: Increasing long-term consistency of interoperability and allowing underlying components to evolve independently.
- **Reusability**: Enabling high-level interoperability between modules and potential component consumers.
- **Stateless**: Increasing availability and scalability of components allowing them to interoperate more frequently and reliably.
- **Composability**: For components to be effectively composed, they must be interoperable.

## Reactive

**Reactive Programming**

In computing, **reactive programming** is a declarative programming paradigm concerned with data streams and the propagation of change. This means that it becomes possible to express static (e.g. arrays) or dynamic (e.g. event emitters) data streams with ease via the employed programming language(s), and that an inferred dependency within the associated execution model exists, which facilitates the automatic propagation of the change involved with data flow.

Reference:
- Wikipedia Contributors. "Reactive Programming." Wikipedia, Wikipedia Foundation. 11 June 2019. https://en.wikipedia.org/wiki/Reactive_programming.

**Observer Pattern**

The **observer pattern** is a software design pattern in which an object, called the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods.

Reference:
- Wikipedia Contributors. "Observer Pattern." Wikipedia, Wikipedia Foundation. 3 July 2019. https://en.wikipedia.org/wiki/Observer_pattern

XPX-Chain-SDK uses intensely ReactiveX Library. See [reactivex here](http://reactivex.io/).

- **Functional**: Developers can avoid complex stateful programs using clean input/output functions over observable streams.
- **Less is more**: ReactiveX’s operators often reduce what was once an elaborate challenge into a few lines of code.
- **Async error handling**: Traditional try/catch is powerless for errors handling in asynchronous computations, but ReactiveX will offer developers the proper tools to handle these sort of errors.
-  **Concurrency**: Observables and Schedulers in ReactiveX allow the programmer to abstract away low-level threading, synchronization, and concurrency issues.
- **Frontend**: Manipulation of UI events and API responses on the Web using RxJS.
- **Backend**: Embrace ReactiveX’s asynchronicity, enabling concurrency and implementation independence.

<div class=info>

**Note:**

In case you are not familiar with ReactiveX and you still have to deliver something fast, you can convert an observable to Promise/Future by reviewing this [example](https://www.learnrxjs.io/operators/utility/topromise.html). However, **we encourage you to learn ReactiveX**.

</div>

## References

- [RxJS in Action](https://www.manning.com/books/rxjs-in-action)
- [Functional Reactive Programming](https://www.manning.com/books/functional-reactive-programming)
- [Learn RxJS](https://www.learnrxjs.io/)

## Package Organisation

![xpx-chain-sdk Architecture](/img/xpx-chain-sdk-architecture.png "xpx-chain-sdk Architecture")

<p class=caption>Package organisation diagram</p>

## Infrastructure

The HTTP requests are made following the Repository Pattern, and they return Sirius Chain Domain immutable models via the Observable Pattern.

## Models

The Sirius Chain Domain models are, usually, immutable by definition. The developer cannot change its attributes. Instead, the developers have to create new Transactions and dispatch them to Sirius Chain via Transaction HTTP, to change the Sirius Chain state.

## Services

Common operations that require multiple [REST API](../rest-api/overview.md#requests) requests are handled by already provided services.