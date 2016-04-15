import React from 'react'
import { Route, Router } from 'react-router'

import Storties from './components/Storty/Storties'
import Storty from './components/Storty/Storty'
import Comment from './components/Comment/Comment'

export default (
  <Route>
    <Router path="/" component={Storties} />
    <Router path="Storty/:id" component={Storty} />
    <Router path="Comment/:id" component={Comment} />
  </Route>
)

// export default {
//   path: '/',
//   component: 'div',
//   childRoutes: [{
//     path: '/stories',
//     getComponent: (nextState, cb) => {
//       require.ensure([], (require) => {
//         cb(null, require('./components/Storty/Storties'))
//       })
//     }
//   }, {
//     path: '/storty/:id',
//     getComponent: (nextState, cb) => {
//       require.ensure([], (require) => {
//         cb(null, require('./components/Storty/Storty'))
//       })
//     }
//   }, {
//     path: '/comment/:id',
//     getComponent: (nextState, cb) => {
//       require.ensure([], (require) => {
//         cb(null, require('./components/Comment/Comment'))
//       })
//     }
//   }]
// }
