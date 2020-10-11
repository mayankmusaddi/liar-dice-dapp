import React from "react";

import DiceImage from "./components/DiceImage";

export default function LastBid({
  value,
  bidValue,
  containerStyle
                                }) {
  return (
    <div style={{display: "flex", alignItems:"center", justifyContent:"center", ...containerStyle}} >
      <b>Last Bid: {bidValue} of &nbsp;&nbsp;</b>
      <DiceImage roll={value}/>

    </div>
  )
}