import React, { Component } from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import LinearProgress from '@material-ui/core/LinearProgress'

// app config
import AppConfig from '../../constants/AppConfig'
import { isEmail, isPhoneNumber } from '../../util/helpers'

class RegisterPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      phone: '',
      errors: {}
    }
  }
  register = () => {
    const { username, email, password, phone, errors } = this.state
    if (!email || (email && !isEmail(email))) {
      errors.email = 'invalid email'
    }
    if (!username) {
      errors.username = 'Invalid username'
    }
    if (!password) {
      errors.password = 'Invalid password'
    }
    if (!phone || (phone && !isPhoneNumber(phone))) {
      errors.phone = 'Invalid phone'
    }
    if (Object.keys(errors).length) {
      return
    }
    this.setState({ errors })
    // TODO create
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
                      <Label>USERNAME </Label>
                      <Input
                        value={email}
                        name='user-name'
                        id='user-name'
                        className='has-input input-lg'
                        placeholder='Enter User name'
                        onChange={event =>
                          this.setState({ email: event.target.value })
                        }
                      />
                    </FormGroup>
                    <FormGroup className='has-wrapper'>
                      <Label>EMAIL </Label>
                      <Input
                        value={email}
                        type='email'
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
                      <Label>TELEPHONE NUMBER </Label>
                      <Input
                        value={email}
                        name='user-phone'
                        id='user-phone'
                        className='has-input input-lg'
                        placeholder='Enter Phone Number'
                        onChange={event =>
                          this.setState({ phone: event.target.value })
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
                        Register
                      </Button>
                    </FormGroup>
                  </Form>
                  <div className='text-center m-t-sm'>
                    <div className='m-n-b-sm'>
                      I accecpt these terms of use
                      <strong>Terms of use</strong>
                    </div>
                    <a href='/login'>Login ? </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterPage
