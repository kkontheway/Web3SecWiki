---
title: SendingEther
---

# 简述

Solidity有三种方法向其他合约发送ETH：
1. transfer()
2. send()
3. call()-被鼓励的用法。

## transfer
用法是接收方地址.transfer(发送ETH数额)。
transfer()的gas限制是2300，足够用于转账，但对方合约的fallback()或receive()函数不能实现太复杂的逻辑。
transfer()如果转账失败，会自动revert（回滚交易）。

```solidity
// 用transfer()发送ETH
function transferETH(address payable _to, uint256 amount) external payable{
    _to.transfer(amount);
}
```

## send
接收方地址.send(发送ETH数额)
- send()的gas限制是2300，足够用于转账，但对方合约的fallback()或receive()函数不能实现太复杂的逻辑。
- send()如果转账失败，不会revert。
- send()的返回值是bool，代表着转账成功或失败，需要额外代码处理一下。

```solidity
// send()发送ETH
function sendETH(address payable _to, uint256 amount) external payable{
    // 处理下send的返回值，如果失败，revert交易并发送error
    bool success = _to.send(amount);
    if(!success){
        revert SendFailed();
    }
}
```
## Call
- 用法是接收方地址.call{value: 发送ETH数额}("")。
- call()没有gas限制，可以支持对方合约fallback()或receive()函数实现复杂逻辑。
- call()如果转账失败，不会revert。
- call()的返回值是(bool, data)，其中bool代表着转账成功或失败，需要额外代码处理一下。

```solidity
// call()发送ETH
function callETH(address payable _to, uint256 amount) external payable{
    // 处理下call的返回值，如果失败，revert交易并发送error
    (bool success,) = _to.call{value: amount}("");
    if(!success){
        revert CallFailed();
    }
}
```