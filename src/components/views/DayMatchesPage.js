import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import DayMatch from '../DayMatch'
import styled from 'styled-components'
import Spinner from '../../assets/rings.svg'



const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`

const Day = styled.div`
  font-size: 13px;
  color: #9b9b9b;
  border-bottom: 1px solid #9b9b9b;
  padding: 10px;
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
    const league = this.props.matchesQuery.leagues && this.props.matchesQuery.leagues[0]

    if (this.props.matchesQuery.loading || !league) {
      return (
        <div className='aLoading'>
          <img src={Spinner}/>
        </div>
      )
    }

    const days = this.groupBy(league.day_matches, (day => day.date))

    let globalMatches = []
    days.forEach((dayMatches, date) => {
      const day = new Date(date).toLocaleDateString('de-DE')
      const matches = dayMatches.map((match) => (
        <DayMatch key={match.id} match={match}/>
      ))
      globalMatches.push(<div key={day}>
        <Day>{day}</Day>
        <Wrapper>{matches}</Wrapper>
      </div>)
    })

    return (
      <div>
          <h1 className='aHeadline'>Matches</h1>
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
          crawling
          difference
          winner_team_id
          loser_team_id
        }
        winner_team {
          id
          player1 {
            id
            name
            image
          }
          player2 {
            id
            name
            image
          }
        }
        loser_team {
          id
          player1 {
            id
            name
            image
          }
          player2 {
            id
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
      fetchPolicy: 'network-only',
      variables: {
        id: localStorage.getItem('slug'),
      },
    }),
  })
)(DayMatchesPage)

export default withRouter(DayMatchesPageWithGraphQL)
