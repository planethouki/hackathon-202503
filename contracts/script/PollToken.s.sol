// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {PollToken} from "../src/PollToken.sol";

contract PollTokenScript is Script {
    PollToken public erc20;

    function setUp() public {}

    function run() public {
        uint256 chainId = block.chainid;
        uint256 deployerPrivateKey;

        if (chainId == 31337) {
            deployerPrivateKey = vm.envUint("PRIVATE_KEY_ANVIL");
        } else if (chainId == 1946) {
            deployerPrivateKey = vm.envUint("PRIVATE_KEY_SONEIUM");
        } else {
            revert("Unsupported chainId");
        }

        vm.startBroadcast(deployerPrivateKey);

        erc20 = new PollToken(1000000 * 10 ** 18);

        vm.stopBroadcast();
    }
}
