import React from 'react'

import zhihu from '../../../services/zhihu'

import StroyList from './StoryList'

class StroyCollection extends React.Component {
  constructor(props) {
    super(props)

    this.state = { storyCollection: [] }
  }

  componentDidMount() {
    zhihu.getStories().then((data) => this.state.storyCollection.push(data))
  }

  // TODO: download load more

  render() {
    let storyCollection = this.state.storyCollection.map((story) => (
      <StroyList key={story.date} title={story.date} stories={story.stories} />
    ))

    return (
      <div className="story-collection">{storyCollection}</div>
    )
  }
}

export default StroyCollection

