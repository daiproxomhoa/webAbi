import { put, call, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  LIST_ORG_CATEGORY,
  LIST_ORG_CATEGORY_ERROR,
  LIST_ORG_CATEGORY_SUCCESS,
  LIST_ORGANIZATION,
  LIST_ORGANIZATION_SUCCESS,
  LIST_ORGANIZATION_ERROR,
  LIST_PARENT_ORG,
  LIST_PARENT_ORG_SUCCESS,
  LIST_PARENT_ORG_ERROR,
  CREATE_ORGANIZATION,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_ERROR,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION_ERROR,
  DELETE_ORGANIZATION,
  DELETE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION_ERROR,
  UPLOAD_FILE_ORG,
  UPLOAD_FILE_ORG_ERROR,
  UPLOAD_FILE_ORG_SUCCESS,
  DOWNLOAD_FILE_ORG_SAMPLE,
  DOWNLOAD_FILE_ORG_SAMPLE_SUCCESS,
  DOWNLOAD_FILE_ORG_SAMPLE_ERROR,
  CREATE_USER_GROUP,
  CREATE_USER_GROUP_SUCCESS,
  CREATE_USER_GROUP_ERROR,
  LIST_USER_GROUP,
  LIST_USER_GROUP_SUCCESS,
  LIST_USER_GROUP_ERROR,
  UPDATE_USER_GROUP,
  UPDATE_USER_GROUP_SUCCESS,
  UPDATE_USER_GROUP_ERROR,
  DELETE_USER_GROUP,
  DELETE_USER_GROUP_SUCCESS,
  DELETE_USER_GROUP_ERROR,
  UPLOAD_FILE_USER_GROUP,
  UPLOAD_FILE_USER_GROUP_SUCCESS,
  UPLOAD_FILE_USER_GROUP_ERROR,
  DOWNLOAD_FILE_USER_GROUP_SAMPLE,
  DOWNLOAD_FILE_USER_GROUP_SAMPLE_SUCCESS,
  DOWNLOAD_FILE_USER_GROUP_SAMPLE_ERROR,
  LIST_USER,
  LIST_USER_SUCCESS,
  LIST_USER_ERROR,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  UPLOAD_FILE_USER,
  UPLOAD_FILE_USER_SUCCESS,
  UPLOAD_FILE_USER_ERROR,
  DOWNLOAD_SAMPLE_FILE_USER,
  DOWNLOAD_SAMPLE_FILE_USER_SUCCESS,
  DOWNLOAD_SAMPLE_FILE_USER_ERROR
} from '../actions/types'

import Api from '../util/api'

function * listOrganization ({ params }) {
  try {
    // Get Org
    const response = yield call(Api.Post, '/organizations/list', params)
    yield put({
      type: LIST_ORGANIZATION_SUCCESS,
      organizations: response.data,
      totalLength:response.totalLength
    })
  } catch (error) {
    yield put({
      type: LIST_ORGANIZATION_ERROR,
      error
    })
  }
}
function * createOrganization ({ params }) {
  try {
    const response = yield call(Api.Post, '/organizations/create', params)
    yield put({
      type: CREATE_ORGANIZATION_SUCCESS,
      create: response
    })

  } catch (error) {
    yield put({
      type: CREATE_ORGANIZATION_ERROR,
      error
    })
  }
}
function * listOrgCategory ({ params }) {
  try {
    const res = yield call(Api.Post, '/organizations/categories', params)
    yield put({
      type: LIST_ORG_CATEGORY_SUCCESS,
      orgCategories: res
    })
  } catch (error) {
    yield put({
      type: LIST_ORG_CATEGORY_ERROR,
      error
    })
  }
}
function * listParentOrg ({ params }) {
  try {
    const response = yield call(Api.Post, '/organizations/list', params)
    yield put({
      type: LIST_PARENT_ORG_SUCCESS,
      organizations: response.data,
      totalLength:response.totalLength
    })
  } catch (error) {
    yield put({
      type: LIST_PARENT_ORG_ERROR,
      error
    })
  }
}
function * deleteOrganization ({ orgId }) {
  try {
    const deleted = yield call(Api.Post, '/organizations/delete', orgId)
    console('deleted', deleted)
    yield put({
      type: DELETE_ORGANIZATION_SUCCESS,
      status: deleted.message
    })
  } catch (error) {
    yield put({
      type: DELETE_ORGANIZATION_ERROR,
      error
    })
  }
}
function * updateOrganization ({ orgId, params }) {
  const response = yield call(Api.Post, '/organizations/update', params)
  try {
    yield put({
      type: UPDATE_ORGANIZATION_SUCCESS,
      orgId,
      organization: { ...params }
    })
  } catch (error) {
    yield put({
      type: UPDATE_ORGANIZATION_ERROR,
      error
    })
  }
}
function * uploadFileOrg ({ file }) {
  try {
    // UPLOAD CALL
    const response = yield call(Api.Post, '/organizations/upload/', {
      files: { file }
    })
    yield put({
      type: UPLOAD_FILE_ORG_SUCCESS,
      file,
      response
    })
  } catch (error) {
    yield put({
      type: UPLOAD_FILE_ORG_ERROR,
      error
    })
  }
}
function * downloadFileOrgSample ({ file }) {
  try {
    // DOWN LOAD CALL
    yield put({
      type: DOWNLOAD_FILE_ORG_SAMPLE_SUCCESS,
      file
    })
  } catch (error) {
    yield put({
      type: DOWNLOAD_FILE_ORG_SAMPLE_ERROR,
      error
    })
  }
}
function * createUserGroup ({ params }) {
  try {
    const response = yield call(Api.Post, '/roles/create', params)
    yield put({
      type: CREATE_USER_GROUP_SUCCESS,
      params
    })
  } catch (error) {
    yield put({
      type: CREATE_USER_GROUP_ERROR,
      error
    })
  }
}
function * listUserGroup ({ params }) {
  try {
    const response = yield call(Api.Post, '/roles/list', params)
    yield put({
      type: LIST_USER_GROUP_SUCCESS,
      params,
      userGroups: response.data || [],
      totalLength:response.totalLength
    })
  } catch (error) {
    yield put({
      type: LIST_USER_GROUP_ERROR,
      error
    })
  }
}
function * updateUserGroup ({ params}) {
  try {
      const response = yield call(Api.Post,'/roles/update', params)
    yield put({
      type: UPDATE_USER_GROUP_SUCCESS,
      params
    })
  } catch (error) {
    yield put({
      type: UPDATE_USER_GROUP_ERROR,
      error
    })
  }
}
function * deleteUserGroup ({ userId }) {
  try {
    // call APi deleete
    const response = yield call(Api.Post, '/roles/delete', userId)
    yield put({
      type: DELETE_USER_GROUP_SUCCESS,
      userId
    })
  } catch (error) {
    yield put({
      type: DELETE_USER_GROUP_ERROR,
      error
    })
  }
}
function * uploadFileUserGroup ({ file }) {
  try {
    // call upload
    yield put({
      type: UPLOAD_FILE_USER_GROUP_SUCCESS,
      file
    })
  } catch (error) {
    yield put({
      type: UPLOAD_FILE_USER_GROUP_ERROR,
      error
    })
  }
}
function * downloadFileUserGroupSample ({ file }) {
  try {
    // call download
    yield put({
      type: DOWNLOAD_FILE_USER_GROUP_SAMPLE_SUCCESS,
      file
    })
  } catch (error) {
    yield put({
      type: DOWNLOAD_FILE_USER_GROUP_SAMPLE_ERROR,
      error
    })
  }
}
function * listUser ({ params }) {
  try {
    const response = yield call(Api.Post, '/users/list', params)
    yield put({
      type: LIST_USER_SUCCESS,
      listUsers: response.data || [],
      totalLength:response.totalLength
    })
  } catch (error) {
    yield put({
      type: LIST_USER_ERROR,
      error
    })
  }
}
function * createUser ({ params }) {
  try {
    const response = yield call(Api.Post, '/users/create', params)
    yield put({
      type: CREATE_USER_SUCCESS,
      response
    })
  } catch (error) {
    yield put({
      type: CREATE_USER_ERROR,
      error
    })
  }
}
function * updateUser ({ userId, params }) {
  try {
    const response = yield call(Api.Post, '/users/update', userId, params)
    yield put({
      type: UPDATE_USER_SUCCESS,
      userId,
      params,
      response
    })
  } catch (error) {
    yield put({
      type: UPDATE_USER_ERROR,
      error
    })
  }
}
function * deleteUser ({ userId, params }) {
  try {
    const response = yield call(Api.Post, '/users/delete', userId, params)
    yield put({
      type: DELETE_USER_SUCCESS,
      userId,
      params,
      response
    })
  } catch (error) {
    yield put({
      type: DELETE_USER_ERROR,
      error
    })
  }
}
function * uploadFileUser ({ file }) {
  try {
    const response = yield call(Api.Post, '/users/upload', file)
    yield put({
      type: UPLOAD_FILE_USER_SUCCESS,
      file,
      response
    })
  } catch (error) {
    yield put({
      type: UPLOAD_FILE_USER_ERROR,
      error
    })
  }
}
function * downloadSampleFileUser ({ file }) {
  try {
    // call download
    yield put({
      type: DOWNLOAD_SAMPLE_FILE_USER_SUCCESS,
      file
    })
  } catch (error) {
    yield put({
      type: DOWNLOAD_SAMPLE_FILE_USER_ERROR,
      error
    })
  }
}
export default function * organizationWatcher () {
  yield takeEvery(LIST_ORGANIZATION, listOrganization)
  yield takeEvery(LIST_ORG_CATEGORY, listOrgCategory)
  yield takeEvery(LIST_PARENT_ORG, listParentOrg)
  yield takeLatest(DELETE_ORGANIZATION, deleteOrganization)
  yield takeLatest(CREATE_ORGANIZATION, createOrganization)
  yield takeLatest(UPDATE_ORGANIZATION, updateOrganization)
  yield takeEvery(UPLOAD_FILE_ORG, uploadFileOrg)
  yield takeEvery(DOWNLOAD_FILE_ORG_SAMPLE, downloadFileOrgSample)
  yield takeEvery(LIST_USER_GROUP, listUserGroup)
  yield takeLatest(CREATE_USER_GROUP, createUserGroup)
  yield takeLatest(UPDATE_USER_GROUP, updateUserGroup)
  yield takeLatest(DELETE_USER_GROUP, deleteUserGroup)
  yield takeEvery(DOWNLOAD_FILE_USER_GROUP_SAMPLE, downloadFileUserGroupSample)
  yield takeEvery(UPLOAD_FILE_USER_GROUP, uploadFileUserGroup)
  yield takeEvery(LIST_USER, listUser)
  yield takeLatest(CREATE_USER, createUser)
  yield takeLatest(UPDATE_USER, updateUser)
  yield takeLatest(DELETE_USER, deleteUser)
  yield takeLatest(UPLOAD_FILE_USER, uploadFileUser)
  yield takeLatest(DOWNLOAD_SAMPLE_FILE_USER, downloadSampleFileUser)
}
