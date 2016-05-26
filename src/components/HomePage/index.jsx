import React from 'react'
import { connect } from 'react-redux'

import Header from '../Header'
import StorySlider from './StorySlider'
import StoryCollection from './StoryCollection'

import { getTopStories } from '../../redux/action'
import styles from './homePage.css'

const propTypes = {
  dispatch: React.PropTypes.func,
  topStories: React.PropTypes.array,
}

class Stories extends React.Component {
  componentDidMount() {
    this.props.dispatch(getTopStories())
  }

  render() {
    const { topStories } = this.props

    return (
      <div className="home-page">
        <Header title="首页" />
        <div className={styles.slider}>
          <StorySlider topStories={topStories} />
        </div>
        <StoryCollection />
      </div>
    )
  }
}

Stories.propTypes = propTypes

export default connect((state) => {
  const { topStories } = state
  return { topStories }
})(Stories)
