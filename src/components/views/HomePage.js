import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import TopPositions from '../TopPositions'
import Spinner from '../../assets/rings.svg'
import MatchImage from '../../assets/match.svg'
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
  background: #f8f8f8;
  padding: 20px 0;
`
const Header = styled.div`
  background: #101632;
  padding: 20px 0;
  color: white;
  h1{
    margin: 0 0 20px 0;
  }
`

const HomeLinks = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 450px;
  margin: 0 auto;
  .aHomeLink{
    color: #c0c0c0;
    font-size: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      height: 50px;
    }
  }
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
        <Header>
          <h1 className='aHeadline withoutBack'>
            {league && league.name}
          </h1>
          <HomeLinks>
            <Link
              className='aHomeLink headlineFont'
              to={'/badges'}>
              <img src={MatchImage}/>
              Badges
            </Link>
            <Link
              className='aHomeLink headlineFont'
              to={'/player/new'}>
              <img src={MatchImage}/>
              New Player
            </Link>
            <Link
              className='aHomeLink headlineFont'
              to={'/settings'}>
              <img src={SettingIcon}/>
              Settings
            </Link>
          </HomeLinks>
        </Header>
        <TopPositionWrapper pose={ this.state.isOpen ? 'open' : 'close' }>
          <div className='aHeadline asSmall'>Top Players</div>
          <TopPositions topUsers={league.ranking.slice(0,3)} isOpen={this.state.isOpen}/>
        </TopPositionWrapper>
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
