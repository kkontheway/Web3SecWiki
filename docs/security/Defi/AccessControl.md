---
title: Access Control
---
# Access Control Vulnerability
Access Control 意味着-谁被允许执行特定的指责，访问控制用于概述智能合约中用户角色和权限的控制。

# Why we need Access Control
- It helps protect critical functions from unauthorized access.
- It helps in creating different levels of authorization.
- It helps in Whitelisting and blacklisting users.
- Granting and Revoking Roles

# Simple Example
> Example from Wtf
```solidity
// 错误的mint函数，没有限制权限
function badMint(address to, uint amount) public {
    _mint(to, amount);
}
```
```solidity
// 错误的burn函数，没有限制权限
function badBurn(address account, uint amount) public {
    _burn(account, amount);
}
```

# Best Practice

## openzeppelin
Openzeppelin中的Access control Libraries非常的好用


# Refer
https://quillaudits.medium.com/access-control-vulnerability-in-defi-quillaudits-909e7ed4582c