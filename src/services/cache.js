const PREFIX = 'ZHIHUDAILY'

export default {
  get(key) {
    let result = localStorage.getItem(`${PREFIX}_${key}`)

    if (result) {
      try {
        result = JSON.parse(result)
      } catch (e) {
        /* eslint-disable no-empty */
        /* eslint-enable no-empty */
      }
    }
    return result
  },
  set(key, value) {
    localStorage.setItem(`${PREFIX}_${key}`, JSON.stringify(value))
  },
  remove(key) {
    localStorage.removeItem(`${PREFIX}_${key}`)
  },
}
