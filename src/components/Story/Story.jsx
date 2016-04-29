import React from 'react'

import zhihu from '../../services/zhihu'
import ProxyImage from '../Common/ProxyImage'
import proxy from '../../services/proxy'

import '../../styles/zhihu.css'
import styles from './story.css'

const SRCREGEX = /(<img [^>]*src=['"])([^'"]+)([^>]*>)/gi

class Story extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      image: '',
      body: '',
      imageSource: ''
    }
  }

  render() {
    return (
      <article>
        <header className={styles.header}>
          返回
        </header>
        <div className={styles.cover}>
          <ProxyImage src={this.state.image} className={styles.background} />
          <div className={styles.mask}>
            <h2 className={styles.title}>{this.state.title}</h2>
            <p className={styles.mark}>{this.state.imageSource}</p>
          </div>
        </div>
        {/* eslint-disable */}
        <div dangerouslySetInnerHTML={{__html: this.state.body}} />
        {/* eslint-enable */}
      </article>
    )
  }

  componentWillMount() {
    let id = this.props.params.id
    zhihu.getStory(id).then((data) => {
      this.setState({ title: data.title })
      this.setState({ image: data.image })
      this.setState({ body: this.parse(data.body) })
      this.setState({ imageSource: data.image_source })
    })
  }

  parse(html) {
    return html.replace(SRCREGEX, function(match, left, src, right) {
      return left + proxy.parseImageSrc(src) + right
    })
  }
}

Story.propTypes = {
  params: React.PropTypes.object
}

export default Story
