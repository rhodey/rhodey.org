!!!
state-of-the-art
November 15, 2026
State of the Art
We have maybe 2 maybe 3 months left before commercially available coding agents will outperform everyone on everything. I’ve been programming for 20 years and I don’t want to miss a moment of what we have left. Herein lies a summary of what I've chosen to work on in these final days. It's been an honor thinking with you all.
<!--no banner-->
!!!


We have maybe 2 maybe 3 months left before commercially available coding agents will outperform everyone on everything. I’ve been programming for 20 years and I don’t want to miss a moment of what we have left. Herein lies a summary of what I've chosen to work on in these final days. It's been an honor thinking with you all.

## MonsterFt

[MonsterFt](https://github.com/rhodey/monsterft) is a fixed-membership replicated SQLite state machine. For each command (request), every available node executes the application and captures its database change as an [SQLite Session Extension](https://sqlite.org/sessionintro.html) patchset. The command succeeds when a configured quorum agrees on the database
change and the return value. Tagline: **Write apps that survive cosmic radiation.**

MonsterFt rust achieves **1.6ms** commit time on a Same-AZ 3-node cluster and **2.5ms** commit time on a 3-node Multi-AZ cluster and **108k** and **97k commits/s** respectively. The codebase grew out of [TinyRaftPlus](https://github.com/rhodey/tinyraftplus) with first commit in 2025 and [AttestLink](https://github.com/rhodey/AttestLink) with first commit 2024. Summary: I wanted to build a Smart Contracts platform on AWS Nitro and ended up learning I needed faultless execution first. ECC RAM is 1 error per 100 server-years => 1 error per 1 year (for 100 server-fleet) => not OK.

## AttestLink

[AttestLink](https://github.com/rhodey/AttestLink) is a CLI tool and [AWS Nitro Sandbox](https://aws.amazon.com/blogs/compute/nitro-sandboxes-hardware-isolation-for-every-eks-pod-ecs-task-and-ec2-workload/) demo that allows tunneling any TCP/HTTP protocol into and out of AWS Nitro Sandboxes. Clients handshake with servers over HTTP/2 and exchange [libsodium](https://www.npmjs.com/package/libsodium) keys that are bound to the Nitro attestation doc. I had an early version of this system online in 2024 sending net over a `vsock` tunnel back when Nitro Enclaves had no networking. Tagline: **Your code/VM has a cryptographic identity. Code as contract, etc.**

I dream of building a Smart Contracts platform on MonsterFt plus AWS Nitro Enclaves/Sandboxes but [this Github issue](https://github.com/rhodey/AttestLink/issues/2) documents why it wont be happening immediately. TBH I'm on the lookout for competing offerings from Azure and GCP.

## IPFS-boot

[IPFS-boot](https://github.com/rhodey/IPFS-boot) first commit 2025 and the origin story is very much related. With AWS Nitro I pretty much figured out how to deploy secure servers but what to do about the frontends? IPFS-boot puts forth the idea that you deploy first a web bootloader that basically does **React hot-code-reloading (but only when the user says so)** and this bootloader is **immutable**. But the bootloader also polls a HTTPS json url which returns a mutable array of webapp versions for the user to choose from.

I don't want to be rude but IPFS is in trouble maintenance-wise but nonetheless I resolved to spend 10 hours renewing IPFS-boot just **today** because it's a proven concept that can translate to any content-addressable technology. TBH: assuming users are willing to install, Tailscale may be the next gateway to secure front-end apps (mobile, too).

## Next/Work

I've got [Lock.host](https://lock.host/) ready to push state-of-the-art on these multiple fronts for the right investors. 2 of 3 are `MIT` but MonsterFt is `AGPL-3.0-only` to commercialize licensing. If you've got a strong/cool team already and want me to join-up HMU also!

**Aim for the stars,**

**mike@rhodey.org**