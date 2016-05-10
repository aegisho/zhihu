import React from 'react'
import { Link } from 'react-router'

import StoryItem from './StoryItem'
import Title from './Title'
import zhihu from '../../../services/zhihu'
import styles from './stories.css'

class Stories extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: '', stories: [] }
  }

  componentDidMount() {
    zhihu.getStories().then((data) => {
      const { date, stories } = data
      this.setState({ date, stories })
    })
  }

  render() {
    const { date, stories } = this.state

    let storiesList = stories.map((story) => (
      <li key={story.id}>
        <Link to={`/story/${story.id}`}>
          <StoryItem title={story.title} image={story.images[0]} />
        </Link>
      </li>
    ))

    return (
      <div className={styles.stories}>
        <Title date={date} />
        <ul>
          {storiesList}
        </ul>
      </div>
    )
  }
}

Stories.propTypes = { data: React.PropTypes.array }

export default Stories
