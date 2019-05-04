import React, { Fragment, Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Collapse from '@material-ui/core/Collapse'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

class NavMenuItem extends Component {
  state = {
    subMenuOpen: false
  }

  onToggleCollapseMenu () {
    this.setState({ subMenuOpen: !this.state.subMenuOpen })
  }

  render () {
    const { menu, onToggleMenu } = this.props
    const { subMenuOpen } = this.state
    if (menu.child_routes != null) {
      return (
        <Fragment>
          <ListItem
            button
            component='li'
            onClick={onToggleMenu}
            className={`list-item ${classNames({ 'item-active': menu.open })}`}
          >
            <ListItemIcon className='menu-icon'>
              <i className={menu.menu_icon} />
            </ListItemIcon>
            <span className='menu'>{menu.menu_title}</span>
          </ListItem>
          <Collapse in={menu.open} timeout='auto' className='sub-menu'>
            <List className='list-unstyled py-0'>
              {menu.child_routes.map((subMenu, index) => {
                if (!subMenu.child_routes) {
                  return (
                    <ListItem button component='li' key={index}>
                      <NavLink activeClassName='item-active' to={subMenu.path}>
                        <span className='menu'>{subMenu.menu_title}</span>
                      </NavLink>
                    </ListItem>
                  )
                }
                return (
                  <Fragment key={index}>
                    <ListItem
                      button
                      component='li'
                      onClick={() => this.onToggleCollapseMenu()}
                      className={`list-item ${classNames({
                        'item-active': subMenuOpen
                      })}`}
                    >
                      <span className='menu'>{subMenu.menu_title}</span>
                    </ListItem>
                    <Collapse in={subMenuOpen} timeout='auto'>
                      {subMenu.child_routes.map((nestedMenu, nestedKey) => (
                        <ListItem button component='li' key={nestedKey}>
                          <NavLink
                            activeClassName='item-active'
                            to={nestedMenu.path}
                          >
                            <span className='menu pl-20'>
                              {nestedMenu.menu_title}
                            </span>
                          </NavLink>
                        </ListItem>
                      ))}
                    </Collapse>
                  </Fragment>
                )
              })}
            </List>
          </Collapse>
        </Fragment>
      )
    }
    return (
      <ListItem button component='li'>
        <NavLink activeClassName='item-active' to={menu.path}>
          <ListItemIcon className='menu-icon' style={{marginLeft:-10}}>
            <i className={menu.menu_icon} />
          </ListItemIcon>
          <span className='menu' style={{fontSize:14,marginLeft:-10}}>{menu.menu_title}</span>
        </NavLink>
      </ListItem>
    )
  }
}

export default NavMenuItem
