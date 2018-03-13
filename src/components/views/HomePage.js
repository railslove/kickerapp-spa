import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'


class HomePage extends React.Component {

  componentWillMount(){
    if(!localStorage.getItem('slug')){
      this.props.history.push('settings')
    }
  }

  render() {
    const league = this.props.leagueQuery.leagues && this.props.leagueQuery.leagues[0]
    return (<div>
        <h1 className='aHeadline'>{league && league.name}</h1>
        <div className='aHomeLinks'>
          <Link
            className='aHomeLink'
            to={'/ranking'}>Ranking</Link>
          <Link
            className='aHomeLink'
            to={'/teams'}>Teams</Link>
          <Link
            className='aHomeLink'
            to={'/matches'}>Matches</Link>
          <Link
            className='aHomeLink'
            to={'/settings'}>Settings</Link>
        </div>
      </div>
    )
  }
}

const LEAGUE_QUERY = gql`
  query LeagueQuery($id: String!) {
    leagues(league_slug: $id) {
      name
    }
  }
`

const HomePageWithGraphQL = compose(
  graphql(LEAGUE_QUERY, {
    name: 'leagueQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({match}) => ({
      variables: {
        id: (localStorage.getItem('slug') || ''),
      },
    }),
  })
)(HomePage)

export default withRouter(HomePageWithGraphQL)
