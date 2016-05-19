import React from 'react'
import { Link } from 'react-router'

import styles from './storyList.css'

import StoryItem from './StoryItem'
import StoryHeader from './StoryHeader'

const propTypes = {
  title: React.PropTypes.string,
  stories: React.PropTypes.array,
}

function StoryList(props) {
  const { title, stories } = props

  const storyList = stories.map((story) => (
    <li key={story.id}>
      <Link className={styles.link} to={`/story/${story.id}`}>
        <StoryItem title={story.title} image={story.images[0]} />
      </Link>
    </li>
  ))

  return (
    <div className={styles.list}>
      <StoryHeader title={title} />
      <ul>{storyList}</ul>
    </div>
  )
}

StoryList.propTypes = propTypes

export default StoryList
