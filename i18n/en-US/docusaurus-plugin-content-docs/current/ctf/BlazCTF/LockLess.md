---
title: Lockless-swap
---

# Challenge-Lockless-swap

## Contract
`PancakePair`: Pair对，传入Token0，和 Token1
- `Swap()`:
  - 用户进行代币交换的函数。    
- `mint()`:
  - 提供流动性的时候铸造代币,只能通过合约进行调用，不能直接通过外部调用。
- `burn()`:
  - 从流动性提供者移除流动性时销毁代币，返回各自代币数量。
- `skim()`:
  - 用于强制让余额与储备相匹配。
- `sync()`:
  - 用于强制让储备与余额相匹配。
