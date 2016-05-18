import React from 'react'
import { Link } from 'react-router'

import zhihu from '../../services/zhihu'

import StoryCollection from './StoryCollection'
import Slider from '../Common/Slider'
import StorySliderItem from './StorySliderItem'

class Stories extends React.Component {
  constructor(props) {
    super(props)

    this.state = { topStories: [] }
  }

  componentDidMount() {
    zhihu.getTopStories().then((data) => {
      this.setState({ topStories: data })
    })
  }

  render() {
    const { topStories } = this.state

    let tops = topStories.map((story) => (
      <Slider.Item key={story.id}>
        <Link to={`/story/${story.id}`}>
          <StorySliderItem title={story.title} image={story.image} />
        </Link>
      </Slider.Item>
    ))

    return (
      <div className="home-page">
        <Slider>{tops}</Slider>
        <StoryCollection />
      </div>
    )
  }
}

export default Stories
