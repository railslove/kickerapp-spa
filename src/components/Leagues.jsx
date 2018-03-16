import React from "react"
import PropTypes from "prop-types"
import League from "./League"

class Leagues extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      leagues: props.leagues,
    }
  }

  selectLeague(league) {
    localStorage.setItem('slug', league.slug)
    this.props.history.push('/')
  }

  leagueList = () => {
    let leagueListItems = this.state.leagues.map(league => (
      <League
        key={league.id}
        league={league}
        leagueSelected={this.selectLeague.bind(this)}
        refresh={() => this.props.allLeaguesQuery.refetch()}
      />
    ))
    return leagueListItems
  }

  filter(){
    let filter = new RegExp(this.symbol.value, 'gi')
    console.log('Filter: ', filter)
    let filteredLeagues = this.props.leagues.filter((league)=> {
      return league.name.match(filter)
    })
    this.setState({leagues: filteredLeagues})
  }


  render () {

    return (
      <div>
        <div>
          <input type='text' placeholder='Filter by name' onChange={() => this.filter()} ref={(input) => { this.symbol = input; }}/>
        </div>
        {this.leagueList()}
      </div>
    )
  }
}

Leagues.propTypes = {
  leagues: PropTypes.array.isRequired
}

export default Leagues
