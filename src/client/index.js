import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StoreProvider } from 'react-redux'

import { create as createStore } from 'store'
import App from 'components/App'

// Create client-side store using preloaded state from server
const store = createStore(window.__PRELOADED_STATE__ || {})

const AppContainer = () =>
  <StoreProvider store={store}>
    <App />
  </StoreProvider>

ReactDOM.hydrate(<AppContainer />, document.getElementById('main'))
