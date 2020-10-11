import React from "react"

export default function PlayerInfo ({
  infos
                     }) {
  return (
    infos.map(info => <p>{info}</p>)
  )
}