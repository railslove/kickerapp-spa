import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Badge from '../Badge'
import gql from 'graphql-tag'
import styled from 'styled-components'

const Badges = styled.div`
  background: #eee;
  padding: 10px;
`

class BadgesPage extends React.Component {

  render() {
    if (this.props.badgesQuery.loading) {
      return (
        <div className='aLoading'>
          <div>
            Loading
            (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})
          </div>
        </div>
      )
    }

    const league = this.props.badgesQuery.leagues[0]
    return (
      <div>
        <Badges>
          <Badge user={league.longest_winning_streak} name='Winning streak'/>
          <Badge user={league.longest_winning_streak_ever} name='Winning streak ever'/>
          <Badge user={league.worst_crawler} name='Let crawl'/>
          <Badge user={league.top_crawler} name='Crawling'/>
        </Badges>
      </div>
    )
  }
}


const BADGES_QUERY = gql`
  query BadgesQuery($id: String!) {
    leagues(league_slug: $id) {
      name
      longest_winning_streak{
        name
        image
        winning_streak
      }
      longest_winning_streak_ever{
        name
        image
        longest_winning_streak_games
      }
      top_crawler{
        name
        image
        number_of_crawls
      }
      worst_crawler{
        name
        image
        number_of_crawlings
      }
    }
  }
`

const BadgesPageWithGraphQL = compose(
  graphql(BADGES_QUERY, {
    name: 'badgesQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({match}) => ({
      variables: {
        id: localStorage.getItem('slug'),
      },
    }),
  })
)(BadgesPage)

export default withRouter(BadgesPageWithGraphQL)
