import React from 'react'

import styles from './stories.css'
import ProxyImage from '../../Common/ProxyImage'

function StoryItem(props) {
  return (
    <div className={styles.story}>
      <ProxyImage src={props.image} />
      <p>{props.title}</p>
    </div>
  )
}

StoryItem.propTypes = {
  title: React.PropTypes.string,
  image: React.PropTypes.string,
}

export default StoryItem
