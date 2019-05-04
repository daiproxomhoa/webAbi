import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ServiceList from '../ServicePage/ServiceList'
import MainPage from '../Pages'

class ServicePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: 0
    }
  }
  handleChange = (e, value) => {
    if (e) e.preventDefault()
    this.setState({
      activeTab: value
    })
  }
  render () {
    const { activeTab } = this.state
    return (
      <div>
        <MainPage.Header>
          <div className='service-tabs-main'>
            <Tabs
              value={activeTab}
              onChange={this.handleChange}
              scrollable
              scrollButtons='off'
              indicatorColor='primary'
            >
              <Tab label={<span style={{ fontSize: '14px' }}>Services</span>} />
            </Tabs>
          </div>
        </MainPage.Header>
        <MainPage.Content>
          {activeTab === 0 && <ServiceList />}
        </MainPage.Content>
      </div>
    )
  }
}

export default ServicePage
