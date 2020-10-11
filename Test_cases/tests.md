# How to test 
1. Clone the repository
2. `npm i`
3. `truffle build`
4. `truffle develop` Now you're up and running with the Truffle console
5. Now let's fire up the react client `cd client && npm i`
6. `npm start`
7. Link your Metamask accounts
8. Select register for each account.
9. After the above step, select "Get your roll".
10. Test by bidding 2 of face value 3.
11. Then challenge by next player.
12. Dices will be revealed and winner declared.

### Test 1
 - Player1 - (BidFace : 2, BidQuantity : 3)
 - Player2 - (BidFace : 3, BidQuantity : 3)
 - Player3 - (BidFace : 3, BidQuantity : 5)
 - Player 1 challenged Player 3
 - According to dice count the winner will be decided.

### Test 2
 - Player1 - (BidFace : 2, BidQuantity : 3)
 - Player2 - (BidFace : 3, BidQuantity : 3)
 - Player3 - (BidFace : 3, BidQuantity : 5)
 - Player1 - (BidFace : 4, BidQuantity : 5)
 - Player 2 challenged Player 1
 - According to dice count the winner will be decided.
 
### Test 3
 - Player1 - (BidFace : 2, BidQuantity : 3)
 - Player2 - (BidFace : 3, BidQuantity : 3)
 - Player3 - (BidFace : 3, BidQuantity : 5)
 - Player4 - (BidFace : 3, BidQuantity : 5)
 - Player1 - (BidFace : 4, BidQuantity : 5)
 - Player2 - (BidFace : 5, BidQuantity : 5)
 - Player 3 challenged Player 2
 - According to dice count the winner will be decided.

### Test 4
 - Player1 - (BidFace : 2, BidQuantity : 3)
 - Player2 - (BidFace : 3, BidQuantity : 3)
 - Player3 - (BidFace : 3, BidQuantity : 5)
 - Player 1 challenged Player 3
 - According to dice count the winner will be decided.
