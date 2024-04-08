---
title: How to Test in Foundry
---



# Tricks

## Manage User

1. At first we create a Struct "Users" and the same name variable to store the data
```solidity
struct Users {

    address payable admin;

    address payable alice;

    address payable broker;

    //...
}

Users internal users;

```

2. In the setUp() function we initialize the necessary roles

```solidity
function setUp() public {
    users = Users({
        admin:createUser("admin");
        alice:CreateUser("alice");
        ...
    })
}

 /// @dev Generates a user, labels its address, and funds it with test assets.
    function createUser(string memory name) internal returns (address payable) {
        address payable user = payable(makeAddr(name));
        vm.deal({ account: user, newBalance: 100 ether });
        deal({ token: address(dai), to: user, give: 1_000_000e18 });
        deal({ token: address(usdt), to: user, give: 1_000_000e18 });
        return user;
    }
```
Refer:https://twitter.com/RightNowIn/status/1761094201071002000

https://rareskills.io/post/invariant-testing-solidity
https://twitter.com/DevDacian/status/1732269870014992761
https://twitter.com/DevDacian/status/1758068540756881845
https://twitter.com/DevDacian/status/1732645103867773236
https://twitter.com/DevDacian/status/1747565664506909178
https://twitter.com/DevDacian/status/1733009929508917499
https://paco0x.org/foundry-invariant-test/