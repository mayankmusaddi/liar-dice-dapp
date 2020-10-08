import React from "react";

class ReadString extends React.Component {
    state = { dataKey: null, account: null };

    componentDidMount() {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.MyStringStore;
        // const drizzleState = drizzle.store.getState();
        
        // let drizzle know we want to watch the `myString` method
        const dataKey = contract.methods["myString"].cacheCall();
        const account =  this.props.drizzleState.accounts[0];

        // save the `dataKey` to local component state for later reference
        this.setState({ dataKey, account });
    }

    render() {
        // get the contract state from drizzleState
        const { MyStringStore } = this.props.drizzleState.contracts;

        // using the saved `dataKey`, get the variable we're interested in
        const myString = MyStringStore.myString[this.state.dataKey];
        const myAccount = MyStringStore.myString[this.state.account];

        // if it exists, then we display its value
        return <><p>My stored string: {myString && myString.value}</p>
                    <p>My Connected Account : {myAccount && myAccount.value}</p>
                </>;
    }
}

export default ReadString;