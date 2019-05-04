import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import $ from 'jquery'

import { collapsedSidebarAction } from '../../../actions'
import SidebarContent from './SidebarContent'
import AppConfig from '../../../constants/AppConfig'

class Sidebar extends Component {
  componentWillMount () {
    this.updateDimensions()
  }

  shouldComponentUpdate (nextProps) {
    const {
      enableSidebarBackgroundImage,
      selectedSidebarImage,
      isDarkSidenav
    } = this.props
    if (
      enableSidebarBackgroundImage !== nextProps.enableSidebarBackgroundImage ||
      selectedSidebarImage !== nextProps.selectedSidebarImage ||
      isDarkSidenav !== nextProps.isDarkSidenav
    ) {
      return true
    } else {
      return false
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  componentWillReceiveProps (nextProps) {
    const { windowWidth } = this.state
    if (nextProps.location !== this.props.location) {
      if (windowWidth <= 1199) {
        this.props.collapsedSidebarAction(false)
      }
    }
  }

  updateDimensions = () => {
    this.setState({
      windowWidth: $(window).width(),
      windowHeight: $(window).height()
    })
  }

  render () {
    return (
      <Fragment>
        <div className='rct-sidebar' style={{width:180}}>
          <div
            className={classNames('rct-sidebar-content', {
              'sidebar-overlay-dark': true
            })}
          >
            <div className='site-logo'>
              <Link to='/' className='logo-mini'>
                <img
                  src={AppConfig.appLogo}
                  className='mr-15'
                  alt='site logo'
                  width='35'
                  height='35'
                />
              </Link>
              <Link to='/' className='logo-normal m-t-sm'>
                <h2>vRoute</h2>
              </Link>
            </div>
            <div className='rct-sidebar-wrap'>
              <Scrollbars
                className='rct-scroll'
                autoHide
                autoHideDuration={100}
                style={{ height: 'calc(100vh - 60px)' }}
              >
                <SidebarContent />
              </Scrollbars>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

// map state to props
const mapStateToProps = ({ layout }) => {
  const { navCollapsed } = layout
  return {
    navCollapsed
  }
}

export default withRouter(
  connect(mapStateToProps, {
    collapsedSidebarAction
  })(Sidebar)
)
