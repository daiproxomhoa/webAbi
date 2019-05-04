import AppConfig from '../constants/AppConfig'
import { COLLAPSED_SIDEBAR, MINI_SIDEBAR } from '../actions/types'

const INIT_STATE = {
  miniSidebar: AppConfig.miniSidebar,
  navCollapsed: AppConfig.navCollapsed
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // collapse sidebar
    case COLLAPSED_SIDEBAR:
      return {
        ...state,
        navCollapsed: action.isCollapsed
      }
    // mini sidebar
    case MINI_SIDEBAR:
      return {
        ...state,
        miniSidebar: action.payload
      }
    default:
      return state
  }
}
