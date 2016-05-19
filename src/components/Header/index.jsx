import React from 'react'

import styles from './header.css'

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
    back = <span className={styles.back} onClick={goBack}>&lsaquo;</span>
  }

  return (
    <header className={styles.header}>
      {back}
      {props.title}
      <span className={styles.icon}>{props.children}</span>
    </header>
  )
}

Header.propTypes = propTypes

export default Header

