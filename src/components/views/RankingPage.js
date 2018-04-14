import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import User from '../User'
import TopPosition from '../TopPosition'
import gql from 'graphql-tag'
import styled from 'styled-components'
import posed from 'react-pose'


const listProps = {
  open: {
    delayChildren: 300,
    staggerChildren: 50
  },
  closed: {
    staggerChildren: 50,
  },
  initialPose: 'closed'
}

const UserList = styled(posed.div(listProps))`
  background: #eee;
  padding: 10px;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
`

const TopPositions = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  max-width: 360px;
  justify-content: space-around;
`
const TopPositionsWrapper = styled.div`
  background: #121223;
  display: flex;
  justify-content: center;
`

class RankingPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    setTimeout(this.toggle, 200)
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    if (this.props.rankingQuery.loading) {
      return (
        <div className='aLoading'>
          <div>
            Loading
            (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})
          </div>
        </div>
      )
    }

    const league = this.props.rankingQuery.leagues[0]

    let topUsers = league.ranking.slice(0,3)
    let baseUsers = league.ranking.slice(3,league.ranking.length)
    let last = 0
    let userlist = baseUsers.map((user, index) => {
      let element = <User key={user.name} index={index+4} user={user} last={last}/>
      last = user.quota
      return element
    })


    return (
      <div>
        <h1 className='aHeadline' onClick={() => this.props.history.push('/')}>Ranking</h1>
        <TopPositionsWrapper>
          <TopPositions>
            <TopPosition user={topUsers[0]} index={1}/>
            <TopPosition user={topUsers[1]} index={2}/>
            <TopPosition user={topUsers[2]} index={3}/>
          </TopPositions>
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
