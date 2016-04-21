import React from 'react'
import { render, findDOMNode } from 'react-dom'

import zhihu from '../../services/zhihu'
import ProxyImage from '../Common/ProxyImage'

import './story.css'

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
        <header className="story">
          <h2 className="title">{this.state.title}</h2>
          <p className="marsk">{this.state.imageSource}</p>
        </header>
        {/* eslint-disable */}
        <div dangerouslySetInnerHTML={{__html: this.state.body}} />
        {/* eslint-enable */}
      </article>
    )
  }

  componentDidMount() {
    let id = this.props.params.id
    zhihu.getStory(id).then((data) => {
      this.setState({ title: data.title })
      this.setState({ image: data.image })
      this.setState({ body: data.body })
      this.setState({ imageSource: data.image_source })
    })
  }

  componentDidUpdate() {
    const el = findDOMNode(this)

    let placeHolder = el.querySelector('.img-place-holder')

    if (placeHolder) {
      let temp = document.createElement('div')
      let images = el.querySelectorAll('img')

      for (let i = 0; i < images.length; i++) {
        let image = images[i]
        let { src, className, alt } = image
        render(<ProxyImage src={src} className={className} alt={alt} />, temp)

        image.parentNode.replaceChild(temp.firstElementChild, image)
      }

      render(<ProxyImage src={this.state.image} />, placeHolder)
    }
  }
}

Story.propTypes = {
  params: React.PropTypes.object
}

export default Story
