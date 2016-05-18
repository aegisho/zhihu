import React from 'react'

import styles from './sliderItem.css'

const propTypes = {
  index: React.PropTypes.number,
  children: React.PropTypes.node,
  width: React.PropTypes.number,
}

function SliderItem(props) {
  return (
    <div className={styles.item} style={{ width: props.width }}>
      {props.children}
    </div>
  )
}

SliderItem.propTypes = propTypes

export default SliderItem
