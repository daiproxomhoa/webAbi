import React, { Component } from 'react'
import UploadModal from '../UploadModal'
import DataTable from '../common/DataTable/DataTable'
import SalesOrderModal from './SalesOrderModal'
import FloatingActionButton from '../common/FloatingActionButton/FloatingActionButton'

class SalesOrderList extends Component {
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
      <div className='service-list'>
        <div className='floating-action-button'>
          <FloatingActionButton>
            <FloatingActionButton.FloatingMenuItem
              icon='edit'
              label='Create'
              onClick={() => this.setState({ modal: { create: true } })}
            />
            <FloatingActionButton.FloatingMenuItem
              icon='upload'
              label='Import'
              onClick={() => this.setState({ modal: { upload: true } })}
            />
          </FloatingActionButton>
        </div>
        <DataTable />

        <SalesOrderModal
          heading='Create Sales Order'
          open={modal.create}
          onClose={() => this.setState({ modal: { create: false } })}
          onSubmit={data => console.log('create', data)}
        />

        {/* Note that we put Import Orders for both Sales and Purchase orders here */}
        <UploadModal
          heading='Import Orders'
          open={modal.upload}
          onClose={() => this.setState({ modal: { upload: false } })}
          onSubmit={data => console.log('upload', data)}
        />
      </div>
    )
  }
}

export default SalesOrderList
