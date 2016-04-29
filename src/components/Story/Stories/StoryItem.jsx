import React from 'react'

import styles from './stories.css'
import ProxyImage from '../../Common/ProxyImage'

class StoryItem extends React.Component {
  render() {
    return (
      <div className={styles.story}>
        <ProxyImage src={this.props.image} />
        <p>{this.props.title}</p>
      </div>
    )
  }
}

StoryItem.propTypes = {
  title: React.PropTypes.string,
  image: React.PropTypes.string
}

export default StoryItem
