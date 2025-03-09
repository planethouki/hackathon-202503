// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

contract CopyArtifactsScript is Script {
    function setUp() public {}

    function run() public {
        string memory build = vm.readFile("./out/PollToken.sol/PollToken.json");
        vm.writeJson(build, "../functions/src/abi.json");
    }
}
