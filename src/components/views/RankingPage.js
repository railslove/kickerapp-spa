import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import User from '../User/User'
import gql from 'graphql-tag'


class RankingPage extends React.Component {

  render() {
    if (this.props.rankingQuery.loading) {
      return (
        <div className='aLoading'>
          <div
            className='aLink asBack'
            onClick={this.props.history.goBack}
          >'Zurück'</div>
          <div>
            Loading
            (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})
          </div>
        </div>
      )
    }

    const league = this.props.rankingQuery.leagues[0]
    return (
      <div>
        <h1 onClick={this.props.history.goBack}>{league.name}</h1>
          <div className='aUserList'>
            {league.ranking && league.ranking.map((user, index) => (
              <User key={user.name} index={index+1} user={user}/>
            ))}
          </div>
      </div>
    )
  }
}


const RANKING_QUERY = gql`
  query RankingQuery($id: String!) {
    leagues(league_slug: $id) {
      id
      name
      ranking{
        name
        quota
        image
      }
    }
  }
`

const RankingPageWithGraphQL = compose(
  graphql(RANKING_QUERY, {
    name: 'rankingQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({match}) => ({
      variables: {
        id: localStorage.getItem('slug'),
      },
    }),
  })
)(RankingPage)

export default withRouter(RankingPageWithGraphQL)
