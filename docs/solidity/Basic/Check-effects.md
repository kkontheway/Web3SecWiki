---
title: CEI Pattern
---

# Check-Effect
## Summary

“Checks Effects Interactions”模式是一种编程模式，它被广泛应用于编写智能合约，尤其是在Solidity语言中。该模式的目的是减少智能合约中因为外部调用（external calls）造成的安全风险，例如重入攻击（reentrancy attack）。在Solidity智能合约里面，它的主要结构分为三个部分：

1. Checks（检查）: 在合约的函数中第一个阶段执行所有的条件检查，如参数校验和状态变量的前置条件判断。这是确保函数逻辑正确性的先决条件。
2. Effects（效果）: 在进行任何外部调用或者事件触发之前，先更新状态变量和进行所有的内部书keeping（记录保持）。这样可以在外部调用可能失败或受到干扰的情况下保护合约状态。
3. Interactions（交互）: 最后进行外部调用和事件的触发。这是因为外部调用可能引起状态变化或触发其他合约的调用（有潜在的重入风险），所以在外部交互之前应该已经完成了所有内部状态的更新。
4. 
应用此模式的一个例子是，在转账功能的智能合约函数中：

```solidity
contract ChecksEffectsInteractionsPattern {

    mapping(address => uint) public balances;

    // 转账函数
    function transfer(address to, uint amount) public {
        // Checks: 验证发送者账户余额是否足够
        require(balances[msg.sender] >= amount, "Not enough funds");
        
        // Effects: 更新发送者和接收者的余额
        balances[msg.sender] -= amount;
        balances[to] += amount;

        // Interactions: 安全地执行转账操作（举例，可能涉及调用外部合约等）
        // 这里仅做演示，实际转账会使用Solidity的transfer或者call函数
        // ...
    }
}
```
在上面的代码中，合约首先检查调用者是否有足够的余额进行转账，接着在状态变量中更改相应的余额，并最后执行外部调用来完成转账。按照这种顺序，即使在进行外部调用并导致控制流程返回到合约时发生了更多的函数调用（例如，通过重入攻击），合约状态已经更新，从而降低了安全风险。

# Refer
https://docs.soliditylang.org/en/latest/security-considerations.html#use-the-checks-effects-interactions-pattern