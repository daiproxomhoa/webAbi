import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'

import Select from '../common/Select/Select'
import Modal from '../common/Modal/Modal'
import {connect} from "react-redux";
import {listCustomerGroup, listOrganization, listPartner, listCity} from "../../actions";
import classnames from "classnames";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";

class CustomerModal extends Component {
    static propTypes = {
        onClose: PropTypes.func,
        onSubmit: PropTypes.func,
        heading: PropTypes.string
    }

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            data: {},
            moreConfig: false,
        }
        props.listCityFunc({
            country: "vi",
            searchInput: ""
        })
    }

    componentDidMount() {
        this.fetchGroup();
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

    submit = () => {
        console.log("DM")
        const {data} = this.state
        const {onSubmit} = this.props
        onSubmit(data)
    }
    fetchGroup = () => {
        const {data} = this.state
        const {listCustomerGroupFunc} = this.props
        console.log(data)
        listCustomerGroupFunc({
            currentPage: 1,
            organizationIds: [data.organizationId._id],
            pageLimit: 1000
        }, 'single')
    }

    render() {
        const {onClose, heading, organizations, customerGroup, city} = this.props
        const {open, data, moreConfig} = this.state
        const customerGroupOptions = customerGroup.map(e => ({
            value: e._id,
            label: e.groupName
        })).reverse()
        const listCity = city.map(e => ({
            value: e._id,
            label: e.cityName
        }))
        const saleFreOptions = [
            {value: 'F1', label: 'F1'},
            {value: 'F2', label: 'F2'},
            {value: 'F3', label: 'F3'},
            {value: 'F4', label: 'F4'},
            {value: 'F5', label: 'F5'},
            {value: 'F6', label: 'F6'},
            {value: 'F7', label: 'F7'},
            {value: 'F8', label: 'F8'},
            {value: 'F9', label: 'F9'},
            {value: 'F10', label: 'F10'},
        ]
        return (
            <Modal
                className='Partner_Modal'
                open={open}
                size='lg'
                onClose={onClose}
                onSubmit={() => this.submit()}
                heading={heading}
                loading="false"
            >
                <div className='main-information row'>
                    <div className='col-md-6'>
                        <FormControl>
                            <Select
                                label='Organization'
                                style={{marginTop: '15px'}}
                                options={organizations}
                                placeholder='Organization'
                                value={data.organizationId ? data.organizationId._id : ''}
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        errors: {
                                            ...this.state.errors,
                                            organizationId: ''
                                        },
                                        data: {
                                            ...this.state.data,
                                            organizationId: {
                                                ...this.state.data.organizationId,
                                                _id: e
                                            }
                                        }
                                    }, () => {
                                        this.fetchGroup()
                                    })
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                required
                                style={{marginTop: '15px'}}
                                label='Partner Code'
                                placeholder='Partner Code'
                                value={data.customerCode}
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        errors: {
                                            ...this.state.errors,
                                            customerCode: ''
                                        },
                                        data: {
                                            ...this.state.data,
                                            customerCode: e.target.value
                                        }
                                    })
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                label='Title'
                                style={{marginTop: '15px'}}
                                placeholder='Title'
                                value={data.title || ''}
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            title: e.target.value
                                        }
                                    })
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                placeholder='Full name'
                                label='Full name'
                                style={{marginTop: '15px'}}
                                value={data.fullName || ''}
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            fullName: e.target.value
                                        }
                                    })
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <Select
                                label='City'
                                style={{marginTop: '15px'}}
                                options={listCity}
                                placeholder='City'
                                value={(data.cityId ? data.cityId._id : '')}
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            city: e
                                        }
                                    })
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                style={{marginTop: '15px'}}
                                placeholder='District'
                                label='District'
                                value={data.district || ''}
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            district: e.target.value
                                        }
                                    })
                                }}
                            />
                        </FormControl>
                    </div>
                    <div className='col-md-6'>
                        <FormControl>
                            <Select
                                isMulti={true}
                                label='Partner Group'
                                placeholder='Partner Group'
                                style={{marginTop: '15px'}}
                                options={customerGroupOptions}
                                value={data.groupIds?data.groupIds.map(value=>value._id) :[]}
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            groupids: e
                                        }
                                    })
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                placeholder='Email'
                                label='Email'
                                style={{marginTop: '15px'}}
                                value={data.email || ''}
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            email: e.target.value
                                        }
                                    })
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                style={{marginTop: '15px'}}
                                placeholder='Mobile Number'
                                label='Mobile Number'
                                value={data.mobileNumber || ''}
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            mobileNumber: e.target.value
                                        }
                                    })
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                style={{marginTop: '15px'}}
                                placeholder='Home Number'
                                label='Home Number'
                                value={data.homeNumber || ''}
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            homeNumber: e.target.value
                                        }
                                    })
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                style={{marginTop: '15px'}}
                                placeholder='Serial'
                                label='Serial'
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                style={{marginTop: '15px'}}
                                placeholder='Address'
                                label='Address'
                                value={data.streetAddress || ''}
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            streetAddress: e.target.value
                                        }
                                    })
                                }}
                            />
                        </FormControl>

                    </div>
                    <div className='col-md-6'>
                        <FormControl>
                            <Select
                                label='Sales Frequency'
                                style={{marginTop: '15px'}}
                                options={saleFreOptions}
                                placeholder='Sales Frequency'
                                value={data.salesFrequency || ''}
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            salesFrequency: e
                                        }
                                    })
                                }}
                            />
                        </FormControl>
                    </div>
                    <div className='col-md-12'>
                        <FormControl fullWidth={true}>
                            <TextField
                                required
                                style={{marginTop: '15px'}}
                                label='Comment'
                                placeholder='Comment'
                                value={data.comment}
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            comment: e.target.value
                                        }
                                    })
                                }}
                            />
                        </FormControl>
                    </div>
                </div>
                <div className='more-configurations row m-t-md'>
                    <div className='col-md-12'>
                        <a
                            className='font-bold'
                            onClick={() =>
                                this.setState({
                                    ...this.state,
                                    moreConfig: !this.state.moreConfig
                                })
                            }
                        >
                            More Configurations
                            <i
                                className={classnames(
                                    'm-l-sm fas',
                                    {'fa-sort-down fa-2x': !moreConfig},
                                    {'fa-sort-up  fa-2x': moreConfig}
                                )}
                            />
                        </a>
                        {moreConfig && (
                            <div className='more'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <FormControl>
                                            <TextField
                                                className='m-t-md'
                                                label='Latitude'
                                                placeholder='Latitude'
                                                type={"number"}
                                                value={data.coordinate ? data.coordinate.latitude : ' '}
                                                onChange={e =>
                                                    this.setState({
                                                        ...this.state,
                                                        data: {
                                                            ...this.state.data,
                                                            coordinate: {
                                                                ...this.state.data.coordinate,
                                                                latitude: e.target.value
                                                            }
                                                        }
                                                    })
                                                }
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <TextField
                                                className='m-t-md'
                                                label='Open Time'
                                                placeholder='Open Time'
                                                value={data.openTime || ''}
                                                onChange={e =>
                                                    this.setState({
                                                        ...this.state,
                                                        openTime: e.target.value
                                                    })
                                                }

                                            />
                                        </FormControl>

                                        <FormControl>
                                            <Select
                                                className='m-t-md'
                                                label='Truck Only'
                                                placeholder='Truck Only'
                                                value={data.algoConfig?data.algoConfig.bikeOnly:' '}
                                                options={[{value: 'FALSE', label: 'FALSE'}, {
                                                    value: 'TRUE',
                                                    label: 'TRUE'
                                                }]}
                                                onChange={(e) => {
                                                    this.setState({
                                                        ...this.state,
                                                        data:{
                                                            ...this.state.data,
                                                            algoConfig: {
                                                                ...this.state.data.algoConfig,
                                                                truckOnly: e
                                                            }
                                                        }
                                                    })
                                                }}

                                            />
                                        </FormControl>
                                    </div>
                                    <div className='col-md-6'>
                                        <FormControl>
                                            <TextField
                                                className='m-t-md'
                                                label='Longitude'
                                                placeholder='Longitude'
                                                type={"number"}
                                                value={data.coordinate ? data.coordinate.longitude : ''}
                                                onChange={e =>
                                                    this.setState({
                                                        ...this.state,
                                                        data: {
                                                            ...this.state.data,
                                                            coordinate: {
                                                                ...this.state.data.coordinate,
                                                                longitude: e.target.value
                                                            }
                                                        }
                                                    })
                                                }

                                            />
                                        </FormControl>
                                        <FormControl>
                                            <TextField
                                                className='m-t-md'
                                                label='Close Time'
                                                placeholder='Close Time'
                                                value={data.closeTime || ''}
                                                onChange={e =>
                                                    this.setState({
                                                        ...this.state,
                                                        closeTime: e.target.value
                                                    })
                                                }
                                            />
                                        </FormControl>

                                        <FormControl>
                                            <Select
                                                className='m-t-md'
                                                label='Sales Code'
                                                placeholder='Sales Code'
                                                value={data.algoConfig.bikeOnly || ''}
                                                options={[{value: 'FALSE', label: 'FALSE'}, {
                                                    value: 'TRUE',
                                                    label: 'TRUE'
                                                }]}
                                                onChange={e =>
                                                    this.setState({
                                                        ...this.state,
                                                        algoConfig: {
                                                            bikeOnly: e
                                                        }
                                                    })
                                                }

                                            />
                                        </FormControl>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <TextField
                                                    required
                                                    style={{marginTop: '15px'}}
                                                    label='Thời gian tối thiểu'
                                                    placeholder='Thời gian tối thiểu'
                                                    value={data.algoConfig.minTime || ''}
                                                    onChange={e =>
                                                        this.setState({
                                                            ...this.state,
                                                            data:{
                                                                ...this.state.data,
                                                                algoConfig: {
                                                                    ...this.state.data.algoConfig,
                                                                    minTime: e
                                                                }
                                                            }
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className='col-md-4'>
                                                <TextField
                                                    required
                                                    style={{marginTop: '15px'}}
                                                    label='Thời gian tối đa'
                                                    placeholder='Thời gian tối đa'
                                                    value={data.algoConfig.maxTime || ''}
                                                    onChange={e =>
                                                        this.setState({
                                                            ...this.state,
                                                            data:{
                                                                ...this.state.data,
                                                                algoConfig: {
                                                                    ...this.state.data.algoConfig,
                                                                    maxTime: e
                                                                }
                                                            }
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className='col-md-4'>
                                                <TextField
                                                    required
                                                    style={{marginTop: '15px'}}
                                                    label='Khung thời gian'
                                                    placeholder='Khung thời gian'
                                                    value={data.algoConfig.timewindow || ''}
                                                    onChange={e =>
                                                        this.setState({
                                                            ...this.state,
                                                            data:{
                                                                ...this.state.data,
                                                                algoConfig: {
                                                                    ...this.state.data.algoConfig,
                                                                    timewindow: e
                                                                }
                                                            }
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <TextField
                                                    required
                                                    style={{marginTop: '15px'}}
                                                    label='Tax Code'
                                                    placeholder='Tax Code'
                                                    value={data.taxCode || ''}
                                                    onChange={e =>
                                                        this.setState({
                                                            ...this.state,
                                                            algoConfig: {
                                                                ...this.state.algoConfig,
                                                                timewindow: e
                                                            }
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        )
    }
}

export default connect(
    ({
         partner: {
             customerGroup: {list_single},
             city: {list, error, status}
         },
     }) => ({
        customerGroup: list_single,
        city: list
    }),
    dispatch => ({
        listCustomerGroupFunc: (params, option) => dispatch(listCustomerGroup(params, option)),
        listCityFunc: (params) => dispatch(listCity(params))
    })
)(CustomerModal)
