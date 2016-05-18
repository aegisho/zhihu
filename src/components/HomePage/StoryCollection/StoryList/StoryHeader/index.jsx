import React from 'react'
import moment from 'moment'

import styles from './storyHeader.css'

const propTypes = { title: React.PropTypes.string }

const FORMAT = 'YYYYMMDD'

function parseDate(date) {
  let title = ''

  if (date) {
    if (date === moment().format(FORMAT)) {
      title = '今日热闻'
    } else {
      title = moment(date, FORMAT).format('MM月DD日 dddd')
    }
  }

  return title
}

function StoryHeader(props) {
  const title = parseDate(props.title)

  return <header className={styles.title}>{title}</header>
}

StoryHeader.propTypes = propTypes

export default StoryHeader

