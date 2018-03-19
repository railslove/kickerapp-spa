import React from 'react'
import styled from 'styled-components';


const JustPlayer = (props) => {

  const Player = styled.div`
    position: relative;
    background-color: #bcbcde;
    box-shadow: 0 0 6px #bcbcde;
    height: 20vw;
    width: 20vw;
    overflow: hidden;
    background-position: center center;
    background-size: cover;
    position: relative;
    &.withOutImage{
      &:before{
        content: '?';
        font-size: 40px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
    &.withImage{
      &:before{
        display: none;
      }
    }
  `

  return (
    <Player className={props.player ? 'withImage' : 'withOutImage'}  style={{backgroundImage: `url(${props.player && props.player.image})`}} onClick={() => props.playerClicked(props.position)}/>
  )
}

export default JustPlayer;
