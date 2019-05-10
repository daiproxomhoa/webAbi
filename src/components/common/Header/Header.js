/**
 * App Header
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import MenuIcon from '@material-ui/icons/Menu'
import { withRouter } from 'react-router-dom'
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from 'reactstrap'
import $ from 'jquery'

// actions
import { collapsedSidebarAction } from '../../../actions'

// components
import Notifications from './Notifications'
import MobileSearchForm from './MobileSearchForm'
import {delete_cookie} from './../../../util/helpers'
class Header extends Component {
  state = {
    customizer: false,
    isMobileSearchFormVisible: false,
    openDropdown: false
  }

  // function to change the state of collapsed sidebar
  onToggleNavCollapsed = () => {
    const val = !this.props.navCollapsed
    this.props.collapsedSidebarAction(val)
  }

  // open dashboard overlay
  openDashboardOverlay () {
    $('.dashboard-overlay').toggleClass('d-none')
    $('.dashboard-overlay').toggleClass('show')
    if ($('.dashboard-overlay').hasClass('show')) {
      $('body').css('overflow', 'hidden')
    } else {
      $('body').css('overflow', '')
    }
  }

  // close dashboard overlay
  closeDashboardOverlay () {
    $('.dashboard-overlay').removeClass('show')
    $('.dashboard-overlay').addClass('d-none')
    $('body').css('overflow', '')
  }
  // mobile search form
  openMobileSearchForm () {
    this.setState({ isMobileSearchFormVisible: true })
  }

  render () {
    const { isMobileSearchFormVisible } = this.state
    $('body').click(function () {
      $('.dashboard-overlay').removeClass('show')
      $('.dashboard-overlay').addClass('d-none')
      $('body').css('overflow', '')
    })
    return (
      <AppBar position='static' className='rct-header'>
        <Toolbar className='d-flex justify-content-between w-100 pl-0'>
          <div className='d-flex align-items-center'>
            <ul className='list-inline mb-0 navbar-left'>
              <li
                className='list-inline-item'
                onClick={e => this.onToggleNavCollapsed(e)}
              >
                <Tooltip title='Sidebar Toggle' placement='bottom'>
                  <IconButton
                    color='inherit'
                    mini='true'
                    aria-label='Menu'
                    className='humburger'
                  >
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
              </li>
              <li className='list-inline-item search-icon d-inline-block'>
                <IconButton
                  mini='true'
                  className='search-icon-btn'
                  onClick={() => this.openMobileSearchForm()}
                >
                  <i className='zmdi zmdi-search' />
                </IconButton>
                <MobileSearchForm
                  isOpen={isMobileSearchFormVisible}
                  onClose={() =>
                    this.setState({ isMobileSearchFormVisible: false })
                  }
                />
              </li>
            </ul>
          </div>
          <ul className='list-inline mb-0 navbar-right'>
            <li className='list-inline-item user-icon'>
              <Avatar className='user-profile'>NB</Avatar>
            </li>
            <li
              className='list-inline-item'
              style={{
                color: '#464D69',
                cursor: 'pointer'
              }}
            >
              <UncontrolledDropdown setActiveFromChild>
                <DropdownToggle tag='a' className='nav-link'>
                  <span className='text-default'>
                    Nguyen Bá Son
                    <i className='zmdi zmdi-chevron-down dropdown-icon mx-2 fa-3x' />
                  </span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem tag='a' href='/'>
                    Edit Profile
                  </DropdownItem>
                  <DropdownItem tag='a' href='/'>
                    Change password
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem tag='a' href='/'>
                    <div onClick={()=>{
                      delete_cookie('jwtToken')
                      delete_cookie('user')
                      window.location.replace('http://localhost:3000/',200)
                    }}>Sign out</div>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
            {/* <li className="list-inline-item user-icon">
              <Avatar className="user-profile">NB</Avatar>
            </li>
            <li
              className="list-inline-item"
              style={{
                color: "#464D69",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              <span
                className="text-default"
                onClick={() => this.setState({ openDropdown: true })}
              >
                Nguyen Bá Son
                <i className="zmdi zmdi-chevron-down dropdown-icon mx-2 fa-3x" />
              </span>
            </li> */}
            <Notifications />
          </ul>
        </Toolbar>
      </AppBar>
    )
  }
}

// map state to props
const mapStateToProps = ({ layout }) => {
  return layout
}

export default withRouter(
  connect(mapStateToProps, {
    collapsedSidebarAction
  })(Header)
)
