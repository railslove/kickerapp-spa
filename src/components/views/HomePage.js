import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import TopPositions from '../TopPositions'
import Spinner from '../../assets/rings.svg'

class HomePage extends React.Component {

  componentWillMount(){
    if(!localStorage.getItem('slug')){
      this.props.history.push('settings')
    }
  }

  render() {
    const league = this.props.leagueQuery.leagues && this.props.leagueQuery.leagues[0]

    if (this.props.leagueQuery.loading || !league) {
      return (
        <div className='aLoading'>
          <img src={Spinner}/>
        </div>
      )
    }

    return (<div>
        <h1 className='aHeadline withoutBack'>{league && league.name}</h1>
        <TopPositions topUsers={league.ranking.slice(0,3)} pose='open'/>
        <div className='aHomeLinks'>
          <Link
            className='aHomeLink'
            to={'/teams'}>Teams</Link>

          <Link
            className='aHomeLink'
            to={'/badges'}>Badges</Link>
          <Link
            className='aHomeLink'
            to={'/player/new'}>New Player</Link>
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
      ranking{
        name
        quota
        image
      }
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
