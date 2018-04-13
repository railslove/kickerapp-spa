import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import styled from 'styled-components'
import PlayerSelectAndShow from './PlayerSelectAndShow'
import Score from './Score'

const Button = styled.button`
  background: #ababcd;
  padding: 10px;
  width: 50vw;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  font-size: 18px;
  color: white;
  display: block;
  margin-bottom: 20px;
`


class AddMatch extends React.Component {

  constructor (props) {
    super(props)
    localStorage.setItem('sets', [])
    this.state = {
      team1: [],
      team2: [],
      sets: [],
      completed: false
    }
  }

  setScore(goals){
    let newSets = this.state.sets
    newSets.push(goals)
    this.setState({sets: newSets})
  }

  playersSelected(team, newPlayers){
    let newState = {}
    if (team===1){
      newState = {team1: newPlayers}
      if(this.state.team2.length > 1 && newPlayers.length > 1){
        newState['çompleted'] = true
      }else{
        newState['completed'] = false
      }
    }else{
      newState = {team2: newPlayers}
      if(this.state.team1.length > 1 && newPlayers.length > 1){
        newState['completed'] = true
      }else{
        newState['completed'] = false
      }
    }
    this.setState(newState)
  }

  saveMatch(){
    let sets = []
    this.state.sets.forEach( (set) => {
      let localSet = {}
      localSet['score1'] = set[0]
      localSet['score2'] = set[1]
      sets.push(localSet)
    })
    localStorage.setItem('sets', sets)
    this.props.mutate({
      variables: { leagueSlug: localStorage.getItem('slug'), player1: parseInt(this.state.team1[0].id, 10), player2: parseInt(this.state.team1[1].id, 10), player3: parseInt(this.state.team2[0].id, 10), player4: parseInt(this.state.team2[1].id, 10), scores: sets }
    })
    .then(({ data }) => {
      console.log('saveMatch', data)
      this.props.gotoDayMatches()
      this.setState({teams: data.addMatch})
    }).catch((error) => {
      console.log('there was an error sending the query', error)
    })
  }


  render() {
    let index = -1
    let scores = this.state.sets.map(()=>{
      index = index+1
      return <Score key={index} score={this.setScore.bind(this)}/>
    })
    return (
      <div>
        {this.props.league && <div><PlayerSelectAndShow size={2} league={this.props.league} playersSelected={this.playersSelected.bind(this, 1)}/>
        <div>VS</div>
        <PlayerSelectAndShow size={2} league={this.props.league} playersSelected={this.playersSelected.bind(this, 2)}/></div> }
        {this.state.completed && <div>
          <Score score={this.setScore.bind(this)}/>
          { scores }
        </div>}
        { this.state.completed && this.state.sets.length > 0 &&  <Button onClick={()=> this.saveMatch()}>
          Save Match
        </Button> }
      </div>
    )
  }
}

const addMatch = gql`
  mutation($leagueSlug: String!, $player1: Int!, $player2: Int!, $player3: Int!, $player4: Int!, $scores: [ScoreInputType]){
    addMatch(leagueSlug: $leagueSlug,
      player1_id: $player1,
      player2_id: $player2,
      player3_id: $player3,
      player4_id: $player4,
      scores: $scores) {
        id
        difference
    }
  }
`

const addMatchWithData = graphql(addMatch)(AddMatch)

export default withRouter(addMatchWithData)
