import React from "react"
import LDButton from "./components/LDButton";

function Intro(props) {
  return (
    <div style={{display: "flex", alignSelf:"center", flexDirection:"column"}}>
      <h1>Welcome to Liar’s Dice</h1>
      <h3>Connect your Metamask account to play:</h3>
      <h4>Connected Account : 0xDVSN234NLJ2224</h4>

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
        <LDButton title={"Register"} titleStyle={{alignSelf:"center",fontWeight: "bold", width: "350px", padding: 10}}/>
    </div>
  )
}

export default Intro