// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {PollToken} from "../src/PollToken.sol";

contract PollTokenTest is Test {
    PollToken public erc20;
    address private owner = address(0x123);
    address private user = address(0x456);

    function setUp() public {
        vm.prank(owner);
        erc20 = new PollToken();
    }

    function test_totalSupply() public view {
        assertEq(erc20.totalSupply(), 0);
    }

    function testMinting() public {
        vm.startPrank(owner);
        erc20.poll(user);
        assertEq(erc20.balanceOf(user), 10**18);
        vm.stopPrank();
    }

    function testOnlyOwnerCanMint() public {
        vm.prank(user);
        vm.expectRevert();
        erc20.poll(user);
    }
}
