import React, { Component } from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import LinearProgress from '@material-ui/core/LinearProgress'
import store from 'store'
// app config
import AppConfig from '../../constants/AppConfig'
class Signin extends Component {
  state = {
    email: 'demo@example.com',
    password: 'test#123'
  }
  login () {
    console.log('login')
  }
  componentDidMount () {
    const jwtToken = store.get('jwtToken')
    if (!jwtToken) {
      // return window.location.replace('http://vappaccount.codev.abivin.vn', 500)
    }
  }
  render () {
    const { email, password } = this.state
    const { loading } = this.props
    return (
      <div className='rct-session-wrapper'>
        {loading && <LinearProgress />}
        <div className='session-inner-wrapper m-t-xl'>
          <div className='container'>
            <div className='logo m-b-md text-center'>
              <img
                src={AppConfig.appLogo}
                alt='logo-abivin'
                style={{ width: '120px', height: '120px' }}
              />
            </div>
            <div className='row-eq-height'>
              <div style={{ width: '450px' }}>
                <div className='session-body'>
                  <div className='session-head mb-30'>
                    <h1 className='font-weight-bold text-uppercase text-center'>
                      Get started with {AppConfig.brandName}
                    </h1>
                  </div>
                  <Form>
                    <FormGroup className='has-wrapper'>
                      <Label>USERNAME | EMAIL</Label>
                      <Input
                        value={email}
                        name='user-mail'
                        id='user-mail'
                        className='has-input input-lg'
                        placeholder='Enter Email Address'
                        onChange={event =>
                          this.setState({ email: event.target.value })
                        }
                      />
                    </FormGroup>
                    <FormGroup className='has-wrapper'>
                      <Label>PASSWORD</Label>
                      <Input
                        value={password}
                        type='Password'
                        name='user-pwd'
                        id='pwd'
                        className='has-input input-lg'
                        placeholder='Password'
                        onChange={event =>
                          this.setState({ password: event.target.value })
                        }
                      />
                    </FormGroup>
                    <FormGroup className='mb-15'>
                      <Button
                        color='primary'
                        size='lg'
                        style={{ height: '55px', lineHeight: '55px' }}
                        block
                        onClick={() => this.login()}
                      >
                        SIGN IN
                      </Button>
                    </FormGroup>
                  </Form>
                  <div className='text-center m-t-sm'>
                    <a className='text-muted' href='#_'>
                      Forgot password ?{' '}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='register text-center m-t-md'>
            <a
              href='/register'
              className='tex-white'
              style={{ color: 'beige' }}
            >
              <strong>Don't have account ? Sign up</strong>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Signin
