import React from 'react'
import { Link } from 'react-router'

import StoryItem from './StoryItem'
import Title from './Title'
import Slider from '../../Common/Slider'
import zhihu from '../../../services/zhihu'
import styles from './stories.css'

class Stories extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: '', stories: [], topStories: [] }
  }

  componentDidMount() {
    zhihu.getStories().then((data) => {
      const { date, stories, top_stories: topStories } = data
      this.setState({ date, stories, topStories })
    })
  }

  render() {
    const { date, stories, topStories } = this.state

    let tops = topStories.map((story) => (
      <Slider.Item className={styles['top-stories']} key={story.id}>
        <Link to={`/story/${story.id}`}>
          <StoryItem title={story.title} image={story.image} />
        </Link>
      </Slider.Item>
    ))

    let storiesList = stories.map((story) => (
      <li key={story.id}>
        <Link to={`/story/${story.id}`}>
          <StoryItem title={story.title} image={story.images[0]} />
        </Link>
      </li>
    ))

    return (
      <div>
        <Slider>{tops}</Slider>
        {/* TODO:改为列表，下拉加载跟多 */}
        <div className={styles.stories}>
          <Title date={date} />
          <ul>{storiesList}</ul>
        </div>
      </div>
    )
  }
}

Stories.propTypes = { data: React.PropTypes.array }

export default Stories
