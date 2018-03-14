import React from 'react'
import styled from 'styled-components';


const Badge = (props) => {

  const Wrapper = styled.div`
    border: 2px solid #ababcd;
    padding: 10px;
    margin-bottom: 20px;
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

  return (
    <Wrapper>
      <Image title={props.user.name}/>
      <Content>
        {props.name}
        <br/>
      </Content>

    </Wrapper>
  )
}

export default Badge;
