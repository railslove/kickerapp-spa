import React from "react"
import PropTypes from "prop-types"
import Team from "./Team"
import PlayerSelectAndShow from "./PlayerSelectAndShow"
import styled from 'styled-components'
import posed from 'react-pose'

const Player = styled.div`
  position: relative;
  box-shadow: 0 0 6px #232323;
  height: 20vw;
  width: 20vw;
  overflow: hidden;
  background-position: center center;
  background-size: cover;
`
const Header = styled.div`
  padding: 20px;
`

const listProps = {
  open: {
    staggerChildren: 120
  },
  closed: {
    staggerChildren: 50,
  },
  initialPose: 'closed'
}

const TeamList = posed.div(listProps)


class Teams extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      teams: props.teams,
      player: null,
      filter_id: null,
      isOpen: false
    }
  }

  componentDidMount() {
    setTimeout(this.toggle, 20)
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen })

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
    player = player[0]
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
          <PlayerSelectAndShow size={1} league={this.props.league} playersSelected={this.filterTeams}/>
        </Header>
        <TeamList pose={ this.state.isOpen ? 'open' : 'close' }>{this.teamList()}</TeamList>
      </div>
    )
  }
}

Teams.propTypes = {
  league: PropTypes.object.isRequired
}

export default Teams
