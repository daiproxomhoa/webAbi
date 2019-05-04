import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'

import Select from '../common/Select/Select'
import Modal from '../common/Modal/Modal'

class SalesOrderModal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    heading: PropTypes.string
  }
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      data: {
        foundedAt: ''
      }
    }
  }
  static getDerivedStateFromProps (nextProps, prevState) {
    console.log(nextProps.open)
    if (nextProps.open !== prevState.open) {
      return {
        ...prevState,
        open: nextProps.open
      }
    }
    return null
  }
  submit = () => {
    const { data } = this.state
    const { onSubmit } = this.props
    return onSubmit(data)
  }
  render () {
    const { onClose, heading } = this.props
    const { open } = this.state
    return (
      <Modal
        className='sales-order-modal'
        open={open}
        size='lg'
        onClose={onClose}
        onSubmit={this.submit()}
        heading={heading}
      >
        <div className='main-information row'>
          <div className='col-md-6'>
            <FormControl>
              <Select
                label='Organization'
                style={{ marginTop: '10px' }}
                options={[]}
                placeholder='Organization'
              />
            </FormControl>
            <FormControl>
              <TextField
                placeholder='Partner Code'
                required
                style={{ marginTop: '15px' }}
                label='Partner Code'
              />
            </FormControl>
            <FormControl>
              <TextField
                required
                label='Partner Name'
                style={{ marginTop: '15px' }}
                placeholder='Partner Name'
              />
            </FormControl>
            <FormControl>
              <Select
                label='Partner Group'
                placeholder='Partner Group'
                style={{ marginTop: '15px' }}
              >
                <MenuItem> None </MenuItem>
                <MenuItem> Ten </MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <TextField
                label='Description'
                placeholder='Description'
                style={{ marginTop: '15px' }}
              />
            </FormControl>
            <FormControl>
              <TextField
                style={{ marginTop: '15px' }}
                placeholder='Address'
                label='Address'
              />
            </FormControl>
          </div>
          <div className='col-md-6'>
            <FormControl>
              <TextField
                placeholder='Latitude'
                type='number'
                label='Latitude'
              />
            </FormControl>
            <FormControl>
              <TextField
                placeholder='Longtitude'
                type='number'
                style={{ marginTop: '15px' }}
                label='Longtitude'
              />
            </FormControl>
            <FormControl>
              <TextField
                style={{ marginTop: '15px' }}
                placeholder='SMS Brand Name'
                label='SMS Brand Name'
              />
            </FormControl>
            <FormControl>
              <TextField
                style={{ marginTop: '15px' }}
                placeholder='Phone Number'
                label='SMS Brand Name'
              />
            </FormControl>
            <FormControl>
              <Select
                label='First Week day'
                style={{ marginTop: '15px' }}
                options={[]}
                placeholder='First Week Day'
              />
            </FormControl>
            <FormControl>
              <TextField
                style={{ marginTop: '15px' }}
                placeholder='Open Time'
                label='Open Time'
              />
            </FormControl>
            <FormControl>
              <TextField
                style={{ marginTop: '15px' }}
                placeholder='Close Time'
                label='Close Time'
              />
            </FormControl>
          </div>
        </div>
      </Modal>
    )
  }
}

export default SalesOrderModal
