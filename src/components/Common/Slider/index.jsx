import React from 'react'
import { findDOMNode } from 'react-dom'

import SliderItem from './SliderItem'
import SliderPagination from './SliderPagination'
import styles from './index.css'

let ticking = false

const propTypes = {
  autoPlay: React.PropTypes.bool,
  children: React.PropTypes.node,
  duration: React.PropTypes.number,
  loop: React.PropTypes.bool,
  pagination: React.PropTypes.bool, // todo
  speed: React.PropTypes.number,
}

const defaultProps = {
  autoPlay: true,
  duration: 0.5,
  loop: false,
  pagination: true,
  speed: 3000,
}

// FIXME: not enough trusty
class Slider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 0,
      count: 0,
      activeIndex: 0,
      vectorX: 0,
      duration: 0,
    }

    ;['onTouchStart', 'onTouchMove', 'onTouchEnd'].forEach((method) => {
      this[method] = this[method].bind(this)
    })
  }

  componentDidMount() {
    this.autoPlay()
  }

  componentWillReceiveProps(nextProps) {
    // compute total width
    const width = findDOMNode(this).clientWidth
    const count = React.Children.count(nextProps.children)

    this.setState({ width, count })
  }

  componentWillUnmount() {
    clearTimeout(this.timeid)
  }

  onTouchStart(event) {
    const { pageX } = event.changedTouches[0]
    this.startPosition = pageX
    this.pause()
  }

  onTouchMove(event) {
    const { pageX } = event.changedTouches[0]

    if (!ticking) {
      ticking = true

      requestAnimationFrame(() => {
        const prevPostions = this.prevPostions || this.startPosition

        // avoid after touchEnd event
        if (prevPostions != null) {
          const deltaX = prevPostions - pageX

          this.prevPostions = pageX
          this.updateVectorX(deltaX)
        }

        ticking = false
      })
    }
  }

  onTouchEnd(event) {
    const { pageX } = event.changedTouches[0]
    const endPosition = pageX
    const direction = endPosition - this.startPosition > 0 ? 'left' : 'right'
    const { activeIndex, width, vectorX } = this.state

    const deltaX = vectorX % width
    let index = (vectorX - deltaX) / width

    this.startPosition = this.prevPostions = null

    // if moving rather then half width, goto direction
    if (index === activeIndex && Math.abs(deltaX) >= width / 2) {
      if (direction === 'left') {
        index -= 1
      } else {
        index += 1
      }
    }

    this.updateIndex(index)
    this.autoPlay()
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
    this.setState({ duration: this.props.duration })

    this.timeid = setTimeout(() => {
      this.next()
      this.play()
    }, this.props.speed)
  }

  pause() {
    clearTimeout(this.timeid)
    this.timeid = 0

    this.setState({ duration: 0 })
  }

  autoPlay() {
    if (this.props.autoPlay && !this.timeid) {
      this.play()
    }
  }

  updateIndex(index = this.state.activeIndex) {
    const { width } = this.state
    const vectorX = index * width
    const deltaX = Math.abs(vectorX - this.state.vectorX)
    // moveing animation time
    const duration = this.props.duration * deltaX / width

    this.setState({ activeIndex: index, vectorX, duration })
  }

  updateVectorX(deltaX) {
    const { vectorX, width, count } = this.state
    const maxVectorX = width * (count - 1)
    // elasticity on border
    // const border = width / 4
    const border = 0

    let x = vectorX + deltaX
    if (x < -border) x = 0
    if (x > maxVectorX + border) x = maxVectorX

    const index = Math.floor(x / width)

    this.setState({ activeIndex: index, vectorX: x })
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child, index) => React.cloneElement(child, {
        index,
        width: this.state.width,
      })
    )

    let style = {
      width: `${this.state.count * this.state.width}px`,
      transform: `translate3d(${-this.state.vectorX}px, 0, 0)`,
    }

    if (this.state.duration) {
      style.transition = `transform ${this.state.duration}s`
    }

    let pagination = ''
    if (this.props.pagination) {
      pagination = (<SliderPagination
        count={this.state.count}
        activeIndex={this.state.activeIndex}
      />)
    }

    return (
      <div
        className={styles.slider}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
      >
        <div style={style}>
          {childrenWithProps}
        </div>
        {pagination}
      </div>
    )
  }
}

Slider.propTypes = propTypes

Slider.defaultProps = defaultProps

Slider.Item = SliderItem

export default Slider
