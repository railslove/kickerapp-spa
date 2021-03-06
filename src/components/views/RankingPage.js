import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter, Link } from 'react-router-dom'
import RankingUser from '../RankingUser'
import TopPositions from '../TopPositions'
import RankingTabs from '../RankingTabs'
import Spinner from '../../assets/rings.svg'
import gql from 'graphql-tag'
import styled from 'styled-components'
import posed from 'react-pose'


const listProps = {
  open: {
    staggerDirection: -1,
    staggerChildren: 30
  },
  closed: {
    staggerChildren: 30,
  },
  initialPose: 'closed'
}

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

const TopPositionsWrapper = styled(posed.div(topProps))`
  display: block;
  margin-bottom: 10px

`

const UserList = styled(posed.div(listProps))`
  padding: 10px;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: 0 auto;
`

class RankingPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    setTimeout(this.toggle, 20)
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen })



  render() {
    const league = this.props.rankingQuery.leagues && this.props.rankingQuery.leagues[0]

    if (this.props.rankingQuery.loading && !league) {
      return (
        <div className='aLoading'>
          <img src={Spinner} alt='loading spinner'/>
        </div>
      )
    }
    let baseUsers = league.ranking.slice(3,league.ranking.length)
    let last = 0
    let userlist = baseUsers.map((user, index) => {
      let element = <Link to={`/players/${user.id}`}><RankingUser key={user.name} index={index+4} user={user} last={last}/></Link>
      last = user.quota
      return element
    })

    return (
      <div>
        <h1 className='aHeadline asGreen'>Ranking</h1>
        <RankingTabs active='single'/>
        <TopPositionsWrapper className='shadowBox' pose={ this.state.isOpen ? 'open' : 'close' }>
          <TopPositions topUsers={league.ranking.slice(0,3)} isOpen={this.state.isOpen}/>
        </TopPositionsWrapper>
        <UserList pose={this.state.isOpen ? 'open' : 'close'}>
          {userlist}
        </UserList>
      </div>
    )
  }
}


const RANKING_QUERY = gql`
  query RankingQuery($id: String!) {
    leagues(league_slug: $id) {
      id
      name
      ranking{
        id
        name
        quota
        image
      }
    }
  }
`

const RankingPageWithGraphQL = compose(
  graphql(RANKING_QUERY, {
    name: 'rankingQuery',
    options: ({match}) => ({
      variables: {
        id: localStorage.getItem('slug'),
      },
    }),
  })
)(RankingPage)

export default withRouter(RankingPageWithGraphQL)
