// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;

import "./RealEstateFactory.sol";

contract Marketplace is RealEstateFactory {
    modifier onlyRealEstateForSale(uint _realEstateId) {
        require(IndexOf(_realEstateId) >= 0);
        require(msg.value == realEstates[_realEstateId].price);
        _;
    }

    event newSale(uint realEstateId);
    event deletedSale(uint realEstateId);

    uint[] public marketPlace;

    function addRealEstate(uint realEstateId) public onlyOwnerOf(realEstateId) {
        marketPlace.push(realEstateId);
        emit newSale(realEstateId);
    }

    function removeRealEstate(uint realEstateId) public onlyOwnerOf(realEstateId) {
        int index = IndexOf(realEstateId);
        if (index >= 0) {
            emit deletedSale(uint(realEstateId));
            delete marketPlace[uint256(index)];
        }
    }

    function transaction(uint256 _tokenId) public payable onlyRealEstateForSale(_tokenId) {
        address _from = realEstateToOwner[_tokenId];
        address(uint160(_from)).transfer(msg.value);
        ownerRealEstateCount[_from] = ownerRealEstateCount[_from].sub(1);
        ownerRealEstateCount[msg.sender] = ownerRealEstateCount[msg.sender].add(1);
        realEstateToOwner[_tokenId] = msg.sender;
        removeRealEstate(_tokenId);
    }

    function IndexOf(uint value) private view returns(int) {
        for(uint index = 0; index < marketPlace.length; index++) {
            if (marketPlace[index] == value) {
                return int(index);
            }
        }
        return -1;
    }
}