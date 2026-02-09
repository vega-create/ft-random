---
title: "How Random Number Generators Work"
description: "Understanding the science behind random number generation."
publishDate: "2026-02-01"
category: "Technical"
tags: ["rng", "algorithms", "cryptography"]
---

Random number generation is fundamental to computing, security, and simulations. But computers are deterministic machines, so how do they produce randomness?

## Pseudo-Random vs True Random

Pseudo-random number generators (PRNGs) use mathematical algorithms to produce sequences that appear random. They start with a seed value and apply transformations to generate subsequent numbers. True random number generators (TRNGs) use physical phenomena like atmospheric noise or radioactive decay.

## Common Algorithms

The Mersenne Twister is one of the most widely used PRNGs, producing high-quality random numbers with a period of 2^19937-1. Linear Congruential Generators are simpler and faster but have shorter periods. Xorshift algorithms offer a good balance of speed and quality.

## Cryptographic Randomness

For security applications, cryptographically secure PRNGs (CSPRNGs) are required. JavaScript provides crypto.getRandomValues() for this purpose. These generators are slower but produce output that is computationally indistinguishable from true randomness.

## Practical Applications

Random numbers are used in simulations and Monte Carlo methods, cryptographic key generation, game mechanics and procedural generation, statistical sampling and testing, and load balancing in distributed systems.

## Common Pitfalls

Using Math.random() for security-sensitive operations is a common mistake. Seeding PRNGs with predictable values like the current time reduces randomness. Not understanding the distribution of your generator can lead to biased results.