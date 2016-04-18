import React from 'react'
import port from '../../../server/port'

class ImageProxy extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let proxy = `http://127.0.0.1:${port.image}/`
    let src = proxy + encodeURIComponent(this.props.src)
    return <img {...this.props} src={src} />
  }
}

ImageProxy.propTypes = { src: React.PropTypes.string }

export default ImageProxy
