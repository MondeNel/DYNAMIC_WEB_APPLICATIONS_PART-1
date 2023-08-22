#### USER_STORY

##### Feature: Adding Items to Cart with + Button

###### As a shopper

- I want to easily increase the quantity of items in my cart using the +
button
- So that I can quickly adjust the number of items I intend to purchase
Scenario: Adding a single item to the cart
- Given I am on the product page
- When I click the + button next to a product
- Then the quantity of that product in my cart should increase by 1
Scenario: Adding multiple items to the cart
- Given I am on the product page
- When I click the + button next to a product twice
- Then the quantity of that product in my cart should increase by 2
Scenario: Adding items from different products
- Given I am on the product page
- When I click the + button next to different products
- Then the quantity of each respective product in my cart should increase
accordingly



###### Feature: Reducing Items with the - Button

###### As a shopper
- I want to be able to reduce the quantity of items in my cart using the -
button
- So that I can easily adjust the number of items I want to purchase
Scenario: Reducing a single item from the cart
- Given I have items in my cart
- When I click the - button next to a product
- Then the quantity of that product in my cart should decrease by 1
Scenario: Reducing multiple items from the cart
- Given I have items in my cart
- When I click the - button next to a product twice
- Then the quantity of that product in my cart should decrease by 2
Scenario: Reducing items from different products
- Given I have items in my cart
- When I click the - button next to different products
- Then the quantity of each respective product in my cart should decrease
accordingly



###### Feature: Viewing Updated Cart after Reducing Items

###### As a shopper
- I want to see the updated cart contents after reducing items using the -
button
- So that I can verify the quantity of items in my cart
Scenario: Viewing the updated cart after reducing items
- Given I have reduced items in my cart using the - button
- When I view the cart contents
- Then I should see the correct quantity of items in my cart