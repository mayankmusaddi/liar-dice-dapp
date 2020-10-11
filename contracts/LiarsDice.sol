// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract LiarsDice {
    uint256 public numPlayers;
    address payable[] public players = new address payable[](10);

    uint256 public turn;
    uint256[] private faceNumber = new uint256[](7);

    uint256 public bidFace;
    uint256 public bidQuantity;
    address payable public bidAddress;
    address payable public curBidder;

    // The dice faces are hashed and sent to contract
    mapping(address => bytes32) private hashedDice;
    address payable public challenger;
    uint256 public challengeState;
    uint256 public revealLeft;
    address payable public winner;
    uint256 public winnerIndex;
    uint256 public quantity;

    // A constructor taking in the bidding time and revealing time as parameters
    constructor() public {
        turn = 0;
        bidFace = 0;
        bidQuantity = 0;
        numPlayers = 0;
        faceNumber = [0, 0, 0, 0, 0, 0, 0];
    }

    // A function
    function registerParticipant() public payable {
        players[numPlayers] = msg.sender;
        if (numPlayers == 0) curBidder = players[0];
        numPlayers++;
    }

    function setDice(bytes32 h) public {
        hashedDice[msg.sender] = h;
    }

    function makeBid(uint256 f, uint256 q) public {
        bidFace = f;
        bidQuantity = q;
        bidAddress = msg.sender;
        turn = (turn + 1) % numPlayers;
        curBidder = players[turn];
    }

    function initiateChallenge() public payable {
        challenger = msg.sender;
        challengeState = 1;
        revealLeft = numPlayers;
    }

    function revealDice(
        uint256 f1,
        uint256 f2,
        uint256 f3,
        uint256 f4,
        uint256 f5,
        uint256 nonce
    ) public {
        require(
            keccak256(abi.encodePacked(f1, f2, f3, f4, f5, nonce)) ==
                hashedDice[msg.sender],
            "Revealed Bid or Nonce don't match"
        );
        faceNumber[f1]++;
        faceNumber[f2]++;
        faceNumber[f3]++;
        faceNumber[f4]++;
        faceNumber[f5]++;
        revealLeft--;
        if (revealLeft == 0) {
            checkWin();
        }
    }

    function checkWin() public {
        quantity = faceNumber[bidFace];
        if (quantity >= bidQuantity) {
            winner = bidAddress;
            winnerIndex = (turn == 0) ? numPlayers : turn;
        } else {
            winner = challenger;
            winnerIndex = (turn + 1);
        }
    }

    function getAllPlayers() public view returns (address payable[] memory) {
        return players;
    }
}
