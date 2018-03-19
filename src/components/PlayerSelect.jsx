import React from "react"
import PropTypes from "prop-types"
import styled from 'styled-components'

const Wrapper = styled.div`
  flex: 1;
`

const Players = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -10px;
  padding: 10px 0;
`

const Player = styled.div`
  position: relative;
  box-shadow: 0 0 6px #bcbcde;
  height: 20vw;
  width: 20vw;
  margin-bottom: 10px;
  margin-right: 10px;
  overflow: hidden;
  background-position: center center;
  background-size: cover;
`

const Name = styled.div`
  position: absolute;
  bottom: 0;
  background: rgba(255,255,255,0.85);
  width: 100%;
  font-size: 10px;
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

class PlayerSelect extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      players: props.players,
      searchTerm: ''
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

  playerList(){
    if(this.state.searchTerm == ''){
      return null
    }
    const playerList = this.state.players.map((player) => {
      return <Player key={player.id} style={{backgroundImage: `url(${player.image})`}} onClick={() => this.select(player)}>
        <Name>{player.name}</Name>
      </Player>
    })
    return <Players>{playerList}</Players>
  }


  render () {
    return (
      <Wrapper>
        <input type='text' placeholder='Filter players by name' onChange={() => this.filter()} ref={(input) => { this.playerName = input; }}/>
        { this.playerList()}
      </Wrapper>
    )
  }
}

export default PlayerSelect
