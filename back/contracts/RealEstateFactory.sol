// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "./Ownable.sol";
import "./Safemath.sol";

contract RealEstateFactory is Ownable {

  using SafeMath for uint256;

  event NewRealEstate(uint realEstateId, string productName, uint price);



  struct RealEstate {
    string productName;
    string productAddress;
    string sellingDate;
    uint price;
    boolean onsale;
  }

  RealEstate[] public realEstates;

  mapping (uint => address) public realEstateToOwner;
  mapping (address => uint) ownerRealEstateCount;


  function createRealEstate(string productName, string productAddress, string sellingDate, uint price, boolean onsale) public {
    realEstates.push(Property(productName, productAddress, sellingDate, price, onsale));
    uint id = realEstates.lenght + 1;
    realEstateToOwner[id] = msg.sender;
    ownerRealEstateCount[msg.sender] = = ownerRealEstateCount[msg.sender].add(1);
  }

}
