/**
 * Rct Collapsible Card
 */
import React, { Component } from 'react'
import { Collapse, Badge } from 'reactstrap'
import classnames from 'classnames'

class RctCollapsibleCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reload: false,
      collapse: true,
      close: false
    }
  }

  onCollapse () {
    this.setState({ collapse: !this.state.collapse })
  }

  onReload () {
    this.setState({ reload: true })
    let self = this
    setTimeout(() => {
      self.setState({ reload: false })
    }, 1500)
  }

  onCloseSection () {
    this.setState({ close: true })
  }

  render () {
    const { close, collapse } = this.state
    const {
      children,
      collapsible,
      closeable,
      reloadable,
      heading,
      fullBlock,
      colClasses,
      customClasses,
      headingCustomClasses,
      contentCustomClasses,
      badge
    } = this.props
    return (
      <div
        className={classnames(colClasses || '', {
          'd-block': !collapse
        })}
      >
        <div
          className={classnames(`rct-block ${customClasses || ''}`, {
            'd-none': close
          })}
        >
          {heading && (
            <div className={`rct-block-title ${headingCustomClasses || ''}`}>
              <h4>
                {heading}{' '}
                {badge && (
                  <Badge className='p-1 ml-10' color={badge.class}>
                    {badge.name}
                  </Badge>
                )}
              </h4>
              {(collapsible || reloadable || closeable) && (
                <div className='contextual-link'>
                  {collapsible && (
                    <a
                      href='javascript:void(0)'
                      onClick={() => this.onCollapse()}
                    >
                      <i className='ti-minus' />
                    </a>
                  )}
                  {reloadable && (
                    <a
                      href='javascript:void(0)'
                      onClick={() => this.onReload()}
                    >
                      <i className='ti-reload' />
                    </a>
                  )}
                  {closeable && (
                    <a
                      href='javascript:void(0)'
                      onClick={() => this.onCloseSection()}
                    >
                      <i className='ti-close' />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
          <Collapse isOpen={collapse}>
            <div
              className={classnames(contentCustomClasses || '', {
                'rct-block-content': !fullBlock,
                'rct-full-block': fullBlock
              })}
            >
              {children}
            </div>
          </Collapse>
        </div>
      </div>
    )
  }
}

export default RctCollapsibleCard
