import React from "react";
import ReactDice from "react-dice-complete";
import 'react-dice-complete/dist/react-dice-complete.css'

export default ({
  numDice,
  containerStyle
                }) => {
  return (
    <div style={containerStyle}>
      <p>Your Roll</p>
      <ReactDice
        numDice={numDice}
        faceColor={"#ffffff"}
        dotColor={"#000000"}
        disableIndividual={true}
      />
    </div>
  )
}

