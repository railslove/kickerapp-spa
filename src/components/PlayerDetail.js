import React from 'react'
import PropTypes from 'prop-types'
import Player from './Player'
import ProgressCircle from './ProgressCircle'
import styled from 'styled-components'
import { WinningStreak } from '../assets/icons'
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
    padding: 10px 20px;
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

  const Facts = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
    align-items: flex-end;
    .asBordered{
      flex: 1;
    }
  `

  const Fact = styled.div`
    font-size: 11px;
    font-weight: 600;
    color: #4a4a4a;
    > div{
      font-size: 20px;
      color: #9b9b9b;
    }
    &.asBordered{
      border-top: 1px solid #9b9b9b;
      &:last-child{
        text-align: right;
      }
    }
  `
  const FactMain = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 11px;
    font-weight: 600;
    color: #4a4a4a;
    > div{
      font-size: 20px;
      color: #9b9b9b;
    }
    &.asBordered{
      border-top: 1px solid #9b9b9b;
      &:last-child{
        text-align: right;
      }
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

  const games = props.player.number_of_wins + props.player.number_of_losses
  const percentage = props.player.number_of_wins / games * 100
  return (
    <Wrapper>
      <Header>
        <Image/>
        <Label>Points</Label>
        <Points className='headlineFont'>{props.player.quota}</Points>
      </Header>
      <h2 className='aHeadline asSmall'>Winning streaks</h2>
      <Facts>
        <Fact>
          <div className='headlineFont'>{props.player.winning_streak}</div>
          current
        </Fact>
        <FactMain>
          <WinningStreak />
          <Fact>
            <div className='headlineFont'>
              {props.player.longest_winning_streak_games}
            </div>
            <div>
              longest
            </div>
          </Fact>
        </FactMain>
      </Facts>
      <Row>
        <Partner>
          <Player playerClicked={()=>{}}player={props.player.best_partner}/>
          <div>
            <Name>{props.player.best_partner.name}</Name>
            is the best partner
          </div>
        </Partner>
        <hr/>
        <Partner>
          <Player playerClicked={()=>{}}player={props.player.worst_partner}/>
          <div>
            <Name>{props.player.worst_partner.name}</Name>
            is the worst partner
          </div>
        </Partner>
      </Row>
      <h2 className='aHeadline asSmall'>History</h2>
      <Facts>
        <Fact>
          <div className='headlineFont'>{props.player.lowest_quota}</div>
          Low points
        </Fact>
        <Fact>
          <div className='headlineFont'>{props.player.highest_quota}</div>
          High points
        </Fact>
      </Facts>
      <Row>
        <h2 className='aHeadline asSmall'>Games</h2>
        <Facts>
          <Fact className='asBordered'>
            Wins
            <div className='headlineFont'>{props.player.number_of_wins}</div>
          </Fact>
          <ProgressCircle percentage={parseInt(100 - percentage, 10)} string={games.toString()}/>
          <Fact className='asBordered'>
            Looses
            <div className='headlineFont'>{props.player.number_of_losses}</div>
          </Fact>
        </Facts>
      </Row>
    </Wrapper>
  )
}

PlayerDetail.propTypes = {
  player: PropTypes.object,
}

export default PlayerDetail;
