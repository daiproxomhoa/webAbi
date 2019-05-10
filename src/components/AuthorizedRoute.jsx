import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCookie } from '../util/helpers'

class Auth extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      user: PropTypes.obj,
      token: PropTypes.string
    }).isRequired,
    children: PropTypes.any
  }
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const { children } = this.props
    const jwtToken = getCookie('jwtToken')
    console.log(jwtToken)
    if (!jwtToken) {
      return window.location.replace('http://localhost:3000/',200)
    }
    if (jwtToken) {
      return <React.Fragment>{children}</React.Fragment>
    }
    return <div className='authorized-route'>Loading</div>
  }
}
const AuthWrapper = connect(({ auth }) => ({
  auth
}))(Auth)
const AuthorizedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <AuthWrapper>
        <Component {...props} />
      </AuthWrapper>
    )}
  />
)
export default AuthorizedRoute
