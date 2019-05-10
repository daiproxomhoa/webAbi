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
            setCookie('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRjdGhhYmVjbyIsImVtYWlsIjoidGN0LWhhYmVjb0BnbWFpbC5jb20iLCJwaG9uZU51bWJlciI6IigrODQpIDA5MTg3NjEzNTYiLCJpZCI6IjViM2YzMjVkMDA4MjZiMzA2ODE4YTA2MyIsImV4cGlyeURhdGUiOiIyMDE5LTA2LTA2VDEzOjA0OjI4LjEwOFoiLCJpYXQiOjE1NTcyMzQyNjh9.9f4ELN12Ln6BcRtmjg2UlduhGiapalZLHXGhx_cqjh4', 4)
            setCookie('user', JSON.stringify(action.data), 4)
            console.log(action)
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
