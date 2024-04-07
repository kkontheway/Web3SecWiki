---
title: Wallet
---
# Summary
一个最基本的钱包，其实只需要两个功能

- Anyone can send ETH.
- Only the owner can withdraw.

最小实现:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EtherWallet {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    function withdraw(uint256 _amount) external {
        require(msg.sender == owner, "caller is not owner");
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
```