import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SalesOrderList from './SalesOrderList'
import PurchaseOrderList from './PurchaseOrderList'
import MainPage from '../Pages'

let salesOrderTab = 0
let purchaseOrderTab = 1

class OrderPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: salesOrderTab
    }
  }

  handleTabChange = (e, value) => {
    if (e) e.preventDefault()
    const { history, location } = this.props
    this.setState({
      activeTab: value
    })
    if (value === salesOrderTab) {
      history.push(...location, '#sales-orders')
    }
    if (value === purchaseOrderTab) {
      history.push(...location, '#purchase-orders')
    }
  }
  render () {
    const { activeTab } = this.state
    return (
      <div>
        <MainPage.Header>
          <div className='order-tabs-main'>
            <Tabs
              value={activeTab}
              onChange={this.handleTabChange}
              scrollable
              scrollButtons='off'
              indicatorColor='primary'
            >
              <Tab
                label={<span style={{ fontSize: '14px' }}>Sales Orders</span>}
              />
              <Tab
                label={
                  <span style={{ fontSize: '14px' }}>Purchase Orders</span>
                }
              />
            </Tabs>
          </div>
        </MainPage.Header>
        <MainPage.Content>
          {activeTab === salesOrderTab && <SalesOrderList />}
          {activeTab === purchaseOrderTab && <PurchaseOrderList />}
        </MainPage.Content>
      </div>
    )
  }
}

export default OrderPage
