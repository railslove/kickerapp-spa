import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import DayMatch from '../DayMatch'
import styled from 'styled-components'


const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  > div{
    margin: 10px;
  }
`

class DayMatchesPage extends React.Component {

  groupBy(list, keyGetter) {
    const map = new Map()
    list.forEach((item) => {
        const key = keyGetter(item)
        const collection = map.get(key)
        if (!collection) {
            map.set(key, [item])
        } else {
            collection.push(item)
        }
    });
    return map
  }

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
    const days = this.groupBy(league.day_matches, (day => day.date))

    let globalMatches = []
    days.forEach((dayMatches, date) => {
      const day = new Date(date).toLocaleDateString('de-DE')
      const matches = dayMatches.map((match) => (
        <DayMatch key={match.id} match={match}/>
      ))
      globalMatches.push(<div key={day}>
        <h3 className='aHeadline withoutBack'>{day}</h3>
        <Wrapper>{matches}</Wrapper>
      </div>)
    })

    return (
      <div>
        <h1 className='aHeadline' onClick={this.props.history.goBack}>Matches per day</h1>
          { league && league.day_matches && <div>
            {globalMatches}
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
        date
        winner_team_id
        loser_team_id
        matches{
          id
          score
          difference
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
    options: ({match}) => ({
      variables: {
        id: localStorage.getItem('slug'),
      },
    }),
  })
)(DayMatchesPage)

export default withRouter(DayMatchesPageWithGraphQL)
