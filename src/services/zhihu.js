// https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90

import port from '../../server/port'
const DOMAIN = `http://127.0.0.1:${port.api}`

const request = (api) => {
  let url = `${DOMAIN}${api}`
  return fetch(url).then(res => res.json())
}

export default {
  getStories(date) {
    let api = date ? `/stories/before/${date}` : '/stories/latest'
    return request(api)
  },
  getStory(id) {
    return request(`/story/${id}`).then((story) => {
      return request(`/story-extra/${id}`).then((extra) => {
        return Object.assign(story, extra)
      }).catch(() => story)
    })
  },
  getLongComments(id) {
    return request(`/story/${id}/long-comments`)
  },
  getShortComments(id) {
    return request(`/story/${id}/short-comments`)
  }
}
