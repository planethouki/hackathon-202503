// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {PollToken} from "../src/PollToken.sol";

contract TZKTokenTest is Test {
    PollToken public erc20;

    function setUp() public {
        erc20 = new PollToken(100000 * 10 ** 18);
    }

    function test_totalSupply() public view {
        assertEq(erc20.totalSupply(), 100000 * 10 ** 18);
    }
}
