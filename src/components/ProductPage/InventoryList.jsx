import React, { Component } from 'react'
import DataTable from '../common/DataTable/DataTable'
import UploadModal from '../UploadModal'
import FloatingActionButton from '../common/FloatingActionButton/FloatingActionButton'

class InventoryList extends Component {
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
      <div className='inventory-list'>
        <div className='floating-action-button'>
          <FloatingActionButton>
            <FloatingActionButton.FloatingMenuItem
              icon='upload'
              label='Import'
              onClick={() => this.setState({ modal: { upload: true } })}
            />
          </FloatingActionButton>
        </div>
        <DataTable />
        <UploadModal
          heading='Import Inventory'
          open={modal.upload}
          onClose={() => this.setState({ modal: { upload: false } })}
          onSubmit={data => console.log('upload', data)}
        />
      </div>
    )
  }
}

export default InventoryList
