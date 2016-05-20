import React from 'react'

import CommentHeader from './CommentHeader'
import CommentItem from './CommentItem'

const propTypes = {
  comments: React.PropTypes.array,
  title: React.PropTypes.string,
  visibility: React.PropTypes.bool,
}

class CommentList extends React.Component {
  constructor(props) {
    super(props)

    this.state = { display: props.visibility }
    this.toggleList = this.toggleList.bind(this)
  }

  toggleList() {
    let { display } = this.state

    display = !display
    this.setState({ display })
  }

  render() {
    const { comments, title } = this.props

    let commentList
    if (this.state.display) {
      commentList = comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem comment={comment} />
        </li>
      ))
    }

    return (
      <div className="comment-page">
        <CommentHeader title={title} onClick={this.toggleList} />
        <ul>
          {commentList}
        </ul>
      </div>
    )
  }
}

CommentList.propTypes = propTypes

export default CommentList
