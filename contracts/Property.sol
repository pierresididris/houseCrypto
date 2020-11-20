pragma solidity >=0.4.21 <0.7.0;

import "./Ownable.sol"

contract Property is Ownable {
    
    struct property{
        uint productId;
        string productName;
        string address;
        uint area;
        string description;
        string date;
        string sellerAddress;
        uint price;
        uint rooms;
        string dateOfConstruction;
        boolean onsale;
    }
}
