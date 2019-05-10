import {
    LIST_PARTNER_SUCCESS,
    LIST_PARTNER_ERROR,
    LIST_PARTNER,
    LIST_CUSTOMER_GROUP,
    LIST_CUSTOMER_GROUP_SUCCESS,
    LIST_CUSTOMER_GROUP_ERROR,
    LIST_CITY,
    LIST_CITY_SUCCESS,
    LIST_CITY_ERROR
} from '../actions/types'

import {
    STATUS_LOADING,
    STATUS_ERROR,
    STATUS_SUCCESS
} from '../constants/Const'

const INIT_STATE = {
    partners: {
        list: {
            status: '',
            data: [],
            error: {}
        },
        create: {},
        update: {},
        deletePartner: {
            status: ''
        },
        upload: {},
        download: {},
        totalLength: 0,
    },

    customerGroup: {
        status: '',
        error: '',
        list_all: [],
        list_single: []
    },
    city: {
        list: [],
        error: '',
        status: ''
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LIST_PARTNER: {
            return {
                ...state,
                partners: {
                    ...state.partners,
                    list: {...state.partners.list, status: STATUS_LOADING}
                }
            }
        }
        case LIST_PARTNER_SUCCESS: {
            return {
                ...state,
                partners: {
                    ...state.partners,
                    list: {
                        status: STATUS_SUCCESS,
                        error: {},
                        data: action.data
                    },
                    totalLength: action.totalLength
                }
            }
        }
        case LIST_PARTNER_ERROR: {
            return {
                ...state,
                partners: {
                    ...state.partners,
                    list: {...state.partners.list, status: STATUS_ERROR}
                }
            }
        }
        case LIST_CUSTOMER_GROUP: {
            return {
                ...state,
                customerGroup: {
                    ...state.customerGroup,
                    status: STATUS_LOADING
                }
            }
        }
        case LIST_CUSTOMER_GROUP_SUCCESS: {
            if (action.option == 'all') {
                return {
                    ...state,
                    customerGroup: {
                        ...state.customerGroup,
                        list_all: action.data,
                        status: STATUS_SUCCESS
                    }
                }
            }
            if (action.option == 'single') {
                return {
                    ...state,
                    customerGroup: {
                        ...state.customerGroup,
                        list_single: action.data,
                        status: STATUS_SUCCESS
                    }
                }
            }
        }
        case LIST_CUSTOMER_GROUP_ERROR: {
            return {
                ...state,
                customerGroup: {
                    ...state.customerGroup,
                    status: STATUS_ERROR
                }
            }
        }
        case LIST_CITY: {
            return {
                ...state,
                city: {
                    ...state.city,
                    status: STATUS_LOADING
                }
            }
        }
        case LIST_CITY_SUCCESS: {
            return {
                ...state,
                city: {
                    ...state.city,
                    list: action.data,
                    status: STATUS_SUCCESS
                }
            }
        }
        case LIST_CITY_ERROR: {
            return {
                ...state,
                city: {
                    ...state.ity,
                    status: STATUS_ERROR
                }
            }
        }
        default:
            return state
    }
}
