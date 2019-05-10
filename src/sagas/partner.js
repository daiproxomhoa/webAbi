import {put, call, takeEvery, takeLatest} from 'redux-saga/effects'
import {
    LIST_PARTNER,
    LIST_PARTNER_SUCCESS,
    LIST_PARTNER_ERROR,
    LIST_CUSTOMER_GROUP,
    LIST_CUSTOMER_GROUP_SUCCESS,
    LIST_CUSTOMER_GROUP_ERROR,
    LIST_CITY,
    LIST_CITY_SUCCESS,
    LIST_CITY_ERROR,
    UPDATE_PARTNER,
    UPDATE_PARTNER_SUCCESS,
    UPDATE_PARTNER_ERROR,

} from '../actions/types'

import Api from '../util/api'

function* listPartner({params}) {
    try {
        // Get Org
        const response = yield call(Api.Post, '/customers/list', params)
        yield put({
            type: LIST_PARTNER_SUCCESS,
            data: response.data,
            totalLength: response.totalLength
        })
    } catch (error) {
        yield put({
            type: LIST_PARTNER_ERROR,
            error
        })
    }
}

function* listCustomer({params, option}) {
    try {
        // Get Org
        const response = yield call(Api.Post, '/customers/Group/list', params)
        yield put({
            type: LIST_CUSTOMER_GROUP_SUCCESS,
            data: response.data,
            option: option
        })
    } catch (error) {
        yield put({
            type: LIST_CUSTOMER_GROUP_ERROR,
            error
        })
    }
}

function* updateCustomer({params}) {
    console.log(params)
    try {
        // Get Org
        const response = yield call(Api.Post, '/customers/create', params)

        yield put({
            type: UPDATE_PARTNER_SUCCESS,
            data: response.data,
        })
    } catch (error) {
        yield put({
            type: UPDATE_PARTNER_ERROR,
            error
        })
    }
}

function* listCity({params}) {
    try {
        // Get Org
        const response = yield call(Api.Post, '/customers/listCity', params)
        yield put({
            type: LIST_CITY_SUCCESS,
            data: response.data,
        })
    } catch (error) {
        yield put({
            type: LIST_CITY_ERROR,
            error
        })
    }
}


export default function* organizationWatcher() {
    yield takeEvery(LIST_PARTNER, listPartner)
    yield takeEvery(LIST_CUSTOMER_GROUP, listCustomer)
    yield takeEvery(UPDATE_PARTNER, updateCustomer)
    yield takeEvery(LIST_CITY, listCity)

}
