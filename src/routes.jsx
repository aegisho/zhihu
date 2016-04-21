import React from 'react'
import { Route, Router } from 'react-router'

import Stories from './components/Story/Stories'
import Story from './components/Story/Story'
import Comment from './components/Comment/Comment'

export default (
  <Route>
    <Router path="/" component={Stories} />
    <Router path="story/:id" component={Story} />
    <Router path="comment/:id" component={Comment} />
  </Route>
)

// export default {
//   path: '/',
//   component: 'div',
//   childRoutes: [{
//     path: '/stories',
//     getComponent: (nextState, cb) => {
//       require.ensure([], (require) => {
//         cb(null, require('./components/Story/Stories'))
//       })
//     }
//   }, {
//     path: '/story/:id',
//     getComponent: (nextState, cb) => {
//       require.ensure([], (require) => {
//         cb(null, require('./components/Story/Story'))
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
