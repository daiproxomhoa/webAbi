import React, { Component } from 'react'
import UploadModal from '../UploadModal'
import DataTable from '../common/DataTable/DataTable'
import ProductModal from './ProductModal'
import FloatingActionButton from '../common/FloatingActionButton/FloatingActionButton'

class ProductList extends Component {
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
      <div className='product-list'>
        <div className='floating-action-button'>
          <FloatingActionButton>
            <FloatingActionButton.FloatingMenuItem
              icon='edit'
              label='Create'
              onClick={() => this.setState({ modal: { create: true } })}
            />
          </FloatingActionButton>
        </div>
        <DataTable />

        <ProductModal
          heading='Create Product'
          open={modal.create}
          onClose={() => this.setState({ modal: { create: false } })}
          onSubmit={data => console.log('create', data)}
        />

        <UploadModal
          heading='Import Product'
          open={modal.upload}
          onClose={() => this.setState({ modal: { upload: false } })}
          onSubmit={data => console.log('upload', data)}
        />
      </div>
    )
  }
}

export default ProductList
