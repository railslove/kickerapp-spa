import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Home from '../assets/home.svg'
import New from '../assets/plus.svg'
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
    align-items: flex-end;
    a{
      display: block;
      flex: 1;
    }
  `
  const Item = styled.div`
    border-top: 4px solid #101632;
    background: #101632;
    padding: 10px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    img{
      height: 25px;
    }
    &.asActive{
      border-top: 4px solid #62c69a;
      height: 54px;
    }
  `
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
