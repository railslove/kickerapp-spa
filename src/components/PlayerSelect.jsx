import React from "react"
import PropTypes from "prop-types"
import styled from 'styled-components'
import Player from "./JustPlayer"

const Wrapper = styled.div`
  flex: 1;
  position: relative
`

const Players = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 10px 0;
  > div{
    margin-bottom: 7px;
    margin-right: 7px;
  }
`

class PlayerSelect extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      players: props.players,
      searchTerm: '',
      active: props.active || false
    }
  }

  filter(){
    let filter = new RegExp(this.playerName.value, 'gi')
    let filteredPlayers = this.props.players.filter((player)=> {
      return player.name.match(filter)
    })
    this.setState({players: filteredPlayers, searchTerm: this.playerName.value})
  }

  select(player){
    this.playerName.value = ''
    this.setState({searchTerm: ''})
    this.props.filter(player)
    this.playerName.focus()
  }

  activate(){
    this.setState({active: true})
  }

  playerList(){
    if(!this.state.active && !this.props.active){
      return null
    }
    const playerList = this.state.players.map((player) => {
      return <Player key={player.id} player={player} playerClicked={()=> this.select(player)}/>
    })
    return <Players>{playerList}</Players>
  }


  render () {
    return (
      <Wrapper>
        <input type='text' placeholder='Filter players by name' onFocus={() => this.activate()} onChange={() => this.filter()} ref={(input) => { this.playerName = input; }}/>
        { this.playerList()}
      </Wrapper>
    )
  }
}

export default PlayerSelect
