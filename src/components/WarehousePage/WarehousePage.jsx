import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import MainPage from '../Pages'
import LocationList from './LocationList'

let locationTab = 0

class WarehousePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: locationTab
    }
  }
  handleTabChange = (e, value) => {
    if (e) e.preventDefault()
    const { history, location } = this.props
    this.setState({
      activeTab: value
    })
    if (value === locationTab) {
      history.push(...location, '#locations')
    }
  }
  render () {
    const { activeTab } = this.state
    return (
      <div>
        <MainPage.Header>
          <div className='warehouse-tabs-main'>
            <Tabs
              value={activeTab}
              onChange={this.handleTabChange}
              scrollable
              scrollButtons='off'
              indicatorColor='primary'
            >
              <Tab
                label={<span style={{ fontSize: '14px' }}>Locations</span>}
              />
            </Tabs>
          </div>
        </MainPage.Header>
        <MainPage.Content>
          {activeTab === locationTab && <LocationList />}
        </MainPage.Content>
      </div>
    )
  }
}

export default WarehousePage
