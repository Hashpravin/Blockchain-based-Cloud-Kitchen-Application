# FeedbackContract

## Structs

### Feedback
- `feedbackId`: uint256 - The unique identifier of the feedback.
- `customer`: address - The address of the customer who submitted the feedback.
- `item`: string - The item being reviewed.
- `comment`: string - The comment or feedback message.
- `rating`: uint256 - The rating given to the item.

## State Variables

- `feedbacks`: Feedback[] - An array that stores all the feedback entries.
- `customerFeedbacks`: mapping(address => uint256[]) - A mapping that associates each customer address with an array of their feedback IDs.

## Events

### FeedbackReceived
- Parameters:
  - `feedbackId`: uint256 - The ID of the received feedback.
  - `customer`: address - The address of the customer who submitted the feedback.
  - `item`: string - The item being reviewed.
  - `comment`: string - The comment or feedback message.
  - `rating`: uint256 - The rating given to the item.

## Functions

### giveFeedback
- Parameters:
  - `item`: string - The item being reviewed.
  - `comment`: string - The comment or feedback message.
  - `rating`: uint256 - The rating given to the item.
- Description: Allows customers to give feedback on an item. Stores the feedback entry in the `feedbacks` array and associates it with the customer in the `customerFeedbacks` mapping. Emits the `FeedbackReceived` event.

### getFeedback
- Parameters:
  - `feedbackId`: uint256 - The ID of the feedback to retrieve.
- Returns:
  - `customer`: address - The address of the customer who submitted the feedback.
  - `item`: string - The item being reviewed.
  - `comment`: string - The comment or feedback message.
  - `rating`: uint256 - The rating given to the item.
- Description: Retrieves the details of a specific feedback entry based on the provided feedback ID.

### getCustomerFeedbacks
- Parameters:
  - `customer`: address - The address of the customer.
- Returns:
  - `feedbackIds`: uint256[] - An array of feedback IDs submitted by the customer.
- Description: Retrieves an array of feedback IDs submitted by a specific customer. only owner can access it.

### getFeedbackCount
- Returns:
  - `count`: uint256 - The total number of feedback entries stored in the contract.
- Description: Returns the total number of feedback entries stored in the contract.
