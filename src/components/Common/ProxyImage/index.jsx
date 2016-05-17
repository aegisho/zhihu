import React from 'react'

import proxy from '../../../services/proxy'

const propTypes = {
  src: React.PropTypes.string,
}

// use node server to access image
function ProxyImage(props) {
  return <img {...props} src={proxy.parseImageSrc(props.src)} role="presentation" />
}

ProxyImage.propTypes = propTypes

export default ProxyImage
