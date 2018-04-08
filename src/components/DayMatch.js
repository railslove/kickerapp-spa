import React from 'react'
import styled from 'styled-components'
import MatchUser from './MatchUser'

const DayMatch = (props) => {

  const Wrapper = styled.div`
    margin-bottom: 40px;
    max-width: 350px;
  `
  const Team = styled.div`
    display: flex;
    align-items: center;
  `

  const Difference = styled.div`
    padding: 0 20px;
    color: #43BE47;
    font-weight: bold;
    font-size: 20px;
    &.asLost{
      color: #DB624A;
    }
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
  `

  let sets = props.match.matches.map((set)=>(
    <div key={set.id}>
      {set.winner_team_id == props.match.winner_team.id ? set.score : set.score.split('').reverse().join('')}
      { ` - ${set.difference}` }
    </div>
  ))

  return (
    <Wrapper>
      <Team>
        <MatchUser user={props.match.winner_team.player1}/>
        <Difference>{ props.match.difference }</Difference>
        { props.match.winner_team.player2 && <MatchUser user={props.match.winner_team.player2} reverse={true}/> }
      </Team>
      <Score>{sets}</Score>
      <Team>
        <MatchUser user={props.match.loser_team.player1}/>
        <Difference className='asLost'>{ props.match.difference }</Difference>
        { props.match.loser_team.player2 && <MatchUser user={props.match.loser_team.player2} reverse={true}/> }
      </Team>
    </Wrapper>
  )
}

export default DayMatch
