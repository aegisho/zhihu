import React from 'react'

import styles from './header.css'

const propTypes = {
  title: React.PropTypes.string,
  onClick: React.PropTypes.func,
}

function CommentHeader(props) {
  const { title, onClick } = props

  return (
    <div className={styles.headre} onClick={onClick}>
      {title}
    </div>
  )
}

CommentHeader.propTypes = propTypes

export default CommentHeader
