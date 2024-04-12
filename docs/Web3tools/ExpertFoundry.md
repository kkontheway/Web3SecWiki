---
title: ExpertFoundry
tags:
- Foundry
---

# ExpertFoundry


## Test

### 1.Manager User

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

### 2.Tests Proxy Contracts
https://twitter.com/RightNowIn/status/1748048778467140053
## Fork

### How to fork
First Go to Alchemy or QucikNode or whaterver you like, get your api
![](https://raw.githubusercontent.com/kkontheway/IMG/main/iShot_2024-04-10_15.37.07.png)

Open the terminal:
```
anvil --fork-url YOUR_ENDPOINT_URL --fork-block-number 19000000
```
then you got everything you need
![](https://raw.githubusercontent.com/kkontheway/IMG/main/iShot_2024-04-10_15.40.13.png)

## CheatTips

### 1.Display amounts in exponential form.
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
### 2.Colorful Logging

```solidity
function testColor() public {
        console.log("Color:", StdStyle.yellow("Hello world"));
        console.log("Color:", StdStyle.blue("Hello world"));
        console.log("Color:", StdStyle.green("Hello world"));
        console.log("Color:", StdStyle.red("Hello world"));
}
```
![](https://raw.githubusercontent.com/kkontheway/IMG/main/20240407095148.png)

### 3.Keep PK Safe

1. `cast wallet import defautKey --interactive` Private keys will be stored in a special encrypted file under a password on your computer. 
2. And then enter the PK
3. Then Create a password for it
4. Cast will return a addrees(remember it)
5. You can use `cast wallet list` to Check if it has been created
6. Now if want to deploy your contract you can run the next command. `AddressKey` is an address you received after creating a wallet. `forge script Path --rpc-url $RPC_URL --account defaultkey --sender addresskey --broadcast`
7. Enter the password you set
8. Finished

## Refer
https://twitter.com/TheBlockChainer/status/1727309850810392771