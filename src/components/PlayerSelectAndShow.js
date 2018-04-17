import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import styled from 'styled-components'
import PlayerSelect from "./PlayerSelect"
import Player from "./JustPlayer"
import Team from "./Team"

const Wrapper = styled.div`
  padding: 10px;
`

const Players = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  .seperator{
    display: flex;
    align-items: center;
  }
`

class PlayerSelectAndShow extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      players: props.preSelect || [],
      selectActive: false
    }
  }

  addPlayer(player){
    if(this.state.players.indexOf(player) < 0){
      let newPlayers = this.state.players
      newPlayers.push(player)
      console.log('newPlayers', newPlayers);
      this.setState({players: newPlayers})
      this.props.playersSelected(newPlayers)
    }
  }

  playerTopBarClicked(position){
    let newPlayers = this.state.players

    if(position < newPlayers.length){
      newPlayers.splice(position, 1)
      this.props.playersSelected(newPlayers)
      this.setState({players: newPlayers})
    }else{
      this.setState({selectActive: true})
    }

  }

  render() {
    console.log('RENDER', this.state.players);
    let players = []
    for (let i = 0; i < this.props.size; i++) {
      players.push(<Player key={i} playerClicked={ this.playerTopBarClicked.bind(this)} position={i} player={this.state.players[i]}/>)
      if(this.props.break && i === (this.props.size/2 - 1)){
        players.push(<div key='seperator' className='seperator headlineFont'>-</div>)
      }
    }
    return (
      <Wrapper>
        <Players>
          { players }
        </Players>
        { this.state.players.length < this.props.size && <PlayerSelect players={this.props.league.users}
        active={this.state.selectActive}
        filter={this.addPlayer.bind(this)}/> }
      </Wrapper>
    )
  }
}

export default PlayerSelectAndShow
