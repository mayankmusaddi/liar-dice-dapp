// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract LiarsDice {
  uint public noPlayers;
  address payable[] public players = new address payable[](10);

  uint public turn;
  uint[] private faceNumber = new uint[](7);

  uint public bidFace;
  uint public bidQuantity;
  address payable public bidAddress;

  // The bids are stored in a hashed format so that it is not visible even to the seller
  mapping(address => bytes32) private hashedDice;

  // A constructor taking in the bidding time and revealing time as parameters
  constructor () public {
    bidFace = 0;
    bidQuantity = 0;
    noPlayers = 0;
    faceNumber = [0,0,0,0,0,0,0];
  }

  // A function to be called by the highBidder with the secondBid value to pay to the owner
  function registerParticipant() public payable {
    // players[noPlayers] = new Player(msg.sender,5);
    players[noPlayers] = msg.sender;
    noPlayers++;
  }

  function setDice(bytes32 h) public {
    hashedDice[msg.sender] = h;
  }

  function makeBid(uint f, uint q) public {
    bidFace = f;
    bidQuantity = q;
    bidAddress = msg.sender;
  }

  function revealDice(uint f1, uint f2, uint f3, uint f4, uint f5) public {
    require(keccak256(abi.encodePacked(f1,f2,f3,f4,f5)) == hashedDice[msg.sender], "Revealed Bid or Nonce don't match");
    faceNumber[f1]++;
    faceNumber[f2]++;
    faceNumber[f3]++;
    faceNumber[f4]++;
    faceNumber[f5]++;
  }

  function challenge() public view returns (bool){
    uint quantity = faceNumber[bidFace];
    if(quantity >= bidQuantity)
      return false;
    else
      return true;
  }

  function getAllPlayers() public view returns (address payable[] memory) {
    return players;
  }
}