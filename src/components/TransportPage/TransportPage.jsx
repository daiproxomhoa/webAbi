import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import MainPage from '../Pages'
import DriverList from './DriverList'
import VehicleList from './VehicleList'

let vehicleTab = 0
let driverTab = 1

class TransportPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: vehicleTab
    }
  }
  handleTabChange = (e, value) => {
    if (e) e.preventDefault()
    const { history, location } = this.props
    this.setState({
      activeTab: value
    })
    if (value === vehicleTab) {
      history.push(...location, '#vehicles')
    }
    if (value === driverTab) {
      history.push(...location, '#drivers')
    }
  }
  render () {
    const { activeTab } = this.state
    return (
      <div>
        <MainPage.Header>
          <div className='transport-tabs-main'>
            <Tabs
              value={activeTab}
              onChange={this.handleTabChange}
              scrollable
              scrollButtons='off'
              indicatorColor='primary'
            >
              <Tab label={<span style={{ fontSize: '14px' }}>Vehicles</span>} />
              <Tab label={<span style={{ fontSize: '14px' }}>Drivers</span>} />
            </Tabs>
          </div>
        </MainPage.Header>
        <MainPage.Content>
          {activeTab === vehicleTab && <VehicleList />}
          {activeTab === driverTab && <DriverList />}
        </MainPage.Content>
      </div>
    )
  }
}

export default TransportPage
