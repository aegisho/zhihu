import React from 'react'
import { Link } from 'react-router'

import StoryItem from './StoryItem'
import zhihu from '../../../services/zhihu'
import './stories.css'

class Stories extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: { date: '', stories: [] } }
  }

  render() {
    let { date, stories } = this.state.data

    let storiesList = stories.map((story) => {
      return (
        <li key={story.id}>
          <Link to={'/story/' + story.id}>
            <StoryItem title={story.title} image={story.images[0]}/>
          </Link>
        </li>
      )
    })

    return (
      <div className="stories">
        <h2>{date}</h2>
        <ul>
          {storiesList}
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

Stories.propTypes = { data: React.PropTypes.array }

export default Stories
