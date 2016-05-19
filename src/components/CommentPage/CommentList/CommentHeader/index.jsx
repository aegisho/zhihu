import React from 'react'

import styles from './header.css'

const propTypes = {
  title: React.PropTypes.string,
}

function CommentHeader(props) {
  const { title } = props

  return (
    <div className={styles.heare}>
      {title}
    </div>
  )
}

CommentHeader.propTypes = propTypes

export default CommentHeader
