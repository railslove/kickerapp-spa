import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import styled from 'styled-components'
import AddMatch from '../AddMatch'
import Spinner from '../../assets/rings.svg'


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
      error: null
    }
  }

  gotoDayMatches(){
    this.props.history.push('/day_matches')
  }

  render() {
    const league = !this.props.newMatchQuery.loading && this.props.newMatchQuery.leagues[0]

    if (!league) {
      return (
        <div className='aLoading'>
          <img src={Spinner}/>
        </div>
      )
    }
    return (
      <div>
        {this.state.error && <Error>Please fill out at least on set</Error>}
        <AddMatch league={league} gotoDayMatches={this.gotoDayMatches.bind(this)}
        preTeam1={[parseInt(this.props.match.params.p1), parseInt(this.props.match.params.p2)]} preTeam2={[parseInt(this.props.match.params.p3), parseInt(this.props.match.params.p4)]} />
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
