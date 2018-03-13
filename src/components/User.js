import React from 'react'
import { Link } from 'react-router-dom'

export default class Post extends React.Component {

  render() {
    return (
      <div className='aUser'>
        <div className='aUser-name'>{this.props.user.name}</div>
        <div className='aUser-quota'>{this.props.user.quota}</div>
      </div>
    )
  }

}
