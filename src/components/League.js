import React from 'react'
import { Link } from 'react-router-dom'

export default class Post extends React.Component {

  render() {
    return (
      <Link
        className='aLeague'
        to={`/leagues/${this.props.league.slug}`}
      >
        <div className='aLeague-name'>
          {this.props.league.name}
          {` (${this.props.league.matches_count})`}
        </div>
      </Link>
    )
  }

}
