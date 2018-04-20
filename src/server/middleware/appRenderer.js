import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider as StoreProvider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'

import { create as createStore } from 'store'
import App from 'components/App'

const appRenderer = () => (req, res, next) => {
  // TODO: add server-side react router
  // For now let's just send the same page regardless of route
  res.set('Content-Type', 'text/html')

  // TOOO: load initial state for SSR
  const initialState = {
    // Test state
    portfolio: {
      wallets: [],
      transactions: [],
      balance: '0'
    }
  }

  const AppContainer = () =>
    <StoreProvider store={createStore(initialState)}>
      <App />
    </StoreProvider>

  const sheet = new ServerStyleSheet()
  const html = renderToString(sheet.collectStyles(<AppContainer />))
  const css = sheet.getStyleTags()

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=no'>
        <title>Wallet Balance App</title>
        <script>window.__PRELOADED_STATE__ = ${JSON.stringify(initialState)}</script>
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
