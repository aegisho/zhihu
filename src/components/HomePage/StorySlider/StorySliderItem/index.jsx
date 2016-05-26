import React from 'react'

import styles from './storySliderItem.css'
import ProxyImage from '../../../Common/ProxyImage'

const propTypes = {
  title: React.PropTypes.string,
  image: React.PropTypes.string,
}

function StorySliderItem(props) {
  return (
    <div className={styles.slider}>
      <ProxyImage src={props.image} className={styles.previewImage} />
      <div className={styles.mask}>
        <p className={styles.title}>{props.title}</p>
      </div>
    </div>
  )
}

StorySliderItem.propTypes = propTypes

export default StorySliderItem
