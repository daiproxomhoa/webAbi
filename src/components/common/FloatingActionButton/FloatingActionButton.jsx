import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

class _FloatingActionButton extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    size: PropTypes.string,
    color: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {
      toggled: false
    }
  }

  render () {
    const { children, size, color, ...rest } = this.props
    const { toggled } = this.state
    return (
      <div
        className='floating-action-button'
        {...rest}
        style={{
          position: 'absolute',
          right: '15%',
          top: ' 25px',
          zIndex: '100'
        }}
      >
        <Button
          variant='fab'
          color={color}
          style={{
            background: '#fec143',
            color: 'white',
            width: '48px',
            height: '48px',
            zIndex: '99'
          }}
          className='btn-primary'
          onClick={() => this.setState({ toggled: !toggled })}
        >
          {toggled ? <CloseIcon /> : <AddIcon />}
        </Button>
        {toggled && children}
      </div>
    )
  }
}

const FloatingMenuItem = ({ icon, label, onClick }) => (
  <Tooltip title={label} placement='left'>
    <div
      className='floating-menu-item m-t-sm'
      onClick={onClick}
      role='presentation'
      style={{
        zIndex: '99',
        color: 'white'
      }}
    >
      <Button
        mini
        variant='fab'
        className='btn-default'
        style={{ marginLeft: '5px', color: 'white', background: '#fec143' }}
      >
        <i className={`zmdi zmdi-${icon} zmdi-hc-lg`} />
      </Button>
    </div>
  </Tooltip>
)

FloatingMenuItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired
}
FloatingMenuItem.defaultProps = {
  label: 'Sample label'
}
const FloatingActionButton = _FloatingActionButton
FloatingActionButton.FloatingMenuItem = FloatingMenuItem
export default FloatingActionButton
