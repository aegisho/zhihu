import React from 'react'

import styles from './header.css'
// TODO:BUG: not work in storypage
import 'font-awesome/css/font-awesome.css'

const propTypes = {
  title: React.PropTypes.string,
  showBack: React.PropTypes.bool,
  children: React.PropTypes.node,
}

function goBack() {
  history.back(-1)
}

function Header(props) {
  let back = ''

  if (props.showBack) {
    back = <i className="fa fa-arrow-left" onClick={goBack}></i>
  }

  return (
    <header className={styles.header}>
      {back}
      {props.title}
      {props.children}
    </header>
  )
}

Header.propTypes = propTypes

export default Header

