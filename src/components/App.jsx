import React from 'react'
import { RouteHandler } from 'react-router'

import Header from './Header'
import Footer from './Footer'

export default function App() {
  return (
    <div>
      <Header />
      <RouteHandler />
      <Footer />
    </div>
  )
}
