// todo:
// 1.列表页显示 今日热文 或者 MM月dd日 weekday
// 2.点评页面显示 x条点评 和 goback

import React from 'react'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { title: this.props.title }
  }
  render() {
    return (
      <header>{this.state.title}</header>
    )
  }
}

Header.propTypes = { title: React.PropTypes.string }
Header.dispalyName = 'Header'
export default Header
