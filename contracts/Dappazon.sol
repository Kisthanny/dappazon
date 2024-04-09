// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Dappazon {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct Item {
        uint256 id;
        string name;
        string catagory;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    mapping(uint256 => Item) public itemList;

    event List(string name, uint256 cost, uint256 quantity);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner can List product");
        _;
    }

    // List products
    function list(
        uint256 _id,
        string memory _name,
        string memory _catagory,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        // Create Item struct
        Item memory item = Item(
            _id,
            _name,
            _catagory,
            _image,
            _cost,
            _rating,
            _stock
        );

        // Save Item struct
        itemList[_id] = item;

        // Emit an event
        emit List(_name, _cost, _stock);
    }

    // Buy products

    // Withdraw funds
}
