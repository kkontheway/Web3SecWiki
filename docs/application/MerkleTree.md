---
title: 2.MerkleTree
---
![](https://raw.githubusercontent.com/kkontheway/IMG/main/202405281401178.png)

## 什么是Merkle Tree
---
Merkle Tree也被称为Hash Tree，是一个存储hash值的树。Merkle Tree的叶子是数据块（比如地址，文件）的hash值。非叶节点是对应子节点串联字符串的hash。

Merkle Tree 提供了一种在Solidity中验证数据的有效方法，这样的话就大部分降低了验证大型数据集时，链上存储的Gas成本, 因为只将RootHash存储在了链上。

## Features
---
- MT是一种树，大多时候是二叉树
- 叶子节点的值是数据hash值
- 非叶节点的值是根据他下面左右的叶子节点的值，然后hash算出来的

## 如何工作
---
Merkle Tree的基本思想是将大量数据划分为更小的数据块，然后递归的对这些块进行Hash，然后直到变成一个根Hash(root Hash)，根Hash可以被看作是一种Summary。

![](https://jamesbachini.com/wp-content/uploads/2023/03/merkleTree2.png)

因为他是一层一层的，递归的，所以数据中一旦有任何的更改，都会导致不同的Hash，所以如果我们添加了数据，那我们就需要执行一笔操作来更新Root Hash。

当我们想要验证某个数据是否完整并且正确的时候，我们只需要提供该数据的Hash和从该数据到root的hash路径，这样我们就能验证数据，但是不是访问整个Tree.

在OpenZeppelin标准库中，对于相邻节点的计算是有相邻两个节点的大小决定的:
```solidity
function _hashPair(bytes32 a, bytes32 b) private pure returns (bytes32) {  
	return a < b ? _efficientHash(a, b) : _efficientHash(b, a);  
}
```
通常较小的值会放在前面，用来计算哈希的顺序。

## 最小示例
---

```node
const {MerkleTree} = require("merkletreejs"); 
const keccak256 = require("keccak256"); 

const whitelist = [
	'0x6090A6e47849629b7245Dfa1Ca21D94cd15878Ef',
	'0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8'
	]; 

const leaves = whitelist.map(addr => keccak256(addr)); 
const merkleTree = new MerkleTree(leaves, keccak256, {sortPairs: true}); 
const rootHash = merkleTree.getRoot().toString('hex'); 

console.log(`Whitelist Merkle Root: 0x${rootHash}`); whitelist.forEach((address) => { 
	const proof = merkleTree.getHexProof(keccak256(address)); 
	console.log(`Adddress: ${address} Proof: ${proof}`); 
});
```

当我们运行这个nodejs代码的时候，他将会输出merkle的root。

```
-> % node GenerateHash.js         
Whitelist Merkle Root: 0x2700f724369840d2ffd1c91dc0e05a969408a480d5d7e2ad18b382365ffb203c
Adddress: 0x6090A6e47849629b7245Dfa1Ca21D94cd15878Ef Proof: 0x3b64273cc6c23d6d1cd9eaf41ac678eaecca86ab0b79a3797d1b301cba2c19dd,0x4726e4102af77216b09ccd94f40daa10531c87c4d60bba7f3b3faf5ff9f19b3c,0xf6d82c545c22b72034803633d3dda2b28e89fb704f3c111355ac43e10612aedc
Adddress: 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 Proof: 0x71fe2579f4a5be157546549260f5539cc9445fa20674a8bb637049f43fc1eac2,0x4726e4102af77216b09ccd94f40daa10531c87c4d60bba7f3b3faf5ff9f19b3c,0xf6d82c545c22b72034803633d3dda2b28e89fb704f3c111355ac43e10612aedc
Adddress: 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db Proof: 0xdfbe3e504ac4e35541bebad4d0e7574668e16fefa26cd4172f93e18b59ce9486,0xea93c74c63808af9d3919c676a03392e13eb1232d0d40251202c56cff4842d33,0xf6d82c545c22b72034803633d3dda2b28e89fb704f3c111355ac43e10612aedc
Adddress: 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB Proof: 0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54,0xea93c74c63808af9d3919c676a03392e13eb1232d0d40251202c56cff4842d33,0xf6d82c545c22b72034803633d3dda2b28e89fb704f3c111355ac43e10612aedc
Adddress: 0x617F2E2fD72FD9D5503197092aC168c91465E7f2 Proof: 0x47d0f2fd8ba6b95b7362e21c175a38eb6db2746ebff11789d0eaad57ea451d2e
```

这个时候我们可以用来自OZ的MerkleProof.sol来验证地址。

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/cryptography/MerkleProof.sol";

contract NFTMint {
  bytes32 public merkleRoot;

  constructor(bytes32 _merkleRoot) {
    merkleRoot = _merkleRoot;
  }

  function claim(bytes32[] memory proof, address account) public {
    bytes32 leaf = keccak256(abi.encodePacked(account));
    require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid proof");
    
    // User is in the whitelist, allow them to claim the NFT

  }
}
```


简单写一个测试:
```solidity
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../../src/MerkleTree/MerkleTree.sol";

contract MerkleTreeTest is Test {
    MerkleTree merkleTree;

    function setUp() public {
        merkleTree = new MerkleTree(0x2700f724369840d2ffd1c91dc0e05a969408a480d5d7e2ad18b382365ffb203c);
    }

    function testClaim() public view {
        bytes32[] memory proof = new bytes32[](3);
        proof[0] = 0x3b64273cc6c23d6d1cd9eaf41ac678eaecca86ab0b79a3797d1b301cba2c19dd;
        proof[1] = 0x4726e4102af77216b09ccd94f40daa10531c87c4d60bba7f3b3faf5ff9f19b3c;
        proof[2] = 0xf6d82c545c22b72034803633d3dda2b28e89fb704f3c111355ac43e10612aedc;
        bool success = merkleTree.claim(proof, address(0x6090A6e47849629b7245Dfa1Ca21D94cd15878Ef));
        assertTrue(success);
    }
}
```
## 应用
---



## 优点
---
1. 大型数据集的高效验证对于数据通常太大而无法存储在链上的区块链应用程序特别有用
2. 由于链上存储的数据更少，因此降低了 gas 成本
3. 提高安全性 Merkle 树提供了一种验证数据完整性的可靠方法
## Refer
---
https://www.cnblogs.com/fengzhiwu/p/5524324.html
https://x.com/RightNowIn/status/1733136452429517023
