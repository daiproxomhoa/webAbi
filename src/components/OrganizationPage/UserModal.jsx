import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio'
import Checkbox from '@material-ui/core/Checkbox'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import Select from '../common/Select/Select'
import Modal from '../common/Modal/Modal'
import TimePicker from '../common/TimePicker/TimePicker'
import {STATUS_SUCCESS} from "../../constants/Const";
import {isEmail, isPhoneNumber} from '../../util/helpers'

class UserModal extends Component {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onClose: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            data: {},
            errors: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.open !== prevState.open) {
            return {
                ...prevState,
                open: nextProps.open,
                data: nextProps.data ? nextProps.data : prevState.data,
            }
        }
        return null
    }

    // componentWillReceiveProps(nextProps) {
    //    console.log(nextProps)
    // }
    submit = () => {
        const {data} = this.state
        const {onSubmit} = this.props
        onSubmit(data)
    }

    render() {
        const {onClose, heading, organizations, roles, ...rest} = this.props
        const {open, data, errors} = this.state
        return (
            <Modal
                {...rest}
                className='User_Modal'
                open={open}
                size='lg'
                heading={heading}
                onClose={() => onClose(false)}
                onSubmit={() => this.submit()}
                loading="false"
            >
                <div className='row'>
                    <div className='col-md-6'>
                        <FormControl>
                            <Select
                                options={organizations}
                                isMulti={true}
                                placeholder='Organizations'
                                value={data.organizationIds ? data.organizationIds.map(value => value._id) : ''}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            organizations: e
                                        },
                                        errors: {
                                            ...this.state.errors,
                                            Organizations: ''
                                        }
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                label='User name'
                                placeholder='User name'
                                value={data.username || ''}
                                error={!!errors.username}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            username: e
                                        },
                                        errors: {
                                            ...this.state.errors,
                                            username: ''
                                        }
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                label='Password'
                                placeholder='password'
                                type="password"
                                error={!!errors.password}
                                value={data.callPass || '12345678'}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            callPass: e.target.value
                                        },
                                        errors: {
                                            ...this.state.errors,
                                            password: ''
                                        }
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                label='Re-password'
                                placeholder=' Re-password'
                                type="password"
                                error={!!errors.rePassword}
                                value={data.callPass || '12345678'}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            callPass: e.target.value
                                        },
                                        errors: {
                                            ...this.state.errors,
                                            password: ''
                                        }
                                    })
                                }

                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                label='User call'
                                placeholder='User call'
                                error={!!errors.password}
                                value={data.callId || ''}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            callId: e
                                        },
                                        errors: {
                                            ...this.state.errors,
                                            password: ''
                                        }
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                label='Password Call'
                                placeholder='Password Call'
                                type='password'
                                value={data.callPass || ''}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            callPass: e
                                        },
                                        errors: {
                                            ...this.state.errors,
                                            password: ''
                                        }
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl className='m-t-md'>
                            <FormControlLabel
                                label='Only use on this Vehicle'
                                style={{marginBottom: 0}}
                                control={<Checkbox   color='primary' value='checked'/>}
                            />
                            <Select id='vehicles' placeholder='Slect vehicles' style={{marginTop: 0}} onChange={() => {
                            }}/>
                        </FormControl>
                    </div>
                    <div className='col-md-6'>
                        <FormControl>
                            <Select placeholder='Group'
                                    options={roles}
                                    isMulti={true}
                                    value={data.organizationIds ? data.organizationIds.map(value => value._id) : ''}
                                    onChange={e =>
                                        this.setState({
                                            ...this.state,
                                            data: {
                                                ...this.state.data,
                                                groups: e.target.value
                                            },
                                            errors: {
                                                ...this.state.errors,
                                                password: ''
                                            }
                                        })
                                    }/>
                        </FormControl>
                        <FormControl>
                            <TextField placeholder='Email'
                                       className='m-t-md'
                                       label='Email'
                                       error={!!errors.email}
                                       value={data.email || ''}
                                       onChange={e =>
                                           this.setState({
                                               ...this.state,
                                               data: {
                                                   ...this.state.data,
                                                   email: e.target.value
                                               },
                                               errors: {
                                                   ...this.state.errors,
                                                   email: ''
                                               }
                                           })
                                       }
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                label='Full Name'
                                placeholder='Full Name'
                                error={!!errors.displayName}
                                value={data.displayName || ''}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            displayName: e.target.value
                                        },
                                        errors: {
                                            ...this.state.errors,
                                            displayName: ''
                                        }
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                type='tel'
                                label='Phone Number'
                                className='m-t-md'
                                placeholder='Phone Number'
                                error={!!errors.phoneNumber}
                                value={data.phoneNumber || ''}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            phoneNumber: e.target.value
                                        },
                                        errors: {
                                            ...this.state.errors,
                                            phoneNumber: ''
                                        }
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <TimePicker
                                id='start'
                                placeholder='Start Time'
                                label='Start Time'
                                className='w-100 m-t-md'
                                value={data.startTime||"07:30"}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            startTime: e.target.value
                                        },
                                        errors: {
                                            ...this.state.errors,
                                            startTime: ''
                                        }
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <TimePicker
                                id='close'
                                placeholder='Close Time'
                                className='m-t-md w-100'
                                label='Close Time'
                                value={data.closeTime||"17:30"}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            closeTime: e.target.value
                                        },
                                        errors: {
                                            ...this.state.errors,
                                            closeTime: ''
                                        }
                                    })
                                }
                            />
                        </FormControl>
                        <FormGroup row className='m-t-md'>
                            <FormLabel component='legend'>Working Status</FormLabel>
                            <FormControlLabel
                                color='primary'
                                value='On-Work'
                                control={<Radio/>}
                                checked
                                label='On-Work'
                            />
                            <FormControlLabel
                                control={<Radio/>}
                                color='primary'
                                value='no'
                                label='On-Leave'
                            />
                        </FormGroup>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default UserModal
