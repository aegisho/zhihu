import React from 'react'
import styles from './slider.css'

class SliderItem extends React.Component {
  defaultProps() {
    return {
      index: 0,
    }
  }

  render() {
    return (
      <div className={styles.item}>
        {this.props.children}
      </div>
    )
  }
}

SliderItem.propTypes = {
  index: React.PropTypes.number,
  children: React.PropTypes.node,
}

export default SliderItem
