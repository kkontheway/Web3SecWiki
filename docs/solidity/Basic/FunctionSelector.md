---
title: Function Selector
---

# Summary
在EVM中，函数选择器是用来告诉EVM你要调用哪一个函数的。

函数选择器是一个 4byte的hash值，Solidity使用它来识别函数。

可以使用.selector来查看:
```solidity
pragma solidity 0.8.25;

contract SelectorTest{

	function foo() public {}

	function getSelectorOfFoo() external pure returns (bytes4) {
		return this.foo.selector; // 0xc2985578
	}
}
```
如果函数没有 arguments，可以使用call来作为data发送给合约来调用函数:
```solidity
pragma solidity 0.8.25;

contract CallFoo {

	function callFooLowLevel(address _contract) external {
		bytes4 fooSelector = 0xc2985578;

		(bool ok, ) = _contract.call(abi.encodePacked(fooSelector)); 
		require(ok, "call failed");
	}

}

contract FooContract {

	uint256 public x;

	function foo() public {
		x = 1;
	}
}
```

# Solidity function signature
Solidity 中的函数签名是一个字符串，其中包含合约名称，后跟它接受的参数类型。变量名称已从参数中删除。比如：
```solidity
function setPoint(uint256 x, uint256 y) --> "setPoint(uint256,uint256)"
function setName(string memory name) --> "setName(string)"
function addValue(uint v) --> "addValue(uint256)"
```
函数选择器中没有空格。所有 uint 类型必须显式包含其大小（uint256、uint40、uint8 等）。不包括 calldata 和内存类型。例如，getBalanceById(uint) 是无效签名。

# 如何根据signature来计算selector
函数选择器是函数签名的 keccak256 哈希值的前四个字节。
```solidity

//SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

contract FunctionSignatureTest {

	function foo() external {}
	
	function point(uint256 x, uint256 y) external {}
	
	function setName(string memory name) external {}
	
	function testSignatures() external pure returns (bool) {
	
	// NOTE: Casting to bytes4 takes the first 4 bytes
	// and removes the rest

	assert(bytes4(keccak256("foo()")) == this.foo.selector);
	assert(bytes4(keccak256("point(uint256,uint256)")) == this.point.selector);
	assert(bytes4(keccak256("setName(string)")) == this.setName.selector);
	
	return true;

	}
}
```
# Tips
- internal function 没有函数选择器
- 使用selector的原因是，Solidity 函数名称可以任意长，如果函数名称很长，则会增加交易的大小和成本。如果提供函数选择器而不是名称，则tx的大小通常会更小。
- fallback函数也没有selector

# Tools
可以使用这两个网站来进行计算和搜索:
- https://openchain.xyz/signatures
- https://www.4byte.directory/