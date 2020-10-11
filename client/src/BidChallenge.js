import React from "react";
// import Math

class BidChallenge extends React.Component {
    constructor() {
        super();
        this.state = {
            id : "",
            registeredPlayers : {},
            formData : {
                bidFace : 0,
                bidQuantity : 0,
            },
            numPlayersKey : null,
            curBidderKey : null,
            turnKey : null,
            bidFaceKey : null,
            bidQuantityKey : null,
        }
        this.handleBid = this.handleBid.bind(this);
        this.handleChallenge = this.handleChallenge.bind(this);
        this.handleBidFaceChange = this.handleBidFaceChange.bind(this);
        this.handleBidQuantChange = this.handleBidQuantChange.bind(this);
    }

    getInitialState = () => {
        if(!localStorage.getItem('set')) return;

        // retreiving data from local storage
        var registeredPlayers = JSON.parse(localStorage.getItem('registeredPlayers'));
        this.setState({registeredPlayers});
    }

    handleBid = (event) => {
        event.preventDefault();

        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.LiarsDice;

        // let drizzle know we want to call the `set` method with `value`
        contract.methods["makeBid"].cacheSend(this.state.formData.bidFace, this.state.formData.bidQuantity, {
            from: drizzleState.accounts[0]
        });

    }

    handleChallenge = (event) => {
        event.preventDefault();

        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.LiarsDice;

        // let drizzle know we want to call the `set` method with `value`
        const res = contract.methods["challenge"].cacheSend({
            from: drizzleState.accounts[0]
        });
        if(res) window.location.reload();

    }

    handleBidFaceChange (event) {
        const formData = {...this.state.formData, "bidFace" : event.target.value};
        this.setState({formData});
    }

    handleBidQuantChange (event) {
        const formData = {...this.state.formData, "bidQuantity" : event.target.value};
        this.setState({formData});
    }

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const id =  drizzleState.accounts[0];

        const contract = drizzle.contracts.LiarsDice;
        
        // let drizzle know we want to watch the `myString` method
        const numPlayersKey = contract.methods["numPlayers"].cacheCall();
        const curBidderKey = contract.methods["curBidder"].cacheCall();
        const turnKey = contract.methods["turn"].cacheCall();
        const bidFaceKey = contract.methods["bidFace"].cacheCall();
        const bidQuantityKey = contract.methods["bidQuantity"].cacheCall();
        // save the `dataKey` to local component state for later reference
        this.getInitialState();
        this.setState({ id, numPlayersKey, curBidderKey, turnKey, bidFaceKey, bidQuantityKey });
    }

    render() {
        // get the contract state from drizzleState
        const { drizzleState } = this.props;
        const { LiarsDice } = drizzleState.contracts;
        const curAccount = drizzleState.accounts[0];
        
        const curRegistered = this.state.registeredPlayers[curAccount];
        if(!curRegistered) return "";
        // using the saved `dataKey`, get the variable we're interested in
        const numPlayers = LiarsDice.numPlayers[this.state.numPlayersKey];
        const curBidder = LiarsDice.curBidder[this.state.curBidderKey];
        // const turn = LiarsDice.turn[this.state.turnKey];
        const bidFace = LiarsDice.bidFace[this.state.bidFaceKey];
        const bidQuantity = LiarsDice.bidQuantity[this.state.bidQuantityKey];

        
        // if it exists, then we display its value
        if(numPlayers) console.log("numplayers", numPlayers.value);
        console.log("curAccount", curAccount)
        console.log("curBidder", curBidder)
        if(!curBidder || curBidder.value !== curAccount) return "Not Your Turn";
        return (
            <div>
                <form onSubmit={this.handleBid}>
                    <div className="form-group">
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
                            max={numPlayers && numPlayers.value*5}
                        />
                    </div>
                    <button>Bid</button>
                </form>
                <form onSubmit={this.handleChallenge}>
                    <button>Challenge</button>
                </form>
            </div>
        );
    }
}

export default BidChallenge;