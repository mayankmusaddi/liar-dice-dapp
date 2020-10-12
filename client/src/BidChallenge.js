import React from "react";
import LastBid from './LastBid';
import LDButton from "./components/LDButton";

class BidChallenge extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      registeredPlayers: {},
      playersLost : {},
      isRolled : {},
      hasRevealed: {},
      formData: {
        bidFace: 0,
        bidQuantity: 0,
      },
      numPlayersKey: null,
      curBidderKey: null,
      turnKey: null,
      bidFaceKey: null,
      bidQuantityKey: null,
      challengeStateKey: null,
      revealLeftKey: null,
      quantityKey: null,
      winnerKey: null,
      winnerIndexKey: null,
    };
    this.handleBid = this.handleBid.bind(this);
    this.handleReveal = this.handleReveal.bind(this);
    this.handleChallenge = this.handleChallenge.bind(this);
    this.handleClaim = this.handleClaim.bind(this);
    this.handleBidFaceChange = this.handleBidFaceChange.bind(this);
    this.handleBidQuantChange = this.handleBidQuantChange.bind(this);
  }

  getInitialState = () => {
    if (!localStorage.getItem("set")) return;

    // retreiving data from local storage
    var registeredPlayers = JSON.parse(
      localStorage.getItem("registeredPlayers")
    );
    var isRolled = JSON.parse(
        localStorage.getItem("isRolled")
    );

    var hasRevealed = JSON.parse(localStorage.getItem("hasRevealed"));
    this.setState({ registeredPlayers, hasRevealed, isRolled });
  };

  handleBid = (event) => {
    event.preventDefault();

    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.LiarsDice;

    // let drizzle know we want to call the `set` method with `value`
    contract.methods["makeBid"].cacheSend(
      this.state.formData.bidFace,
      this.state.formData.bidQuantity,
      {
        from: drizzleState.accounts[0],
      }
    );
  };

  handleChallenge = (event) => {
    event.preventDefault();

    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.LiarsDice;

    // let drizzle know we want to call the `set` method with `value`
    contract.methods["initiateChallenge"].cacheSend({
      from: drizzleState.accounts[0],
    });
  };

  handleClaim = (event) => {
    event.preventDefault();

    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.LiarsDice;

    // let drizzle know we want to call the `set` method with `value`
    contract.methods["claimReward"].cacheSend({
      from: drizzleState.accounts[0],
    });
  };

  handleReveal = (event) => {
    event.preventDefault();
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.LiarsDice;
    const curAccount = drizzleState.accounts[0];

    var playersDice = JSON.parse(localStorage.getItem("playersDice"));
    var playersNonce = JSON.parse(localStorage.getItem("playersNonce"));

    contract.methods["revealDice"].cacheSend(
      playersDice[curAccount][0],
      playersDice[curAccount][1],
      playersDice[curAccount][2],
      playersDice[curAccount][3],
      playersDice[curAccount][4],
      playersNonce[curAccount]
    );

    let hasRevealed = this.state.hasRevealed;
    hasRevealed[curAccount] = true;
    localStorage.setItem("hasRevealed", JSON.stringify(hasRevealed));
    this.setState({ hasRevealed });
  };

  handleBidFaceChange(event) {
    const formData = { ...this.state.formData, bidFace: event.target.value };
    this.setState({ formData });
  }

  handleBidQuantChange(event) {
    const formData = {
      ...this.state.formData,
      bidQuantity: event.target.value,
    };
    this.setState({ formData });
  }

  componentDidMount() {
    this.getInitialState();
    const { drizzle, drizzleState } = this.props;
    const id = drizzleState.accounts[0];

    const contract = drizzle.contracts.LiarsDice;
    console.log(contract);
    // let drizzle know we want to watch the `myString` method
    const numPlayersKey = contract.methods["numPlayers"].cacheCall();
    const curBidderKey = contract.methods["curBidder"].cacheCall();
    const turnKey = contract.methods["turn"].cacheCall();
    const bidFaceKey = contract.methods["bidFace"].cacheCall();
    const bidQuantityKey = contract.methods["bidQuantity"].cacheCall();
    const challengeStateKey = contract.methods["challengeState"].cacheCall();
    const revealLeftKey = contract.methods["revealLeft"].cacheCall();
    const quantityKey = contract.methods["quantity"].cacheCall();
    const winnerKey = contract.methods["winner"].cacheCall();
    const winnerIndexKey = contract.methods["winnerIndex"].cacheCall();
    // save the `dataKey` to local component state for later reference
    this.setState({
      id,
      numPlayersKey,
      curBidderKey,
      turnKey,
      bidFaceKey,
      bidQuantityKey,
      challengeStateKey,
      revealLeftKey,
      quantityKey,
      winnerKey,
      winnerIndexKey,
    });
  }

  render() {
    // get the contract state from drizzleState
    const { drizzleState } = this.props;
    const { LiarsDice } = drizzleState.contracts;
    const curAccount = drizzleState.accounts[0];

    const numPlayers = LiarsDice.numPlayers[this.state.numPlayersKey];
    const curBidder = LiarsDice.curBidder[this.state.curBidderKey];
    const bidFace = LiarsDice.bidFace[this.state.bidFaceKey];
    const bidQuantity = LiarsDice.bidQuantity[this.state.bidQuantityKey];
    const turn = LiarsDice.turn[this.state.turnKey];
    const revealLeft = LiarsDice.revealLeft[this.state.revealLeftKey];
    const quantity = LiarsDice.quantity[this.state.quantityKey];
    const winner = LiarsDice.winner[this.state.winnerKey];
    const winnerIndex = LiarsDice.winnerIndex[this.state.winnerIndexKey];
    
    const challengeState =
    LiarsDice.challengeState[this.state.challengeStateKey];

    // if it exists, then we display its value
    const prevPlayer =
    turn && (turn.value == 0 ? numPlayers && numPlayers.value : turn.value);
    
    // states
    const curRegistered = this.state.registeredPlayers[curAccount];
    const curRolled = this.state.isRolled[curAccount];
    const curRevealed = this.state.hasRevealed[curAccount];

    if (!curRegistered) return "";
    if(!curRolled){
        return (
            <div>
                <p>You are <b>Player {numPlayers && numPlayers.value}</b></p>
                <br/><br/>
                <p>Number of players in the game: {4}</p>
            </div>
        )
    }
    if (challengeState && challengeState.value == 1) {
      if (revealLeft && revealLeft.value == 0) {
        return (
          <div>
            <LastBid value={bidFace && bidFace.value} bidValue={bidQuantity && bidQuantity.value}/>
            <p>
              Player {winnerIndex && winnerIndex.value} has won the Challenge
            </p>
            <p>
              There were {quantity && quantity.value} dices of Face{" "}
              {bidFace && bidFace.value}
            </p>
            {/* <form onSubmit={this.handleClaim}>
                <LDButton title={"Claim your Reward"} titleStyle={{fontWeight: "bold", width: "350px", padding: 10}}/>
            </form> */}
          </div>
        );
      }
      if (curRevealed && revealLeft && revealLeft.value != 0) {
        return (
          <div>
            <LastBid value={bidFace && bidFace.value} bidValue={bidQuantity && bidQuantity.value}/>
            <p>
              Player {turn && parseInt(turn.value) + 1} Challenged Player{" "}
              {prevPlayer}
            </p>
            <p>Waiting for {revealLeft.value} Players To Reveal</p>
          </div>
        );
      }
      return (
        <div>
            <LastBid value={bidFace && bidFace.value} bidValue={bidQuantity && bidQuantity.value}/>
          <p>
            Player {turn && parseInt(turn.value) + 1} Challenged Player{" "}
            {prevPlayer}
          </p>
          <form onSubmit={this.handleReveal}>
            <LDButton title={"Reveal"} titleStyle={{fontWeight: "bold", width: "350px", padding: 10}}/>
          </form>
        </div>
      );
    }
    if (!curBidder || curBidder.value !== curAccount){
        return (
            <div>
                <LastBid value={bidFace && bidFace.value} bidValue={bidQuantity && bidQuantity.value}/>
                <p><b> Player {turn && parseInt(turn.value) + 1}</b> is Bidding</p>
            </div>
        )
    };
    return (
      <div>
        <LastBid value={bidFace && bidFace.value} bidValue={bidQuantity && bidQuantity.value}/>
        <form onSubmit={this.handleBid}>
            <input
                type={"number"}
                placeholder="Face Value"
                className="form-control"
                onChange={this.handleBidFaceChange}
                min={bidFace && Math.max(bidFace.value, 1)}
                max={6}
                style={{width:100}}
            />
            <input
                type={"number"}
                placeholder="Quantity"
                onChange={this.handleBidQuantChange}
                min={bidQuantity && Math.max(bidQuantity.value, 1)}
                max={numPlayers && numPlayers.value * 5}
                style={{width:100}}
            />
            <LDButton title={"Bid"} titleStyle={{fontWeight: "bold", paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5}}/>
      </form>
      <form onSubmit={this.handleChallenge}>
        <LDButton title={"Challenge"} titleStyle={{fontWeight: "bold", paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5}}/>
      </form>

        {/* <form onSubmit={this.handleBid}>
          <div className="form-groups">
            <label>Dice Face</label>
            <input
              type={"number"}
              className="form-control"
              onChange={this.handleBidFaceChange}
              value={Math.max(this.state.formData.bidFace, 1)}
              min={bidFace && Math.max(bidFace.value, 1)}
              max={6}
            />
          </div>
          <div className="form-group">
            <label>Dice Quantity</label>
            <input
              type={"number"}
              onChange={this.handleBidQuantChange}
              value={Math.max(this.state.formData.bidQuantity, 1)}
              min={bidQuantity && Math.max(bidQuantity.value, 1)}
              max={numPlayers && numPlayers.value * 5}
            />
          </div>
          <button>Bid</button>
        </form>
        <form onSubmit={this.handleChallenge}>
          <button>Challenge</button>
        </form> */}
      </div>
    );
  }
}

export default BidChallenge;
