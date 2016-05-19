import React from 'react'

import zhihu from '../../services/zhihu'

import Header from '../Header'
import CommentList from './CommentList'

const propTypes = {
  params: React.PropTypes.object,
}

class CommentPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      longComments: [],
      shortComments: [],
    }
  }

  componentDidMount() {
    const { storyid } = this.props.params

    zhihu.getLongComments(storyid).then((longComments) => {
      this.setState({ longComments })
    })

    zhihu.getShortComments(storyid).then((shortComments) => {
      this.setState({ shortComments })
    })
  }

  render() {
    const { longComments, shortComments } = this.state

    const longCommentsLength = longComments.length
    const shortCommentsLength = shortComments.length

    const longTitle = `${longCommentsLength}条长评`
    const shortTitle = `${shortCommentsLength}条短评`
    const title = `${longCommentsLength + shortCommentsLength}条点评`

    return (
      <div className="comment-page">
        <Header title={title} showBack />
        <CommentList title={longTitle} comments={longComments} />
        <CommentList title={shortTitle} comments={shortComments} />
      </div>
    )
  }
}

CommentPage.propTypes = propTypes

export default CommentPage
