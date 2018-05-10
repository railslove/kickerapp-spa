import React from 'react'
import PlayerDetail from '../PlayerDetail'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Spinner from '../../assets/rings.svg'
import Back from '../../assets/back.png'

class PlayerPage extends React.Component {

  render() {
    if (this.props.playerQuery.loading) {
      return (
        <div className='aLoading'>
          <img src={Spinner} alt='loading spinner'/>
        </div>
      )
    }

    const player = this.props.playerQuery.players

    return (
      <div className={'aWrapper'}>
        <h1 className='aHeadline asGreen' onClick={this.props.history.goBack}>
        <img src={Back} alt='back'/>
        {player.name}
      </h1>
        <PlayerDetail player={player}/>
      </div>
    )
  }
}


const PLAYER_QUERY = gql`
  query PlayerQuery($id: Int!) {
    players(id: $id) {
      id
      name
      image
      quota
      longest_winning_streak_games
      winning_streak
      highest_quota
      lowest_quota
      number_of_wins
      number_of_losses
      best_partner{
        image
        name
      }
      worst_partner{
        image
        name
      }
    }
  }
`

const PlayerPageWithQuery = graphql(PLAYER_QUERY, {
  name: 'playerQuery',
  options: ({match}) => ({
    variables: {
      id: parseInt(match.params.id, 10),
    },
  }),
})(PlayerPage)


export default PlayerPageWithQuery
