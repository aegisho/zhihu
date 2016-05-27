import moment from 'moment'
import port from '../../server/port'

const DOMAIN = `http://127.0.0.1:${port.api}`

const FORMAT = 'YYYYMMDD'

const request = (api) => {
  const url = `${DOMAIN}${api}`
  return fetch(url).then(res => res.json())
}

const zhihu = {
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
    const method = date ? 'getBeforeStories' : 'getLastStories'

    return this[method](date)
  },
  getPrevStories() {
    const date = this.getPrevStories.date = this.getPrevStories.date || new Date()

    const dateStr = moment(date).format(FORMAT)
    date.setDate(date.getDate() - 1)

    return this.getStories(dateStr)
  },
  getStory(id) {
    return request(`/story/${id}`).then((story) =>
        request(`/story-extra/${id}`)
          .then((extra) => Object.assign(story, extra))
          .catch(() => story)
      )
  },
  getLongComments(id) {
    return request(`/story/${id}/long-comments`).then((data) => data.comments)
  },
  getShortComments(id) {
    return request(`/story/${id}/short-comments`).then((data) => data.comments)
  },
}

export default zhihu
