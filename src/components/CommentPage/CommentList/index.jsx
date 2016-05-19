import React from 'react'

import CommentHeader from './CommentHeader'
import CommentItem from './CommentItem'

const propTypes = {
  comments: React.PropTypes.array,
  title: React.PropTypes.string,
}

function CommentList(props) {
  const { comments, title } = props

  const commentList = comments.map((comment) => (
    <CommentItem key={comment.id} comment={comment} />
  ))

  return (
    <div className="comment-page">
      <CommentHeader title={title} />
      {commentList}
    </div>
  )
}

CommentList.propTypes = propTypes

export default CommentList
