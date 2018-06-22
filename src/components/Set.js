import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Set = (props) => {

  const Wrapper = styled.div`
    border-right: 1px solid #d6d6d6;
    &:last-child{
      border: none;
    }
    &.withCrawling{
      font-weight: bold;
    }
  `

  const Difference = styled.div`
    color: #62c69a;
    font-size: 13px;
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    bottom: 0;
  `

  const Point = styled.div`
    height: 60px;
    width: 42px;
    justify-content: center;
    color: #9a9a9a;
    font-size: 19px;
    display: flex;
    align-items: center;
    position: relative;
    &.first{
      border-bottom: 1px solid #d6d6d6;
    }
    &.asWinner{
      color: #62c69a;
    }
    &.asCrawling{
      color: #D44D47;
    }
  `

  const scores = props.data.score.split(':')

  if(!props.data){
    return null
  }

  return (
    <Wrapper className={props.data.crawling ? 'withCrawling' : ''}>
      <Point className={`first headlineFont ${props.winner ? 'asWinner' : (props.data.crawling ? 'asCrawling' : '')}`}>
        {props.winner ? scores[0] : scores[1]}
        { props.winner && <Difference>+{props.data.difference}</Difference> }
      </Point>
      <Point className={`headlineFont ${props.winner ? (props.data.crawling ? 'asCrawling' : '') : 'asWinner'}`}>
        {props.winner ? scores[1] : scores[0]}
        { !props.winner && <Difference>+{props.data.difference}</Difference> }
      </Point>
    </Wrapper>
  )
}

Set.propTypes = {
  data: PropTypes.object.isRequired,
  winner: PropTypes.bool.isRequired
}

export default Set
