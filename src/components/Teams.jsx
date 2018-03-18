import React from "react"
import PropTypes from "prop-types"
import Team from "./Team"
import PlayerSelect from "./PlayerSelect"
import styled from 'styled-components'

const Player = styled.div`
  position: relative;
  border: 1px solid red;
  height: 40px;
  width: 40px;
  overflow: hidden;
  background-position: center center;
  background-size: cover;
`
const Header = styled.div`
  display: flex;
`


class Teams extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      teams: props.teams,
      player: null,
      filter_id: null
    }
  }

  teamList = () => {
    let teamListItems = []
    this.state.teams.forEach( (team) => {
      teamListItems.push(<Team key={team.id} team={team}/>)
    })

    return teamListItems
  }

  resetFilter(){
    this.setState({teams: this.props.teams, player: null})
  }

  filterTeams = (player) => {
    console.log('FLTER', player)
    let teams = this.props.teams
    if (!isNaN(player.id)) {
      teams = this.props.teams.filter((team) => {
        return (team.player1 && team.player1.id === `${player.id}`) || (team.player2 && team.player2.id === `${player.id}`)
      })
    }
    this.setState({teams: teams, player: player})
  }

  render () {

    return (
      <div>
        <Header>
          <PlayerSelect players={this.props.players} filter={this.filterTeams}/>
          { this.state.player && <Player style={{backgroundImage: `url(${this.state.player.image})`}} onClick={() => this.resetFilter()}/> }
        </Header>
        {this.teamList()}
      </div>
    )
  }
}

Teams.propTypes = {
  teams: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired
}

export default Teams
