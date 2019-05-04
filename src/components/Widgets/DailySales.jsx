/**
 * Daily Sales Widget
 */
import React from 'react'

import SalesChart from '../Charts/SalesChart'
import RctCardFooter from '../common/RctCard/RctCardFooter'
import ChartConfig from '../../constants/chart-config'

const DailySales = ({ label, chartdata, labels }) => (
  <div>
    <div className='p-20'>
      <div className='mb-20 d-flex'>
        <i className='mr-15 ti-arrow-up text-success font-lg' />
        <div>
          <h2 className='mb-5'>12,255 Today</h2>
          <p className='mb-0'>10% increase from yesterday</p>
        </div>
      </div>
      <SalesChart
        label={label}
        chartdata={chartdata}
        labels={labels}
        borderColor={ChartConfig.color.info}
        pointBackgroundColor={ChartConfig.color.info}
        height={125}
        pointBorderColor={ChartConfig.color.white}
        borderWidth={4}
      />
    </div>
    <RctCardFooter>
      <span className='fs-12 text-base'>
        <i className='mr-5 zmdi zmdi-refresh' />
        <div id='widgets.updated10Minago' />
      </span>
    </RctCardFooter>
  </div>
)

export default DailySales
