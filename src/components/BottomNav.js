import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Home from '../assets/home.svg'
import New from '../assets/new.svg'
import Match from '../assets/match.svg'
import Ranking from '../assets/ranking.svg'
import Shuffle from '../assets/shuffle.svg'


const BottomNav = (props) => {

  const Wrapper = styled.div`
    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 0;
    width: 100vw;
    display: flex;
    box-shadow: 0 0 20px #232323;
    background: #232323;
    a{
      display: block;
      flex: 1;
    }
  `
  const Item = styled.div`
    border-top: 4px solid #343434;
    border-right: 2px solid #343434;
    padding: 10px;
    height: 30px;
    display: flex;
    justify-content: center;
    img{
      height: 30px;
    }
    &.asActive{
      border-top: 4px solid #43BE47;
    }
  `
  console.log('this.props.location.pathname', props.location.pathname)
  return (
    <Wrapper>
      <Link to={'/ranking'}>
        <Item className={props.location.pathname == '/ranking' ? 'asActive' : ''}>
          <img src={Ranking}/>
        </Item>
      </Link>
      <Link to={'/day_matches'}>
        <Item className={props.location.pathname == '/day_matches' ? 'asActive' : ''}>
          <img src={Match}/>
        </Item>
      </Link>
      <Link to={'/'}>
        <Item className={props.location.pathname == '/' ? 'asActive' : ''}>
          <img src={Home}/>
        </Item>
      </Link>
      <Link to={'/shuffle'}>
        <Item className={props.location.pathname == '/shuffle' ? 'asActive' : ''}>
          <img src={Shuffle}/>
        </Item>
      </Link>
      <Link to={'/match/new'}>
        <Item className={props.location.pathname == '/match/new' ? 'asActive' : ''}>
          <img src={New}/>
        </Item>
      </Link>
    </Wrapper>
  )
}

export default BottomNav
