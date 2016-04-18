import React from 'react'
import { Link } from 'react-router'

import StortyItem from './StortyItem'
import zhihu from '../../../services/zhihu'

class Storties extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: { date: '', stories: [] } }
  }

  render() {
    let { date, stories } = this.state.data

    let storties = stories.map((storty) => {
      return (
        <li key={storty.id}>
          <Link to={'/storty/' + storty.id}>
            <StortyItem title={storty.title} image={storty.images[0]}/>
          </Link>
        </li>
      )
    })

    return (
      <div>
        <h2>{date}</h2>
        <ul>
          {storties}
        </ul>
      </div>
    )
  }

  componentDidMount() {
    zhihu.getStories().then((data) => {
      this.setState({ data })
    })
  }
}

Storties.propTypes = { data: React.PropTypes.array }

export default Storties
