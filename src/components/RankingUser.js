import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import posed from 'react-pose'

const RankingUser = (props) => {

  const itemProps = {
    open: {
      height: 66,
      paddingBottom: 10,
      opacity: 1
    },
    closed: {
      height: 0,
      paddingBottom: 0,
      opacity: 0
    }
  }

  const Item = styled(posed.div(itemProps))`
    height: 0px;
    display: flex;
    width: 100%;
    max-width: 400px;
    margin-bottom: 10px;
    padding-bottom: 0px;
    border-bottom: 1px solid #f3f3f3;
    opacity: 0;
  `

  const Position = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    color: #9b9b9b;
    font-size: 15px;
  `
  const Image = styled.div`
    height: 66px;
    width: 66px;
    background-color: #dedede;
    background-image: url(${props.user.image});
    background-position: center top;
    background-size: cover;
  `
  const Content = styled.div`
    padding: 10px;
    flex: 1;
  `

  const Name = styled.div`
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    color: #4a4a4a;
  `
  const Last = styled.div`
    display: none;
  `

  const Quota = styled.div`
    font-size: 16px;
    font-weight: normal;
    color: #9b9b9b;
  `

  return (
    <Item>
      <Position className='headlineFont'>
        {props.index < 10 ? `0${props.index}` : props.index}
      </Position>
      <Image/>
      <Content>
        <Name>{props.user.name}</Name>
        <Quota className='headlineFont'>{props.user.quota}</Quota>
      </Content>
      {props.last !== 0 && <Last>{props.last - props.user.quota}</Last>}
    </Item>
  )
}

RankingUser.propTypes = {
  index: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  last: PropTypes.number
}

export default RankingUser
