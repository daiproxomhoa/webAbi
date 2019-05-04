import React, { Component } from 'react'
import UploadModal from '../UploadModal'
import DataTable from '../common/DataTable/DataTable'
import ProductCategoryModal from './ProductCategoryModal'
import FloatingActionButton from '../common/FloatingActionButton/FloatingActionButton'

class ProductCategoryList extends Component {
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
            <FloatingActionButton.FloatingMenuItem
              icon='upload'
              label='Import'
              onClick={() => this.setState({ modal: { upload: true } })}
            />
          </FloatingActionButton>
        </div>
        <DataTable />

        <ProductCategoryModal
          heading='Create Product Category'
          open={modal.create}
          onClose={() => this.setState({ modal: { create: false } })}
          onSubmit={data => console.log('create', data)}
        />

        <UploadModal
          heading='Import Product Category'
          open={modal.upload}
          onClose={() => this.setState({ modal: { upload: false } })}
          onSubmit={data => console.log('upload', data)}
        />
      </div>
    )
  }
}

export default ProductCategoryList
