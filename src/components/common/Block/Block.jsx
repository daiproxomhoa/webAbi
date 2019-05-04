import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
class Block extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.any,
    children: PropTypes.any
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { title, className, children } = this.props
    return (
      <div className={classnames('rtc-block', className)}>
        <div className='rtc-block-title'>
          {title && typeof title === 'string' ? <h4>{title}</h4> : title}
        </div>
        <div className='rtc-full-block'>
          <div className='rct-scroll'>{children}</div>
        </div>
      </div>
    )
  }
}

export default Block
