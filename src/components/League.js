import React from 'react'

const League = (props) => {
  return (
    <div onClick={() => props.leagueSelected(props.league)}>
      <div className='aLeague-name'>
        {props.league.name}
        {` (${props.league.matches_count})`}
      </div>
    </div>
  )
}

export default League;
