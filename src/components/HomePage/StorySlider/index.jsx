import React from 'react'
import { Link } from 'react-router'

import Slider from '../../Common/Slider'
import StorySliderItem from './StorySliderItem'

const propTypes = {
  topStories: React.PropTypes.array,
}

function StorySlider(props) {
  let items = props.topStories.map((story) => (
    <Slider.Item key={story.id}>
      <Link to={`/story/${story.id}`}>
        <StorySliderItem title={story.title} image={story.image} />
      </Link>
    </Slider.Item>
  ))

  return (<Slider>{items}</Slider>)
}

StorySlider.propTypes = propTypes

export default StorySlider
