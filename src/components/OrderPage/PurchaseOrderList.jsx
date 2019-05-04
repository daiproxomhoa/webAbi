import React, { Component } from 'react'
import DataTable from '../common/DataTable/DataTable'
import PurchaseOrderModal from './PurchaseOrderModal'
import FloatingActionButton from '../common/FloatingActionButton/FloatingActionButton'

class PurchaseOrderList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: {
        create: false,
        edit: false,
        upload: false,
        data: {}
      }
    }
  }
  render () {
    const { modal } = this.state
    return (
      <div className='purchase-order-list'>
        <div className='floating-action-button'>
          <FloatingActionButton>
            <FloatingActionButton.FloatingMenuItem
              label='Create'
              icon='edit'
              onClick={() => this.setState({ modal: { create: true } })}
            />
          </FloatingActionButton>
        </div>
        <DataTable />

        <PurchaseOrderModal
          heading='Create Purchase Order'
          open={modal.create}
          onClose={() => this.setState({ modal: { create: false } })}
          onSubmit={data => console.log('create', data)}
        />
      </div>
    )
  }
}

export default PurchaseOrderList
