import { COLLAPSED_SIDEBAR, TOGGLE_MENU } from './types'

/**
 * Redux Action To Emit Collapse Sidebar
 * @param {*boolean} isCollapsed
 */
export const collapsedSidebarAction = isCollapsed => ({
  type: COLLAPSED_SIDEBAR,
  isCollapsed
})
export const onToggleMenu = menu => ({
  type: TOGGLE_MENU,
  menu
})
