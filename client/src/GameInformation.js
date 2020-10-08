import React from "react";

class GameInformation extends React.Component {
    constructor() {
        super();
        this.state = {
            id : "",
            noPlayersKey : null,
            playersKey : null,
            turnKey : null,
            bidFaceKey : null,
            bidQuantityKey : null,
        }
    }

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const id =  drizzleState.accounts[0];

        const contract = drizzle.contracts.LiarsDice;
        
        // let drizzle know we want to watch the `myString` method
        const noPlayersKey = contract.methods["noPlayers"].cacheCall();
        const playersKey = contract.methods["getAllPlayers"].cacheCall();
        const turnKey = contract.methods["turn"].cacheCall();
        const bidFaceKey = contract.methods["bidFace"].cacheCall();
        const bidQuantityKey = contract.methods["bidQuantity"].cacheCall();

        // save the `dataKey` to local component state for later reference
        this.setState({ id, noPlayersKey, playersKey, turnKey, bidFaceKey, bidQuantityKey });
    }

    render() {
        // get the contract state from drizzleState
        const { LiarsDice } = this.props.drizzleState.contracts;

        // using the saved `dataKey`, get the variable we're interested in
        const noPlayers = LiarsDice.noPlayers[this.state.noPlayersKey];
        const players = LiarsDice.getAllPlayers[this.state.playersKey];
        const turn = LiarsDice.turn[this.state.turnKey];
        const bidFace = LiarsDice.bidFace[this.state.bidFaceKey];
        const bidQuantity = LiarsDice.bidQuantity[this.state.bidQuantityKey];

        const activePlayers = players && players.value.map((id, i) =>
            <p>{i<noPlayers.value && id}</p>
        );

        // if it exists, then we display its value
        return (
            <div>
            <p>My Connected Account : {this.state.id}</p>
            <p>noPlayers: {noPlayers && noPlayers.value}</p>
            <p>turn: {turn && turn.value}</p>
            <p>bidFace: {bidFace && bidFace.value}</p>
            <p>bidQuantity: {bidQuantity && bidQuantity.value}</p>

            <p>Active Players</p>
            <p>{activePlayers}</p>
            </div>
        );
    }
}

export default GameInformation;