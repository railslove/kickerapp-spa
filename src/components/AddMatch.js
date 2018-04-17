import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import styled from 'styled-components'
import PlayerSelectAndShow from './PlayerSelectAndShow'
import Score from './Score'

const Button = styled.button`
  background: #232323;
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

const HeaderWrapper = styled.div`
  background: #f8f8f8;
`


class AddMatch extends React.Component {

  constructor (props) {
    super(props)
    const preSelected1 = props.preTeam1 || []
    let preselectedPLayers1 = []
    const preSelected2 = props.preTeam2 || []
    let preselectedPLayers2 = []
    if(props.league){
      preselectedPLayers1 = props.league.users.filter((user) => (
        preSelected1.indexOf(parseInt(user.id)) > -1
      ))
      preselectedPLayers2 = props.league.users.filter((user) => (
        preSelected2.indexOf(parseInt(user.id)) > -1
      ))
    }
    this.state = {
      team1: preselectedPLayers1,
      team2: preselectedPLayers2,
      sets: [],
      completed: preselectedPLayers1.length === 2 && preselectedPLayers2.length === 2
    }
  }

  setScore(goals){
    let newSets = this.state.sets
    newSets.push(goals)
    this.setState({sets: newSets})
  }

  playersSelected(newPlayers){
    let copyPlayers = newPlayers.slice(0)
    let newState = {}
    let team1 = copyPlayers.splice(0,2)
    let complete = (team1.length > 1 && copyPlayers.length > 1)
    newState = {team1: team1, team2: copyPlayers, completed: complete}
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
    this.props.mutate({
      variables: { leagueSlug: localStorage.getItem('slug'), player1: parseInt(this.state.team1[0].id, 10), player2: parseInt(this.state.team1[1].id, 10), player3: parseInt(this.state.team2[0].id, 10), player4: parseInt(this.state.team2[1].id, 10), scores: sets }
    })
    .then(({ data }) => {
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
        <h1 className='aHeadline asLarge'>
          {`${this.state.completed ? 'Lineup' : 'Choose Players'}`}
          <div className='aHeadline-sub'>New game</div>
        </h1>
        {this.props.league && <HeaderWrapper><PlayerSelectAndShow preSelect={this.state.team1.concat(this.state.team2)} break={true} size={4} league={this.props.league} playersSelected={this.playersSelected.bind(this)}/>
        </HeaderWrapper> }
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
