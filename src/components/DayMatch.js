import React from 'react'
import styled from 'styled-components'


const DayMatch = (props) => {

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
    flex-direction: column;
    min-width: 40px;
    min-height: 40px;
    justify-content: center;
    align-items: center;
    background: white;
    padding: 5px 10px;
    z-index: 1;
    position: relative;
    margin-left: -10px;
    margin-right: -10px;
    box-shadow: 0 0 20px #999;
  `
  let sets = props.match.matches.map((set)=>(
    <div key={set.id}>
      {set.winner_team_id == props.match.winner_team.id ? set.score : set.score.split('').reverse().join('')}
      { ` - ${set.difference}` }
    </div>
  ))

  return (
    <Wrapper>
      <Image style={{backgroundImage: `url(${props.match.winner_team.player1.image})`}}/>
      { props.match.winner_team.player2 && <Image style={{backgroundImage: `url(${props.match.winner_team.player2.image})`}}/> }
      <Score>{sets}</Score>
      <Image style={{backgroundImage: `url(${props.match.loser_team.player1.image})`}}/>
      { props.match.loser_team.player2 && <Image style={{backgroundImage: `url(${props.match.loser_team.player2.image})`}}/> }
    </Wrapper>
  )
}

export default DayMatch
