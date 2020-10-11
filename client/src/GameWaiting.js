import React from "react";

export default function GameWaiting({
  playerNo,
  numPlayer,
  remainingPlayers
                                    }) {
  return (
    <div style={{display:"flex", flex:1 ,flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <p style={{flex:2}}>You are <b>Player {playerNo}</b></p>
      <br/><br/>
      <div style={{flex:2}}>
        <p>Number of players in the game: {numPlayer}</p>
        <p>Waiting for {remainingPlayers} more player</p>
      </div>
    </div>
  )
}