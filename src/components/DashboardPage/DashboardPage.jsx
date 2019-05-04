import React from 'react'
import MainPage from '../Pages'

import { dailySales, trafficChannel, totalEarns } from './data'
import RctCollapsibleCard from '../common/RctCollapsibleCard'
import {
  TotalEarnsWithAreaChartWidget,
  TrafficChannelWidget,
  CampaignPerformanceWidget,
  DailySalesWidget
} from '../Widgets'

class DashboardPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
        <MainPage.Content>
          <div className='charts-widgets-wrapper'>
            <RctCollapsibleCard
              heading={<span>Total Earns</span>}
              collapsible
              reloadable
              closeable
            >
              <TotalEarnsWithAreaChartWidget chartData={totalEarns} />
            </RctCollapsibleCard>
            <div className='row'>
              <RctCollapsibleCard
                customClasses='overflow-hidden'
                colClasses='col-sm-6 col-md-4 w-xs-half-block'
                heading={<div>Daily Sales</div>}
                badge={{
                  name: <div id='widgets.today' />,
                  class: 'danger'
                }}
                collapsible
                reloadable
                closeable
                fullBlock
              >
                <DailySalesWidget
                  label={dailySales.label}
                  chartdata={dailySales.chartdata}
                  labels={dailySales.labels}
                />
              </RctCollapsibleCard>
              <RctCollapsibleCard
                heading={<div>Trafic chanel</div>}
                customClasses='overflow-hidden'
                colClasses='col-sm-6 col-md-4 w-xs-half-block'
                badge={{
                  name: <div id='widgets.today' />,
                  class: 'danger'
                }}
                collapsible
                reloadable
                closeable
                fullBlock
              >
                <TrafficChannelWidget
                  label={trafficChannel.label}
                  chartdata={trafficChannel.chartdata}
                  labels={trafficChannel.labels}
                />
              </RctCollapsibleCard>
              <RctCollapsibleCard
                heading={<div>Campaign Performance</div>}
                colClasses='col-sm-6 col-md-4 w-xs-full'
                collapsible
                reloadable
                closeable
              >
                <CampaignPerformanceWidget />
              </RctCollapsibleCard>
            </div>
          </div>
        </MainPage.Content>
    )
  }
}
export default DashboardPage
