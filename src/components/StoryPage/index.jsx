import React from 'react'

import styles from './storyPage.css'
import '../../styles/zhihu.css'
import '../../styles/story.css'

import zhihu from '../../services/zhihu'
import proxy from '../../services/proxy'
import ProxyImage from '../Common/ProxyImage'
import Header from '../Header'

const propTypes = {
  params: React.PropTypes.object,
}

const SRCREGEX = /(<img [^>]*src=['"])([^'"]+)([^>]*>)/gi

class StoryPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = { story: {} }
  }

  componentWillMount() {
    const id = this.props.params.id

    zhihu.getStory(id).then((data) => {
      this.setState({ story: data })
    })
  }

  parse(html = '') {
    return html.replace(SRCREGEX, (match, left, src, right) => {
      const proxySrc = proxy.parseImageSrc(src)

      return left + proxySrc + right
    })
  }

  render() {
    const { title, image, image_source: imageSource, comments, popularity } = this.state.story
    const body = this.parse(this.state.story.body)

    return (
      <article>
        <Header className={styles.header} showBack>
          <span className="fa fa-commenting">{comments}</span>
          <span className="fa fa-thumbs-up">{popularity}</span>
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

export default StoryPage
