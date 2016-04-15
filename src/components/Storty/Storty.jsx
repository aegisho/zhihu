import React from 'react'

class Storty extends React.Component {
  render() {
    return (
      <div>{this.props.title}</div>
    )
  }
}

Storty.propTypes = { title: React.PropTypes.string }

export default Storty
