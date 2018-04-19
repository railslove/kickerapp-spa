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
  max-width: 490px;
  margin: 0 auto;
  &.as1{
    display: flex;
    flex-direction: row-reverse;
    > div{
      margin-bottom: 0;
      &:first-child{
        margin-left: 20px;
      }
    }
    input{
      margin-top: 10px;
      margin-right: 20px;
      margin-bottom: 10px;
    }
  }
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
      this.setState({players: newPlayers, selectActive: newPlayers.length >= this.props.size})
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
    let players = []
    for (let i = 0; i < this.props.size; i++) {
      players.push(<Player key={i} playerClicked={ this.playerTopBarClicked.bind(this)} position={i} player={this.state.players[i]}/>)
      if(this.props.break && i === (this.props.size/2 - 1)){
        players.push(<div key='seperator' className='seperator headlineFont'>-</div>)
      }
    }
    return (
      <Wrapper className={`as${this.props.size}`}>
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
