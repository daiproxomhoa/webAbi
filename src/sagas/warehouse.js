import { call, put, takeEvery } from 'redux-saga/effects'

import Api from '../util/api'
import {
  LIST_WAREHOUSE_LOCATION,
  LIST_WAREHOUSE_LOCATION_SUCCESS,
  LIST_WAREHOUSE_LOCATION_ERROR
} from '../actions/types'

/* Sagas for warehouse locations */
function * listWarehouseLocation ({ params }) {
  try {
    const response = yield call(Api.Get, '/warehouse/locations/list', params)
    yield put({
      type: LIST_WAREHOUSE_LOCATION_SUCCESS,
      locations: response.data.locations
    })
  } catch (error) {
    yield put({
      type: LIST_WAREHOUSE_LOCATION_ERROR,
      error
    })
  }
}

/* sagas for pallets */
// TODO

/* watcher */
export default function * warehouseLocationWatcher () {
  yield takeEvery(LIST_WAREHOUSE_LOCATION, listWarehouseLocation)
}
