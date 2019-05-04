import React, { Component } from 'react'
import Modal from './common/Modal'
import Dropzone from 'react-dropzone'

class UploadModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      files: []
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
  onDropFile = files => {
    this.setState({
      ...this.state,
      files: files
    })
  }
  onSubmitUpload = () => {
    const { files } = this.state
    const { onSubmit } = this.props
    files.forEach(file => {
      const reader = new FileReader()
      reader.readAsBinaryString(file)
      reader.onload = () => {
        const fileBinaryString = reader.result
        onSubmit(fileBinaryString)
      }
    })
  }
  render () {
    const { open, files } = this.state
    const { onClose, onSubmit, ...rest } = this.props
    return (
      <Modal
        {...rest}
        okText='OK'
        open={open}
        size='lg'
        onClose={() => this.setState({ files: [] }, onClose)}
        footerEnabled
        onSubmit={() => this.onSubmitUpload()}
        className='ImportModal'
      >
        <div className='download-sample-data text-center'>
          <span className='font-bold'>
            <i className='fas fa-download m-r-md' />Download file template
          </span>
        </div>
        <React.Fragment>
          <Dropzone
            style={{
              marginTop: '20px',
              border: 'dashed 1px #1b64b0',
              minHeight: '200px'
            }}
            onDrop={this.onDropFile}
            disabled={!!files.length}
          >
            <div className='text-center m-t-xl'>
              {!files.length && (
                <React.Fragment>
                  Drop files to upload
                  <div>or</div>
                  <span className='text-primary text-underline'>Browse</span>
                </React.Fragment>
              )}
              {files.length > 0 && (
                <React.Fragment>
                  <span className='m-r-sm'>Files: {files[0].name}</span>
                  ({files[0].size} kbs)
                </React.Fragment>
              )}
            </div>
          </Dropzone>
        </React.Fragment>
      </Modal>
    )
  }
}

export default UploadModal
