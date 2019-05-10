const configs = {
  BASE_URL: 'vApp',
  API_BASE_URL: '/',
  API_LOGIN_URL:'/'
}
if (process.env.NODE_ENV === 'development') {
  configs.API_BASE_URL = 'http://vapp.cotest.abivin.vn' || configs.API_BASE_URL
  configs.API_LOGIN_URL = 'http://vappaccount.cotest.abivin.vn' || configs.API_LOGIN_URL
}
export default configs
