pragma solidity >=0.4.21 <0.7.0;

contract Hello {
    address private owner;
    string private name;

    constructor () public {
        owner = msg.sender;
    }   


    function setName (string memory _name) public {
        require (msg.sender == owner, "You are not the owner!");
        name = _name;
    }

    function getName() public view returns (string memory) {
        return name;
    }
    
    function sayHello() public view returns (string memory, string memory)
    {
        return ("HelloF Solidity Team! My name is:", name);
    }
}
