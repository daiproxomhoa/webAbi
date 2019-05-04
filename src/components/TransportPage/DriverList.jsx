import React, { Component } from 'react'
import DataTable from '../common/DataTable/DataTable'

class DriverList extends Component {
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
    return (
      <div className='driver-list'>
        <DataTable />
      </div>
    )
  }
}

export default DriverList
