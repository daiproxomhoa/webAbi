import React from 'react'

import MainPage from '../Pages'

class ReportPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  handleChange = (e, value) => {
    if (e) e.preventDefault()
    this.setState({
      activeTab: value
    })
  }
  render () {
    return (
      <div>
        <div className='report-tabs-main'>This page is almost empty</div>
      </div>
    )
  }
}

export default ReportPage
