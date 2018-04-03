import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import User from '../User'
import gql from 'graphql-tag'
import styled from 'styled-components'
import posed from 'react-pose'
import tween from 'react-pose'


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
  flex-direction: column;
  align-items: center;
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
    return (
      <div>
        <h1 className='aHeadline' onClick={this.props.history.goBack}>Ranking</h1>
          <UserList pose={this.state.isOpen ? 'open' : 'close'} onClick={() => this.toggle()}>
            {league.ranking && league.ranking.map((user, index) => (
              <User key={user.name} index={index+1} user={user}/>
            ))}
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
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({match}) => ({
      variables: {
        id: localStorage.getItem('slug'),
      },
    }),
  })
)(RankingPage)

export default withRouter(RankingPageWithGraphQL)
