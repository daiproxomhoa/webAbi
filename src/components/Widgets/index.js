/**
 * App Widgets
 */
import React from 'react'
import Loadable from 'react-loadable'
import PreloadWidget from '../common/PreloadLayout/PreloadWidget'

const MyLoadingComponent = () => <PreloadWidget />

const DailySalesWidget = Loadable({
  loader: () => import('./DailySales'),
  loading: MyLoadingComponent
})

const CampaignPerformanceWidget = Loadable({
  loader: () => import('./CampaignPerformance'),
  loading: MyLoadingComponent
})

const TrafficChannelWidget = Loadable({
  loader: () => import('./TrafficChannel'),
  loading: MyLoadingComponent
})

const TotalEarnsWithAreaChartWidget = Loadable({
  loader: () => import('./TotalEarnsWithAreaChart'),
  loading: MyLoadingComponent
})

export {
  TotalEarnsWithAreaChartWidget,
  TrafficChannelWidget,
  CampaignPerformanceWidget,
  DailySalesWidget
}
