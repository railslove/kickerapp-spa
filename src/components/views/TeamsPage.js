import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Teams from '../Teams'
import RankingTabs from '../RankingTabs'
import gql from 'graphql-tag'
import Spinner from '../../assets/rings.svg'


class TeamsPage extends React.Component {

  render() {
    const league = this.props.teamsQuery.leagues && this.props.teamsQuery.leagues[0]
    if (this.props.teamsQuery.loading && !league) {
      return (
        <div className='aLoading'>
          <img src={Spinner}/>
        </div>
      )
    }

    let teams = league.teams.map((team, index) => {
      let newTeam = Object.assign({}, team)
      newTeam.position = index + 1
      return newTeam
    })
    return (
      <div>
        <h1 className='aHeadline asGreen'>Ranking</h1>
        <RankingTabs active='teams'/>
        <Teams league={league} teams={teams} />
      </div>
    )
  }
}


const TEAMS_QUERY = gql`
  query LeagueQuery($id: String!) {
    leagues(league_slug: $id) {
      users{
        id
        image
        name
      }
      teams{
        id
        score
        percentage
        number_of_wins
        number_of_losses
        player1{
          id
          name
          image
        }
        player2{
          id
          name
          image
        }
      }
    }
  }
`

const DetailPageWithGraphQL = compose(
  graphql(TEAMS_QUERY, {
    name: 'teamsQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({match}) => ({
      variables: {
        id: localStorage.getItem('slug'),
      },
    }),
  })
)(TeamsPage)

export default withRouter(DetailPageWithGraphQL)
