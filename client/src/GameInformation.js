import React from "react";

class GameInformation extends React.Component {
    constructor() {
        super();
        this.state = {
            id : "",
            registeredPlayers : {},
            numPlayersKey : null,
            playersKey : null,
            turnKey : null,
            bidFaceKey : null,
            bidQuantityKey : null,
        }
        this.register = this.register.bind(this);
    }
    register = (event)=> {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.LiarsDice;

        // let drizzle know we want to call the `registerParticipant` method from `account`
        const stackId = contract.methods["registerParticipant"].cacheSend({
            from: drizzleState.accounts[0]
        });
        this.state.registeredPlayers[drizzleState.accounts[0]] = true;
    }

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const id =  drizzleState.accounts[0];

        const contract = drizzle.contracts.LiarsDice;
        
        // let drizzle know we want to watch the `myString` method
        const numPlayersKey = contract.methods["numPlayers"].cacheCall();
        const playersKey = contract.methods["getAllPlayers"].cacheCall();
        const turnKey = contract.methods["turn"].cacheCall();
        const bidFaceKey = contract.methods["bidFace"].cacheCall();
        const bidQuantityKey = contract.methods["bidQuantity"].cacheCall();

        // save the `dataKey` to local component state for later reference
        this.setState({ id, numPlayersKey, playersKey, turnKey, bidFaceKey, bidQuantityKey });
    }

    render() {
        // get the contract state from drizzleState
        const { LiarsDice } = this.props.drizzleState.contracts;
        const curAccount = this.props.drizzleState.accounts[0];

        // using the saved `dataKey`, get the variable we're interested in
        const numPlayers = LiarsDice.numPlayers[this.state.numPlayersKey];
        const players = LiarsDice.getAllPlayers[this.state.playersKey];
        const turn = LiarsDice.turn[this.state.turnKey];
        const bidFace = LiarsDice.bidFace[this.state.bidFaceKey];
        const bidQuantity = LiarsDice.bidQuantity[this.state.bidQuantityKey];

        // const activePlayers = players && players.value.map((id, i) =>
        //     <p>{i<numPlayers.value && id}</p>
        // );

        // if it exists, then we display its value
        const curRegistered = this.state.registeredPlayers[curAccount];
        if(curRegistered){
            return <div><p>You have been successfully registered.</p></div>
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