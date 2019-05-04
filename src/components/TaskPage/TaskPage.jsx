import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import MainPage from '../Pages'
import TaskList from './TaskList'
import FormList from './FormList'
import OperationalReportList from './OperationalReportList'

let taskTab = 0
let formTab = 1
let operationalReportTab = 2

class TaskPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: taskTab
    }
  }
  handleTabChange = (e, value) => {
    if (e) e.preventDefault()
    const { history, location } = this.props
    this.setState({
      activeTab: value
    })
    if (value === taskTab) {
      history.push(...location)
    }
    if (value === formTab) {
      history.push(...location, '#forms')
    }
    if (value === operationalReportTab) {
      history.push(...location, '#operational-reports')
    }
  }
  render () {
    const { activeTab } = this.state
    return (
      <div>
        <MainPage.Header>
          <div className='tabs-main'>
            <Tabs
              value={activeTab}
              onChange={this.handleTabChange}
              scrollable
              scrollButtons='off'
              indicatorColor='primary'
            >
              <Tab label={<span style={{ fontSize: '14px' }}>Tasks</span>} />
              <Tab label={<span style={{ fontSize: '14px' }}>Forms</span>} />
              <Tab
                label={
                  <span style={{ fontSize: '14px' }}>Operational Reports</span>
                }
              />
            </Tabs>
          </div>
        </MainPage.Header>
        <MainPage.Content>
          {activeTab === taskTab && <TaskList />}
          {activeTab === formTab && <FormList />}
          {activeTab === operationalReportTab && <OperationalReportList />}
        </MainPage.Content>
      </div>
    )
  }
}

export default TaskPage
