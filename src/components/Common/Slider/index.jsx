import React from 'react'
import { findDOMNode } from 'react-dom'
import SliderItem from './Slider.Item'
import styles from './slider.css'

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
      'pause',
      'next',
      'prev'].forEach((method) => {
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

    this.startPosition = { x: pageX }
    this.pause()
  }

  onTouchMove(event) {
    const { pageX } = event.changedTouches[0]
    const currentPosition = { x: pageX }
    const deltaX = currentPosition.x - this.startPosition.x

    this.startPosition = currentPosition
    this.update(this.state.activeIndex, deltaX)
  }

  onTouchEnd() {
    const { width, vectorX } = this.state

    // if moving rather then half width, goto next or prev
    if (Math.abs(vectorX) > width / 4) {
      if (vectorX < 0) {
        this.next()
      } else {
        this.prev()
      }
    } else {
      this.update()
    }

    if (this.props.autoPlay) {
      setTimeout(this.play, this.props.speed)
    }
  }

  next() {
    const { activeIndex, count } = this.state

    let index = activeIndex + 1

    if (index > count - 1) {
      index = 0
    }

    this.update(index)
  }

  prev() {
    let index = this.state.activeIndex - 1
    const count = React.Children.count(this.props.children)

    if (index < 0) {
      index = count - 1
    }

    this.update(index)
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

  // todo: BUG different with index change and move change
  update(index = this.state.activeIndex, deltaX = 0) {
    const { activeIndex, vectorX, width, count } = this.state
    const totalWidth = width * count

    let x = (index - activeIndex) * width
    if (x === 0) {
      x += vectorX + deltaX
    }

    if (x > 0) x = 0
    if (totalWidth + x < 0) x = -totalWidth

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
}

Slider.defaultProps = {
  autoPlay: false,
  speed: 3000,
  loop: false,
}

Slider.Item = SliderItem

export default Slider
