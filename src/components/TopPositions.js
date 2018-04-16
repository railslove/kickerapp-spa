import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import TopPosition from "./TopPosition"

const TopPositions = (props) => {

  const topProps = {
    open: {
      delayChildren: 600,
      staggerChildren: 300
    },
    closed: {
      staggerChildren: 300,
    },
    initialPose: 'closed'
  }

  const TopPositionsElement = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap-reverse;
    max-width: 360px;
    justify-content: space-around;
  `
  const TopPositionsWrapper = styled(posed.div(topProps))`
    background: #232323;
    background: repeating-linear-gradient(
      -25deg,
      #232323,
      #232323 40px,
      #323232 40px,
      #323232 80px
    );
    display: flex;
    justify-content: center;
  `

  return (
    <TopPositionsWrapper>
      <TopPositionsElement>
        <TopPosition user={props.topUsers[2]} index={3}/>
        <TopPosition user={props.topUsers[1]} index={2}/>
        <TopPosition user={props.topUsers[0]} index={1}/>
      </TopPositionsElement>
    </TopPositionsWrapper>
  )
}

export default TopPositions;
