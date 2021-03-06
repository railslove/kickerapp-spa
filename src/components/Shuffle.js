import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { withRouter, Link } from 'react-router-dom'
import gql from 'graphql-tag'
import styled from 'styled-components'
import PlayerSelectAndShow from './PlayerSelectAndShow'
import posed from 'react-pose'
import Team from './Team'

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
`

const TeamWrapper = styled.div`
  max-width: 490px;
  margin: 0 auto;
  position: relative;
`


const Vs = styled.div`
  text-align: center;
  position: absolute;
  width: 100%;
  margin-top: -20px;
`

const TeamList = posed.div({})

class Shuffle extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      players: [],
      teams: []
    }
  }

  playersSelected(newPlayers){
    this.setState({players: newPlayers})
  }

  shuffle(){
    this.props.mutate({
      variables: { player1: parseInt(this.state.players[0].id, 10), player2: parseInt(this.state.players[1].id, 10), player3: parseInt(this.state.players[2].id, 10), player4: parseInt(this.state.players[3].id, 10) }
    })
    .then(({ data }) => {
      this.setState({teams: data.shuffle})
    }).catch((error) => {
      console.log('there was an error sending the query', error)
    })
  }

  render() {
    return (
      <div>
        <HeaderWrapper>
          <PlayerSelectAndShow
            size={4}
            league={this.props.league}
            playersSelected={this.playersSelected.bind(this)}
            shuffle='true'
          />
        </HeaderWrapper>
        {this.state.players.length >= 4 && this.state.teams.length !== 2 && <Button onClick={()=>this.shuffle()}>Shuffle</Button>}
        {
          this.state.teams.length === 2 && <TeamWrapper><TeamList pose='open'>
          <Team team={this.state.teams[0]}/>
          <Vs>VS</Vs>
          <Team team={this.state.teams[1]}/>
        </TeamList>
        <Link to={`match/new/${this.state.teams[0].player1.id}/${this.state.teams[1].player1.id}/${this.state.teams[0].player2.id}/${this.state.teams[1].player2.id}`}>
          <Button>Start Match</Button>
        </Link>
      </TeamWrapper>
        }
      </div>
    )
  }
}

const shuffleQuery = gql`
  mutation($player1: Int!, $player2: Int!, $player3: Int!, $player4: Int!){
    shuffle(player1_id: $player1, player2_id: $player2, player3_id: $player3, player4_id: $player4) {
      id
      name
      score
      percentage
      player1 {
        id
        image
        name
      }
      player2 {
        id
        image
        name
      }
    }
  }
`

Shuffle.propTypes = {
  league: PropTypes.object.isRequired
}

const shuffleQueryWithData = graphql(shuffleQuery)(Shuffle)

export default withRouter(shuffleQueryWithData)
