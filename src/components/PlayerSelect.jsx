import React from "react"
import styled from 'styled-components'

const PlayerSelect = (props) => {
  const Wrapper = styled.div`
    padding: 5px 0;
  `
  const Label = styled.div`
    margin-bottom: 10px;
  `

  const options = props.players.map((player) => {
    return (
      <option key={player.id} value={player.id}>{player.name}</option>
    )
  })

  return (
    <Wrapper>
      <Label>Nach Spieler filtern</Label>
      <select onChange={(event) => { props.filterTeams(parseInt(event.target.value)) }}>
        <option>Alle</option>
        {options}
      </select>
    </Wrapper>
  )
}

export default PlayerSelect
