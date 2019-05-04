import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import MainPage from '../Pages'
import PartnerList from './PartnerList'
import PartnerGroupList from './PartnerGroupList'

let partnerTab = 0
let partnerGroupTab = 1

class PartnerPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: partnerTab
    }
  }

  handleTabChange = (e, value) => {
    if (e) e.preventDefault()
    const { history, location } = this.props
    this.setState({
      activeTab: value
    })
    if (value === partnerTab) {
      history.push(...location)
    }
    if (value === partnerGroupTab) {
      history.push(...location, '#partner-groups')
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
              <Tab label={<span style={{ fontSize: '14px' }}>Partners</span>} />
              <Tab
                label={<span style={{ fontSize: '14px' }}>Partner Groups</span>}
              />
            </Tabs>
          </div>
        </MainPage.Header>
        <MainPage.Content>
          {activeTab === partnerTab && <PartnerList />}
          {activeTab === partnerGroupTab && <PartnerGroupList />}
        </MainPage.Content>
      </div>
    )
  }
}

export default PartnerPage
