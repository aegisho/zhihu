import { createStore, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'
import reducers from '../redux/reducers'

const devTool = window.devToolsExtension ? window.devToolsExtension() : f => f
export default applyMiddleware(thunkMiddleware)(createStore)(reducers, {}, devTool)
