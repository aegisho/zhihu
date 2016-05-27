import moment from 'moment'

import zhihu from './zhihu'
import cache from './cache'

const FORMAT = 'YYYYMMDD'

const zhihuCache = Object.assign({}, zhihu)

zhihuCache.getStories = (date) => {
  const key = moment(date).format(FORMAT)
  const value = cache.get(key)

  return value ? Promise.resolve(value) : zhihu.getStories(date)
}

zhihuCache.getStory = (id) => {
  const key = `Stroy_${id}`
  const value = cache.get(key)

  return value ? Promise.resolve(value) : zhihu.getStory(id)
}

export default zhihuCache
