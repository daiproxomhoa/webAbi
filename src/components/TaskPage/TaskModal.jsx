import React, { Component } from 'react'
import Modal from '../common/Modal/Modal'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'

import Select from '../common/Select/Select'

class TaskModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      data: {}
    }
  }
  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.open !== prevState.open) {
      return {
        ...prevState,
        open: nextProps.open
      }
    }
    return null
  }

  onSubmit = () => {
    const { onSubmit } = this.props
    const { data } = this.state
    onSubmit(data)
  }
  render () {
    const { heading, onClose, ...rest } = this.props
    const { open } = this.state
    return (
      <Modal
        {...rest}
        open={open}
        size='lg'
        heading={heading}
        onClose={onClose}
        onSubmit={this.onSubmit()}
      >
        <div className='row'>
          <div className='col-md-6'>
            <FormControl>
              <TextField label='Group code' placeholder='Group Code' />
            </FormControl>
            <FormControl>
              <TextField
                className='m-t-sm'
                label='Group Name'
                placeholder='Group Name'
              />
            </FormControl>
          </div>
          <div className='col-md-6'>
            <FormControl>
              <Select placeholder='Organizations' className='m-t-sm' />
            </FormControl>
            <FormControl>
              <Select className='m-t-md' placeholder='Descriptions' />
            </FormControl>
          </div>
          <div className='more configurations m-t-md col-lg-12'>
            <span>Configurations</span>
            <div className='row'>
              <div className='col-md-4'>
                <FormControlLabel
                  label='Enable Checkin-Out'
                  control={<Checkbox color='primary' value='checked' />}
                />
              </div>
              <div className='col-md-4'>
                <FormControlLabel
                  label='Enable Confirm Reject'
                  control={<Checkbox color='primary' value='checked' />}
                />
              </div>
              <div className='col-md-4'>
                <FormControlLabel
                  label='Disable Choose Photo Library'
                  control={<Checkbox color='primary' value='checked' />}
                />
              </div>
              <div className='roles' />
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default TaskModal
