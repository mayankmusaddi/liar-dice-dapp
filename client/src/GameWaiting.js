import React from "react";

export default function GameWaiting({
  playerNo,
  numPlayer,
  remainingPlayers
                                    }) {
  return (
    <div>
      <p>You are <b>Player {playerNo}</b></p>
      <br/><br/>
      <p>Number of players in the game: {numPlayer}</p>
      <p>Waiting for {remainingPlayers} more player</p>
    </div>
  )
}