import { fork, all } from 'redux-saga/effects'

import warehouseSaga from './warehouse'
import organizationSaga from './organization'
import partnerSaga from './partner'
import authSaga from './auth'

export default function * rootSaga (getState) {
  yield all([fork(warehouseSaga), fork(organizationSaga), fork(partnerSaga), fork(authSaga)])
}
