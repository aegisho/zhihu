import port from '../../server/port'

export default {
  parseImageSrc(src) {
    return `http://127.0.0.1:${port.image}/${encodeURIComponent(src)}`
  }
}
