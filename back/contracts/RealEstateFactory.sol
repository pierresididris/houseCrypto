// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;

import "./Ownable.sol";
import "./Safemath.sol";

contract RealEstateFactory is Ownable {

  using SafeMath for uint256;

  modifier onlyOwnerOf(uint _realEstateId) {
        require(msg.sender == realEstateToOwner[_realEstateId]);
        _;
    }

  event NewRealEstate(uint realEstateId, string productName, uint price);

  struct RealEstate {
    string productName;
    string productAddress;
    string sellingDate;
    uint price;
    bool onsale;
  }

  RealEstate[] public realEstates;

  mapping (uint => address) public realEstateToOwner;
  mapping (address => uint) ownerRealEstateCount;


  function createRealEstate(string memory productName, string memory productAddress, string memory sellingDate, uint price, bool onsale) public {
    realEstates.push(RealEstate(productName, productAddress, sellingDate, price, onsale));
    uint id = realEstates.length + 1;
    realEstateToOwner[id] = msg.sender;
    ownerRealEstateCount[msg.sender] = ownerRealEstateCount[msg.sender].add(1);
  }

}
