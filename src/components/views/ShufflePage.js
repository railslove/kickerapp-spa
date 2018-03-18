import React from 'react'
import Leagues from '../Leagues'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PlayerSelect from "../PlayerSelect"

class ShufflePage extends React.Component {

  selectUser(userId){
    console.log('USER', userId)
  }

  render() {
    if (this.props.shuffleQuery.loading) {
      return (
        <div className='aLoading'>
          <div>
            Loading
          </div>
        </div>
      )
    }
    const league = this.props.shuffleQuery.leagues[0]
    return (
      <div>
        <h1 onClick={this.props.history.goBack} className={`aHeadline ${localStorage.getItem('slug') ? '' : 'withoutBack'}`}>Shuffle</h1>
        <PlayerSelect players={league.users} filter={this.selectUser.bind(this)}/>
      </div>
    )
  }
}


const SHUFFLE_QUERY = gql`
  query ShuffleQuery($id: String!) {
    leagues(league_slug: $id) {
      id
      slug
      users{
        id
        name
        image
      }
    }
  }
`

const ShufflePageWithQuery = graphql(SHUFFLE_QUERY, {
  name: 'shuffleQuery',
  options: ({match}) => ({
    variables: {
      id: localStorage.getItem('slug'),
    },
  }),
})(ShufflePage)


export default ShufflePageWithQuery
