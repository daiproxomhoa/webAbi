import {
    LIST_ORGANIZATION,
    LIST_ORGANIZATION_SUCCESS,
    LIST_ORGANIZATION_ERROR,
    LIST_ORG_CATEGORY,
    LIST_ORG_CATEGORY_SUCCESS,
    LIST_ORG_CATEGORY_ERROR,
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
    UPLOAD_FILE_ORG_SUCCESS,
    UPLOAD_FILE_ORG_ERROR,
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
} from '../actions/types'

import {
    STATUS_LOADING,
    STATUS_ERROR,
    STATUS_SUCCESS
} from '../constants/Const'

const INIT_STATE = {
    organizations: {
        models: {},
        list: {
            status: '',
            ids: [],
            error: {}
        },
        create: {},
        update: {},
        deleteOrg: {
            status: ''
        },
        upload: {},
        download: {},
        totalLength: 0
    },
    userGroups: {
        models: {},
        list: {
            status: '',
            ids: [],
            total: 0,
            error: {}
        },
        create: {},
        update: {},
        deleteUserGroup: {},
        totalLength: 0
    },
    users: {
        models: {},
        list: {
            status: '',
            ids: [],
            error: {}
        },
        create: {},
        update: {},
        deleteUser: {}
    },
    parentOrgs: {
        list: {
            status: '',
            error: {},
            ids: []
        },
        models: {}
    },
    orgCategories: {
        status: '',
        error: '',
        list: []
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LIST_ORGANIZATION: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    list: {...state.organizations.list, status: STATUS_LOADING}
                }
            }
        }
        case LIST_ORGANIZATION_SUCCESS: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    list: {
                        status: STATUS_SUCCESS,
                        error: {},
                        ids: action.organizations.map(org => org.id)
                    },
                    models: action.organizations.reduce(
                        (list, org) => ({
                            ...list,
                            [org.id]: org
                        }),
                        {}
                    ),
                    totalLength: action.totalLength
                }
            }
        }
        case LIST_ORGANIZATION_ERROR: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    list: {...state.organizations.list, status: STATUS_ERROR}
                }
            }
        }
        case LIST_ORG_CATEGORY: {
            return {
                ...state,
                orgCategories: {
                    ...state.orgCategories,
                    status: STATUS_LOADING
                }
            }
        }
        case LIST_ORG_CATEGORY_SUCCESS: {
            return {
                ...state,
                orgCategories: {
                    status: STATUS_SUCCESS,
                    error: {},
                    list: action.orgCategories
                }
            }
        }
        case LIST_ORG_CATEGORY_ERROR: {
            return {
                ...state,
                orgCategories: {
                    ...state.orgCategories,
                    status: STATUS_ERROR,
                    error: action.error
                }
            }
        }
        case CREATE_ORGANIZATION: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    create: {
                        status: STATUS_LOADING
                    }
                }
            }
        }
        case CREATE_ORGANIZATION_SUCCESS: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    create: {
                        status: STATUS_SUCCESS
                    }
                }
            }
        }
        case CREATE_ORGANIZATION_ERROR: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    create: {
                        status: STATUS_ERROR,
                        error: action.error
                    }
                }
            }
        }
        case UPDATE_ORGANIZATION: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    update: {
                        error: {},
                        status: STATUS_LOADING
                    }
                }
            }
        }
        case UPDATE_ORGANIZATION_SUCCESS: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    update: {
                        error: {},
                        status: STATUS_SUCCESS
                    }
                }
            }
        }
        case UPDATE_ORGANIZATION_ERROR: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    update: {
                        error: action.error,
                        status: STATUS_ERROR
                    }
                }
            }
        }
        case DELETE_ORGANIZATION: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    deleteOrg: {
                        error: {},
                        status: STATUS_LOADING
                    }
                }
            }
        }
        case DELETE_ORGANIZATION_SUCCESS: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    // list: {
                    //     ...state.organizations.list,
                    //     total: state.organizations.list.total - 1,
                    //     ids: state.organizations.list.ids.map(id => id !== action.orgId)
                    // },
                    // models: Object.keys(state.organizations.models)
                    //     .map(orgId => orgId !== action.orgId)
                    //     .reduce(
                    //         (model, orgId) => ({
                    //             ...model,
                    //             [orgId]: {...state.organizations.models[orgId]}
                    //         }),
                    //         {}
                    //     ),
                    deleteOrg: {
                        error: {},
                        status: STATUS_SUCCESS
                    }
                }
            }
        }
        case DELETE_ORGANIZATION_ERROR: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    deleteOrg: {
                        ...state.deleteOrg,
                        status: STATUS_ERROR,
                        error: action.error
                    }
                }
            }
        }
        case UPLOAD_FILE_ORG: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    upload: {
                        ...state.organizations.upload,
                        status: STATUS_LOADING
                    }
                }
            }
        }
        case UPLOAD_FILE_ORG_SUCCESS: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    upload: {
                        error: {},
                        status: STATUS_SUCCESS
                    }
                }
            }
        }
        case UPLOAD_FILE_ORG_ERROR: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    upload: {
                        error: action.error,
                        status: STATUS_ERROR
                    }
                }
            }
        }
        case DOWNLOAD_FILE_ORG_SAMPLE: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    download: {
                        ...state.organizations.dowload,
                        status: STATUS_LOADING
                    }
                }
            }
        }
        case DOWNLOAD_FILE_ORG_SAMPLE_SUCCESS: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    download: {
                        error: {},
                        file: action.file,
                        status: STATUS_SUCCESS
                    }
                }
            }
        }
        case DOWNLOAD_FILE_ORG_SAMPLE_ERROR: {
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    download: {
                        error: action.error,
                        status: STATUS_ERROR
                    }
                }
            }
        }
        case LIST_USER_GROUP: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    list: {
                        ...state.userGroups.list,
                        status: STATUS_LOADING
                    }
                }
            }
        }
        case LIST_USER_GROUP_SUCCESS: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    list: {
                        status: STATUS_SUCCESS,
                        error: {},
                        total: action.userGroups.length,
                        ids: action.userGroups.map(group => group._id)
                    },
                    models: action.userGroups.reduce(
                        (list, group) => ({
                            ...list,
                            [group._id]: group
                        }),
                        {}
                    ),
                    totalLength: action.totalLength

                },

            }
        }
        case LIST_USER_GROUP_ERROR: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    list: {
                        ...state.userGroups.list,
                        status: STATUS_ERROR,
                        error: action.error
                    }
                }
            }
        }
        case CREATE_USER_GROUP: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    create: {
                        error: {},
                        status: STATUS_LOADING
                    }
                }
            }
        }
        case CREATE_USER_GROUP_SUCCESS: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    create: {
                        error: {},
                        status: STATUS_SUCCESS
                    }
                }
            }
        }
        case CREATE_USER_GROUP_ERROR: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    create: {
                        error: action.error,
                        status: STATUS_ERROR
                    }
                }
            }
        }
        case UPDATE_USER_GROUP: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    update: {
                        status: STATUS_LOADING,
                        error: {}
                    }
                }
            }
        }
        case UPDATE_USER_GROUP_SUCCESS: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    update: {
                        status: STATUS_SUCCESS,
                        error: {}
                    }
                }
            }
        }
        case UPDATE_USER_GROUP_ERROR: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    update: {
                        status: STATUS_ERROR,
                        error: action.error
                    }
                }
            }
        }
        case DELETE_USER_GROUP: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    deleteUserGroup: {
                        status: STATUS_LOADING,
                        error: {}
                    }
                }
            }
        }
        case DELETE_USER_GROUP_SUCCESS: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    // models: Object.keys(state.userGroups.models)
                    //     .filter(userId => userId !== action.userId)
                    //     .reduce(
                    //         (model, uId) => ({
                    //             ...model,
                    //             [uId]: {...state.userGroups.models[uId]}
                    //         }),
                    //         {}
                    //     ),
                    // list: {
                    //     ...state.userGroups.list,
                    //     total: state.userGroups.total - 1,
                    //     ids: state.userGroups.list.map(uId => uId !== action.userId)
                    // },
                    deleteUserGroup: {
                        status: STATUS_SUCCESS,
                        error: {}
                    }
                }
            }
        }
        case DELETE_USER_GROUP_ERROR: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    deleteUserGroup: {
                        status: STATUS_ERROR,
                        error: action.error
                    }
                }
            }
        }
        case UPLOAD_FILE_USER_GROUP: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    upload: {
                        error: {},
                        status: STATUS_LOADING
                    }
                }
            }
        }
        case UPLOAD_FILE_USER_GROUP_SUCCESS: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    upload: {
                        error: {},
                        status: STATUS_SUCCESS,
                        file: action.file
                    }
                }
            }
        }
        case UPLOAD_FILE_USER_GROUP_ERROR: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    upload: {
                        error: action.error,
                        status: STATUS_ERROR
                    }
                }
            }
        }
        case DOWNLOAD_FILE_USER_GROUP_SAMPLE: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    download: {
                        error: {},
                        status: STATUS_LOADING
                    }
                }
            }
        }
        case DOWNLOAD_FILE_USER_GROUP_SAMPLE_SUCCESS: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    download: {
                        error: {},
                        status: STATUS_SUCCESS,
                        file: action.file
                    }
                }
            }
        }
        case DOWNLOAD_FILE_USER_GROUP_SAMPLE_ERROR: {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    download: {
                        error: action.error,
                        status: STATUS_ERROR
                    }
                }
            }
        }
        case LIST_USER: {
            return {
                ...state,
                users: {
                    ...state.users,
                    list: {...state.users.list, status: STATUS_LOADING}
                }
            }
        }
        case LIST_USER_SUCCESS: {
            return {
                ...state,
                users: {
                    ...state.users,
                    list: {
                        status: STATUS_SUCCESS,
                        error: {},
                        ids: action.listUsers.map(user => user._id)
                    },
                    models: action.listUsers.reduce(
                        (list, org) => ({
                            ...list,
                            [org._id]: org
                        }),
                        {}
                    ),
                    totalLength:action.totalLength
                }
            }
        }
        case LIST_USER_ERROR: {
            return {
                ...state,
                users: {
                    ...state.users,
                    list: { ...state.users.list, status: STATUS_ERROR }
                }
            }
        }
        default:
            return state
    }
}
