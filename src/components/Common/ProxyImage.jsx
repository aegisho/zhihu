import React from 'react'

import proxy from '../../services/proxy'

class ProxyImage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <img {...this.props} src={proxy.parseImageSrc(this.props.src)} />
  }
}

ProxyImage.propTypes = { src: React.PropTypes.string }

export default ProxyImage
