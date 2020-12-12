// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "./erc721.sol";
import "./Safemath.sol";

contract RealEstateOwnership is Marketplace, ERC721 {

  using SafeMath for uint256;

  mapping (uint => address) realEstateApprovals;

  function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerRealEstateCount[_owner];
  }

  function ownerOf(uint256 _tokenId) public view returns (address _owner) {
    return realEstateToOwner[_tokenId];
  }

  function _transfer(address _from, address _to, uint256 _tokenId) private {
    ownerRealEstateCount[_to] = ownerRealEstateCount[_to].add(1);
    ownerRealEstateCount[msg.sender] = ownerRealEstateCount[msg.sender].sub(1);
    realEstateToOwner[_tokenId] = _to;
    Transfer(_from, _to, _tokenId);
  }

  function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    _transfer(msg.sender, _to, _tokenId);
  }

  function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    realEstateApprovals[_tokenId] = _to;
    Approval(msg.sender, _to, _tokenId);
  }

  function takeOwnership(uint256 _tokenId) public {
    require(realEstateApprovals[_tokenId] == msg.sender);
    address owner = ownerOf(_tokenId);
    _transfer(owner, msg.sender, _tokenId);
  }
}
