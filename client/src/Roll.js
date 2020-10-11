import React from "react";
import ReactDice from "react-dice-complete";
import LDButton from "./components/LDButton";
import "react-dice-complete/dist/react-dice-complete.css";
const { soliditySha3 } = require("web3-utils");

class Roll extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      registeredPlayers: {},
      isRolled : {},
      playersDice: {},
      playersNonce: {},
    };
    this.reactDice = null;
    this.handleRoll = this.handleRoll.bind(this);
  }

  getInitialState = () => {
    if (!localStorage.getItem("set")) return;

    // retreiving data from local storage
    var playersDice = JSON.parse(localStorage.getItem("playersDice"));
    var playersNonce = JSON.parse(localStorage.getItem("playersNonce"));
    var registeredPlayers = JSON.parse(
      localStorage.getItem("registeredPlayers")
    );
    var isRolled = JSON.parse(
        localStorage.getItem("isRolled")
      );

    this.setState({
      registeredPlayers,
      isRolled,
      playersDice,
      playersNonce,
    });
  };


  handleRoll = (event) => {
    event.preventDefault();
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.LiarsDice;
    const curAccount = drizzleState.accounts[0];
    
    let isRolled = this.state.isRolled;
    isRolled[curAccount] = true;
    let playersNonce = this.state.playersNonce;
    playersNonce[curAccount] = Math.floor(Math.random()*1000) + 69; // needs to be changed to random

    // initialising the player's dice
    let rolls = [];
    let numberOfDice = 5;
    for (let i = 0; i < numberOfDice; i++) {
      rolls[i] = Math.floor(Math.random() * 6) + 1;
    }
    let playersDice = this.state.playersDice;
    const hashDice = soliditySha3(
      rolls[0],
      rolls[1],
      rolls[2],
      rolls[3],
      rolls[4],
      playersNonce[curAccount]
    );
    // sending the hashed value of dices to contract
    contract.methods["setDice"].cacheSend(hashDice, {
      from: curAccount,
    });

    playersDice[curAccount] = rolls;

    // setting items in local storage
    localStorage.setItem("playersDice", JSON.stringify(playersDice));
    localStorage.setItem("playersNonce", JSON.stringify(playersNonce));
    localStorage.setItem("isRolled", JSON.stringify(isRolled));

    // setting the state for the current changes
    this.setState({
      isRolled,
      playersDice,
      playersNonce,
    });
  };
  componentDidUpdate () {
    const id = this.props.drizzleState.accounts[0];
    if(this.reactDice && this.state.playersDice && this.state.playersDice[id]) {
      this.reactDice.rollAll(this.state.playersDice[id]);
    }
  }
  componentDidMount() {
    this.getInitialState();
    const { drizzle, drizzleState } = this.props;
    const id = drizzleState.accounts[0];
    if (this.reactDice) this.reactDice.rollAll(this.state.playersDice[id]);
  }

  render() {
    // get the contract state from drizzleState
    const { LiarsDice } = this.props.drizzleState.contracts;
    const curAccount = this.props.drizzleState.accounts[0];

    // if it exists, then we display its value
    var myDice = [];
    const curRolled = this.state.isRolled[curAccount];
    const curRegistered = this.state.registeredPlayers[curAccount];
    if (curRolled) myDice = this.state.playersDice[curAccount];
    
    if(!curRegistered) return "";
    if (curRolled) {
      return (
        <div>
          <p>Your Roll</p>
          <ReactDice
            ref={(dice) => {
              this.reactDice = dice;
            }}
            numDice={5}
            faceColor={"#ffffff"}
            dotColor={"#000000"}
            disableIndividual={true}
          />
        </div>
      );
    }
    return (
      <div>
        <form onSubmit={this.handleRoll}>
            <LDButton title={"Get Your Roll"} titleStyle={{fontWeight: "bold", width: "350px", padding: 10}}/>
        </form>
      </div>
    );
  }
}

export default Roll;
