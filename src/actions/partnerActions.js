import {
    CREATE_PARTNER,
    LIST_PARTNER,
    DELETE_PARTNER,
    UPDATE_PARTNER,
    VIEW_MAP_PARTNER,
    UPLOAD_FILE_ORG,
    DOWNLOAD_FILE_ORG_SAMEPLE,
    LIST_CUSTOMER_GROUP,
    LIST_CITY
} from './types'

export const listPartner = params => ({
    type: LIST_PARTNER,
    params
})
export const listCustomerGroup = (params,option) => ({
    type: LIST_CUSTOMER_GROUP,
    params,
    option
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
export const deletePartner = orgId => ({
    type: DELETE_PARTNER,
    orgId
})

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
