import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Teams from '../Teams'
import gql from 'graphql-tag'


class TeamsPage extends React.Component {

  render() {
    if (this.props.teamsQuery.loading) {
      return (
        <div className='aLoading'>
          <div>
            Loading
          </div>
        </div>
      )
    }

    const league = this.props.teamsQuery.leagues[0]
    let teams = league.teams.map((team, index) => {
      let newTeam = Object.assign({}, team)
      newTeam.position = index + 1
      return newTeam
    })
    console.log(teams)
    return (
      <div>
        <h1 className='aHeadline' onClick={this.props.history.goBack}>Teams</h1>
          <div className='aUserList'>
            <Teams teams={teams} players={league.users} />
          </div>
      </div>
    )
  }
}


const TEAMS_QUERY = gql`
  query LeagueQuery($id: String!) {
    leagues(league_slug: $id) {
      users{
        id
        name
      }
      teams{
        id
        name
        score
        percentage
        player1{
          id
          image
        }
        player2{
          id
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
