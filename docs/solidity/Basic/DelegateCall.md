---
title: DelegateCall
---
# 简述
delegatecall与call类似，是solidity中地址类型的低级成员函数。

当用户A通过合约B来call合约C的时候，执行的是合约C的函数，语境(Context，可以理解为包含变量和状态的环境)也是合约C的：msg.sender是B的地址，并且如果函数改变一些状态变量，产生的效果会作用于合约C的变量上。

而当用户A通过合约B来delegatecall合约C的时候，执行的是合约C的函数，但是语境仍是合约B的：msg.sender是A的地址，并且如果函数改变一些状态变量，产生的效果会作用于合约B的变量上。


![alt text](image-1.png)

# Some Q&A
1. 如果向一个会回滚的函数进行 delegatecall，delegatecall 会怎么做？