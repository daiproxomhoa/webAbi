import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ProductList from './ProductList'
import InventoryList from './InventoryList'
import ProductCategoryList from './ProductCategoryList'
import MainPage from '../Pages'

let productTab = 0
let inventoryTab = 1
let productCategoryTab = 2

class ProductPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: productTab
    }
  }
  handleTabChange = (e, value) => {
    if (e) e.preventDefault()
    const { history, location } = this.props
    this.setState({
      activeTab: value
    })
    if (value === productTab) {
      history.push(...location)
    }
    if (value === inventoryTab) {
      history.push(...location, '#inventory')
    }
    if (value === productCategoryTab) {
      history.push(...location, '#product-categories')
    }
  }
  render () {
    const { activeTab } = this.state
    return (
      <div>
        <MainPage.Header>
          <div className='product-tabs-main'>
            <Tabs
              value={activeTab}
              onChange={this.handleTabChange}
              scrollable
              scrollButtons='off'
              indicatorColor='primary'
            >
              <Tab label={<span style={{ fontSize: '14px' }}>Products</span>} />
              <Tab
                label={<span style={{ fontSize: '14px' }}>Inventory</span>}
              />
              <Tab
                label={
                  <span style={{ fontSize: '14px' }}>Product Categories</span>
                }
              />
            </Tabs>
          </div>
        </MainPage.Header>
        <MainPage.Content>
          {activeTab === productTab && <ProductList />}
          {activeTab === inventoryTab && <InventoryList />}
          {activeTab === productCategoryTab && <ProductCategoryList />}
        </MainPage.Content>
      </div>
    )
  }
}

export default ProductPage
