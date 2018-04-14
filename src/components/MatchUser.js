import React from 'react'
import styled from 'styled-components'

const MatchUser = (props) => {

  const Item = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    background: #585757;
    border-radius: 30px 0 0 30px;
    max-width: 35vw;
    .name{
      color: white;
      flex: 1;
      padding: 5px 5px 5px 15px;
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
        padding: 5px 15px 5px 5px;
      }
    }
  `

  const Image = styled.div`
    width: 50px;
    height: 50px;
    background-color: white;
    border: 2px solid #585757;
    background-position: center top;
    background-size: cover;
  `


  return (
    <Item className={props.reverse ? 'asReverse' : ''}>
      <div className='name'>{props.user.name}</div>
      <Image style={{backgroundImage: `url(${props.user.image})`}}/>
    </Item>
  )
}

export default MatchUser;
