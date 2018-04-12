import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import styled from 'styled-components'
import AddMatch from '../AddMatch'

const Error = styled.div`
  background: red;
  padding: 10px;
  width: 90vw;
  max-width: 400px;
  text-align: center;
  font-size: 14px;
  color: white;
  display: block;
  margin-bottom: 20px;
`

class NewMatchPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      error: null,
      players: [],
      teams: []
    }
  }
  
  render() {
    const league = !this.props.newMatchQuery.loading && this.props.newMatchQuery.leagues[0]
    return (
      <div>
        <h1 className='aHeadline' onClick={this.props.history.goBack}>New Match</h1>
        {this.state.error && <Error>Please fill out at least on set</Error>}
        <AddMatch league={league} />
      </div>
    )
  }
}

const NEW_MATCH_QUERY = gql`
  query NewMatchQuery($id: String!) {
    leagues(league_slug: $id) {
      id
      name
      users{
        id
        name
        image
      }
    }
  }
`


const NewMatchPageWithGraphQL = graphql(NEW_MATCH_QUERY, {
    name: 'newMatchQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({match}) => ({
      variables: {
        id: localStorage.getItem('slug'),
      },
    }),
  })(NewMatchPage)

export default withRouter(NewMatchPageWithGraphQL)
