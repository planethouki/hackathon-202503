// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PunchlineToken is ERC721, Ownable {
    string private baseURI;

    constructor() ERC721("MediaGem", "MGT") Ownable(msg.sender) {}

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory newBaseURI) public onlyOwner {
        baseURI = newBaseURI;
    }

    function getBaseURI() public view returns (string memory) {
        return baseURI;
    }

    function mint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}
