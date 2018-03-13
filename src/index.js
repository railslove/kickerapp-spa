import React from 'react'
import ReactDOM from 'react-dom'
import SettingsPage from './components/views/SettingsPage'
import RankingPage from './components/views/RankingPage'
import TeamsPage from './components/views/TeamsPage'
import MatchesPage from './components/views/MatchesPage'
import HomePage from './components/views/HomePage'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import 'tachyons'
import './index.css'

const httpLink = new HttpLink({ uri: 'https://www.kicker.cool/graphql' })
// const httpLink = new HttpLink({ uri: 'http://localhost:3006/graphql' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/settings' component={SettingsPage} />
        <Route path='/teams' component={TeamsPage} />
        <Route path='/ranking' component={RankingPage} />
        <Route path='/matches' component={MatchesPage} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
