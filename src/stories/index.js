import React from 'react'
import { MemoryRouter } from 'react-router';

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { Button } from '@storybook/react/demo'


import Team from '../components/Team'
import User from '../components/User'
import Match from '../components/Match'
import DayMatch from '../components/DayMatch'
import PlayerSelect from '../components/PlayerSelect'
import PlayerSelectAndShow from '../components/PlayerSelectAndShow'
import BottomNav from '../components/BottomNav'

storiesOf('Team', module)
  .add('withOnePerson', () => <Team team={{name:'ein tolles Team', rank: 1, number_of_wins: 10, number_of_losses: 12, percentage: 33, score: 1234, player1: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'}}}/>)
  .add('withTwoPerson', () => <Team team={{name: 'ein tolles Zweier Team', rank: 1, number_of_wins: 10, number_of_losses: 12, percentage: 33, score: 1234, player1: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'}, player2: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'}}}/>)

storiesOf('DayMatch', module)
  .add('one set', () => <DayMatch match={{difference: 8, matches: [{ score: '5:3', difference: 8, winner_team_id: 1 }], winner_team: { id: 1, player1: { name: 'Stephan', image: 'https://bit.ly/2qkiob5' }, player2: { name: 'Klaus', image: 'https://bit.ly/2qkiob5' } },loser_team: { id: 2, player1: { name: 'Peter', image: 'https://bit.ly/2qkiob5' }, player2: { name: 'Max', image: 'https://bit.ly/2qkiob5' } }}}/>)
  .add('five sets', () => <DayMatch match={{difference: 12, matches: [{ score: '5:3', difference: 12, winner_team_id: 1 }, { score: '5:3', difference: 8, winner_team_id: 2 }, { score: '5:0', difference: 4, winner_team_id: 1 }, { score: '5:3', difference: 4, winner_team_id: 2 }, { score: '5:3', difference: 8, winner_team_id: 1 }], winner_team: { id: 1, player1: { name: 'Stephan', image: 'https://bit.ly/2qkiob5' }, player2: { name: 'Klaus', image: 'https://bit.ly/2qkiob5' } },loser_team: { id: 2, player1: { name: 'Peter', image: 'https://bit.ly/2qkiob5' }, player2: { name: 'Max', image: 'https://bit.ly/2qkiob5' } }}}/>)

storiesOf('User', module)
  .add('basic', () => <User user={{ index: 1, name: 'stephan', quota: 1234, image: 'https://bit.ly/2qkiob5' }}/>)

storiesOf('PlayerSelect', module)
  .add('Search for "player"', () => <PlayerSelect players={[{ name: 'Player 1', image: 'https://bit.ly/2qkiob5' }, { name: 'Player 2', image: 'https://bit.ly/2qkiob5' }, { name: 'Player 3', image: 'https://bit.ly/2qkiob5' }]} filter={()=>{}}/>)

storiesOf('PlayerSelectAndShow', module)
  .add('one to be selected', () => <PlayerSelectAndShow size={1} league={{users: [{ name: 'Player 1', image: 'https://bit.ly/2qkiob5' }, { name: 'Player 2', image: 'https://bit.ly/2qkiob5' }, { name: 'Player 3', image: 'https://bit.ly/2qkiob5' }]}} playersSelected={()=>{}}/>)

  .add('three to be selected', () => <PlayerSelectAndShow size={3} league={{users: [{ name: 'Player 1', image: 'https://bit.ly/2qkiob5' }, { name: 'Player 2', image: 'https://bit.ly/2qkiob5' }, { name: 'Player 3', image: 'https://bit.ly/2qkiob5' }]}} playersSelected={()=>{}}/>)

  .add('two to be selected, one preselected', () => <PlayerSelectAndShow size={2} preSelect={[1]} league={{users: [{ id: 1, name: 'Player 1', image: 'https://bit.ly/2qkiob5' }, { id: 2, name: 'Player 2', image: 'https://bit.ly/2qkiob5' }, { id: 3, name: 'Player 3', image: 'https://bit.ly/2qkiob5' }]}} playersSelected={()=>{}}/>)

storiesOf('Match', module)
  .add('1vs1', () => <Match match={ { score: '4:3', winner_team: { player1: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'} }, loser_team: { player1: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'} }
  } }/>)
  .add('2vs2', () => <Match match={ { score: '4:3', winner_team: { player1: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'}, player2: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'} }, loser_team: { player1: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'}, player2: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'} }
  } }/>)


storiesOf('BottomNav', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Home', () => <BottomNav location={{pathname: '/'}}/>)
