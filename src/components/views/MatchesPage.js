import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'


class MatchesPage extends React.Component {

  render() {
    if (this.props.matchesQuery.loading) {
      return (
        <div className='aLoading'>
          <div>
            Loading
            (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})
          </div>
        </div>
      )
    }

    const league = this.props.matchesQuery.leagues[0]
    return (
      <div>
        <h1>{league.name}</h1>
          <div
            className='aLink asBack'
            onClick={this.props.history.goBack}
          >
            'Zurück'
          </div>
          <div className='aUserList'>
            {league.matches && league.matches.map(match => (
              <div key={match.id}>{match.score}</div>
            ))}
          </div>
      </div>
    )
  }
}


const MATCHES_QUERY = gql`
  query MatchesQuery($id: String!) {
    leagues(league_slug: $id) {
      id
      name
      matches{
        id
        score
      }
    }
  }
`

const MatchesPageWithGraphQL = compose(
  graphql(MATCHES_QUERY, {
    name: 'matchesQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({match}) => ({
      variables: {
        id: 'railslove-2018',
      },
    }),
  })
)(MatchesPage)

export default withRouter(MatchesPageWithGraphQL)
