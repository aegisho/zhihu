import React from 'react'
import moment from 'moment'

import styles from './item.css'

const propTypes = {
  comment: React.PropTypes.object,
}

function CommentItem(props) {
  const { author, content, time, reply_to: replyto } = props.comment
  const timeStr = moment(time * 1000).format('MM-DD hh:mm')

  let replytoNode
  if (replyto) {
    replytoNode = (
      <div className={styles.replyto}>
        <b>//{replyto.author}：</b>{replyto.content}
      </div>
    )
  }

  return (
    <div className={styles.item}>
      <p className={styles.author}><b>{author}</b></p>
      <div className={styles.content}>
        {content}
        {replytoNode}
      </div>
      <p className={styles.time}>{timeStr}</p>
    </div>
  )
}

CommentItem.propTypes = propTypes

export default CommentItem
