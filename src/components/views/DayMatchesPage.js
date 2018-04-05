import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import DayMatch from '../DayMatch'


class DayMatchesPage extends React.Component {

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
        <h1 className='aHeadline' onClick={this.props.history.goBack}>Matches</h1>
          { league && <div>
            {league.day_matches && league.day_matches.map((match) => (
              <DayMatch key={match.id} match={match}/>
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
      day_matches{
        id
        difference
        winner_team_id
        loser_team_id
        matches{
          id
          score
          difference
          crawling
          winner_team_id
          loser_team_id
        }
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

const DayMatchesPageWithGraphQL = compose(
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
)(DayMatchesPage)

export default withRouter(DayMatchesPageWithGraphQL)
