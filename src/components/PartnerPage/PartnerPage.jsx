import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import MainPage from '../Pages'
import CustomerList from './CustomerList'
import SuppliersList from './CustomerGroup'
import PartnerGroupList from './PartnerGroupList'

let customer =0
let customerGroup = 1
let supplier = 2

class PartnerPage extends React.Component {
  constructor (props) {
    super(props)
    const { location: { hash } } = props
    let tab = customer
    if (hash === '#customer-group') {
      tab = customerGroup
    }
    if (hash === '#suppliers') {
      tab = supplier
    }
    this.state = {
      activeTab: tab
    }
  }

  handleTabChange = (e, value) => {
    if (e) e.preventDefault()
    const { history, location } = this.props
    this.setState({
      activeTab: value
    })
    if (value === customer) {
      history.push(...location)
    }
    if (value === customerGroup) {
      history.push(...location,'#customer-group')
    }
    if (value === supplier) {
      history.push(...location, '#suppliers')
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
              <Tab label={<span style={{ fontSize: '14px' }}>Customer List</span>} />
              <Tab label={<span style={{ fontSize: '14px' }}>Customer Group</span>} />
              <Tab label={<span style={{ fontSize: '14px' }}>Suppliers</span>}
              />
            </Tabs>
          </div>
        </MainPage.Header>
        <MainPage.Content>
          {activeTab === customer && <CustomerList />}
          {activeTab === customerGroup && <SuppliersList />}
          {activeTab === supplier && <PartnerGroupList />}
        </MainPage.Content>
      </div>
    )
  }
}

export default PartnerPage
