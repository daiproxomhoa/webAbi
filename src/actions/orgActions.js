import {
  CREATE_ORGANIZATION,
  LIST_ORGANIZATION,
  DELETE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  LIST_PARENT_ORGANIZATION,
  VIEW_MAP_ORGANIZATION,
  LIST_ORG_CATEGORY,
  UPLOAD_FILE_ORG,
  DOWNLOAD_FILE_ORG_SAMPLE,
  CREATE_USER_GROUP,
  UPDATE_USER_GROUP,
  LIST_USER_GROUP,
  DELETE_USER_GROUP,
  UPLOAD_FILE_USER_GROUP,
  DOWNLOAD_FILE_USER_GROUP_SAMPLE,
  LIST_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  UPLOAD_FILE_USER,
  DOWNLOAD_SAMPLE_FILE_USER
} from './types'
export const listOrganization = params => ({
  type: LIST_ORGANIZATION,
  params
})
export const createOrganization = params => ({
  type: CREATE_ORGANIZATION,
  params
})
export const updateOrganization = (orgId, params) => ({
  type: UPDATE_ORGANIZATION,
  orgId,
  params
})
export const deleteOrganization = orgId => ({
  type: DELETE_ORGANIZATION,
  orgId
})

export const listParentOrganization = params => ({
  type: LIST_PARENT_ORGANIZATION,
  params
})
export const listOrgCategory = params => ({
  type: LIST_ORG_CATEGORY,
  params
})
export const viewMapOrganization = params => ({
  type: VIEW_MAP_ORGANIZATION,
  params
})
export const downloadFileOrgSample = file => ({
  type: DOWNLOAD_FILE_ORG_SAMPLE,
  file
})
export const uploadFileOrg = file => ({
  type: UPLOAD_FILE_ORG,
  file
})

export const createUserGroup = params => ({
  type: CREATE_USER_GROUP,
  params
})

export const listUserGroup = params => ({
  type: LIST_USER_GROUP,
  params
})
export const updateUserGroup = (params) => ({
  type: UPDATE_USER_GROUP,
  params,
})
export const deleteUserGroup = userId => ({
  type: DELETE_USER_GROUP,
  userId
})
export const uploadFileUserGroup = file => ({
  type: UPLOAD_FILE_USER_GROUP,
  file
})
export const downloadFileUserGroup = file => ({
  type: DOWNLOAD_FILE_USER_GROUP_SAMPLE,
  file
})
export const listUser = params => ({
  type: LIST_USER,
  params
})
export const createUser = params => ({
  type: CREATE_USER,
  params
})
export const updateUser = (userId, params) => ({
  type: UPDATE_USER,
  userId,
  params
})
export const deleteUser = userId => ({
  type: DELETE_USER,
  userId
})
export const uploadFileUser = file => ({
  type: UPLOAD_FILE_USER,
  file
})
export const downloadSampleFileUser = file => ({
  type: DOWNLOAD_SAMPLE_FILE_USER,
  file
})
