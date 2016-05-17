import React from 'react'

import styles from './story.css'
import ProxyImage from '../Common/ProxyImage'

function StorySlider(props) {
  return (
    <div className={styles.slider}>
      <ProxyImage src={props.image} />
      <div className={styles.mask}>
        <p>{props.title}</p>
      </div>
    </div>
  )
}

StorySlider.propTypes = {
  title: React.PropTypes.string,
  image: React.PropTypes.string,
}

export default StorySlider
