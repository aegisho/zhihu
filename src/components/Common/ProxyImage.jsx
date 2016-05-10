import React from 'react'

import proxy from '../../services/proxy'

function ProxyImage(props) {
  return <img {...props} src={proxy.parseImageSrc(props.src)} role="presentation" />
}

ProxyImage.propTypes = { src: React.PropTypes.string }

export default ProxyImage
