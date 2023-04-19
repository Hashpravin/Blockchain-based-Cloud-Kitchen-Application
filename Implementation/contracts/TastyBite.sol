// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TastyBite {
    address public owner;
    // Items ...
    struct Item {
       uint256 id;
       string name;
       string category;
       string image;
       uint256 cost;
       uint256 rating;
       uint256 stock;
    }
    struct Order{
        uint256 time;
        Item item;
    }
    //  OnlyOwner modifier  
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    // Creating db in the form of map
    mapping(uint256 => Item) public items;
    mapping(address => uint256) public orderCount;
    // List address of user placed ==> count: order
    mapping(address =>mapping(uint256 => Order)) public orders;

    event Buy(address buyer,uint256 orderId,uint256 itemId);
    event List(string name,uint256 cost,uint256 quantity);
    constructor(){
        owner = msg.sender;
    }
    //List items -- Any body can call
    function list(
    uint256 _id,
    string memory _name,
    string memory _category,
    string memory _image,
    uint256 _cost,
    uint256 _rating,
    uint256 _stock
    ) public  onlyOwner {
      // only kitchen owner can list the food items
      
      // making an item 
       Item memory item = Item(_id,
       _name,_category,
       _image,
       _cost,
       _rating,
       _stock
       );
    // saving item on blockchain
     items[_id] = item;
     //  Emiting an event when item is listed
      emit List(_name,_cost,_stock);
    }
    
    // Buy items
    //   To send ether we need to call payable (Modifier)
    function buy(uint256 _id) public  payable{
        // Receive Fund
        // Done with the help of ether.provider
        // Fetching the items 

        
        Item memory item = items[_id];
        // Checking some requirements before executing the buy smart contract
        // For checking this require ment I need to consider wallet here

        require(msg.value >= item.cost);
        //  stock is there
        require(item.stock >0);
        // Create an order
         Order memory order = Order(block.timestamp,item);
         
        // add order for user
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;
        
        // Subtract stock
        items[_id].stock =  item.stock -1;
        // Emit event
        emit Buy(msg.sender,orderCount[msg.sender],item.id);
    } 


    // Withdraw Funds from smart contract for the orders
    function withdraw() public onlyOwner {
        // Can use transfer or call for transfering the ether
        // give a value of the particular address and the total balance which return 
        // success if the fund is there
        (bool success,) = owner.call{value:address(this).balance}("");
        require(success);
    }
}
