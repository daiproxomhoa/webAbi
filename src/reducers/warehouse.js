import { LIST_WAREHOUSE_LOCATION } from '../actions/types'

const INIT_STATE = {}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LIST_WAREHOUSE_LOCATION: {
      return {
        ...state
      }
    }
    default:
      return state
  }
}
