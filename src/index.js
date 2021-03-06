import React from 'react'
import ReactDOM from 'react-dom'
import SettingsPage from './components/views/SettingsPage'
import RankingPage from './components/views/RankingPage'
import TeamsPage from './components/views/TeamsPage'
import DayMatchesPage from './components/views/DayMatchesPage'
import HomePage from './components/views/HomePage'
import BadgesPage from './components/views/BadgesPage'
import NewUserPage from './components/views/NewUserPage'
import NewMatchPage from './components/views/NewMatchPage'
import PlayerPage from './components/views/PlayerPage'
import ShufflePage from './components/views/ShufflePage'
import BottomNav from './components/BottomNav'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import './index.css'

const httpLink = new HttpLink({ uri: 'https://www.kicker.cool/graphql' })
// const httpLink = new HttpLink({ uri: 'http://localhost:3003/graphql' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route path='/' component={BottomNav} />
        <Switch>
          <Route exact path='/settings/:leagueSlug?' component={SettingsPage} />
          <Route path='/teams' component={TeamsPage} />
          <Route path='/ranking' component={RankingPage} />
          <Route path='/matches' component={DayMatchesPage} />
          <Route path='/player/new' component={NewUserPage} />
          <Route path='/match/new/:p1?/:p2?/:p3?/:p4?' component={NewMatchPage} />
          <Route path='/badges' component={BadgesPage} />
          <Route path='/shuffle' component={ShufflePage} />
          <Route path='/players/:id' component={PlayerPage} />
          <Route exact path='/:leagueSlug?' component={HomePage} />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
