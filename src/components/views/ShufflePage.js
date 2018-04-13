import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Shuffle from '../Shuffle'


class ShufflePage extends React.Component {

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
        <h1 onClick={() => this.props.history.push('/')} className={`aHeadline ${localStorage.getItem('slug') ? '' : 'withoutBack'}`}>Shuffle</h1>
        <Shuffle league={league} />
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

export default compose(
  graphql(SHUFFLE_QUERY, {
    name: 'shuffleQuery',
    options: ({match}) => ({
      variables: {
        id: localStorage.getItem('slug'),
      },
    }),
  })
)(ShufflePage);
