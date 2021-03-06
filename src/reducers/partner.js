import {
    LIST_PARTNER_SUCCESS,
    LIST_PARTNER_ERROR,
    LIST_PARTNER,
    LIST_CUSTOMER_GROUP,
    LIST_CUSTOMER_GROUP_SUCCESS,
    LIST_CUSTOMER_GROUP_ERROR,
    READ_CUSTOMER_GROUP,
    READ_CUSTOMER_GROUP_SUCCESS,
    READ_CUSTOMER_GROUP_ERROR,
    LIST_CITY,
    LIST_CITY_SUCCESS,
    LIST_CITY_ERROR,
    UPDATE_PARTNER,
    UPDATE_PARTNER_SUCCESS,
    UPDATE_PARTNER_ERROR,
    DELETE_PARTNER,
    DELETE_PARTNER_SUCCESS,
    DELETE_PARTNER_ERROR,
    UPDATE_CUSTOMER_GROUP,
    UPDATE_CUSTOMER_GROUP_SUCCESS,
    UPDATE_CUSTOMER_GROUP_ERROR,
    CREATE_CUSTOMER_GROUP,
    CREATE_CUSTOMER_GROUP_SUCCESS,
    CREATE_CUSTOMER_GROUP_ERROR

} from '../actions/types'

import {
    STATUS_LOADING,
    STATUS_ERROR,
    STATUS_SUCCESS
} from '../constants/Const'
import {NotificationManager} from "react-notifications";

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
        list: {
            data: [],
            data_single: [],
            status: '',
            error: ''
        },
        read: {
            data: [],
            status: '',
            error: ''
        },
        create: {},
        update: {},
        deleteCustomerGroup: {
            status: ''
        },
        upload: {},
        download: {},
        totalLength: 0,
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
                    list: {...state.customerGroup.list, status: STATUS_LOADING}
                }
            }
        }
        case LIST_CUSTOMER_GROUP_SUCCESS: {
            if (action.option == 'single') {
                return {
                    ...state,
                    customerGroup: {
                        ...state.customerGroup,
                        list: {
                            ...state.customerGroup.list,
                            data_single: action.data || [],
                            status: STATUS_SUCCESS
                        },
                        totalLength: action.totalLength
                    }
                }
            } else {
                return {
                    ...state,
                    customerGroup: {
                        ...state.customerGroup,
                        list: {
                            ...state.customerGroup.list,
                            data: action.data || [],
                            status: STATUS_SUCCESS
                        },
                        totalLength: action.totalLength
                    }

                }
            }
        }
        case LIST_CUSTOMER_GROUP_ERROR: {
            return {
                ...state,
                customerGroup: {
                    ...state.customerGroup,
                    list: {
                        ...state.customerGroup.list,
                        status: STATUS_ERROR
                    }
                }
            }

        }
        case READ_CUSTOMER_GROUP: {
            return {
                ...state,
                customerGroup: {
                    ...state.customerGroup,
                    read: {...state.customerGroup.read, status: STATUS_LOADING}
                }
            }
        }
        case READ_CUSTOMER_GROUP_SUCCESS: {
            return {
                ...state,
                customerGroup: {
                    ...state.customerGroup,
                    read: {
                        ...state.customerGroup.read,
                        data: action.data,
                        status: STATUS_SUCCESS
                    }
                }
            }
        }
        case READ_CUSTOMER_GROUP_ERROR: {
            return {
                ...state,
                customerGroup: {
                    ...state.customerGroup,
                    read: {
                        ...state.customerGroup.read,
                        status: STATUS_ERROR
                    }
                }
            }

        }
        case UPDATE_PARTNER: {
            return {
                ...state,
                partners: {
                    ...state.partners,
                    update: {
                        status: STATUS_LOADING,
                        error: {}
                    }
                }
            }
        }
        case UPDATE_PARTNER_SUCCESS: {
            NotificationManager.success('Update partner success', 'Success');
            return {
                ...state,
                partners: {
                    ...state.partners,
                    update: {
                        status: STATUS_SUCCESS,
                        error: {}
                    }
                }
            }
        }
        case UPDATE_PARTNER_ERROR: {
            NotificationManager.warning('Update partner false', 'Warning');
            return {
                ...state,
                partners: {
                    ...state.partners,
                    update: {
                        status: STATUS_ERROR,
                        error: action.error
                    }
                }
            }
        }
        case DELETE_PARTNER: {
            return {
                ...state,
                partners: {
                    ...state.partners,
                    deletePartner: {
                        status: STATUS_LOADING,
                        error: action.error
                    }
                }
            }
        }
        case DELETE_PARTNER_SUCCESS: {
            NotificationManager.success('Delete partner success', 'Success');
            return {
                ...state,
                partners: {
                    ...state.partners,
                    deletePartner: {
                        status: STATUS_SUCCESS,
                        error: {}
                    }
                }
            }
        }
        case DELETE_PARTNER_ERROR: {
            NotificationManager.warning('Delete partner false', 'Warning');
            return {
                ...state,
                partners: {
                    ...state.partners,
                    deletePartner: {
                        status: STATUS_ERROR,
                        error: action.error
                    }
                }
            }
        }
        case UPDATE_CUSTOMER_GROUP: {
            return {
                ...state,
                customerGroup: {
                    ...state.customerGroup,
                    update: {
                        status: STATUS_LOADING,
                    }
                }
            }
        }
        case UPDATE_CUSTOMER_GROUP_SUCCESS: {
            NotificationManager.success('Update customer group success', 'Success');
            return {
                ...state,
                customerGroup: {
                    ...state.customerGroup,
                    update: {
                        status: STATUS_SUCCESS,
                    }
                }
            }
        }
        case UPDATE_CUSTOMER_GROUP_ERROR: {
            NotificationManager.warning('Update  customer group false', 'Warning');
            return {
                ...state,
                customerGroup: {
                    ...state.customerGroup,
                    update: {
                        status: STATUS_ERROR,
                        error: action.error
                    }
                }
            }
        }
        case CREATE_CUSTOMER_GROUP: {
            return {
                ...state,
                customerGroup: {
                    ...state.customerGroup,
                    create: {
                        status: STATUS_LOADING,
                    }
                }
            }
        }
        case CREATE_CUSTOMER_GROUP_SUCCESS: {
            NotificationManager.success('Create customer group success', 'Success');
            return {
                ...state,
                customerGroup: {
                    ...state.customerGroup,
                    create: {
                        status: STATUS_SUCCESS,
                    }
                }
            }
        }
        case CREATE_CUSTOMER_GROUP_ERROR: {
            NotificationManager.warning('Create  customer group false', 'Warning');
            return {
                ...state,
                customerGroup: {
                    ...state.customerGroup,
                    create: {
                        status: STATUS_ERROR,
                        error: action.error
                    }
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
