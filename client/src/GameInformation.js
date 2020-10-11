import React from "react";
import ReactDice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";
// import * as styles from './App.css'
const { soliditySha3 } = require("web3-utils");

class GameInformation extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      registeredPlayers: {},
      playersDice: {},
      playersDiceString: {},
      playersNonce: {},
      numPlayersKey: null,
      playersKey: null,
      turnKey: null,
      bidFaceKey: null,
      bidQuantityKey: null,
    };
    this.reactDice = null;
    this.register = this.register.bind(this);
    this.handleBidInput = this.handleBidInput.bind(this);
  }

  getInitialState = () => {
    if (!localStorage.getItem("set")) return;

    // retreiving data from local storage
    var playersDice = JSON.parse(localStorage.getItem("playersDice"));
    var playersNonce = JSON.parse(localStorage.getItem("playersNonce"));
    var registeredPlayers = JSON.parse(
      localStorage.getItem("registeredPlayers")
    );

    this.setState({
      registeredPlayers,
      playersDice,
      playersNonce,
    });
  };

  handleBidInput = () => {};

  register = (event) => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.LiarsDice;
    const curAccount = drizzleState.accounts[0];

    // let drizzle know we want to call the `registerParticipant` method from `account`
    contract.methods["registerParticipant"].cacheSend({
      from: curAccount,
      value: 2e18,
    });

    // registering the player
    let registeredPlayers = this.state.registeredPlayers;
    registeredPlayers[curAccount] = true;
    let playersNonce = this.state.playersNonce;
    playersNonce[curAccount] = 197; // needs to be changed to random

    // initialising the player's dice
    const diceForCurPlayer = [1, 6, 2, 5, 3]; // need to change this to random
    let playersDice = this.state.playersDice;
    const hashDice = soliditySha3(
      diceForCurPlayer[0],
      diceForCurPlayer[1],
      diceForCurPlayer[2],
      diceForCurPlayer[3],
      diceForCurPlayer[4],
      playersNonce[curAccount]
    );
    // sending the hashed value of dices to contract
    contract.methods["setDice"].cacheSend(hashDice, {
      from: curAccount,
    });

    playersDice[curAccount] = diceForCurPlayer;

    // setting items in local storage
    localStorage.setItem("playersDice", JSON.stringify(playersDice));
    localStorage.setItem("playersNonce", JSON.stringify(playersNonce));
    localStorage.setItem(
      "registeredPlayers",
      JSON.stringify(registeredPlayers)
    );
    localStorage.setItem("set", true);

    // setting the state for the current changes
    this.setState({
      registeredPlayers,
      playersDice,
      playersNonce,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.reactDice) {
      this.reactDice.rollAll([1, 6, 2, 5, 3]);
    }
  }

  componentDidMount() {
    this.getInitialState();
    const { drizzle, drizzleState } = this.props;
    const id = drizzleState.accounts[0];

    const contract = drizzle.contracts.LiarsDice;

    // let drizzle know we want to watch the `myString` method
    const numPlayersKey = contract.methods["numPlayers"].cacheCall();
    const playersKey = contract.methods["getAllPlayers"].cacheCall();
    const turnKey = contract.methods["turn"].cacheCall();
    const bidFaceKey = contract.methods["bidFace"].cacheCall();
    const bidQuantityKey = contract.methods["bidQuantity"].cacheCall();
    // save the `dataKey` to local component state for later reference
    if (this.reactDice) this.reactDice.rollAll([1, 6, 2, 5, 3]);
    this.setState({
      id,
      numPlayersKey,
      playersKey,
      turnKey,
      bidFaceKey,
      bidQuantityKey,
    });
  }

  render() {
    // get the contract state from drizzleState
    const { LiarsDice } = this.props.drizzleState.contracts;
    const curAccount = this.props.drizzleState.accounts[0];

    // using the saved `dataKey`, get the variable we're interested in
    const numPlayers = LiarsDice.numPlayers[this.state.numPlayersKey];
    // const players = LiarsDice.getAllPlayers[this.state.playersKey];
    const turn = LiarsDice.turn[this.state.turnKey];
    const bidFace = LiarsDice.bidFace[this.state.bidFaceKey];
    const bidQuantity = LiarsDice.bidQuantity[this.state.bidQuantityKey];
    // this.reactDice = [];
    // const activePlayers = players && players.value.map((id, i) =>
    //     <p>{i<numPlayers.value && id}</p>
    // );

    // if it exists, then we display its value
    var myDice = [];
    const curRegistered = this.state.registeredPlayers[curAccount];
    if (curRegistered) myDice = this.state.playersDice[curAccount];
    if (curRegistered) {
      return (
        <div>
          <p>You have been successfully registered.</p>
          <p>Your Connected Account : {curAccount}</p>
          <p>numPlayers: {numPlayers && numPlayers.value}</p>
          <p>turn: {turn && turn.value}</p>
          <p>bidFace: {bidFace && bidFace.value}</p>
          <p>bidQuantity: {bidQuantity && bidQuantity.value}</p>
          <p>Your dices are {myDice}</p>
          {/* <form>
                        <input 
                            type={"number"} 
                            onChange={this.handleBidInput} 
                            value={bidFace && bidFace.value} 
                            min={bidFace && bidFace.value}
                            max={6}
                        />
                        <input 
                            type={"number"} 
                            onChange={this.handleBidInput} 
                            value={bidQuantity && bidQuantity.value} 
                            min={bidQuantity && bidQuantity.value}
                            max={numPlayers && numPlayers.value*5}
                        />
                        <button className={"ld-button"}>Bid</button>
                    </form> */}
          {/* <button className={"ld-button"}>Challenge</button> */}

          <h4>Your Roll</h4>
          {/*<button className={"ld-button"} onClick={(e) => {this.reactDice.map((item, i) => {  console.log(item);  item.rollAll([i]);})}}>Roll</button>*/}
          {/* <button className={"ld-button"} onClick={() => this.reactDice.rollAll([1,2,3,4,5])}>Roll</button> */}
          <ReactDice
            ref={(dice) => {
              this.reactDice = dice;
            }}
            faceColor={"#ffffff"}
            dotColor={"#000000"}
            numDice={5}
            defaultRoll={1}
          />
        </div>
      );
    }
    return (
      <div>
        <p>My Connected Account : {this.state.id}</p>
        <p>numPlayers: {numPlayers && numPlayers.value}</p>
        <p>turn: {turn && turn.value}</p>
        <p>bidFace: {bidFace && bidFace.value}</p>
        <p>bidQuantity: {bidQuantity && bidQuantity.value}</p>

        <p>Active Players</p>
        {/* <p>{activePlayers}</p> */}
        <button onClick={this.register}>Register</button>
      </div>
    );
  }
}

export default GameInformation;
