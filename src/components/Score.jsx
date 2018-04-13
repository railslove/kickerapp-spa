import React from "react"
import PropTypes from "prop-types"
import styled from 'styled-components'

const Wrapper = styled.div`
  input{
    float: left;
    width: 35vw;
    &:first-child{
      margin-right: 20px;
    }
  }
`

class Score extends React.Component {

  setScore(){
    let goals = []
    if(this.score1.value != '') goals.push(parseInt(this.score1.value))
    if(this.score2.value != '') goals.push(parseInt(this.score2.value))
    // TODO: Add a set with a button
    if(goals.length > 1){
      this.props.score(goals)
    }
  }

  render () {
    return (
      <Wrapper>
        <input type='tel' onChange={() => this.setScore()} ref={(input) => { this.score1 = input }}/>
        <input type='tel' onChange={() => this.setScore()} ref={(input) => { this.score2 = input }}/>
      </Wrapper>
    )
  }
}

export default Score
