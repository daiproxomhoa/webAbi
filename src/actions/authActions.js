import { SIGN_IN, SIGN_OUT } from './types'
export const sign_in = params => ({
  type: SIGN_IN,
  params
})

export const sign_out = () => ({
  type: SIGN_OUT
})
