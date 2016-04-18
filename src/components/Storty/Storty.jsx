import React from 'react'

class Storty extends React.Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        <image src={this.props.image} />
      </article>
    )
  }
}

Storty.propTypes = {
  title: React.PropTypes.string,
  image: React.PropTypes.string
}

export default Storty
