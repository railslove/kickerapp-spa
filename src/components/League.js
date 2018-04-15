import React from 'react'
import styled from 'styled-components'

const League = (props) => {
  const Wrapper = styled.div`
    padding-bottom: 10px;
    border-bottom: 1px solid #cdcdef;
    margin-bottom: 10px;
  `
  const Games = styled.span`
    font-size: 14px;
    color: #232323;
  `
  return (
    <div onClick={() => props.leagueSelected(props.league)}>
      <Wrapper>
        {props.league.name}
        <Games>{` (${props.league.matches_count} Games)`}</Games>
      </Wrapper>
    </div>
  )
}

export default League
