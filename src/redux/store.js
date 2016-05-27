import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import { browserHistory } from 'react-router'

import devTool from './devTool'
import reducers from '../redux/reducers'

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  applyMiddleware(routerMiddleware(browserHistory)),
  devTool
)

export default createStore(reducers, enhancer)
