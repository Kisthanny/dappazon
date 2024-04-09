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

    struct Order {
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public itemList;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    event List(string name, uint256 cost, uint256 quantity);
    event Buy(address buyer, uint256 orderId, uint256 itemId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner");
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
    function itemExists(uint256 _id) public view returns (bool) {
        return itemList[_id].id != 0;
    }

    function buy(uint256 _id) public payable {
        Item memory item = itemList[_id];
        // Receive funds
        require(itemExists(_id), "Item not exist");
        require(msg.value >= item.cost, "Insufficient Funds");
        require(item.stock > 0, "Out of Stock");

        // Create an order
        Order memory order = Order(block.timestamp, item);

        // Save order
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        // Substrack stock
        itemList[_id].stock = item.stock - 1;

        // Emit event
        // emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }

    // Withdraw funds
    function withdraw() public onlyOwner {
        // Get the contract's balance
        uint256 balance = address(this).balance;
        
        // Transfer the balance to the owner
        payable(owner).transfer(balance);
    }
}
