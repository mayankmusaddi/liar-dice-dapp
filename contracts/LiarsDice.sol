// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Bid{
  uint public face;
  uint public quantity;
  address public pid;

  function setBid(uint f, uint q) public returns(bool success) {
    face = f;
    quantity = q;
    pid = msg.sender;
    return true;
  }
}

contract Player{
  address payable public id;
  uint public noDices;
  constructor (address payable _id, uint _noDices) public {
    id = _id;
    noDices = _noDices;
  }
}

contract LiarsDice {
  uint public noPlayers;
  uint public turn;
  uint[] private faceNumber = new uint[](7);
  Bid public lastBid = new Bid();
  Player[] public players = new Player[](10);

  // The bids are stored in a hashed format so that it is not visible even to the seller
  mapping(address => bytes32) private hashedDice;

  // A constructor taking in the bidding time and revealing time as parameters
  constructor () public {
    lastBid.setBid(1,0);
    noPlayers = 4;
    faceNumber = [0,0,0,0,0,0,0];
  }

  // A function to be called by the highBidder with the secondBid value to pay to the owner
  function registerParticipant() public payable {
    players[noPlayers] = new Player(msg.sender,5);
    noPlayers++;
  }

  function setDice(bytes32 h) public {
    hashedDice[msg.sender] = h;
  }

  function bid(uint f, uint q) public {
    require(f>=1 && f<=6, "Dice Face Not Valid");
    lastBid.setBid(f,q);
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
    uint quantity = faceNumber[lastBid.face()];
    if(quantity >= lastBid.quantity())
      return false;
    else
      return true;
  }
}