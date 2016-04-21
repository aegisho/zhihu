import React from 'react'

import ProxyImage from '../../Common/ProxyImage'

class StoryItem extends React.Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        <ProxyImage src={this.props.image} />
      </article>
    )
  }
}

StoryItem.propTypes = {
  title: React.PropTypes.string,
  image: React.PropTypes.string
}

export default StoryItem
