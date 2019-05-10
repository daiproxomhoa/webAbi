import queryString from 'query-string'
import store from 'store'
import configs from '../configs'

const token = store.get('jwtToken')

function request (method, path, params, headers, options = {}) {
  let url = `${configs.API_BASE_URL}${path}`
  const opts = {
    method,
    headers,
    options,
    credentials: 'include'
  }
  if (token) {
    opts.headers = { 'x-access-token': token }
  } else {
    opts.headers = {
      'Content-Type': 'application/json; charset=utf-8'
      // 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InUwMDAyIiwiZW1haWwiOiJkYWx5Lm5ndXllbkBtYXJrZXRhY3Rpb24udm4iLCJwaG9uZU51bWJlciI6bnVsbCwiaWQiOiI1ODZhMWU0YjJiMmNiNzc3N2RkZGNlYjIiLCJleHBpcnlEYXRlIjoiMjAxOC0wOC0yOVQxMDoxMjo0Ni4wNzZaIiwiaWF0IjoxNTMyOTQ1NTY2fQ.2yNcvO3g6IyQRrD6qH45LERCN1LXiY3uo-QUgMZYjQU',
    }
  }

  if (typeof params === 'object' && Object.keys(params).length > 0) {
    if (method === 'GET' || method === 'DELETE') {
      const query = queryString.stringify(params)
      if (query) {
        url += `?${query}`
      }
    } else {
      // console.log('xxxxYYY', params)
      opts.headers = { ...opts.headers, 'Content-Type': 'application/json' }
      opts.body = JSON.stringify(params)
    }
  }
  return fetch(url, opts)
    .then(response => {
      if (response.ok) {
        const reg = /application\/json/
        const contentType = response.headers.get('content-type')
        if (contentType && reg.test(contentType)) {
          return response.json()
        }
        return response.text()
      }
      return response.json().then(json => Promise.reject(json))
    })
    .catch(e => {
      const ex =
        e instanceof Error
          ? {
            code: 999,
            message: 'Something went wrong!',
            error: e.message
          }
          : e

      throw ex
    })
}
function request2 (method, path, params, headers, options = {}) {
  let url = `${configs.API_LOGIN_URL}${path}`
  const opts = {
    method,
    headers,
    options,
    credentials: 'include'
  }
  if (token) {
    opts.headers = { 'x-access-token': token }
  } else {
    opts.headers = {
      'Content-Type': 'application/json; charset=utf-8'
      // 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InUwMDAyIiwiZW1haWwiOiJkYWx5Lm5ndXllbkBtYXJrZXRhY3Rpb24udm4iLCJwaG9uZU51bWJlciI6bnVsbCwiaWQiOiI1ODZhMWU0YjJiMmNiNzc3N2RkZGNlYjIiLCJleHBpcnlEYXRlIjoiMjAxOC0wOC0yOVQxMDoxMjo0Ni4wNzZaIiwiaWF0IjoxNTMyOTQ1NTY2fQ.2yNcvO3g6IyQRrD6qH45LERCN1LXiY3uo-QUgMZYjQU',
    }
  }

  if (typeof params === 'object' && Object.keys(params).length > 0) {
    if (method === 'GET' || method === 'DELETE') {
      const query = queryString.stringify(params)
      if (query) {
        url += `?${query}`
      }
    } else {
      // console.log('xxxxYYY', params)
      opts.headers = { ...opts.headers, 'Content-Type': 'application/json' }
      opts.body = JSON.stringify(params)
    }
  }
  return fetch(url, opts)
    .then(response => {
      if (response.ok) {
        const reg = /application\/json/
        const contentType = response.headers.get('content-type')
        if (contentType && reg.test(contentType)) {
          return response.json()
        }
        return response.text()
      }
      return response.json().then(json => Promise.reject(json))
    })
    .catch(e => {
      const ex =
        e instanceof Error
          ? {
            code: 999,
            message: 'Something went wrong!',
            error: e.message
          }
          : e

      throw ex
    })
}

export default {
  Get (path, params, options = {}) {
    return request('GET', path, params, {}, options)
  },
  Post (path, params, options = {}) {
    return request('POST', path, params, {}, options)
  },
  Put (path, params, options = {}) {
    return request('PUT', path, params, {}, options)
  },
  Patch (path, params, options = {}) {
    return request('PATCH', path, params, {}, options)
  },
  Delete (path, params, options = {}) {
    return request('DELETE', path, params, {}, options)
  },
  Login(path, params, options = {}) {
    return request2('POST', path, params, {}, options)
  }
}
