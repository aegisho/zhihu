import React from 'react'
import { Route, Router } from 'react-router'

import HomePage from './components/HomePage'
import StoryPage from './components/StoryPage'
import CommentPage from './components/CommentPage'

export default (
  <Route>
    <Router path="/" component={HomePage} />
    <Router path="story/:storyid" component={StoryPage} />
    <Router path="comment/:storyid" component={CommentPage} />
  </Route>
)
