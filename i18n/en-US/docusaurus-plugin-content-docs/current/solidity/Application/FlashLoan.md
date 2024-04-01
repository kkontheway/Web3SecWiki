---
title: FlashLoan
---

# FlashLoan

## Prev

<aside>
💡 Flashloans are loans between Contracts! And must Repaid in the same transaction.

</aside>

## Example

![](https://raw.githubusercontent.com/kkontheway/IMG/main/1.png)

如果`Borrower`没有还款，那么整个交易将会被`revert` 。

## 特点

- 只有智能合约能够调用flashloan
- Flashloan不需要抵押品

## 用处

---

### 套利Arbitrage

### 再融资贷款Refinancing Loans

### 交换抵押品ExchangingClooateral

### 清算借款人Liquidating Borrowers

### 提高其他Defi应用的收益

### Hacking

## ERC-3156

---

ERC3156 旨在标准化获得闪电贷的接口。尽管工作流程很简单，但需要明确具体的实现细节，例如，我们应该将函数称为“getFlashLoan”、“onFlashLoan”还是其他名称？那么它应该接受哪些参数呢？

### Receiver

Borrower只需要实现一项功能：

```solidity
pragma solidity ^0.8.20;

/**
 * @dev Interface of the ERC-3156 FlashBorrower, as defined in
 * https://eips.ethereum.org/EIPS/eip-3156[ERC-3156].
 */
interface IERC3156FlashBorrower {
    /**
     * @dev Receive a flash loan.
     * @param initiator The initiator of the loan.
     * @param token The loan currency.
     * @param amount The amount of tokens lent.
     * @param fee The additional amount of tokens to repay.
     * @param data Arbitrary data structure, intended to contain user-defined parameters.
     * @return The keccak256 hash of "ERC3156FlashBorrower.onFlashLoan"
     */
    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external returns (bytes32);
}
```

- `initiator` 发起闪电贷的地址，通常这里需要一些验证，从而让不受信任的地址无法借闪电贷，通常是自己本身，但是不应该默认是自己。
- `onFlashLoan`函数应该有`Lender`提供，而不是由发起者调用。
- `token` 这是你借的`Token`的地址。提供`FlashLoan`通常持有多种`Token`，`ERC3156`不支持原生`ETH`，但是可以通过`WETH`来实现。
- `fee` 手续费，是一个确定的金额而不是百分比计算
- `data` 如果你的`receiver`没有硬编码在接受贷款时采用特定操作，可以使用`data`来确定其行为。
- `return value` 合约必须返回`keccak256("ERC3156FlashBorrower.onFlashLoan")`

### Lender

```solidity
// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v5.0.0) (interfaces/IERC3156FlashLender.sol)

pragma solidity ^0.8.20;

import {IERC3156FlashBorrower} from "./IERC3156FlashBorrower.sol";

/**
 * @dev Interface of the ERC-3156 FlashLender, as defined in
 * https://eips.ethereum.org/EIPS/eip-3156[ERC-3156].
 */
interface IERC3156FlashLender {
    /**
     * @dev The amount of currency available to be lended.
     * @param token The loan currency.
     * @return The amount of `token` that can be borrowed.
     */
    function maxFlashLoan(address token) external view returns (uint256);

    /**
     * @dev The fee to be charged for a given loan.
     * @param token The loan currency.
     * @param amount The amount of tokens lent.
     * @return The amount of `token` to be charged for the loan, on top of the returned principal.
     */
    function flashFee(address token, uint256 amount) external view returns (uint256);

    /**
     * @dev Initiate a flash loan.
     * @param receiver The receiver of the tokens in the loan, and the receiver of the callback.
     * @param token The loan currency.
     * @param amount The amount of tokens lent.
     * @param data Arbitrary data structure, intended to contain user-defined parameters.
     */
    function flashLoan(
        IERC3156FlashBorrower receiver,
        address token,
        uint256 amount,
        bytes calldata data
    ) external returns (bool);
}
```

FlashLoan函数应该检查的几个关键：

- 有人可能会使用闪电贷不支持的代币来调用flashloan
- 有人会调用flashloan但是使用大于maxFlashLoan的金额
- data只是转发给调用者

<aside>
💡 最重要的是，flashLoan必须将Token转回给Receiver，它不应该依赖借款人将代币转回以进行还款

</aside>

![](https://raw.githubusercontent.com/kkontheway/IMG/main/f2.png)

## 预防

- 借款人的访问控制和输入验证
- 防重入锁很重要
- 对于borrower，确保只有lender可以调用onflashLoan(
- 不用token.balancOf(address(this))
- 当一个合约请求一个闪电贷时，它需要在借贷完成后调用一个特定的函数 `onFlashLoan()` 来处理借来的资金并返回借贷加上费用。这是一个典型的闪电贷流程，但是如果这个流程不是严格要求合约实现特定的回调接口的话，就可能引发安全问题。
- 为了防止潜在的安全问题，ERC3156标准要求闪电贷接收者（即借款方合约）在完成闪电贷操作后必须返回一个特定的哈希值 `keccak256("ERC3156FlashBorrower.onFlashLoan")`。这个哈希值被用来验证调用的 `onFlashLoan()` 函数确实存在而且被正确执行。

## CTF