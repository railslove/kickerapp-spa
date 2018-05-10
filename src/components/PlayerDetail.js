import React from 'react'
import PropTypes from 'prop-types'
import Player from './Player'
import styled from 'styled-components'

const PlayerDetail = (props) => {

  const Wrapper = styled.div`
  `

  const Header = styled.div`
    background: #f8f8f8;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  `

  const Row = styled.div`
    padding: 10px;
    background: #f8f8f8;
    hr{
      border-color: #d3d3d3;
    }
  `

  const Image = styled.div`
    position: relative;
    border: 1px solid #cbcbcb;
    background-color: white;
    background-image: url(${props.player && props.player.image});
    height: 120px;
    width: 120px;
    overflow: hidden;
    background-position: center top;
    background-size: cover;
    position: relative;
    margin-bottom: 10px;
  `

  const Points = styled.div`
    font-size: 20px;
    color: #9b9b9b;
  `

  const Label = styled.div`
    font-size: 11px;
    font-weight: 600;
    color: #4a4a4a;
    margin-bottom: 5px;
  `

  const Streaks = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
  `

  const Streak = styled.div`
    font-size: 11px;
    font-weight: 600;
    color: #4a4a4a;
    > div{
      font-size: 20px;
      color: #9b9b9b;
    }
  `

  const Name = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #4a4a4a;
  `

  const Partner = styled.div`
    display: flex;
    margin: 20px 0;
    color: #4a4a4a;
    font-size: 12px;
    align-items: center;
    > div{
      margin-right: 20px;
    }
  `

  return (
    <Wrapper>
      <Header>
        <Image/>
        <Label>Points</Label>
        <Points className='headlineFont'>{props.player.quota}</Points>
      </Header>
      <h2 className='aHeadline asSmall'>Winning streaks</h2>
      <Streaks>
        <Streak>
          <div className='headlineFont'>{props.player.winning_streak}</div>
          current
        </Streak>
        <Streak>
          <div className='headlineFont'>{props.player.longest_winning_streak_games}</div>
          longest
        </Streak>
      </Streaks>
      <Row>
        <Partner>
          <Player player={props.player.best_partner}/>
          <div>
            <Name>{props.player.best_partner.name}</Name>
            is the best partner
          </div>
        </Partner>
        <hr/>
        <Partner>
          <Player player={props.player.worst_partner}/>
          <div>
            <Name>{props.player.worst_partner.name}</Name>
            is the worst partner
          </div>
        </Partner>
      </Row>
      <h2 className='aHeadline asSmall'>History</h2>
      <Streaks>
        <Streak>
          <div className='headlineFont'>{props.player.lowest_quota}</div>
          Low points
        </Streak>
        <Streak>
          <div className='headlineFont'>{props.player.highest_quota}</div>
          High points
        </Streak>
      </Streaks>
      <Row>
        <h2 className='aHeadline asSmall'>Games</h2>
      </Row>
    </Wrapper>
  )
}

PlayerDetail.propTypes = {
  player: PropTypes.object,
}

export default PlayerDetail;
