import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import TopPositions from '../TopPositions'
import DayMatch from '../DayMatch'
import Spinner from '../../assets/rings.svg'
import BadgeImage from '../../assets/badges.svg'
import NewPlayerImage from '../../assets/new.svg'
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
  background: #f8f8f8;
  padding: 20px 0;
`

const MatchWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  h2{
    margin-bottom: 20px;
  }
`
const Header = styled.div`
  background: #101632;
  padding: 10px 0 20px;
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
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      height: 40px;
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
    if(this.props.match.params.leagueSlug){
      localStorage.setItem('slug', this.props.match.params.leagueSlug)
      this.props.history.push('/')
    }
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
          <img src={Spinner} alt='loading spinner'/>
        </div>
      )
    }

    // <Link
    //   className='aHomeLink headlineFont'
    //   to={'/badges'}>
    //   <img src={BadgeImage} alt=''/>
    //   Badges
    // </Link>

    return (<div>
        <Header>
          <h1 className='aHeadline onDark'>
            {league && league.name}
          </h1>
          <HomeLinks>
            <Link
              className='aHomeLink headlineFont'
              to={'/player/new'}>
              <img src={NewPlayerImage} alt=''/>
              New Player
            </Link>
            <Link
              className='aHomeLink headlineFont'
              to={'/settings'}>
              <img src={SettingIcon} alt=''/>
              Settings
            </Link>
          </HomeLinks>
        </Header>
        <TopPositionWrapper pose={ this.state.isOpen ? 'open' : 'close' }>
          <h2 className='aHeadline asSmall'>Top Players</h2>
          <TopPositions topUsers={league.ranking.slice(0,3)} isOpen={this.state.isOpen}/>
        </TopPositionWrapper>
        { league.day_matches && league.day_matches.length > 1 && <div>
          <h2 className='aHeadline asSmall'>Last two matches</h2>
          <MatchWrapper>
            <DayMatch match={league.day_matches[0]}/>
            <DayMatch match={league.day_matches[1]}/>
          </MatchWrapper>
        </div> }
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
      day_matches(limit: 3){
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
