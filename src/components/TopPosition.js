import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'

const TopPosition = (props) => {

  const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    &.asFirst{
      width: 100%;
      margin-bottom: 20px;
    }
  `

  const Position = styled.div`
    font-size: 20px;
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
    position: relative
  `
  const Content = styled.div`
    background: white;
    padding: 2px 5px;
    width: 25vw;
    max-width: 120px;
    text-align: center;
  `

  const Name = styled.div`
    font-size: 12px;
    background: rgba(255, 255, 255, 0.75);
    position: absolute;
    padding: 2px 5px;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
  `

  const Quota = styled.div`
    font-size: 14px;
    color: #ababcd;
  `

  return (
    <Item className={(props.index == 1) ? 'asFirst' : ''}>
      <Image>
        <Name>{props.user.name}</Name>
      </Image>
      <Content>
        <Position>{props.index}</Position>
        <Quota>{props.user.quota}</Quota>
      </Content>
    </Item>
  )
}

export default TopPosition;
