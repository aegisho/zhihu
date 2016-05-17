import React from 'react'

import styles from '../index.css'

const propTypes = {
  count: React.PropTypes.number,
  activeIndex: React.PropTypes.number,
}

function SliderPagination(props) {
  const paginations = []

  for (let i = 0; i < props.count; i++) {
    let className = styles.paginationBullet
    if (i === props.activeIndex) {
      className += ` ${styles.paginationBulletActive}`
    }
    paginations.push(<span className={className}></span>)
  }

  return (
    <div className={styles.pagination}>
      {paginations}
    </div>
  )
}

SliderPagination.propTypes = propTypes

export default SliderPagination
