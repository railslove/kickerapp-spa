import React from 'react'
import PropTypes from 'prop-types'
import Team from "./Team"
import PlayerSelect from "./PlayerSelect"
import JustPlayer from "./JustPlayer"
import styled from 'styled-components'
import posed from 'react-pose'

const Header = styled.div`
  padding: 20px 10px;
  background: #f8f8f8;
  position: relative;
  > div:last-child{
    position: absolute;
    top: 20px;
    right: 10px
  }
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
          <PlayerSelect players={this.props.league.users} filter={this.filterTeams} onTeams={true}/>
          <JustPlayer player={this.state.player} small={true} playerClicked={this.resetFilter.bind(this)}/>
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
