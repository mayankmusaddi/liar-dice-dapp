import React from "react";

export default function GameFinish({
  playerWon,
  bidFace,
  bidQuantity
                                   }) {
  return (
    <div>

      <p> Player {playerWon} has won the challenge</p>
      <p> There were {bidQuantity} dices of Face {bidFace}</p>
    </div>
  )
}