import React from 'react'
import PropTypes from "prop-types"
import styled from 'styled-components'
import EmptyPlayer from '../assets/player.png'

const JustPlayer = (props) => {

  const Player = styled.div`
    position: relative;
    border: 1px solid #cbcbcb;
    background-color: white;
    background-image: url(${EmptyPlayer});
    height: 60px;
    width: 60px;
    overflow: hidden;
    background-position: center top;
    background-size: cover;
    position: relative;
    &.withImage{
      background-image: url(${props.player && props.player.image})
    }
    &.asSmall{
      height: 40px;
      width: 40px;
      > div{
        display: none;
      }
    }
  `
  const Name = styled.div`
    position: absolute;
    bottom: 0;
    background: rgba(255,255,255,0.85);
    width: 100%;
    font-size: 10px;
    padding: 0 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `

  return (
    <Player className={[(props.player ? 'withImage' : ''), (props.small ? 'asSmall' : '')].join(' ')} onClick={() => props.playerClicked(props.position)}>
      { props.player && <Name>{props.player.name}</Name> }
    </Player>
  )
}

JustPlayer.propTypes = {
  player: PropTypes.object,
  small: PropTypes.bool
}

export default JustPlayer;
