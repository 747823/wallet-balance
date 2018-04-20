// Combine and export reducers here
import { combineReducers } from 'redux'
import portfolio from './portfolio'

// For now we probably will only have one reducer
// If we were to add more routes or more complex routes, we would import more reducers here
export default combineReducers({
  portfolio
})
