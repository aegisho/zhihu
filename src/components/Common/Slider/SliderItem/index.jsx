import React from 'react'

import styles from '../index.css'

const propTypes = {
  index: React.PropTypes.number,
  children: React.PropTypes.node,
  width: React.PropTypes.number,
}

class SliderItem extends React.Component {
  defaultProps() {
    return {
      index: 0,
    }
  }

  render() {
    return (
      <div className={styles.item} style={{ width: this.props.width }}>
        {this.props.children}
      </div>
    )
  }
}

SliderItem.propTypes = propTypes

export default SliderItem
