// contracts/src/PollToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract PollToken is ERC20Permit {
    constructor(uint256 initialSupply) ERC20("Poll", "POLL") ERC20Permit("Poll") {
        _mint(msg.sender, initialSupply);
    }
}
