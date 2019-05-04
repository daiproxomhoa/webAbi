import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import MainPage from '../Pages'
import UserGroupList from './UserGroupList'
import OrganizationList from './OrganizationList'
import UserList from './UserList'

let organizationTab = 0
let userGroupTab = 1
let userTab = 2

class OrganizationPage extends React.Component {
  constructor (props) {
    super(props)
    const { location: { hash } } = props
    let tab = organizationTab
    if (hash === '#user-groups') {
      tab = userGroupTab
    }
    if (hash === '#users') {
      tab = userTab
    }
    this.state = {
      activeTab: tab
    }
  }
  handleTabChange = (e, tab) => {
    if (e) e.preventDefault()
    const { history, location } = this.props
    this.setState({
      activeTab: tab
    })
    if (tab === organizationTab) {
      history.push(...location)
    }
    if (tab === userGroupTab) {
      history.push(...location, '#user-groups')
    }
    if (tab === userTab) {
      history.push(...location, '#users')
    }
  }
  render () {
    const { activeTab } = this.state
    return (
      <div>
        <MainPage.Header>
          <div className='tabs-main'>
            <Tabs
              value={activeTab}
              onChange={this.handleTabChange}
              scrollable
              scrollButtons='off'
              indicatorColor='primary'
            >
              <Tab
                label={<span style={{ fontSize: '14px' }}>Organizations</span>}
              />
              <Tab
                label={<span style={{ fontSize: '14px' }}>User Groups</span>}
              />
              <Tab label={<span style={{ fontSize: '14px' }}>Users</span>} />
            </Tabs>
          </div>
        </MainPage.Header>
        <MainPage.Content>
          {activeTab === organizationTab && (
            <OrganizationList {...this.props} />
          )}
          {activeTab === userGroupTab && <UserGroupList {...this.props} />}
          {activeTab === userTab && <UserList {...this.props} />}
        </MainPage.Content>
      </div>
    )
  }
}

export default OrganizationPage
