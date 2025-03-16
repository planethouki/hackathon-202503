// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import "../src/PunchlineToken.sol";

contract PunchlineTokenTest is Test {
    PunchlineToken private token;
    address private owner = address(0x123);
    address private user = address(0x456);

    function setUp() public {
        // Deploy the contract and set owner
        vm.prank(owner);
        token = new PunchlineToken();
    }

    function testInitialSetup() public view {
        // Check token name and symbol
        assertEq(token.name(), "MediaGem");
        assertEq(token.symbol(), "MGT");

        // Check owner is set correctly
        assertEq(token.owner(), owner);
    }

    function testMinting() public {
        vm.startPrank(owner); // Simulate contract owner
        uint256 tokenId = 1;

        // Mint a token to the 'user' address
        token.mint(user, tokenId);
        assertEq(token.ownerOf(tokenId), user); // Verify token ownership

        vm.stopPrank();
    }

    function testOnlyOwnerCanMint() public {
        vm.prank(user); // Simulate non-owner trying to mint
        vm.expectRevert();
        token.mint(user, 1);
    }

    function testBaseURI() public {
        vm.startPrank(owner); // Simulate contract owner

        // Update and check the base URI
        string memory newURI = "https://example.com/metadata/";
        token.setBaseURI(newURI);
        assertEq(token.getBaseURI(), newURI);

        vm.stopPrank();
    }

    function testOnlyOwnerCanSetBaseURI() public {
        vm.prank(user); // Simulate non-owner trying to set base URI
        vm.expectRevert();
        token.setBaseURI("https://example.com/metadata/");
    }
}
