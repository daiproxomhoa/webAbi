import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

class RctModal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    footerEnabled: PropTypes.bool,
    heading: PropTypes.any,
    open: PropTypes.bool,
    okText: PropTypes.string,
    cancelText: PropTypes.string
  }
  static defaultProps = {
    footerEnabled: true,
    heading: 'Modal',
    okText: 'Ok',
    cancelText: 'Cancel',
    loading: false
  }

  constructor (props) {
    super(props)
    this.state = {
      open: false
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

  onOpen = () => {
    this.setState({ open: true })
  }
  close = () => {
    this.setState({ open: false })
  }
  render () {
    const {
      children,
      heading,
      footerEnabled,
      onSubmit,
      onClose,
      okText,
      cancelText,
      ...rest
    } = this.props
    const { open } = this.state
    return (
      <Modal isOpen={open} toggle={onClose} {...rest}>
        <ModalHeader toggle={onClose}>{heading}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {footerEnabled && (
          <ModalFooter>
            <React.Fragment>
              <Button
                className='text-primary'
                color='primary'
                onClick={onSubmit}
              >
                <span className='text-uppercase'>{okText || 'OK'}</span>
              </Button>
              <Button onClick={onClose}>
                <span className='text-uppercase'>{cancelText || 'CANCEL'}</span>
              </Button>
            </React.Fragment>
          </ModalFooter>
        )}
      </Modal>
    )
  }
}

export default RctModal
