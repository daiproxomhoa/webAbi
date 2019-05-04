import {
  LIST_NOTIFICATION,
  MARK_ALL_READ,
  VIEW_ALL_NOTIFICATION
} from './types'

export const listNotifications = params => ({
  type: LIST_NOTIFICATION,
  params
})
export const markAllRead = () => ({
  type: MARK_ALL_READ
})
export const viewAllNotifications = () => ({
  type: VIEW_ALL_NOTIFICATION
})
