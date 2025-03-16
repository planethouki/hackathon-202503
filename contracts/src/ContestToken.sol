// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ContestToken is ERC721, Ownable {
    string private baseURI_;

    constructor() ERC721("GloryToken", "GT") Ownable(msg.sender) {}

    function _baseURI() internal view override returns (string memory) {
        return baseURI_;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        baseURI_ = baseURI;
    }

    function mint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}