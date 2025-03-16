// contracts/src/PollToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PollToken is ERC20Permit, Ownable {
    constructor() ERC20("Poll", "POLL") ERC20Permit("Poll") Ownable(msg.sender) {
    }

    function poll(address to) public onlyOwner {
        _mint(to, 10 ** 18);
    }
}
