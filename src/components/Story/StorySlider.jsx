import React from 'react'

import styles from './story.css'
import ProxyImage from '../Common/ProxyImage'

function StorySlider(props) {
  return (
    <div className={styles.slider}>
      <ProxyImage src={props.image} />
      <p>{props.title}</p>
    </div>
  )
}

StorySlider.propTypes = {
  title: React.PropTypes.string,
  image: React.PropTypes.string,
}

export default StorySlider
