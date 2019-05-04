import React, { Component } from 'react'
import List from '@material-ui/core/List'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import NavMenuItem from './NavMenuItem'
import sidebarMenus from './NavLinks.js'
import { onToggleMenu } from '../../../actions'

class SidebarContent extends Component {
  toggleMenu (menu, stateCategory) {
    let data = {
      menu,
      stateCategory
    }
    this.props.onToggleMenu(data)
  }

  render () {
    return (
      <div className='rct-sidebar-nav' style={{textSizeAdjust:14}} >
        <nav className='navigation'>
          {/*{sidebarMenus.map((menu, key) => (*/}
          {/*    <List key={key} className='rct-mainMenu p-0 m-0 list-unstyled'>*/}
          {/*      <NavMenuItem*/}
          {/*          menu={menu}*/}
          {/*          onToggleMenu={() => this.toggleMenu(menu, 'category0')}*/}
          {/*      />*/}
          {/*    </List>*/}
          {/*))}*/}
          <List className='rct-mainMenu p-0 m-0 list-unstyled'>
            {sidebarMenus.dashboards.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, 'category0')}
              />
            ))}
          </List>
          <List className='rct-mainMenu p-0 m-0 list-unstyled'>
            {sidebarMenus.organizations.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, 'category0')}
              />
            ))}
          </List>
          <List className='rct-mainMenu p-0 m-0 list-unstyled'>
            {sidebarMenus.partners.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, 'category2')}
              />
            ))}
          </List>
          <List className='rct-mainMenu p-0 m-0 list-unstyled'>
            {sidebarMenus.products.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, 'category3')}
              />
            ))}
          </List>
          <List className='rct-mainMenu p-0 m-0 list-unstyled'>
            {sidebarMenus.services.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, 'category3')}
              />
            ))}
          </List>
          <List className='rct-mainMenu p-0 m-0 list-unstyled'>
            {sidebarMenus.orders.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, 'category3')}
              />
            ))}
          </List>
          <List className='rct-mainMenu p-0 m-0 list-unstyled'>
            {sidebarMenus.transport.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, 'category3')}
              />
            ))}
          </List>
          <List className='rct-mainMenu p-0 m-0 list-unstyled'>
            {sidebarMenus.warehouse.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, 'category3')}
              />
            ))}
          </List>
          <List className='rct-mainMenu p-0 m-0 list-unstyled'>
            {sidebarMenus.tasks.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, 'category3')}
              />
            ))}
          </List>
          <List className='rct-mainMenu p-0 m-0 list-unstyled'>
            {sidebarMenus.analytical_reports.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, 'category1')}
              />
            ))}
          </List>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = ({ sidebar }) => {
  return { sidebar }
}

export default withRouter(
  connect(mapStateToProps, { onToggleMenu })(SidebarContent)
)
