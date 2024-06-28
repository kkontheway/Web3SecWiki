---
title: SlippageAttacks
tags:
- Defi-Attack
- AMM
---
## 28.SlippageAttacks
滑点是指市场参与者提交一个swap请求的时候的价格，和实际执行的时候的价格差。这种价格通常可以忽略，但是在一些高波动性和流动性较低的代币中可能会和重要。滑点可能会导致用户收到的代币比他们在提交交易时候的更多或者更少。
[[滑点-Slippage]]



## 无滑点参数

> [!Defi必须允许用户指定滑点参数: 用户希望从Swap中交换到的最小Token数量，必须始终注意设置为0的滑点]

```solidity
IUniswapRouterV2(SUSHI_ROUTER).swapExactTokensForTokens(
    toSwap,
    0, // @audit min return 0 tokens; no slippage => user loss of funds
    path,
    address(this),
    now
);
```

这段代码告诉Swap，用户可以接受最小交换为0的代币，从而使用户面临MEV bot [[5. Sandwich Attack]]。

> [!如果用户未指定值，平台还应提供合理的默认值，但用户指定的滑点参数必须始终覆盖平台默认值。]


### Example-1

```solidity
function swapEntireBalance(
        uint256 buy_amt_min,
        address[] calldata route, // First address is what is being payed, Last address is what is being bought
        uint256 expectedMarketFeeBPS
    ) external returns (uint256) {
        //swaps msg.sender entire balance in the trade
        uint256 maxAmount = ERC20(route[0]).balanceOf(msg.sender);
        ERC20(route[0]).transferFrom(
            msg.sender,
            address(this),
            maxAmount // Account for expected fee
        );
        return
            _swap(
                maxAmount,
                maxAmount.sub(buy_amt_min.mul(expectedMarketFeeBPS).div(10000)), //account for fee
                route,
                expectedMarketFeeBPS,
                msg.sender
            );
    }
```

```
amount = 100
buy_amt_min = 99
expectedMarketFeeBPS = 500 // 5%
actual buy_amy_min = 100 - (99 * (500 / 10000)) = 95.05
```

## 无到期期限

自动做市商 （AMM） 等高级协议可以允许用户指定一个截止日期参数，以强制执行交易的时间限制。如果没有截止日期参数，交易可能会位于内存池中并在更晚的时间执行，这可能会导致用户的价格更差。

> [!协议不应该将截止日期设置为 block.timestamp因为验证者可以持有交易，并且它最终放入的区块将是 block.timestamp，因此这不提供任何保护。]

协议应该允许与AMM交互的用户设置到期期限，没有到期期限可能会对任何发起Swap的用户造成损失。

```solidity
// 2. Swap rewards tokens to debt token
uint256 rewards = _doCutRewardsFee(CRV);
_ensureApprove(CRV, address(swapRouter), rewards);
swapRouter.swapExactTokensForTokens(
    rewards,
    0, // @audit no slippage, can receive 0 output tokens
    swapPath,
    address(this),
    type(uint256).max // @audit no deadline, transaction can 
    // be executed later at more unfavorable time
);

```

## 滑点计算不准确

滑点参数一般是指想minTokensOut(用户接受的最小交换代币数量)，如果没有或者有修改，都是需要注意的信号。简单的例子
```solidity
function withdraw(address _recipient, address _asset, uint256 _amount
) external onlyVault nonReentrant {
    // ...

    // Calculate how much of the pool token we need to withdraw
    (uint256 contractPTokens, , uint256 totalPTokens) = _getTotalPTokens();

    uint256 poolCoinIndex = _getPoolCoinIndex(_asset);
    // Calculate the max amount of the asset we'd get if we withdrew all the
    // platform tokens
    ICurvePool curvePool = ICurvePool(platformAddress);
    uint256 maxAmount = curvePool.calc_withdraw_one_coin(
        totalPTokens,
        int128(poolCoinIndex)
    );

    // Calculate how many platform tokens we need to withdraw the asset amount
    uint256 withdrawPTokens = totalPTokens.mul(_amount).div(maxAmount);

    // Calculate a minimum withdrawal amount
    uint256 assetDecimals = Helpers.getDecimals(_asset);
    // 3crv is 1e18, subtract slippage percentage and scale to asset
    // decimals
    // @audit not using user-provided _amount, but calculating a non-sensical
    // value based on the LP tokens
    uint256 minWithdrawAmount = withdrawPTokens
        .mulTruncate(uint256(1e18).sub(maxSlippage))
        .scaleBy(int8(assetDecimals - 18));

    curvePool.remove_liquidity_one_coin(
        withdrawPTokens,
        int128(poolCoinIndex),
        minWithdrawAmount
    );

    // ...
}
```









## Mismatched Slippage Precision

一些平台允许用户兑换或者提取一组具有不同精度的输出代币。平台必须保证滑点参数的精度和所选输出Token的精度相匹配，否则滑点可能会无效，导致精度损失

```solidity
function _convertToToken(address token, address receiver) internal returns (uint256 amountOut) {
    // this value should be whatever glp is received by calling withdraw/redeem to junior vault
    uint256 outputGlp = fsGlp.balanceOf(address(this));

    // using min price of glp because giving in glp
    uint256 glpPrice = _getGlpPrice(false);

    // using max price of token because taking token out of gmx
    uint256 tokenPrice = gmxVault.getMaxPrice(token);

    // @audit always returns 6 decimals, won't work for many tokens
    // apply slippage threshold on top of estimated output amount
    uint256 minTokenOut = outputGlp.mulDiv(glpPrice * (MAX_BPS - slippageThreshold), tokenPrice * MAX_BPS);
    // @audit need to adjust slippage precision to match output
    // token decimals like so:
    // minTokenOut = minTokenOut * 10 ** (token.decimals() - 6);

    // will revert if atleast minTokenOut is not received
    amountOut = rewardRouter.unstakeAndRedeemGlp(address(token), outputGlp, minTokenOut, receiver);
}
```


## Miniting Exposes Users To Unlimited Slippage

## MinTokensOut For Intermediate, Not Final Amount

由于 DeFi 的可组合性，Swap期间可以执行多个操作，然后才能将最终数量的代币返回给用户。如果“minTokensOut”参数用于中间操作，但不用于检查最终金额，则可能导致用户的资金损失漏洞，因为他们收到的令牌可能比指定的要少。

## On-chain Slippage Calculation Can Be Manipulated

开发人员应确保审核员必须验证用户是否被允许指定自己的滑点参数，这些参数是在链下计算的



## Hard-coded Slippage May Freeze User Funds

硬编码的时候可能会导致用户的资金被永远的所在Protocol中

## Hard-coded Fee Tier in UniswapV3 Swap




## Zero Slippage Required

需要零滑点的功能可能会恢复，向用户呈现持续的拒绝服务。期望零滑点是不现实的，这就是为什么开发人员必须允许用户指定滑点参数的原因。