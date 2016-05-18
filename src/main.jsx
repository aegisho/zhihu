import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router } from 'react-router'

import routes from './routes'
import './styles/reset.css'

render(<Router history={browserHistory} routes={routes} />, document.getElementById('app'))
