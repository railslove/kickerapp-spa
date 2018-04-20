import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const RankingTabs = (props) => {

  const Wrapper = styled.div`
    display: flex;
    background: #f8f8f8;
    padding: 20px;
    justify-content: center;
  `

  const Item = styled.div`
    flex: 1;
    opacity: 0.68;
    text-align: center;
    margin: 0 20px;
    max-width: 300px;
    a{
      color: #4a4a4a;
    }
    &.asActive{
      border-bottom: 2px solid #62c69a;
      opacity: 1;
    }
  `

  return (
    <Wrapper className='headlineFont'>
      <Item className={props.active==='single' ? 'asActive' : ''}>
        <Link to='/ranking'>Single</Link>
      </Item>
      <Item className={props.active==='teams' ? 'asActive' : ''}>
        <Link to='/teams'>Teams</Link>
      </Item>
    </Wrapper>
  )
}

RankingTabs.propTypes = {
  active: PropTypes.string.isRequired
}

export default RankingTabs;
