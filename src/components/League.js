import React from 'react'
import styled from 'styled-components';

const League = (props) => {
  const Wrapper = styled.div`
    padding-bottom: 10px;
    border-bottom: 1px solid #cdcdef;
    margin-bottom: 10px;
  `
  return (
    <div onClick={() => props.leagueSelected(props.league)}>
      <Wrapper>
        {props.league.name}
        {` (${props.league.matches_count})`}
      </Wrapper>
    </div>
  )
}

export default League;
