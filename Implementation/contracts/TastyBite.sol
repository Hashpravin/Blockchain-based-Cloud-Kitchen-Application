// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TastyBite {
    string public name;
    address public owner;
    constructor(){
        name = "Tasty";
        owner = msg.sender;
    }
}
