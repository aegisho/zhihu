import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as reducers from './reducers'

reducers.routing = routerReducer

export default combineReducers(reducers)
