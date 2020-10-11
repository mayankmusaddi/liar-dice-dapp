import React from 'react';
import './App.css';
import GameInformation from './GameInformation';
import BidChallenge from './BidChallenge';
import Intro from './Intro';
import Roll from './Roll';

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
        <Intro 
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        {/* <GameInformation
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        /> */}
        <BidChallenge
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <Roll
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      </div>
    );
  }
}

export default App;
