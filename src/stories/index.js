import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { Button } from '@storybook/react/demo'

import Team from '../components/Team'
import User from '../components/User'

storiesOf('Team', module)
  .add('withOnePerson', () => <Team team={{rank: 1, number_of_wins: 10, number_of_losses: 12, percentage: 33, score: 1234, player1: {name: 'Stephan'}}}/>)
  .add('withTwoPerson', () => <Team team={{rank: 1, number_of_wins: 10, number_of_losses: 12, percentage: 33, score: 1234, player1: {name: 'Stephan'}, player2: {name: 'Klaus'}}}/>)

storiesOf('User', module)
  .add('basic', () => <User user={{ index: 1, name: 'stephan', quota: 1234, image: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1776.png' }}/>)
