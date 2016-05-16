import React from 'react'
import { findDOMNode } from 'react-dom'
import SliderItem from './Slider.Item'
import styles from './slider.css'

let ticking = false

// BUG: ontouchmove sometimg between two item
class Slider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 0,
      count: 0,
      activeIndex: 0,
      vectorX: 0,
    }

    ;[
      'onTouchStart',
      'onTouchMove',
      'onTouchEnd',
      'play',
      'pause'].forEach((method) => {
        this[method] = this[method].bind(this)
      })
  }

  componentDidMount() {
    if (this.props.autoPlay) {
      this.play()
    }
  }

  componentWillReceiveProps(nextProps) {
    const width = findDOMNode(this).clientWidth
    const count = React.Children.count(nextProps.children)

    this.setState({ width, count })
  }

  // componentDidUpdate() {

  // }

  componentWillUnmount() {
    clearTimeout(this.timeid)
  }

  onTouchStart(event) {
    const { pageX } = event.changedTouches[0]

    this.startPosition = pageX
    this.pause()
  }

  onTouchMove(event) {
    // FIXME: not enough Smooth
    if (!ticking) {
      ticking = true
      const { pageX } = event.changedTouches[0]

      requestAnimationFrame(() => {
        const prevPostions = this.prevPostions || this.startPosition
        const deltaX = pageX - prevPostions

        this.prevPostions = pageX
        this.updateVectorX(deltaX)
        ticking = false
      })
    }
  }

  onTouchEnd(event) {
    this.startPosition = this.prevPostions = 0
    const { pageX } = event.changedTouches[0]
    const endPosition = { x: pageX }
    const direction = endPosition.x - this.startPosition.x > 0 ? 'left' : 'right'
    const { width, vectorX } = this.state
    const deltaX = vectorX % width
    let index = Math.abs(vectorX - deltaX) / width

    // if moving rather then half width, goto direction
    if (Math.abs(deltaX) >= width / 2) {
      if (direction === 'left') {
        index -= 1
      } else {
        index += 1
      }
    }

    this.updateIndex(index)

    if (this.props.autoPlay) {
      setTimeout(this.play, this.props.speed)
    }
  }

  setIndex(activeIndex) {
    let index = activeIndex
    const { count } = this.state

    if (index < 0) {
      index = count - 1
    }

    if (index > count - 1) {
      index = 0
    }

    this.updateIndex(index)
  }

  next() {
    const index = this.state.activeIndex + 1
    this.setIndex(index)
  }

  play() {
    this.timeid = setTimeout(() => {
      this.next()
      this.play()
    }, this.props.speed)
  }

  pause() {
    clearTimeout(this.timeid)
  }

  updateIndex(index = this.state.activeIndex) {
    const { width } = this.state
    const vectorX = -(index * width)

    this.setState({ activeIndex: index, vectorX })
  }

  updateVectorX(deltaX) {
    const { vectorX, width, count } = this.state
    const maxVectorX = width * (count - 1)
    const border = width / 4

    let x = vectorX + deltaX
    if (x > border) x = 0
    if (maxVectorX + x < -border) x = -maxVectorX

    const index = x / width

    this.setState({ activeIndex: index, vectorX: x })
  }

  render() {
    return (
      <div
        className={styles.slider}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
      >
        <div
          className={styles.wrapper}
          style={{
            width: `${this.state.count * this.state.width}px`,
            transform: `translate3d(${this.state.vectorX}px, 0, 0)`,
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

Slider.propTypes = {
  autoPlay: React.PropTypes.bool,
  loop: React.PropTypes.bool,
  speed: React.PropTypes.number,
  children: React.PropTypes.node,
  // todo: pagination
  pagination: React.PropTypes.bool,
}

Slider.defaultProps = {
  autoPlay: false,
  speed: 3000,
  loop: false,
  pagination: true,
}

Slider.Item = SliderItem

export default Slider
