import React from 'react'
import { MemoryRouter } from 'react-router';

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { Button } from '@storybook/react/demo'


import Team from '../components/Team'
import RankingUser from '../components/RankingUser'
import TopPosition from '../components/TopPosition'
import TopPositions from '../components/TopPositions'
import DayMatch from '../components/DayMatch'
import PlayerSelect from '../components/PlayerSelect'
import PlayerSelectAndShow from '../components/PlayerSelectAndShow'
import BottomNav from '../components/BottomNav'
import Player from '../components/Player'
import League from '../components/League'
import RankingTabs from '../components/RankingTabs'
import ScoreInput from '../components/ScoreInput'
import Set from '../components/Set'

storiesOf('Set', module)
  .add('winner', () => <Set winner={true} data={{crawling: false, difference: 8, score: '8:4'}}/>)
  .add('loser', () => <Set winner={false} data={{crawling: false, difference: 12, score: '12:5'}}/>)
  .add('crawling', () => <Set winner={true} data={{crawling: true, difference: 8, score: '4:1'}}/>)

storiesOf('DayMatch', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('one set', () => <DayMatch match={{difference: 8, matches: [{ score: '5:3', difference: 8, winner_team_id: 1 }], winner_team: { id: 1, player1: { name: 'Stephan', image: 'https://bit.ly/2qkiob5' }, player2: { name: 'Klaus', image: 'https://bit.ly/2qkiob5' } },loser_team: { id: 2, player1: { name: 'Peter', image: 'https://bit.ly/2qkiob5' }, player2: { name: 'Max', image: 'https://bit.ly/2qkiob5' } }}}/>)
  .add('five sets', () => <DayMatch match={{difference: 12, matches: [{ score: '5:3', difference: 12, winner_team_id: 1 }, { score: '5:3', difference: 8, winner_team_id: 2 }, { score: '5:0', difference: 4, winner_team_id: 1 }, { score: '5:3', difference: 4, winner_team_id: 2 }, { score: '5:3', difference: 8, winner_team_id: 1 }], winner_team: { id: 1, player1: { name: 'Stephan', image: 'https://bit.ly/2qkiob5' }, player2: { name: 'Klaus', image: 'https://bit.ly/2qkiob5' } },loser_team: { id: 2, player1: { name: 'Peter', image: 'https://bit.ly/2qkiob5' }, player2: { name: 'Max', image: 'https://bit.ly/2qkiob5' } }}}/>)

storiesOf('RankingTabs', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('single', () => <RankingTabs active='single'/>)
  .add('teams', () => <RankingTabs active='teams'/>)

storiesOf('Team', module)
  .add('withOnePerson', () => <Team team={{name:'ein tolles Team', rank: 1, number_of_wins: 10, number_of_losses: 12, percentage: 33, score: 1234, player1: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'}}}/>)
  .add('withTwoPerson', () => <Team team={{name: 'ein tolles Zweier Team', rank: 1, number_of_wins: 10, number_of_losses: 12, percentage: 33, score: 1234, player1: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'}, player2: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'}}}/>)

storiesOf('RankingUser', module)
  .add('basic', () => <RankingUser user={{ index: 1, name: 'stephan', quota: 1234, image: 'https://bit.ly/2qkiob5' }}/>)

storiesOf('TopPosition', module)
  .add('basic', () => <TopPosition index={1} user={{ name: 'stephan', quota: 1234, image: 'https://bit.ly/2qkiob5' }}/>)

storiesOf('TopPositions', module)
  .add('basic', () => <TopPositions topUsers={[{ name: 'Stephan', quota: 1201, image: 'https://bit.ly/2qkiob5' }, { name: 'Klaus', quota: 1200, image: 'https://bit.ly/2qkiob5' }, { name: 'Peter', quota: 1199, image: 'https://bit.ly/2qkiob5' }]}/>)

storiesOf('League', module)
  .add('basic', () => <League league={{matches_count: 1234, name: 'Railslove Storybook League'}}/>)

storiesOf('ScoreInput', module)
  .add('basic', () => <ScoreInput index={6} score={()=>{}} />)

storiesOf('Player', module)
  .add('without a Pplayer', () => <Player/>)
  .add('with a player', () => <Player player={{ index: 1, name: 'stephan', quota: 1234, image: 'https://bit.ly/2qkiob5' }}/>)
  .add('small', () => <Player small={true} player={{ index: 1, name: 'stephan', quota: 1234, image: 'https://bit.ly/2qkiob5' }}/>)

storiesOf('PlayerSelect', module)
  .add('Search for "player"', () => <PlayerSelect players={[{ name: 'Player 1', image: 'https://bit.ly/2qkiob5' }, { name: 'Player 2', image: 'https://bit.ly/2qkiob5' }, { name: 'Player 3', image: 'https://bit.ly/2qkiob5' }]} filter={()=>{}}/>)

storiesOf('PlayerSelectAndShow', module)
  .add('one to be selected', () => <PlayerSelectAndShow size={1} league={{users: [{ name: 'Player 1', image: 'https://bit.ly/2qkiob5' }, { name: 'Player 2', image: 'https://bit.ly/2qkiob5' }, { name: 'Player 3', image: 'https://bit.ly/2qkiob5' }]}} playersSelected={()=>{}}/>)

  .add('three to be selected', () => <PlayerSelectAndShow size={3} league={{users: [{ name: 'Player 1', image: 'https://bit.ly/2qkiob5' }, { name: 'Player 2', image: 'https://bit.ly/2qkiob5' }, { name: 'Player 3', image: 'https://bit.ly/2qkiob5' }]}} playersSelected={()=>{}}/>)

  .add('two to be selected, one preselected', () => <PlayerSelectAndShow size={2} preSelect={[1]} league={{users: [{ id: 1, name: 'Player 1', image: 'https://bit.ly/2qkiob5' }, { id: 2, name: 'Player 2', image: 'https://bit.ly/2qkiob5' }, { id: 3, name: 'Player 3', image: 'https://bit.ly/2qkiob5' }]}} playersSelected={()=>{}}/>)

  .add('six to be selected, with break', () => <PlayerSelectAndShow break={true} size={6} preSelect={[]} league={{users: [{ id: 1, name: 'Player 1', image: 'https://bit.ly/2qkiob5' }, { id: 2, name: 'Player 2', image: 'https://bit.ly/2qkiob5' }, { id: 3, name: 'Player 3', image: 'https://bit.ly/2qkiob5' }]}} playersSelected={()=>{}}/>)

storiesOf('BottomNav', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Home', () => <BottomNav location={{pathname: '/'}}/>)
