import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'


class HomePage extends React.Component {

  render() {
    return (
      <div className='aHomeLinks'>
        <Link
          className='aHomeLink'
          to={'/ranking'}>Ranking</Link>
        <Link
          className='aHomeLink'
          to={'/teams'}>Teams</Link>
        <Link
          className='aHomeLink'
          to={'/matches'}>Matches</Link>
        <Link
          className='aHomeLink'
          to={'/settings'}>Settings</Link>
      </div>
    )
  }
}

export default withRouter(HomePage)
