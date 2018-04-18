import React from 'react'
import styled from 'styled-components'

const MatchUser = (props) => {

  const Wrapper = styled.div`
    flex: 1;
    max-width: 35vw;
    overflow: hidden;
    border: 1px solid #9b9b9b;
  `

  const Item = styled.div`
    display: flex;
    align-items: center;
    background: white;
    .name{
      flex: 1;
      padding: 5px;
      line-height: 120%;
      font-size: 12px;
      max-height: 40px;
      overflow: hidden;
    }
    &.asReverse{
      flex-direction: row-reverse;
      border-radius: 0 30px 30px 0;
      .name{
        text-align: right;
        padding: 5px;
      }
    }
  `

  const Image = styled.div`
    width: 50px;
    height: 50px;
    background-color: white;
    background-position: center top;
    background-size: cover;
  `


  return (
    <Wrapper>
      <Item className={props.reverse ? 'asReverse' : ''}>
        <div className='name'>{props.user.name}</div>
        <Image style={{backgroundImage: `url(${props.user.image})`}}/>
      </Item>
    </Wrapper>
  )
}

export default MatchUser;
