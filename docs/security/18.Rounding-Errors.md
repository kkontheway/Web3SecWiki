---
title: 18.Rounding-Errors
---
# 18.Rounding-Errors

Solidity中使用的是定点算数，所以也就是说他不支持十进制，所以任何的非整数值都会向下截断，所以这一特性会导致有精度损失。
比如:
```
3 / 2 = 1;

1 / 2 = 0;
```

# Example-1
其中我们对提前提款收取费用，以提前提款的天数计价：

```solidity
uint256 daysEarly = withdrawalsOpenTimestamp - block.timestamp / 1 days
uint256 fee = amount / daysEarly * dailyFee
```
这样做的问题是，如果用户提前 1.99 天提现，由于 1.99 会向下舍入为 1，因此用户只需支付大约一半的预期费用。

一般来说，我们应该确保分子足够大于分母，以避免精度误差。该问题的常见解决方案是使用定点逻辑，即将整数提高到足够数量的小数，以便精度的缺乏对合约逻辑的影响最小。一个好的经验法则是将数字提高到 1e18（通常称为 WAD）。


## Different Type

### 先除后乘

正如上面所说，Solidity会向下截断，所以如果我们先除后乘的话，会导致精度的损失，e.g:
```
uint a = 11;
uint b = 2;
uint c = 10;

a / b * c = 50 instead of 55
```

因为`a / b = 11 / 2 = 5.5 = 5`

> [!先乘后除!]

#### Example From USSD

```solidity

function rebalance() override public {
      uint256 ownval = getOwnValuation();
      (uint256 USSDamount, uint256 DAIamount) = getSupplyProportion();
      if (ownval < 1e6 - threshold) {
        // @audit amountToBuy is the parameter of this call
        BuyUSSDSellCollateral((USSDamount - DAIamount / 1e12)/2);
      }
}

```

```solidity

function BuyUSSDSellCollateral(uint256 amountToBuy) internal {
  CollateralInfo[] memory collateral = IUSSD(USSD).collateralList();
  uint amountToBuyLeftUSD = amountToBuy * 1e12;
  ...
  ...

```

所以`amountToBuyLeftUSD = (USSDamount - DAIamount / 1e12)/2 * 1e12`

这样会导致精度损失

我们假设:
```solidity
USSDamount = 11e12
DAIamount = 2e12
```
最终结果就是:
```solidity
amountToBuyLeftUSD = (USSDamount - DAIamount / 1e12)/2 * 1e12 = 4e12
```


### 向下舍入至0
在Solidity中,如果分子小于分母的话，结果将会是0

所以我们要保证:

> [!始终确保分子大于分母]

### Example

```solidity

function errorRepay(uint repaid) external {
    console.log("PrecisionLoss.errorRepay()");
    // If repaid small enough, decollateralized will round down to 0,
    // allowing loan to be repaid without changing collateral
    uint decollateralized = loanCollateral * repaid / loanAmount;

    loanAmount     -= repaid;
    loanCollateral -= decollateralized;
}

```

如果 `loanCollaterral * repaid` < `loanAmount` -> `decollateralized == 0` 那就完蛋了，我们不希望这种情况发生。

所以我们需要添加一个健康性检查才行:
```solidity
+  require(decollateralized != 0, "Round down to zero");
```