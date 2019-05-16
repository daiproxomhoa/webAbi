import {
    CREATE_PARTNER,
    LIST_PARTNER,
    DELETE_PARTNER,
    UPDATE_PARTNER,
    VIEW_MAP_PARTNER,
    UPLOAD_FILE_ORG,
    DOWNLOAD_FILE_ORG_SAMEPLE,
    LIST_CUSTOMER_GROUP,
    LIST_CITY,
    UPDATE_CUSTOMER_GROUP,
    READ_CUSTOMER_GROUP,
    CREATE_CUSTOMER_GROUP
} from './types'
//== Tab1
export const listPartner = params => ({
    type: LIST_PARTNER,
    params
})
export const listCustomerGroup = (params,option) => ({
    type: LIST_CUSTOMER_GROUP,
    params,
    option
})
export const readCustomerGroup = (params) => ({
    type: READ_CUSTOMER_GROUP,
    params,
})
export const createCustomerGroup = (params) => ({
    type: CREATE_CUSTOMER_GROUP,
    params,
})
export const updateCustomerGroup = (params) => ({
    type: UPDATE_CUSTOMER_GROUP,
    params,
})
export const listCity = (params) => ({
    type: LIST_CITY,
    params
})
export const createPartner = params => ({
    type: CREATE_PARTNER,
    params
})
export const updatePartner = params => ({
    type: UPDATE_PARTNER,
    params
})
export const deletePartner = params => ({
    type: DELETE_PARTNER,
    params
})
//==Tab2
export const viewMapPartner = params => ({
    type: VIEW_MAP_PARTNER,
    params
})
export const uploadFileOrg = file => ({
    type: UPLOAD_FILE_ORG,
    file
})
export const downloadFileOrgSameple = file => ({
    type: DOWNLOAD_FILE_ORG_SAMEPLE,
    file
})
