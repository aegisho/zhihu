import React from 'react'
import { render, findDOMNode } from 'react-dom'

import zhihu from '../../services/zhihu'
import ProxyImage from '../Common/ProxyImage'

import './storty.css'

class Storty extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      image: '',
      body: ''
    }
  }

  render() {
    return (
      <article>
        <h2>{this.state.title}</h2>
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

Storty.propTypes = {
  params: React.PropTypes.object
}

export default Storty
