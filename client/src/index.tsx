import React from 'react'
import { render } from 'react-dom'
import { StateProvider } from './state/state'
import App from './components/App'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import './index.scss'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
})

render(
  <ApolloProvider client={client}>
    <StateProvider>
      <App />
    </StateProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)
