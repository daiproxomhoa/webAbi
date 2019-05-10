import { combineReducers } from 'redux'

import auth from './auth'
import layout from './layout'
import warehouse from './warehouse'
import organization from './organization'
import partner from './partner'

const reducers = combineReducers({
  auth,
  layout,
  warehouse,
  organization,
  partner
})
export default reducers
