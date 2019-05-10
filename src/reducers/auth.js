import {
    STATUS_ERROR,
    STATUS_LOADING,
    STATUS_SUCCESS
} from '../constants/Const'
import {
    SIGN_IN,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_OUT,
    SIGN_OUT_SUCCESS
} from '../actions/types'
import {setCookie} from "../util/helpers";

const INIT_STATE = {
    status: '',
    error: {},
    user: {},
    token: ''
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SIGN_IN: {
            return {
                ...state,
                status: STATUS_LOADING
            }
        }
        case SIGN_IN_SUCCESS: {
            console.log(action)
            setCookie('jwtToken', action.token, 4)
            setCookie('user', JSON.stringify(action.data), 4)
            return {
                ...state,
                status: STATUS_SUCCESS,
                user: action.data.user,
                token: action.data.token
            }
        }
        case SIGN_IN_ERROR: {
            return {
                ...state,
                status: STATUS_ERROR,
                error: action.error
            }
        }

        case SIGN_OUT: {
            return {
                ...state,
                status: STATUS_LOADING
            }
        }
        case SIGN_OUT_SUCCESS: {
            return {
                ...state,
                status: STATUS_SUCCESS
            }
        }

        default:
            return state
    }
}
