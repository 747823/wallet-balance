import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider as StoreProvider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'

import { create as createStore } from 'store'
import { defaultState as portfolio } from 'reducers/portfolio'
import { loadStoredData } from 'actions'

import App from 'components/App'

// TODO: add server-side react router
// For now let's just send the same page regardless of route
const appRenderer = () => async (req, res, next) => {
  res.set('Content-Type', 'text/html')

  // Create store with initial state
  const store = createStore({ portfolio })

  // Dispatch actions needed for initial load before rendering
  // In the real world, this should probably be route-specific or even component-specific
  // May not even want to do this for transactions and/or wallets if the response gets too big
  try {
    await store.dispatch(loadStoredData())
  } catch (err) {
    // If error, log error but proceed with default state
  }

  const AppContainer = () =>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>

  const sheet = new ServerStyleSheet()
  const html = renderToString(sheet.collectStyles(<AppContainer />))
  const css = sheet.getStyleTags()

  // Initial state to be injected to the client
  const preloadedState = store.getState()

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=no'>
        <title>Wallet Balance App</title>
        <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}</script>
        <style>
          html {
            height: 100%;
          }
          body {
            height: 100%;
            min-height: 100%;
            margin: 0;
          }
          #main {
            height: 100%;
          }
          [data-reactroot] {
            height: 100%;
          }
        </style>
        ${css}
      </head>
      <body>
        <div id='main'>${html}</div>
      </body>
      <script src='/assets/js/bundle.js'></script>
    </html>
  `)
}

export default appRenderer
