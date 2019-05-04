import { combineReducers } from 'redux'

import auth from './auth'
import layout from './layout'
import warehouse from './warehouse'
import organization from './organization'

const reducers = combineReducers({
  auth,
  layout,
  warehouse,
  organization
})
export default reducers
