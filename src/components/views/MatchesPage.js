import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import Match from '../Match'


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

    const league = this.props.matchesQuery.leagues && this.props.matchesQuery.leagues[0]
    return (
      <div>
        <h1 className='aHeadline' onClick={this.props.history.goBack}>{league && league.name}</h1>
          { league && <div className='aUserList'>
            {league.matches && league.matches.map(match => (
              <Match key={match.id} match={match}/>
            ))}
          </div> }
      </div>
    )
  }
}


const MATCHES_QUERY = gql`
  query MatchesQuery($id: String!) {
    leagues(league_slug: $id) {
      id
      name
      matches(limit: 30) {
        id
        score
        winner_team {
          id
          player1 {
            name
            image
          }
          player2 {
            name
            image
          }
        }
        loser_team {
          id
          player1 {
            name
            image
          }
          player2 {
            name
            image
          }
        }
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
        id: localStorage.getItem('slug'),
      },
    }),
  })
)(MatchesPage)

export default withRouter(MatchesPageWithGraphQL)
