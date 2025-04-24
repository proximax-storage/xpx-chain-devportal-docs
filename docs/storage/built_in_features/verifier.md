---
id: storage-verifier
title: Verifier
---

Often in decentralized networks, it is required that the verification algorithm supports **public verifiability**, which means that the network can verify that the node really stores the data. Although the given algorithm allows introducing public verifiability, we do not need to implement this since verifications are made by the [Replicators](replicator.md) of the same [Drive](drive.md).

There are two roles of nodes in terms of Storage Verifications:

- **Prover** — a Replicator that proves that it stores data.
- **Verifiers** — Replicators that check whether the Prover stores data.

The verification process ensures that Replicators in the system are actively performing and storing data properly.

There are two main scenarios which the verification process addresses:

#### Confirmed Storage State:

- Replicator is in the Confirmed Storage State if it has approved the last modification.
- Replicators not in the Confirmed Storage State for a long time are removed from the Drive.

## Storage Verifications

Executed in a "many-to-many" style, where each Replicator verifies all others in the same [Shard](replicator.md#storage-verification).

#### Approved Drive State:

- Replicator should store the approved Drive State.
- Regular Storage Verifications are introduced to check this.

#### Replicator roles:

- **Prover** proves that it stores data.
- **Verifier** checks if the Prover stores data.

#### Verification Frequency:

- Verifications start after approving a **"zero" modification**.
- Verifications are executed regularly but randomly to ensure fairness.
- Frequency is determined based on block generation time, expected intervals between verifications, and time needed to generate a block.

#### Pending Verification:

- Verification is considered pending if it is not canceled and has been initiated less than *N* minutes ago, where *N* is determined based on timestamps in the blockchain blocks.
- Only Replicators that are in the [Confirmed Storage State](#confirmed-storage-state) at the beginning of the verification participate in verification process.

#### Verification Process:

- Verifications are conducted via Verifier-Prover Protocol.
- Verifier expects Prover's response within a short time window after the verification process has started.
- If no correct response received in given time, Verifier votes that the Prover has failed the verification.
- Verifiers express their opinions about Provers in `EndDriveVerification` transaction.

#### Verification Result:

- Prover's status is defined as the median of Verifiers' opinions.
- If the status is *Failure*, `LeaveDriveEvent` is generated for the Prover.

#### Deposit Slashing:

- Storage Deposit slashing is performed for Provers that have failed the verification.
- Storage Deposit is transferred to the [Drive](drive.md) account and can be used to pay for other Replicator Upload.

#### Billing Period:

- If the verification is first in the new billing period, the unspent number of the verifications in the previous billing period are added to the current amount of prepaid verifications.

#### Verification Payment:

- Drive Owner pays for verifications through `VerificationPayment` transaction.
- Feedback fee is proportional to the number of prepaid verifications.
