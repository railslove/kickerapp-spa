import React from 'react'
import Leagues from '../Leagues'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class SettingsPage extends React.Component {

  selectLeague(league) {
    localStorage.setItem('slug', league.slug)
    this.props.history.push('/')
  }

  render() {
    if (this.props.allLeaguesQuery.loading) {
      return (
        <div className='aLoading'>
          <div>
            Loading
          </div>
        </div>
      )
    }

    return (
      <div className={'aWrapper'}>
        <div className='aLeagueList'>
          {this.props.allLeaguesQuery.leagues && <Leagues leagues={this.props.allLeaguesQuery.leagues} selectLeague={this.selectLeague.bind(this)}/>}
        </div>
      </div>
    )
  }
}


const ALL_LEAGUES_QUERY = gql`
  query AllLeaguesQuery {
    leagues(limit: 100) {
      id
      slug
      name
      matches_count
    }
  }
`

const SettingsPageWithQuery = graphql(ALL_LEAGUES_QUERY, {
  name: 'allLeaguesQuery',
  options: {
    fetchPolicy: 'network-only',
  },
})(SettingsPage)


export default SettingsPageWithQuery
