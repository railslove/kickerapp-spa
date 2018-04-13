import React from 'react'
import styled from 'styled-components'
import MatchUser from './MatchUser'

const DayMatch = (props) => {

  const Wrapper = styled.div`
    margin-bottom: 20px;
    padding-bottom: 20px;
    max-width: 350px;
    width: 100%;
    border-bottom: 1px solid #cdcdcd;
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
    min-width: 24px;
    text-align: center;
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
    display: flex;
    justify-content: center;
    margin: 10px 0;
  `

  const Set = styled.div`
    margin: 0 10px;
    line-height: 100%;
    .score{
      border: 1px solid #999;
      padding: 5px;
    }
    .points{
      font-size: 14px;
      margin: 5px 0;
      color: #43BE47;
      height: 14px;
      text-align: center;
    }
  `

  let sets = props.match.matches.map((set)=>{
    if(set.winner_team_id == props.match.winner_team.id){
      return <Set key={set.id}>
        <div className='points'>{set.difference}</div>
        {set.score.split(':').map((s)=>(<div className='score'>{s}</div>))}
        <div className='points'/>
      </Set>
    }else{
      return <Set key={set.id}>
        <div className='points'/>
        {set.score.split(':').reverse().map((s)=>(<div className='score'>{s}</div>))}
        <div className='points'>{set.difference}</div>
      </Set>
    }
  })

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
