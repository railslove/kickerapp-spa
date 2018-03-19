import React from 'react'
import Leagues from '../Leagues'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PlayerSelect from "../PlayerSelect"
import Player from "../JustPlayer"
import styled from 'styled-components'

const Players = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`
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
`

class ShufflePage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      players: []
    }
  }

  selectUser(player){
    if(this.state.players.indexOf(player) < 0){
      let newPlayers = this.state.players
      newPlayers.push(player)
      this.setState({players: newPlayers})
    }
  }

  playerClicked(position){
    let newPlayers = this.state.players
    newPlayers.splice(position, 1)
    this.setState({players: newPlayers})
  }

  render() {
    if (this.props.shuffleQuery.loading) {
      return (
        <div className='aLoading'>
          <div>
            Loading
          </div>
        </div>
      )
    }
    const league = this.props.shuffleQuery.leagues[0]
    return (
      <div>
        <h1 onClick={this.props.history.goBack} className={`aHeadline ${localStorage.getItem('slug') ? '' : 'withoutBack'}`}>Shuffle</h1>
        <Players>
          <Player playerClicked={this.playerClicked.bind(this)} position={0} player={this.state.players[0]}/>
          <Player playerClicked={this.playerClicked.bind(this)} position={1} player={this.state.players[1]}/>
          <Player playerClicked={this.playerClicked.bind(this)} position={2} player={this.state.players[2]}/>
          <Player playerClicked={this.playerClicked.bind(this)} position={3} player={this.state.players[3]}/>
        </Players>
        { this.state.players.length < 4 && <PlayerSelect players={league.users} filter={this.selectUser.bind(this)}/> }
        {this.state.players.length >= 4 && <Button>Shuffle</Button>}
      </div>
    )
  }
}


const SHUFFLE_QUERY = gql`
  query ShuffleQuery($id: String!) {
    leagues(league_slug: $id) {
      id
      slug
      users{
        id
        name
        image
      }
    }
  }
`

const ShufflePageWithQuery = graphql(SHUFFLE_QUERY, {
  name: 'shuffleQuery',
  options: ({match}) => ({
    variables: {
      id: localStorage.getItem('slug'),
    },
  }),
})(ShufflePage)


export default ShufflePageWithQuery
