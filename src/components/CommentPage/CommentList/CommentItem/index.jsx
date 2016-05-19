import React from 'react'

import styles from './item.css'

const propTypes = {
  comment: React.PropTypes.object,
}

function CommentItem(props) {
  const { author, content, time } = props.comment

  return (
    <div className={styles.item}>
      <p className={styles.author}>{author}</p>
      <p className={styles.content}>{content}</p>
      <p className={styles.time}>{time}</p>
    </div>
  )
}

CommentItem.propTypes = propTypes

export default CommentItem
