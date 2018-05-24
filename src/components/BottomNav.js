import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { RankingIcon, MatchIcon, HomeIcon, ShuffleIcon, NewGameIcon } from '../assets/icons'
import styled from 'styled-components'
import colors from '../assets/colors'

const BottomNav = (props) => {

  const Wrapper = styled.div`
    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 0;
    width: 100vw;
    display: flex;
    align-items: flex-end;
    a{
      display: block;
      flex: 1;
    }
  `
  const Item = styled.div`
    background: ${colors.secondary};
    padding: 10px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.asActive{
      path {
        fill: ${colors.primary}
      }
    }
  `
  return (
    <Wrapper>
      <Link to={'/ranking'}>
        <Item className={(props.location.pathname === '/ranking' || props.location.pathname === '/teams') ? 'asActive' : ''}>
          <RankingIcon />
        </Item>
      </Link>
      <Link to={'/matches'}>
        <Item className={props.location.pathname === '/matches' ? 'asActive' : ''}>
          <MatchIcon />
        </Item>
      </Link>
      <Link to={'/'}>
        <Item className={props.location.pathname === '/' ? 'asActive' : ''}>
          <HomeIcon />
        </Item>
      </Link>
      <Link to={'/shuffle'}>
        <Item className={props.location.pathname === '/shuffle' ? 'asActive' : ''}>
          <ShuffleIcon />
        </Item>
      </Link>
      <Link to={'/match/new'}>
        <Item className={props.location.pathname === '/match/new' ? 'asActive' : ''}>
          <NewGameIcon />
        </Item>
      </Link>
    </Wrapper>
  )
}

BottomNav.propTypes = {
  location: PropTypes.object.isRequired
}

export default BottomNav
