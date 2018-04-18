import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'

const Team = (props) => {
  const teamProps = {
    open: {
      left: 0
    },
    closed: {
      left: -100
    }
  }

  const Item = styled(posed.div(teamProps))`
    display: flex;
    width: 100%;
    max-width: 400px;
    margin-bottom: 10px;
    padding: 20px 0px;
    border-bottom: 1px solid #f3f3f3;
    overflow: hidden;
    position: relative;
    left: -100%;
  `

  const Position = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    color: #9b9b9b;
    font-size: 15px;
  `
  const Image = styled.div`
    height: 50px;
    width: 50px;
    flex-shrink: 0;
    background-color: #999;
    background-image: url(${props.team.player1.image});
    background-position: center top;
    background-size: cover;
    &.player2{
      background-image: url(${props.team.player2.image});
    }
  `
  const Content = styled.div`
    padding: 0 10px;
    flex: 1 0 0;
  `

  const Name = styled.div`
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    color: #4a4a4a;
  `

  const Quota = styled.div`
    font-size: 15px;
    color: #9b9b9b;
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    padding-right: 10px;
    height: 100%;
    background: white;
    padding-left: 10px;
    top: 0;
  `

  return (
    <Item>
      <Position className='headlineFont'>
        {props.team.position < 10 ? `0${props.team.position}` : props.team.position}
      </Position>
      <Image/>
      <Image className='player2'/>
      <Content>
        <Name>{props.team.player1.name}</Name>
        <Name>{props.team.player2.name}</Name>
      </Content>
      <Quota>{props.team.score}</Quota>
    </Item>
  )
}

export default Team
