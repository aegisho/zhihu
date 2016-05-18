import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router } from 'react-router'
import moment from 'moment'

import routes from './routes'
import './styles/reset.css'

moment.locale('zh-cn')
render(<Router history={browserHistory} routes={routes} />, document.getElementById('app'))
