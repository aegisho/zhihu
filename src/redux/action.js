import zhihu from '../services/zhihuCache'

export function getTopStories() {
  return (dispatch) =>
    zhihu.getTopStories().then((result) => {
      const data = { type: 'GET_TOP_STORIES', topStories: result }
      return dispatch(data)
    })
}

export function getStories() {
  return (dispatch) =>
    zhihu.getPrevStories().then((result) => {
      const data = { type: 'GET_STORIES', stories: result }
      return dispatch(data)
    })
}

export function getStory(storyid) {
  return (dispatch) =>
    zhihu.getStory(storyid).then((result) => {
      const data = { type: 'GET_STORY', story: result }
      return dispatch(data)
    })
}

export function removeStory() {
  return { type: 'GET_STORY', story: {} }
}

export function getComments(storyid) {
  return (dispatch) =>
    Promise.all([
      zhihu.getLongComments(storyid),
      zhihu.getShortComments(storyid),
    ]).then(([longComments, shortComments]) => {
      const data = { type: 'GET_COMMENTS', longComments, shortComments }
      return dispatch(data)
    })
}

export function removeComments() {
  return { type: 'GET_COMMENTS', shortComments: [], longComments: [] }
}
