import React from 'react'
import { connect } from 'react-redux'

import Header from '../Header'
import CommentList from './CommentList'
import { getComments, removeComments } from '../../redux/action'

const propTypes = {
  dispatch: React.PropTypes.func,
  comments: React.PropTypes.shape({
    longComments: React.PropTypes.array,
    shortComments: React.PropTypes.array,
  }),
  params: React.PropTypes.object,
}

class CommentPage extends React.Component {
  componentDidMount() {
    const { dispatch, params: { storyid } } = this.props
    dispatch(getComments(storyid))
  }

  componentWillUnmount() {
    const { dispatch } = this.props

    dispatch(removeComments())
  }

  render() {
    const { longComments, shortComments } = this.props.comments

    const longCommentsLength = longComments.length
    const shortCommentsLength = shortComments.length

    const longTitle = `${longCommentsLength}条长评`
    const shortTitle = `${shortCommentsLength}条短评`
    const title = `${longCommentsLength + shortCommentsLength}条点评`

    return (
      <div className="comment-page">
        <Header title={title} showBack />
        <CommentList title={longTitle} comments={longComments} visibility />
        <CommentList title={shortTitle} comments={shortComments} />
      </div>
    )
  }
}

CommentPage.propTypes = propTypes

export default connect((state) => {
  const { comments } = state
  return { comments }
})(CommentPage)
