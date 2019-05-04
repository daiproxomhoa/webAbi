import React, { Component } from 'react'
import DataTable from '../common/DataTable/DataTable'
import FloatingActionButton from '../common/FloatingActionButton/FloatingActionButton'
import FormModal from './FormModal'

class FormList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: {
        create: false,
        edit: false,
        upload: false
      }
    }
  }
  render () {
    const { modal } = this.state
    return (
      <div className='form-list'>
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
        <FormModal
          heading='Create Form'
          open={modal.create}
          onClose={() => this.setState({ modal: { create: false } })}
          onSubmit={data => console.log('create', data)}
        />
      </div>
    )
  }
}

export default FormList
