import React from "react"
import styled from 'styled-components'

const PlayerSelect = (props) => {
  const Wrapper = styled.div`
    padding: 10px 0;
  `

  const options = props.players.map((player) => {
    return (
      <option key={player.id} value={player.id}>{player.name}</option>
    )
  })

  return (
    <Wrapper>
      <select onChange={(event) => { props.filterTeams(parseInt(event.target.value)) }}>
        <option>Nach Spieler filtern</option>
        {options}
      </select>
    </Wrapper>
  )
}

export default PlayerSelect
