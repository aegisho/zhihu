import React from 'react'
import moment from 'moment'

import zhihu from '../../../services/zhihu'

import StroyList from './StoryList'

const propTypes = {
  onSetHeader: React.PropTypes.func,
}

const FORMAT = 'YYYYMMDD'

const winHeight = document.documentElement.clientHeight

class StroyCollection extends React.Component {
  constructor(props) {
    super(props)

    this.state = { storyCollection: [] }
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
    // this.props.onSetHeader()
  }

  getStories() {
    this.date = this.date || new Date()
    const dateStr = moment(this.date).format(FORMAT)

    return zhihu.getStories(dateStr).then((data) => {
      const storyCollection = this.state.storyCollection.concat(data)
      this.setState({ storyCollection })

      this.date.setDate(this.date.getDate() - 1)
    })
  }

  preload(number = 3) {
    let promise = this.getStories()
    for (let i = 1; i < number; i++) {
      promise = promise.then(() => this.getStories())
    }
  }

  render() {
    let storyCollection = this.state.storyCollection.map((story) => (
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

export default StroyCollection

