import React from 'react'
import styled from 'styled-components'
import TopPosition from "./TopPosition"

const TopPositions = (props) => {

  const TopPositionsElement = styled.div`
    padding: 20px 5px;
    display: flex;
    max-width: 360px;
    justify-content: space-around;
    align-items: flex-end;
    overflow: hidden;
    flex: 1;
  `
  const TopPositionsWrapper = styled.div`
    background: #f8f8f8;
    display: flex;
    justify-content: center;
  `

  return (
    <TopPositionsWrapper>
      <TopPositionsElement>
        <TopPosition user={props.topUsers[1]} index={2}/>
        <TopPosition user={props.topUsers[0]} index={1}/>
        <TopPosition user={props.topUsers[2]} index={3}/>
      </TopPositionsElement>
    </TopPositionsWrapper>
  )
}

export default TopPositions;
