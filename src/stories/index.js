import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { Button } from '@storybook/react/demo'

import Team from '../components/Team'
import User from '../components/User'
import Match from '../components/Match'

storiesOf('Team', module)
  .add('withOnePerson', () => <Team team={{name:'ein tolles Team', rank: 1, number_of_wins: 10, number_of_losses: 12, percentage: 33, score: 1234, player1: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'}}}/>)
  .add('withTwoPerson', () => <Team team={{name: 'ein tolles Zweier Team', rank: 1, number_of_wins: 10, number_of_losses: 12, percentage: 33, score: 1234, player1: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'}, player2: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'}}}/>)

storiesOf('User', module)
  .add('basic', () => <User user={{ index: 1, name: 'stephan', quota: 1234, image: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1776.png' }}/>)

storiesOf('Match', module)
  .add('1vs1', () => <Match match={ { score: '4:3', winner_team: { player1: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'} }, loser_team: { player1: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'} }
  } }/>)
  .add('2vs2', () => <Match match={ { score: '4:3', winner_team: { player1: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'}, player2: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'} }, loser_team: { player1: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'}, player2: {image: 'http://cdn1.spiegel.de/images/image-1263248-860_poster_16x9-ctfu-1263248.jpg'} }
  } }/>)
