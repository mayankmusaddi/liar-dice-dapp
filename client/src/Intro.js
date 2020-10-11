import React from "react";
import LDButton from "./components/LDButton";

class Intro extends React.Component {
  constructor() {
    super();
    this.state = {
      registeredPlayers: {},
      hasRevealed : {},
      isRolled : {},
      playersNonce : {},
      playersDice : {},
    };
    this.register = this.register.bind(this);
  }

  getInitialState = () => {
    if (!localStorage.getItem("set")) return;

    // retreiving data from local storage
    var registeredPlayers = JSON.parse(
      localStorage.getItem("registeredPlayers")
    );
    var hasRevealed = JSON.parse(
        localStorage.getItem("hasRevealed")
    );
    var isRolled = JSON.parse(
      localStorage.getItem("isRolled")
    );
    var playersNonce = JSON.parse(
      localStorage.getItem("playersNonce")
    );
    var playersDice = JSON.parse(
      localStorage.getItem("playersDice")
    );

    this.setState({
      registeredPlayers,
      playersNonce,
      playersDice,
      hasRevealed,
      isRolled,
    });
  };

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
    let hasRevealed = this.state.hasRevealed;
    hasRevealed[curAccount] = false;
    let isRolled = this.state.isRolled;
    isRolled[curAccount] = false;
    let playersDice = this.state.playersDice;
    playersDice[curAccount] = [];
    let playersNonce = this.state.playersNonce;
    playersNonce[curAccount] = 0;

    localStorage.setItem("registeredPlayers", JSON.stringify(registeredPlayers));
    localStorage.setItem("hasRevealed", JSON.stringify(hasRevealed));
    localStorage.setItem("isRolled", JSON.stringify(isRolled));
    localStorage.setItem("playersDice", JSON.stringify(playersDice));
    localStorage.setItem("playersNonce", JSON.stringify(playersNonce));
    localStorage.setItem("set", true);

    // setting the state for the current changes
    this.setState({
      registeredPlayers,
      hasRevealed,
      isRolled,
      playersDice,
      playersNonce,
    });
  };

  componentDidMount() {
    this.getInitialState();
    const { drizzle, drizzleState } = this.props;
    const id = drizzleState.accounts[0];

    const contract = drizzle.contracts.LiarsDice;
    console.log(contract);
  }

  render() {
    // get the contract state from drizzleState
    const { LiarsDice } = this.props.drizzleState.contracts;
    const curAccount = this.props.drizzleState.accounts[0];

    const curRegistered = this.state.registeredPlayers[curAccount];
    if (curRegistered) 
        return "";
    return (

        <div>
            <h1>Welcome to Liar’s Dice</h1>
            <h3>Connect your Metamask account to play:</h3>
            <h4>Connected Account : {curAccount}</h4>
            <h2>Rules :</h2>
            <div style={{textAlign: "initial"}}>
            <p>1. To Join you have to Register by paying an initial sum of 10 Eths</p>
            <p>2. You have 5 dices that are rolled at the beginning and is visible only to you</p>
            <p>3. Now bidding takes place turnwise in a circular manner</p>
            <p>4. Bidding Rules : Player chooses a dice face and its quantity that he estimates to be have rolled out by all the players</p>
            <p>5. This bid must have a quantity greater than the previous bid quantity if the same face value is chosen, or a greater face value must be chosen</p>
            <p>6. One could choose to challenge the bid of the previous player</p>
            <p>7. All the dices are then revealed and the bid is checked, accordingly the challenger or the bidder wins</p>
        </div>
            <form onSubmit={this.register}>
                <LDButton title={"Register"} titleStyle={{fontWeight: "bold", width: "350px", padding: 10}}/>
            </form>
        </div>
    );
  }
}

export default Intro;
