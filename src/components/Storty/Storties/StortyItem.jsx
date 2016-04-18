import React from 'react'

import ProxyImage from '../../Common/ProxyImage'

class StortyItem extends React.Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        <ProxyImage src={this.props.image} />
      </article>
    )
  }
}

StortyItem.propTypes = {
  title: React.PropTypes.string,
  image: React.PropTypes.string
}

export default StortyItem
