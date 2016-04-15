import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router } from 'react-router'

import routes from './routes'
import Header from './components/Header'
import Footer from './components/Footer'

render((
  <div>
    <Header title="知乎日报"/>
    <Router history={browserHistory} routes={routes} />
    <Footer />
  </div>
), document.getElementById('app'))
