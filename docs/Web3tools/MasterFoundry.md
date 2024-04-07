---
title: MasterFoundry
---
# 使用占位符号展示Token
```solidity
function testDisplay() public {
        uint256 balances = 566645678676;
        console.log("My Balance is :", balances);
        console.log("My Balance is %e", balances);
    }
```
Output:
```solidity
[PASS] testDisplay() (gas: 4103)
Logs:
  My Balance is : 566645678676
  My Balance is 5.66645678676e11
```

# Colorful Logging

```solidity
function testColor() public {
        console.log("Color:", StdStyle.yellow("Hello world"));
        console.log("Color:", StdStyle.blue("Hello world"));
        console.log("Color:", StdStyle.green("Hello world"));
        console.log("Color:", StdStyle.red("Hello world"));
}
```
![](https://raw.githubusercontent.com/kkontheway/IMG/main/20240407095148.png)

# 查看函数选择器

```bash
cast sig Function_Name(uint256)
```
# Refer
