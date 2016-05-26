import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import moment from 'moment'

import './styles/reset.css'
import routes from './routes'
import store from './redux/store'

moment.locale('zh-cn')

const history = syncHistoryWithStore(browserHistory, store)

render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), document.getElementById('app'))
