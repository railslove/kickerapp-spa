import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import TopPositions from '../TopPositions'
import Spinner from '../../assets/rings.svg'
import styled from 'styled-components'
import posed from 'react-pose'
import SettingIcon from '../../assets/settings.svg'

const topProps = {
  open: {
    delayChildren: 600,
    staggerChildren: 300
  },
  closed: {
    staggerChildren: 300,
  },
  initialPose: 'closed'
}

const TopPositionWrapper = styled(posed.div(topProps))`
  display: block;
`

class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    setTimeout(this.toggle, 200)
  }

  componentWillMount(){
    if(!localStorage.getItem('slug')){
      this.props.history.push('settings')
    }
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen })

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
        <h1 className='aHeadline withoutBack'>
          {league && league.name}
          <Link to='settings'>
            <img src={SettingIcon}/>
          </Link>
        </h1>
        <TopPositionWrapper pose={ this.state.isOpen ? 'open' : 'close' }>
          <TopPositions topUsers={league.ranking.slice(0,3)} isOpen={this.state.isOpen}/>
        </TopPositionWrapper>
        <div className='aHomeLinks'>
          <Link
            className='aHomeLink'
            to={'/badges'}>Badges</Link>
          <Link
            className='aHomeLink'
            to={'/player/new'}>New Player</Link>
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
