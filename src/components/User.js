import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'

const User = (props) => {

  const itemProps = {
    open: {
      height: 66
    },
    closed: {
      height: 0
    }
  }

  const Item = styled(posed.div(itemProps))`
    height: 0px;
    display: flex;
    width: 95vw;
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
    </Item>
  )
}

export default User;
