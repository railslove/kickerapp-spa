import React from 'react'
import League from '../League'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class SettingsPage extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.allLeaguesQuery.refetch()
    }
  }

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
            (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})
          </div>
        </div>
      )
    }

    return (
      <div className={'aWrapper'}>
        {localStorage.getItem('slug') && <div
          className='aLink asBack'
          onClick={this.props.history.goBack}
        >
          Zurück
        </div> }
        <h1 className='aHeadline withoutBack'>Wähle deine Liga</h1>
        <div className='aLeagueList'>
          {this.props.allLeaguesQuery.leagues && this.props.allLeaguesQuery.leagues.map(league => (
            <League
              key={league.id}
              league={league}
              leagueSelected={this.selectLeague.bind(this)}
              refresh={() => this.props.allLeaguesQuery.refetch()}
            />
          ))}

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
