import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import styles from './storyPage.css'
import '../../styles/zhihu.css'

import { getStory } from '../../redux/action'
import proxy from '../../services/proxy'
import ProxyImage from '../Common/ProxyImage'
import Header from '../Header'

const propTypes = {
  dispatch: React.PropTypes.func,
  params: React.PropTypes.object,
  story: React.PropTypes.object,
}

const SRCREGEX = /(<img [^>]*src=['"])([^'"]+)([^>]*>)/gi

class StoryPage extends React.Component {

  componentWillMount() {
    const { storyid } = this.props.params

    this.props.dispatch(getStory(storyid))
  }

  parse(html = '') {
    return html.replace(SRCREGEX, (match, left, src, right) => {
      const proxySrc = proxy.parseImageSrc(src)

      return left + proxySrc + right
    })
  }

  render() {
    const { storyid } = this.props.params
    const { title, image, image_source: imageSource, comments } = this.props.story
    const body = this.parse(this.props.story.body)

    return (
      <article className="sotry-page">
        <Header className={styles.header} showBack>
          <Link to={`/comment/${storyid}`}>
            <span className={styles.commentIcon}></span>{comments || '...'}
          </Link>
        </Header>
        <div className={styles.cover}>
          <ProxyImage src={image} className={styles.background} />
          <div className={styles.mask}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.mark}>{imageSource}</p>
          </div>
        </div>
        {/* eslint-disable */}
        <div dangerouslySetInnerHTML={{__html: body}} />
        {/* eslint-enable */}
      </article>
    )
  }
}

StoryPage.propTypes = propTypes

export default connect((state) => {
  const { story } = state
  return { story }
})(StoryPage)
