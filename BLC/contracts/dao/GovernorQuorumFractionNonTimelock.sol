// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";

contract SciGovernor is Governor, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction {
    uint256 private proposalThresholdNumber;
    uint256 private votingDelayNumber;
    uint256 private votingPeriodNumber;
    uint256 private tokenDecimals;

    constructor(
        IVotes _token, 
        string memory _name, 
        uint256 _votingDelay,
        uint256 _votingPeriod,
        uint256 _proposalThreshold,
        uint256 _quorum,
        uint256 _tokenDecimals
    )
        Governor(_name)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(_quorum)
    {
        proposalThresholdNumber = _proposalThreshold;
        votingDelayNumber = _votingDelay;
        votingPeriodNumber = _votingPeriod;
        tokenDecimals = _tokenDecimals;
    }

    function votingDelay() public view override returns (uint256) {
        return votingDelayNumber;
    }

    function votingPeriod() public view override returns (uint256) {
        return votingPeriodNumber;
    }

    function proposalThreshold() public view override returns (uint256) {
        return proposalThresholdNumber*(10**tokenDecimals);
    }

    // The following functions are overrides required by Solidity.

    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }
}