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

  constructor (props) {
    super(props)
    this.state = {
      addable: false
    }
  }

  changed(){
    let goals = []
    if(this.score1.value != '') goals.push(parseInt(this.score1.value))
    if(this.score2.value != '') goals.push(parseInt(this.score2.value))
    if(goals.length > 1){
      this.setState({addable: true})
    }else{
      this.setState({addable: false})
    }
  }

  save(){
    let goals = []
    if(this.score1.value != '') goals.push(parseInt(this.score1.value))
    if(this.score2.value != '') goals.push(parseInt(this.score2.value))
    if(goals.length > 1){
      this.props.score(goals)
    }
  }

  render () {
    return (
      <Wrapper>
        <input type='tel' onBlur={() => this.save()} ref={(input) => { this.score1 = input }}/>
        <input type='tel' onBlur={() => this.save()} ref={(input) => { this.score2 = input }}/>
      </Wrapper>
    )
  }
}

export default Score
