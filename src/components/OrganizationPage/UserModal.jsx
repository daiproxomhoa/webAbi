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
            data: {

            },
            errors: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.open !== prevState.open) {
            console.log(nextProps)
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
        const {onClose, heading, organizations, ...rest} = this.props
        const {open,data} = this.state
        return (
            <Modal
                {...rest}
                // loading={false}
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
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            organizations: e
                                        },
                                        errors: {
                                            ...this.state.errors,
                                            roleGroupCode: ''
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
                                value={data.username||''}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            username: e
                                        },
                                        errors: {
                                            ...this.state.errors,
                                            roleGroupCode: ''
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
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                label='Re-password'
                                placeholder=' Re-password'
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                label='User call'
                                placeholder='User call'
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                label='Password Call'
                                placeholder='Password Call'
                            />
                        </FormControl>
                        <FormControl className='m-t-md'>
                            <FormControlLabel
                                label='Only use on this Vehicle'
                                style={{marginBottom: 0}}
                                control={<Checkbox color='primary' value='checked'/>}
                            />
                            <Select placeholder='Slect vehicles' style={{marginTop: 0}} onChange={() => {
                            }}/>
                        </FormControl>
                    </div>
                    <div className='col-md-6'>
                        <FormControl>
                            <Select placeholder='Group' onChange={() => {
                            }}/>
                        </FormControl>
                        <FormControl>
                            <TextField placeholder='Email' className='m-t-md' label='Email'/>
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                label='Full Name'
                                placeholder='Full Name'
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                type='number'
                                label='Phone Number'
                                className='m-t-md'
                                placeholder='Phone Number'
                            />
                        </FormControl>
                        <FormControl>
                            <TimePicker
                                placeholder='Start Time'
                                label='Start Time'
                                className='w-100 m-t-md'
                                value=''
                                onChange={time => console.log(time)}
                            />
                        </FormControl>
                        <FormControl>
                            <TimePicker
                                placeholder='Close Time'
                                className='m-t-md w-100'
                                label='Close Time'
                                value=''
                                onChange={time => console.log(time)}
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
