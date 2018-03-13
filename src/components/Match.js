import React from 'react'
import styled from 'styled-components';


const Match = (props) => {

  const Wrapper = styled.div`
    display: flex;
    margin-bottom: 10px;
    align-items: center;
  `

  const Image = styled.div`
    width: 22vw;
    height: 22vw;
    background-position: center center;
    background-size: cover;
    max-width: 100px;
    max-height: 100px;
  `
  const Score = styled.div`
    display: flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    background: white;
    padding: 10px;
    z-index: 1;
    position: relative;
    margin-left: -10px;
    margin-right: -10px;
    box-shadow: 0 0 20px #999;
  `

  return (
    <Wrapper>
      <Image style={{backgroundImage: `url(${props.match.winner_team.player1.image})`}}/>
      { props.match.winner_team.player2 && <Image style={{backgroundImage: `url(${props.match.winner_team.player2.image})`}}/> }
      <Score>{props.match.score}</Score>
      <Image style={{backgroundImage: `url(${props.match.loser_team.player1.image})`}}/>
      { props.match.loser_team.player2 && <Image style={{backgroundImage: `url(${props.match.loser_team.player2.image})`}}/> }
    </Wrapper>
  )
}

export default Match;
