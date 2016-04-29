import React from 'react'
import moment from 'moment'

import styles from './stories.css'

class Title extends React.Component {
  constructor(props) {
    super(props)

    this.state = { title: this.parseDate() }
  }

  componentWillReceiveProps() {
    this.setState({ title: this.parseDate() })
  }

  parseDate() {
    const FORMAT = 'YYYYMMDD'

    let date = this.props.date
    let title = ''

    if (date) {
      if (date === moment().format(FORMAT)) {
        title = '今日热闻'
      } else {
        moment().locale('zh-cn')
        title = moment(date, FORMAT).format('MM月DD日 dddd')
      }
    }

    return title
  }

  render() {
    return <h2 className={styles.title}>{this.state.title}</h2>
  }
}

Title.propTypes = { date: React.PropTypes.string }

export default Title

