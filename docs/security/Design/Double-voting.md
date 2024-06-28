---
title: Double Voting
tags:
- DesignIssue
---

## Double Voting

使用普通的 ERC20 代币或 NFT 作为权衡投票的票证是不安全的，因为攻击者可以使用一个地址投票，将代币转移到另一个地址，然后从该地址再次投票。

```solidity
// A malicious voter can simply transfer their tokens to
// another address and vote again.
contract UnsafeBallot {

    uint256 public proposal1VoteCount;
    uint256 public proposal2VoteCount;

    IERC20 immutable private governanceToken;

    constructor(IERC20 _governanceToken) {
        governanceToken = _governanceToken;
    }
	
    function voteFor1() external notAlreadyVoted {
        proposal1VoteCount += governanceToken.balanceOf(msg.sender);
    }

    function voteFor2() external notAlreadyVoted {
        proposal2VoteCount += governanceToken.balanceOf(msg.sender);
    }

    // prevent the same address from voting twice,
    // however the attacker can simply
    // transfer to a new address
    modifier notAlreadyVoted {
        require(!alreadyVoted[msg.sender], "already voted");
        _;
        alreadyVoted[msg.sender] = true;
    }
}
```

为了防止这种攻击，应该使用ERC20快照或ERC20投票。通过快照过去的某个时间点，当前的代币余额无法被操纵以获得非法投票权。