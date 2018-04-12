import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'

const User = (props) => {

  const itemProps = {
    open: {
      height: 60
    },
    closed: {
      height: 0
    }
  }

  const lastProps = {
    open: {
      opacity: 1,
      height: 5
    },
    closed: {
      opacity: 0,
      height: 0
    }
  }

  const Item = styled(posed.div(itemProps))`
    height: 0px;
    display: flex;
    width: 100%;
    max-width: 400px;
    margin-bottom: 10px;
    overflow: hidden;
  `

  const Position = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    background: #333;
    color: white;
    font-size: 10px;
  `
  const Image = styled.div`
    height: 66px;
    width: 66px;
    background-color: #999;
    background-image: url(${props.user.image});
    background-position: center center;
    background-size: cover;
  `
  const Content = styled.div`
    background: white;
    padding: 10px;
    flex: 1;
  `

  const Name = styled.div`
    font-size: 18px;
  `
  const Last = styled(posed.div(lastProps))`
    position: absolute;
    left: 95px;
    margin-top: -22px;
    padding: 8px;
    background: #eee;
    color: #999;
    font-size: 12px;
    width: 16px;
    height: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0
  `

  const Quota = styled.div`
    font-size: 14px;
    color: #ababcd;
  `

  return (
    <Item>
      <Position>{props.index}</Position>
      <Image/>
      <Content>
        <Name>{props.user.name}</Name>
        <Quota>{props.user.quota}</Quota>
      </Content>
      {props.last !== 0 && <Last>{props.last - props.user.quota}</Last>}
    </Item>
  )
}

export default User;
