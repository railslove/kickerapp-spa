import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import styled from 'styled-components'
import PlayerSelect from "./PlayerSelect"
import Player from "./JustPlayer"
import Team from "./Team"

const Players = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

class PlayerSelectAndShow extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      players: [],
      teams: []
    }
  }

  selectUser(player){
    if(this.state.players.indexOf(player) < 0){
      let newPlayers = this.state.players
      newPlayers.push(player)
      this.props.playersSelected(newPlayers)
      this.setState({players: newPlayers})
    }
  }

  playerClicked(position){
    let newPlayers = this.state.players
    newPlayers.splice(position, 1)
    this.props.playersSelected(newPlayers)
    this.setState({players: newPlayers})
  }

  render() {
    let players = []
    for (let i = 0; i < this.props.size; i++) {
      players.push(<Player key={i} playerClicked={this.playerClicked.bind(this)} position={0} player={this.state.players[i]}/>)
    }

    return (
      <div>
        <Players>
          { players }
        </Players>
        { this.state.players.length < this.props.size && <PlayerSelect players={this.props.league.users} filter={this.selectUser.bind(this)}/> }
      </div>
    )
  }
}

export default withRouter(PlayerSelectAndShow)
