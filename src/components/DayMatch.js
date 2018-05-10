import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Set from './Set'
import { Link } from 'react-router-dom'

const DayMatch = (props) => {

  const Wrapper = styled.div`
    max-width: 425px;
    width: 100%;
    border-bottom: 1px solid #9b9b9b;
  `
  const Team = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `
  const Image = styled.div`
    width: 60px;
    height: 60px;
    background-position: center top;
    background-size: cover;
    margin-right: 5px;
  `

  const Images = styled.div`
    display: flex;
    padding: 10px;
  `

  const Difference = styled.div`
    padding: 0 20px;
    color: #626262;
    font-size: 19px;
  `

  const Score = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    background: #f7f7f7;
    padding: 10px
  `

  const Sets = styled.div`
    display: flex;
  `
  const Names = styled.div`
    flex: 1;
    color: #9b9b9b;
  `
  const TeamNames = styled.div`
    height: 60px;
    font-size: 13px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &.first{
      border-bottom: 1px solid #d6d6d6;
    }
  `

  const Rematch = styled.div`
    border-top: 1px solid #d6d6d6;
    color: #9b9b9b;
    font-size: 13px;
    padding: 10px 20px;
  `

  let sets = props.match.matches.map((set)=>{
    return <Set key={set.id} data={set}
      winner={set.winner_team_id == props.match.winner_team.id}/>
  })

  return (
    <Wrapper>
      <Team>
        <Images><Image style={{backgroundImage: `url(${props.match.winner_team.player1.image})`}} />
        { props.match.winner_team.player2 && <Image style={{backgroundImage: `url(${props.match.winner_team.player2.image})`}} /> }</Images>
      <Difference className='headlineFont'>+{ props.match.difference }</Difference>
      </Team>
      <Score>
        <Names>
          <TeamNames className='first'>
            <div>{props.match.winner_team.player1.name}</div>
            <div>{props.match.winner_team.player2 && props.match.winner_team.player2.name}</div>
          </TeamNames>
          <TeamNames>
            <div>{props.match.loser_team.player1.name}</div>
            <div>{props.match.loser_team.player2 && props.match.loser_team.player2.name}</div>
          </TeamNames>
        </Names>
        <Sets>{sets}</Sets>
      </Score>
      <Team>
        <Images><Image style={{backgroundImage: `url(${props.match.loser_team.player1.image})`}} />
        { props.match.loser_team.player2 && <Image style={{backgroundImage: `url(${props.match.loser_team.player2.image})`}} /> }</Images>
      <Difference className='headlineFont asLost'>-{ props.match.difference }</Difference>
      </Team>
      { props.match.winner_team.player2 && <Link to={`match/new/${props.match.winner_team.player1.id}/${props.match.loser_team.player1.id}/${props.match.winner_team.player2.id}/${props.match.loser_team.player2.id}`}>
        <Rematch className='headlineFont'>+ Rematch</Rematch>
      </Link> }
      { !props.match.winner_team.player2 && <Link to={`match/new/${props.match.winner_team.player1.id}/${props.match.loser_team.player1.id}}`}>
        <Rematch className='headlineFont'>+ Rematch</Rematch>
      </Link> }
    </Wrapper>
  )
}

DayMatch.propTypes = {
  match: PropTypes.object.isRequired
}

export default DayMatch
