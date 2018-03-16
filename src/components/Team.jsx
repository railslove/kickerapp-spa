import React from 'react'
import styled from 'styled-components'

const Team = (props) => {
  const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    max-width: 400px;
    margin-bottom: 10px;
  `
  const Image = styled.div`
    width: 30vw;
    height: 30vw;
    background-position: center center;
    background-size: cover;
    max-width: 100px;
    max-height: 100px;
  `
  const TeamName = styled.div`
    position: relative;
    display: flex;
  `

  const TeamNameValue = styled.div`
    position: absolute;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    padding: 5px 10px;
    font-size: 12px;
    width: 100%;
  `

  const Content = styled.div`
    background: white;
    padding: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  `

  const Quota = styled.div`
    font-size: 26px;
  `

  const Percentage = styled.div`
    font-size: 14px;
    color: #ababcd;
  `

  const Position = styled.div`
    font-size: 30px;
    position: absolute;
    right: 10px;
    color: #dedefe;
  `

  return (
    <Wrapper>
      <TeamName>
        { props.team.player1 && <Image style={{backgroundImage: `url(${props.team.player1.image})`}}/> }
        { props.team.player2 && <Image style={{backgroundImage: `url(${props.team.player2.image})`}}/> }
        <TeamNameValue>{props.team.name}</TeamNameValue>
      </TeamName>
      <Content>
        <Quota>{props.team.score}</Quota>
        <Percentage>{props.team.percentage}%</Percentage>
        <Position>{props.team.position}</Position>
      </Content>
    </Wrapper>
  )
}

export default Team
