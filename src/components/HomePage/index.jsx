import React from 'react'
import { Link } from 'react-router'

import zhihu from '../../services/zhihu'
import styles from './homePage.css'

import Header from '../Header'
import StoryCollection from './StoryCollection'
import Slider from '../Common/Slider'
import StorySliderItem from './StorySliderItem'

class Stories extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      topStories: [],
      title: '首页',
    }
  }

  componentDidMount() {
    zhihu.getTopStories().then((data) => {
      this.setState({ topStories: data })
    })
  }

  onSetHeader(title) {
    this.setState({ title })
  }

  render() {
    const { topStories, title } = this.state

    let tops = topStories.map((story) => (
      <Slider.Item key={story.id}>
        <Link to={`/story/${story.id}`}>
          <StorySliderItem title={story.title} image={story.image} />
        </Link>
      </Slider.Item>
    ))

    return (
      <div className="home-page">
        <Header title={title} />
        <div className={styles.slider}>
          <Slider>{tops}</Slider>
        </div>
        <StoryCollection onSetHeader={this.onSetHeader} />
      </div>
    )
  }
}

export default Stories
