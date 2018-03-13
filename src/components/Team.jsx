import React from 'react'

const Team = (props) => {
  return (
    <tr>
      <td><div className="c-team-table-rank">{props.team.rank}</div></td>
      <td>
        <div className="c-team-table-player-image">
        </div>
      </td>
      <td>
        <div className="c-team-table-player-name">
          {props.team.player1 && props.team.player1.name}
        </div>
      </td>
      <td>
        <div className="c-team-table-player-image">
        </div>
      </td>
      <td>
        <div className="c-team-table-player-name">
          {props.team.player2 && props.team.player2.name}
        </div>
      </td>
      <td>
        <div className="c-team-table-stats">
          <div>{props.team.number_of_wins}</div>
          <div className="c-team-table-label">{}</div>
        </div>
      </td>
      <td>
        <div className="c-team-table-stats">
          <div>{props.team.number_of_losses}</div>
          <div className="c-team-table-label">{}</div>
        </div>
      </td>
      <td>
        <div className="c-team-table-stats">
          <div>{props.team.percentage}%</div>
          <div className="c-team-table-label">{}</div>
        </div>
      </td>
      <td>
        <div className="c-team-table-stats">
          <div><b>{props.team.score}</b></div>
          <div className="c-team-table-label"><b>{}</b></div>
        </div>
      </td>
    </tr>
  )
}

export default Team
