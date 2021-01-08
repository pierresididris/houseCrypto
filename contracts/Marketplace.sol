// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;

contract Marketplace {
    string public name;
    uint public productCount = 0;
    mapping(uint => RealEstate) public products;

    struct RealEstate {
        uint id;
        string name;
        uint price;
        string realEstateAddress;
        uint area;
        string description;
        uint nbroom;
        string sellingDate;
        address payable owner; //Parcqu'on veut payer le propriétaire, utiliser address payable
        bool purchased;
    }

    event RealEstateCreated(
        uint id,
        string name,
        uint price,
        string realEstateAddress,
        uint area,
        string description,
        uint nbroom,
        string sellingDate,
        address payable owner,
        bool purchased
    );

    event RealEstatePurchased(
        uint id,
        string name,
        uint price,
        string realEstateAddress,
        uint area,
        string description,
        uint nbroom,
        string sellingDate,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "Marketplace";
    }

    function createRealEstate(
            string memory _name, 
            uint _price,
            string memory _realEstateAddress,
            uint _area,
            string memory _description, 
            uint _nbroom,
            string memory _sellingDate
        ) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Require a valid address of realestate
        require(bytes(_realEstateAddress).length > 0);
        // // Require a valid area
        require(_area > 0);
        // // Require a valid description of realestate
        require(bytes(_description).length > 0);
        // // Require a valid nbroom
        require(_nbroom > 0);
        // // Require a valid sellingDate of realestate
        // require(bytes(_sellingDate).length > 0);
        // Increment product count
        productCount ++;
        // Create the product
        products[productCount] = RealEstate(
            productCount, 
            _name, 
            _price, 
            _realEstateAddress, 
            _area, 
            _description, 
            _nbroom, 
            _sellingDate, 
            msg.sender,
            false
        );
        // Trigger an event
        emit RealEstateCreated(
            productCount, 
            _name, 
            _price, 
            _realEstateAddress, 
            _area, 
            _description, 
            _nbroom, 
            _sellingDate,  
            msg.sender,
            false
        );
    }


    // fonction payable => elle acceptera que la crypto-monnaie Etherum
    function purchaseRealEstate(uint _id) public payable {
        // Fetch the product
        RealEstate memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _product.owner = msg.sender;
        // Mark as purchased
        _product.purchased = true;
        // Update the product
        products[_id] = _product;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit RealEstatePurchased(
            productCount, 
            _product.name, 
            _product.price, 
            _product.realEstateAddress, 
            _product.area, 
            _product.description, 
            _product.nbroom, 
            _product.sellingDate, 
            msg.sender, 
            true);
    }

    // write resell function

}