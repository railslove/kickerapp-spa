import React from 'react'
import Leagues from '../Leagues'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class SettingsPage extends React.Component {

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
        {localStorage.getItem('slug') && <div
          className='aLink asBack'
          onClick={this.props.history.goBack}
        >
          Back
        </div> }
        <h1 className='aHeadline withoutBack'>Choose your league</h1>
        <div className='aLeagueList'>
          {this.props.allLeaguesQuery.leagues && <Leagues leagues={this.props.allLeaguesQuery.leagues}/>}
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
