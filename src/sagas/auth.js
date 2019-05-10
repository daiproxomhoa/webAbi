import { put, call, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR
} from '../actions/types'
import Api from "../util/api";

function * sign_in ({ params }) {
  try {

    const response = yield call(Api.Login, '/auth/signin', params,{})
    const response2 = yield call(Api.Post, '/auth/signin', params,{})
    yield put({
      type: SIGN_IN_SUCCESS,
      data:response2,
      token:response.token,
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
