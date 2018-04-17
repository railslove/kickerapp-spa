import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'

const TopPosition = (props) => {

  const itemProps = {
    open: {
      top: 0
    },
    closed: {
      top: -240
    }
  }

  const Item = styled(posed.div(itemProps))`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
    top: -240px;
    position: relative;
    width: 20vw;
    max-width: 120px;
  `

  const Position = styled.div`
    font-size: 15px;
    color: #62c69a;
    margin-bottom: 10px;
  `

  const Image = styled.div`
    height: 20vw;
    width: 20vw;
    max-width: 100px;
    max-height: 100px;
    background-color: #999;
    background-image: url(${props.user.image});
    background-position: center top;
    background-size: cover;
    position: relative;
    &.asFirst{
      height: 26vw;
      width: 26vw;
      max-width: 120px;
      max-height: 120px;
    }
  `
  const Content = styled.div`
    background: white;
    padding: 2px 5px;
    width: 25vw;
    max-width: 120px;
    text-align: center;
    z-index: 1;
  `

  const Name = styled.div`
    color: #4a4a4a;
    font-size: 13px;
    line-height: 120%;
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `

  const Quota = styled.div`
    font-size: 20px;
    color: #9b9b9b;
  `

  return (
    <Item className={(props.index == 1) ? 'asFirst' : ''}>
      <Position className='headlineFont'>0{props.index}</Position>
      <Image className={(props.index == 1) ? 'asFirst' : ''}>
      </Image>
      <Name>{props.user.name}</Name>
      <Quota className='headlineFont'>{props.user.quota}</Quota>
    </Item>
  )
}

export default TopPosition;
