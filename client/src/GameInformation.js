import React from "react";

class GameInformation extends React.Component {
    constructor() {
        super();
        this.state = {
            id : "",
            noPlayersKey : null,
            turnKey : null,
            lastBidKey : null,
            playersKey : null,
        }
    }

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.LiarsDice;
        
        // let drizzle know we want to watch the `myString` method
        const noPlayersKey = contract.methods["noPlayers"].cacheCall();
        console.log(noPlayersKey);
        const turnKey = contract.methods["turn"].cacheCall();
        const lastBidKey = contract.methods["lastBid"].cacheCall();
        const playersKey = contract.methods["players"].cacheCall();
        const id =  drizzleState.accounts[0];

        // save the `dataKey` to local component state for later reference
        this.setState({ id, noPlayersKey, turnKey, lastBidKey, playersKey });
    }

    render() {
        // get the contract state from drizzleState
        const { LiarsDice } = this.props.drizzleState.contracts;

        // using the saved `dataKey`, get the variable we're interested in
        const noPlayers = LiarsDice.noPlayers[this.state.noPlayersKey];
        console.log(noPlayers);
        // const turn = LiarsDice.turn[this.state.turnKey];
        // const lastBid = LiarsDice.lastBid[this.state.lastBidKey];
        // const players = LiarsDice.players[this.state.playersKey];

        // if it exists, then we display its value
        return (
            <div>
            <p>My Connected Account : {this.state.id}</p>
            <p>noPlayers: {noPlayers && noPlayers.value}</p>
            {/* <p>turn: {turn && turn.value}</p>
            <p>lastBid: {lastBid && lastBid.value}</p>
            <p>players: {players && players.value}</p> */}
            </div>
        );
    }
}

export default GameInformation;