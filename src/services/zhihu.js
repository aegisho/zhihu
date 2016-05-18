import moment from 'moment'
import port from '../../server/port'
import cache from './cache'

const DOMAIN = `http://127.0.0.1:${port.api}`

const FORMAT = 'YYYYMMDD'

const request = (api) => {
  const url = `${DOMAIN}${api}`
  return fetch(url).then(res => res.json())
}

const CACHE = true
// TODO:FIXME: set cache to other file
export default {
  getTopStories() {
    return this.getStories().then((data) => data.top_stories)
  },
  getLastStories() {
    return request('/stories/latest')
  },
  getBeforeStories(date) {
    const before = moment(date, FORMAT).add(1, 'days').format(FORMAT)
    return request(`/stories/before/${before}`)
  },
  getStories(date) {
    let result

    if (CACHE) {
      const key = date || moment().format(date)
      const value = cache.get(key)

      if (value) {
        result = Promise.resolve(value)
      }
    }

    if (!result) {
      const method = date ? 'getBeforeStories' : 'getLastStories'

      result = this[method](date).then((data) => {
        if (CACHE) {
          cache.set(data.date, data)
        }

        return data
      })
    }

    return result
  },
  getStory(id) {
    let result
    const key = `Stroy_${id}`

    if (CACHE) {
      const value = cache.get(key)

      if (value) {
        result = Promise.resolve(value)
      }
    }

    if (!result) {
      result = request(`/story/${id}`).then((story) =>
        request(`/story-extra/${id}`)
          .then((extra) => Object.assign(story, extra))
          .catch(() => story)
      ).then((data) => {
        if (CACHE) {
          cache.set(key, data)
        }
        return data
      })
    }

    return result
  },
  getLongComments(id) {
    return request(`/story/${id}/long-comments`)
  },
  getShortComments(id) {
    return request(`/story/${id}/short-comments`)
  },
}
