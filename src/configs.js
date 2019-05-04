const configs = {
  BASE_URL: 'vApp',
  API_BASE_URL: '/'
}
if (process.env.NODE_ENV === 'development') {
  configs.API_BASE_URL = 'http://vapp.cotest.abivin.vn' || configs.API_BASE_URL
}
export default configs
