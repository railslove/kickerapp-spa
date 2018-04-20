import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Crawl from '../assets/crawl.svg'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #9b9b9b;
  width: 100px;
  position: relative;
  input{
    border: none;
    margin: 0;
    &:first-child{
      text-align: right;
    }
  }
`

const Number = styled.div`
  font-size: 20px;
  color: #9b9b9b;
  width: 30px;
  margin: 0 40px;
  text-align: right;
`

const Image = styled.img`
  margin: 0 40px;
  opacity: 0.33;
  width: 30px;
  display: block;
  &.asActive{
    opacity: 1;
  }
`

const Input = styled.input`
  width: 100%;
  border-radius: 8px;
  display: block;
  font-size: 16px;
  border: 1px solid #9b9b9b;
  padding: 10px;
  margin-bottom: 10px;
  &:focus{
    outline: none
  }
`

class ScoreInput extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      crawling: false
    }
  }

  toggleCrawling(){
    this.save(!this.state.crawling)
    this.setState({crawling: !this.state.crawling})
  }

  save(crawling){
    let goals = []
    if(this.score1.value !== '') goals.push(parseInt(this.score1.value, 10))
    if(this.score2.value !== '') goals.push(parseInt(this.score2.value, 10))
    if(goals.length > 1){
      this.props.score(this.props.index, goals, crawling)
    }
  }

  render () {
    return (
      <Wrapper>
        <Number className='headlineFont'>0{this.props.index + 1}</Number>
        <InputWrapper>
          <Input type='tel' onChange={() => this.save(this.state.crawling)} ref={(input) => { this.score1 = input }}/>
          -
          <Input type='tel' onChange={() => this.save(this.state.crawling)} ref={(input) => { this.score2 = input }}/>
        </InputWrapper>
        <Image className={this.state.crawling ? 'asActive' : ''} src={Crawl} onClick={() => this.toggleCrawling()}/>
      </Wrapper>
    )
  }
}

ScoreInput.propTypes = {
  index: PropTypes.number.isRequired,
  score: PropTypes.func.isRequired
}

export default ScoreInput
