import React from 'react'

import styles from './storyItem.css'
import ProxyImage from '../../../../Common/ProxyImage'

const propTypes = {
  title: React.PropTypes.string,
  image: React.PropTypes.string,
}

function StoryItem(props) {
  return (
    <div className={styles.item}>
      <ProxyImage src={props.image} className={styles.previewImage} />
      <p className={styles.title}>{props.title}</p>
    </div>
  )
}

StoryItem.propTypes = propTypes

export default StoryItem
