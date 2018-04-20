import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 10px;
`

const Button = styled.button`
  background: #62c69a;
  border-radius: 30px;
  padding: 10px;
  width: 50vw;
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
  font-size: 18px;
  color: white;
  display: block;
  border: none;
`

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

class NewUserPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      error: null
    }
  }

  addUser() {
    this.setState({error: false})
    if(this.name.checkValidity() && this.email.checkValidity()){
      this.props.mutate({
        variables: { leagueSlug: localStorage.getItem('slug'), name: this.name.value, email: this.email.value, image: this.image.value }
      })
      .then(({ data }) => {
        this.props.history.push('/')
      }).catch((error) => {
        console.log('there was an error sending the query', error)
      })
    }else{
      this.setState({error: true})
    }

  }

  render() {
    return (
      <div>
        <h1 className='aHeadline'>New Player</h1>
        {this.state.error && <Error>Please fill out name and email</Error>}
        <Wrapper>
          <input required='true' type='text' placeholder='Name*' ref={(input) => { this.name = input }}/>
          <input required='true' type='text' placeholder='Email*' ref={(input) => { this.email = input }}/>
          <input type='text' placeholder='Image URL' ref={(input) => { this.image = input }}/>
        </Wrapper>
        <Button onClick={()=> this.addUser()}>
          Add Player
        </Button>
      </div>
    )
  }
}

const newUser = gql`
  mutation addPlayer($leagueSlug: String!, $name: String!,$email: String!, $image: String) {
    addPlayer(leagueSlug: $leagueSlug, name: $name, email: $email, image: $image ) {
      id
      name
    }
  }
`

const NewUserWithData = graphql(newUser)(NewUserPage)

export default withRouter(NewUserWithData)
