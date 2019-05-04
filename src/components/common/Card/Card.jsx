import React, { Component } from 'react'

class Card extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const { title, children } = this.props
    return (
      <div className='card'>
        <div className='card-title'>
          {typeof title === 'string' ? <h4>{title}</h4> : title}
        </div>
        <div>{children}</div>
      </div>
    )
  }
}
export default Card
