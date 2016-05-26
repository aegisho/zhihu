import zhihu from '../services/zhihu'

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

export function getLongComment(storyid) {
  return (dispatch) =>
    zhihu.getLongComment(storyid).then((result) => {
      const data = { type: 'GET_LONG_COMMENT', storyid, longComments: result }
      return dispatch(data)
    })
}

export function getShortComment(storyid) {
  return (dispatch) =>
    zhihu.getShortComment(storyid).then((result) => {
      const data = { type: 'GET_SHORT_COMMENT', storyid, shortComments: result }
      return dispatch(data)
    })
}

