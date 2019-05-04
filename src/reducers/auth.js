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

const INIT_STATE = {
  status: '',
  error: {},
  user: {}
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
      return {
        ...state,
        status: STATUS_SUCCESS,
        user: action.user
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
