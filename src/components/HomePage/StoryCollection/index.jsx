import React from 'react'
import { connect } from 'react-redux'

import StroyList from './StoryList'
import { getStories } from '../../../redux/action'

const propTypes = {
  dispatch: React.PropTypes.func,
  stories: React.PropTypes.array,
}

const winHeight = document.documentElement.clientHeight

class StroyCollection extends React.Component {
  constructor(props) {
    super(props)

    this.onScrollHandle = this.onScrollHandle.bind(this)
  }

  componentDidMount() {
    this.preload()

    document.addEventListener('scroll', this.onScrollHandle, false)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScrollHandle)
  }

  onScrollHandle() {
    // load more
    if (!this.loading) {
      clearTimeout(this.timeid)

      this.timeid = setTimeout(() => {
        const height = document.body.clientHeight
        const scrollTop = document.body.scrollTop

        if (scrollTop + winHeight + 400 > height) {
          this.loading = true
          this.getStories().then(() => { this.loading = false })
        }
      }, 200)
    }

    // TODO: setTitle
  }

  getStories() {
    return this.props.dispatch(getStories())
  }

  preload(number = 3) {
    let promise = this.getStories()

    for (let i = 1; i < number; i++) {
      promise = promise.then(() => this.getStories())
    }
  }

  render() {
    const { stories } = this.props

    let storyCollection = stories.map((story) => (
      <StroyList key={story.date} title={story.date} stories={story.stories} />
    ))

    return (
      <div className="story-collection">
        {storyCollection}
      </div>
    )
  }
}

StroyCollection.propTypes = propTypes

export default connect((state) => {
  const { stories } = state
  return { stories }
})(StroyCollection)

