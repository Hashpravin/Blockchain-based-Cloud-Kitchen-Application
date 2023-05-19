// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract FeedbackContract {
    struct Feedback {
        address customer;
        uint256 itemId;
        uint256 rating;
        string comment;
    }
    address public owner;
    constructor(address _contractAddress){
        owner = _contractAddress;
    }
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    Feedback[] public feedbacks;
    mapping(address => uint256[]) private customerFeedbacks;

    function addFeedback(uint256 _itemId, uint256 _rating, string memory _comment) external {
        require(_itemId > 0, "Invalid item ID");
        require(_rating >= 1 && _rating <= 5, "Invalid rating");

        Feedback memory newFeedback = Feedback(msg.sender, _itemId, _rating, _comment);
        feedbacks.push(newFeedback);
        customerFeedbacks[msg.sender].push(feedbacks.length - 1);
    }

    function getFeedback(uint256 _feedbackIndex) external view returns (address, uint256, uint256, string memory) {
        require(_feedbackIndex < feedbacks.length, "Invalid feedback index");

        Feedback memory feedback = feedbacks[_feedbackIndex];
        return (feedback.customer, feedback.itemId, feedback.rating, feedback.comment);
    }

    function getCustomerFeedbacks(address _customer) external onlyOwner view returns (uint256[] memory) {
        return customerFeedbacks[_customer];
    }
}
