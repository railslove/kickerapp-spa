import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import styled from 'styled-components'
import PlayerSelectAndShow from './PlayerSelectAndShow'
import Score from './ScoreInput'

const Button = styled.button`
  background: #62c69a;
  border-radius: 30px;
  padding: 10px;
  width: 50vw;
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
  font-size: 18px;
  color: white;
  display: block;
  border: none;
`

const HeaderWrapper = styled.div`
  background: #f8f8f8;
  margin-bottom: 20px;
`

const AddSet = styled.div`
  border: 1px solid #62c69a;
  width: 100px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  border-radius: 8px;
  font-size: 19px;
  color: #62c69a;
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
        preSelected1.indexOf(parseInt(user.id, 10)) > -1
      ))
      preselectedPLayers2 = props.league.users.filter((user) => (
        preSelected2.indexOf(parseInt(user.id, 10)) > -1
      ))
    }
    this.state = {
      team1: preselectedPLayers1,
      team2: preselectedPLayers2,
      sets: new Map(),
      setCount: 3,
      completed: preselectedPLayers1.length === 2 && preselectedPLayers2.length === 2
    }
  }

  setScore(set, goals, crawling){
    let newSets = this.state.sets
    newSets.set(set, {goals: goals, crawling: crawling})
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

    for (var [index, set] of this.state.sets) {
      let localSet = {}
      localSet['score1'] = set.goals[0]
      localSet['score2'] = set.goals[1]
      localSet['crawling'] = set.crawling
      sets.push(localSet)
    }

    this.props.mutate({
      variables: { leagueSlug: localStorage.getItem('slug'), player1: parseInt(this.state.team1[0].id, 10), player2: parseInt(this.state.team1[1].id, 10), player3: parseInt(this.state.team2[0].id, 10), player4: parseInt(this.state.team2[1].id, 10), scores: sets }
    })
    .then(({ data }) => {
      this.props.gotoDayMatches()
    }).catch((error) => {
      console.log('there was an error sending the query', error)
    })
  }


  render() {
    let sets = []
    for (let step = 0; step < this.state.setCount; step++) {
      sets.push(<Score key={step} index={step} score={this.setScore.bind(this)}/>)
    }
    return (
      <div>
        <h1 className='aHeadline asLarge'>
          {`${this.state.completed ? 'Lineup' : 'Choose Players'}`}
          <div className='aHeadline-sub'>New game</div>
        </h1>
        {this.props.league && <HeaderWrapper><PlayerSelectAndShow preSelect={this.state.team1.concat(this.state.team2)} break={true} size={4} league={this.props.league} playersSelected={this.playersSelected.bind(this)}/>
        </HeaderWrapper> }
        {this.state.completed && <div>
          <h4 className='aHeadline asSmall'>Result</h4>
          { sets }
          <AddSet className='headlineFont' onClick={()=>this.setState({setCount: this.state.setCount + 1})}>+</AddSet>
        </div>}
        { this.state.completed && this.state.sets.size > 0 &&  <Button onClick={()=> this.saveMatch()}>
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
