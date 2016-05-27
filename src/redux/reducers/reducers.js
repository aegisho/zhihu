export function topStories(state = [], action) {
  let result = state
  if (action.type === 'GET_TOP_STORIES') {
    result = action.topStories
  }
  return result
}

export function stories(state = [], action) {
  let result = state
  if (action.type === 'GET_STORIES') {
    result = result.concat(action.stories)
  }
  return result
}

export function story(state = {}, action) {
  let result = state
  if (action.type === 'GET_STORY') {
    result = action.story
  }
  return result
}

export function comments(state = { longComments: [], shortComments: [] }, action) {
  let result = state
  if (action.type === 'GET_COMMENTS') {
    const { longComments, shortComments } = action

    result = { longComments, shortComments }
  }
  return result
}
