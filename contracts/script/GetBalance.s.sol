// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

contract GetBalanceScript is Script {
    function run() public view {
        uint256 chainId = block.chainid;
        console.log("Current chain ID:", chainId);

        address[3] memory addresses;
        addresses[0] = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
        addresses[1] = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        addresses[2] = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;

        for (uint256 i = 0; i < addresses.length; i++) {
            address targetAddress = addresses[i];
            uint256 balance = targetAddress.balance;

            console.log("Account Address:", targetAddress);
            console.log("Account Balance (Wei):", balance);
            console.log("Account Balance (ETH):", balance / 1e18);
        }
    }
}
