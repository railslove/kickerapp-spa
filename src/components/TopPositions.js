import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import TopPosition from './TopPosition'

const TopPositions = (props) => {

  const TopPositionsElement = styled.div`
    padding: 20px 5px;
    display: flex;
    max-width: 360px;
    justify-content: space-around;
    align-items: flex-end;
    overflow: hidden;
    flex: 1;
  `
  const TopPositionsWrapper = styled.div`
    background: #f8f8f8;
    display: flex;
    justify-content: center;
  `
  const {topUsers} = props
  return (
    <TopPositionsWrapper>
      {console.log({topUsers})}
      <TopPositionsElement>
        { props.topUsers[1] && <Link to={`/players/${props.topUsers[1].id}`}><TopPosition user={props.topUsers[1]} index={2}/></Link> }
        { props.topUsers[0] && <Link to={`/players/${props.topUsers[0].id}`}><TopPosition user={props.topUsers[0]} index={1}/></Link> }
        { props.topUsers[2] && <Link to={`/players/${props.topUsers[2].id}`}><TopPosition user={props.topUsers[2]} index={3}/></Link> }
      </TopPositionsElement>
    </TopPositionsWrapper>
  )
}


TopPositions.propTypes = {
  topUsers: PropTypes.array.isRequired
}


export default TopPositions
