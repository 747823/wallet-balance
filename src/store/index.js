import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import combinedReducers from 'reducers'

let store

const create = (initialState = {}) => {
  // Do not all creating multiple stores
  if (store) return store // eslint-disable-line

  const isBrowser = typeof window !== 'undefined'
  let composeFn

  if (isBrowser) {
    // TODO: also Create browser history here if we add react-router to the app
    composeFn = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  } else {
    composeFn = compose
  }

  store = createStore(
    combinedReducers,
    initialState,
    composeFn(applyMiddleware(thunk))
  )

  return store
}

const get = () => store

export { create, get }
