import React from 'react'
import styled from 'styled-components';


const User = (props) => {

  const Wrapper = styled.div`
    display: flex;
    width: 95vw;
    max-width: 400px;
    margin-bottom: 10px;
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
    <Wrapper>
      <Position>{props.index}</Position>
      <Image/>
      <Content>
        <Name>{props.user.name}</Name>
        <Quota>{props.user.quota}</Quota>
      </Content>
    </Wrapper>
  )
}

export default User;
