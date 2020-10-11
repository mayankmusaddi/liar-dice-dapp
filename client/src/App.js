import React from 'react';
import './App.css';
// import ReadString from "./ReadString";
import GameInformation from './GameInformation';
import BidChallenge from './BidChallenge';
import Intro from "./Intro";
import GameWaiting from "./GameWaiting";
import GameFinish from "./GameFinish";
import YourRoll from "./YourRoll";
import YourTurn from "./YourTurn";
import LastBid from "./LastBid";
import RevealDice from "./RevealDice";
import PlayerInfo from "./PlayerInfo";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      drizzleState: null
    }
  }
  componentDidMount() {
    const { drizzle } = this.props;
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    if (this.state.loading) return "Loading Drizzle...";

    return (
      <div className="App">
        {/*<div className={'page page-1'}>*/}
        {/*  <Intro/>*/}
        {/*</div>*/}
        {/*<div className={'page page-2'}>*/}
        {/*  <GameWaiting playerNo={2} numPlayer={4} remainingPlayers={2}/>*/}
        {/*</div>*/}
        {/*<div className={'page page-3'} >*/}
        {/*  <LastBid value={4} bidValue={2} containerStyle={{marginBottom:"15%"}}/>*/}
        {/*  <PlayerInfo infos={["Player 1 is bidding"]}/>*/}
        {/*  <YourRoll containerStyle={{marginTop: '10%'}}/>*/}
        {/*</div>*/}
        {/*<div className={'page page-4'}>*/}
        {/*  <LastBid value={3} bidValue={4} containerStyle={{marginBottom: "15%"}}/>*/}
        {/*  <YourTurn/>*/}
        {/*  <YourRoll containerStyle={{marginTop: "10%"}}/>*/}
        {/*</div>*/}
        {/*<div className={'page page-5'}>*/}
        {/*  <LastBid value={3} bidValue={5} containerStyle={{marginBottom: "15%"}}/>*/}
        {/*  <PlayerInfo infos={["Player 2 has challenged player 1"]}/>*/}
        {/*  <RevealDice/>*/}
        {/*  <YourRoll containerStyle={{marginTop: "10%"}}/>*/}
        {/*</div>*/}
        {/*<div className={'page page-6'}>*/}
        {/*  <LastBid value={3} bidValue={5} containerStyle={{"marginBottom": "15%"}}/>*/}
        {/*  <PlayerInfo infos={["Player 2 has challenged player 1", "Waiting for two players to reveal the dice"]}/>*/}
        {/*  <YourRoll  numDice={5} containerStyle={{marginTop: "10%"}}/>*/}
        {/*</div>*/}
        <div className={'page page-7'}>
          <LastBid value={4} bidValue={2} containerStyle={{marginBottom: "15%"}}/>
          <GameFinish playerWon={2} bidQuantity={2} bidFace={4}/>
        </div>

        <div>

        </div>
        {/*<PlayerInfo infos={["Player 2 has challenged player 1"]}/>*/}
        {/*<RevealDice/>*/}
        {/*<LastBid value={4}/>*/}
        {/*<YourTurn bidFace={2} bidQuantity={3} numPlayers={5}/>*/}
        {/*<YourRoll numDice={5}/>*/}
        {/*<GameFinish/>*/}
        {/*<GameWaiting />*/}
        {/*<GameInformation*/}
        {/*  drizzle={this.props.drizzle}*/}
        {/*  drizzleState={this.state.drizzleState}*/}
        {/*/>*/}
        {/*<BidChallenge*/}
        {/*  drizzle={this.props.drizzle}*/}
        {/*  drizzleState={this.state.drizzleState}*/}
        {/*/>*/}
      </div>
    );
  }
}

export default App;
