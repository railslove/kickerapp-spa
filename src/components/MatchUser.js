import React from 'react'
import styled from 'styled-components'

const MatchUser = (props) => {

  const Item = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    background: #585757;
    border-radius: 30px 0 0 30px;
    .name{
      color: white;
      flex: 1;
      padding: 10px;
    }
    &.asReverse{
      flex-direction: row-reverse;
      border-radius: 0 30px 30px 0;
      .name{
        text-align: right;
      }
    }
  `

  const Image = styled.div`
    width: 50px;
    height: 50px;
    background-position: center center;
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
