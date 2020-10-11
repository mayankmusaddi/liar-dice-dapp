import React from "react";
import LDButton from "./components/LDButton";

export default function YourTurn({
  bidFace,
  bidQuantity,
  onBidFaceChange,
  onBidQuantityChange,
  numPlayers
                  }) {
  // const [faceValue, setFV] = React.useState();
  return (
    <div>
      <form>
        <input
          type={"number"}
          onChange={onBidFaceChange}
          value={bidFace}
          min={1}
          max={6}
        />
        <input
          type={"number"}
          onChange={onBidQuantityChange}
          value={bidQuantity && bidQuantity.value}
          min={1}
          max={numPlayers*5}
        />
        <LDButton title={"Bid"} titleStyle={{fontWeight: "bold", paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5}}/>
      </form>
        <LDButton title={"Challenge"} titleStyle={{fontWeight: "bold", paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5}}/>

    </div>
  )
}