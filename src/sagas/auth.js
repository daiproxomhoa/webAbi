import { put, takeEvery } from 'redux-saga/effects'
import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR
} from '../actions/types'

function * sign_in ({ params }) {
  try {
    // TODDO LOGIN
    const user = { name: 'son', test: '1234' }
    yield put({
      type: SIGN_IN_SUCCESS,
      user,
      params
    })
  } catch (error) {
    yield put({
      type: SIGN_IN_ERROR,
      error
    })
  }
}
function * sign_out () {
  try {
    // TODO LOGOUT
    yield put({
      type: SIGN_OUT_SUCCESS,
      token: null
    })
  } catch (error) {
    yield put({
      type: SIGN_OUT_ERROR,
      error
    })
  }
}
export default function * authWatcher () {
  yield takeEvery(SIGN_IN, sign_in)
  yield takeEvery(SIGN_OUT, sign_out)
}
