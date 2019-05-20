import {put, call, takeEvery, takeLatest} from 'redux-saga/effects'
import {
    LIST_PARTNER,
    LIST_PARTNER_SUCCESS,
    LIST_PARTNER_ERROR,
    UPDATE_PARTNER,
    UPDATE_PARTNER_SUCCESS,
    UPDATE_PARTNER_ERROR,
    DELETE_PARTNER,
    DELETE_PARTNER_SUCCESS,
    DELETE_PARTNER_ERROR,
    //=Tab2
    LIST_CUSTOMER_GROUP,
    LIST_CUSTOMER_GROUP_SUCCESS,
    LIST_CUSTOMER_GROUP_ERROR,
    UPDATE_CUSTOMER_GROUP,
    UPDATE_CUSTOMER_GROUP_SUCCESS,
    UPDATE_CUSTOMER_GROUP_ERROR,
    CREATE_CUSTOMER_GROUP,
    CREATE_CUSTOMER_GROUP_SUCCESS,
    CREATE_CUSTOMER_GROUP_ERROR,
    READ_CUSTOMER_GROUP,
    READ_CUSTOMER_GROUP_ERROR,
    READ_CUSTOMER_GROUP_SUCCESS,
    //=City
    LIST_CITY,
    LIST_CITY_SUCCESS,
    LIST_CITY_ERROR,


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
function* createCustomer({params}) {
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

function* updateCustomer({params}) {
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

function* deleteCustomer({params}) {
    try {
        // Get Org
        const response = yield call(Api.Post, '/customers/delete', params)

        yield put({
            type: DELETE_PARTNER_SUCCESS,
        })
    } catch (error) {
        yield put({
            type: DELETE_PARTNER_ERROR,
            error
        })
    }
}

function* listCustomerGroup({params, option}) {
    try {
        // Get Org
        const response = yield call(Api.Post, '/customers/Group/list', params)
        yield put({
            type: LIST_CUSTOMER_GROUP_SUCCESS,
            data: response.data,
            totalLength:response.totalLength,
            option: option,
            params
        })
    } catch (error) {
        yield put({
            type: LIST_CUSTOMER_GROUP_ERROR,
            error
        })
    }
}

function* readCustomerGroup({params}) {
    try {
        // Get Org
        const response = yield call(Api.Post, '/customers/Group/read', params)
        yield put({
            type: READ_CUSTOMER_GROUP_SUCCESS,
            data: response.data,
        })
    } catch (error) {
        yield put({
            type: READ_CUSTOMER_GROUP_ERROR,
            error
        })
    }
}

function* updateCustomerGroup({params}) {
    try {
        const response = yield call(Api.Post, '/customers/Group/update', params)
        yield put({
            type: UPDATE_CUSTOMER_GROUP_SUCCESS,
            data: response.data,
        })
    } catch (error) {
        yield put({
            type: UPDATE_CUSTOMER_GROUP_ERROR,
            error
        })
    }
}
function* createCustomerGroup({params}) {
    try {
        const response = yield call(Api.Post, '/customers/Group/create', params)
        yield put({
            type: CREATE_CUSTOMER_GROUP_SUCCESS,
            data: response.data,
        })
    } catch (error) {
        yield put({
            type: CREATE_CUSTOMER_GROUP_ERROR,
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
    yield takeEvery(UPDATE_PARTNER, updateCustomer)
    yield takeEvery(DELETE_PARTNER, deleteCustomer)
    yield takeEvery(LIST_CUSTOMER_GROUP, listCustomerGroup)
    yield takeEvery(READ_CUSTOMER_GROUP, readCustomerGroup)
    yield takeEvery(UPDATE_CUSTOMER_GROUP, updateCustomerGroup)
    yield takeEvery(CREATE_CUSTOMER_GROUP, createCustomerGroup)
    yield takeEvery(LIST_CITY, listCity)

}
