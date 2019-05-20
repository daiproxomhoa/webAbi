import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from '../common/TextField'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'

import Select from '../common/Select/Select'
import Modal from '../common/Modal/Modal'
import {connect} from "react-redux";
import {listCustomerGroup, listOrganization, listPartner, listCity} from "../../actions";
import classnames from "classnames";
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {isTime, isTimewindow_partner, isPhoneNumber, isEmail} from '../../util/helpers'
import {NotificationManager} from "react-notifications";
import AddIcon from '@material-ui/icons/Add';
import Api from '../../util/api'
import {STATUS_ERROR, STATUS_SUCCESS} from "../../constants/Const";
import InfoIcon from "@material-ui/core/SvgIcon/SvgIcon";

const INIT_DATA = {
    MDP: '',
    algoConfig: {
        bikeOnly: "FALSE",
        maxTime: "",
        minTime: "",
        supermarket: "",
        timewindow: "",
        truckOnly: "",
        workingDays: []
    },
    // authyId: "",
    city: "",
    cityId: "",
    closeTime: "",
    comment: "",
    coordinate: {latitude: "", longitude: ""},
    createdAt: "",
    customerCode: "",
    district: "",
    email: "",
    emails: [],
    fullName: "",
    fullNameCode: "",
    groupIds: [],
    homeNumber: "",
    invoiceAddress: "",
    lastUpdatedAt: "",
    lunchTime: "",
    mobileNumber: "",
    notes: [],
    officeNumber: "",
    openTime: "",
    organizationId: "",
    salesCode: "",
    serial: [],
    serialNumber: [],
    species: "",
    streetAddress: "",
    taxCode: "",
    title: "",
    visitedBy: [],
    // _id: "",
}

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
            data: {...INIT_DATA},
            moreConfig: false,
            errors: {
                emails: []
            },
            status: ''

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
                // data: nextProps.data ? {
                //     ...nextProps.data,
                //     organizationId: (nextProps.data.organizationId ? nextProps.data.organizationId._id : ''),
                //     cityId: (nextProps.data.cityId ? nextProps.data.cityId._id : ''),
                // } : prevState.data,
            }
        }
        return null
    }


    fetchGroup = async () => {
        const {listCustomerGroupFunc, customerGroup, data} = this.props
        if (data) {
            listCustomerGroupFunc({
                currentPage: 1,
                organizationIds: [data ? data.organizationId : ''],
                pageLimit: 1000
            }, 'single')
            try {
                var dt = await Api.Post('/customers/read/id', {_id: data._id})
                this.setState({
                    data: {
                        ...dt.data,
                        groupIds: dt.data.groupIds.filter(function (el) {
                            return el != null && el != undefined;
                        })
                    }, status: STATUS_SUCCESS, customerGroup: customerGroup
                })
            } catch (e) {
                this.setState({data: {...INIT_DATA}, status: STATUS_ERROR, customerGroup: customerGroup})
            }
        } else {
            listCustomerGroupFunc({
                currentPage: 1,
                organizationIds: [''],
                pageLimit: 1000
            }, 'single')
        }

    }
    getGroup = () => {
        const {data} = this.state
        const {listCustomerGroupFunc} = this.props
        listCustomerGroupFunc({
            currentPage: 1,
            organizationIds: [data ? data.organizationId : ''],
            pageLimit: 1000
        }, 'single')
    }
    checkError = () => {
        const {data} = this.state
        var temp = data;
        const errors = {}
        if (!temp.organizationId) {
            errors.organizationId = 'Invalid organization ID'
        }
        if (!temp.customerCode) {
            errors.customerCode = 'Invalid customer Code'
        }
        if (!temp.fullName) {
            errors.fullName = 'Invalid full Name'
        }
        if (!temp.mobileNumber) {
            errors.mobileNumber = 'Invalid Mobile Number'
        }
        if (!temp.cityId) {
            errors.cityId = 'Invalid city'
        }
        // if (temp.mobileNumber&&!isPhoneNumber(temp.mobileNumbe)) {
        //     errors.mobileNumber = 'Mobile Number wrong format'
        // }
        if (!temp.openTime) {
            errors.openTime = 'Please enter open time of customer'
        }
        if (temp.openTime && !isTime(temp.openTime)) {
            errors.openTime = 'Open time must be in format HH:mm'
        }
        if (!temp.closeTime) {
            errors.closeTime = 'Please enter close time of customer'
        }
        if (temp.closeTime && !isTime(temp.closeTime)) {
            errors.closeTime = 'Close time must be in format HH:mm'
        }
        this.setState({errors})
    }
    submit = () => {
        const {data} = this.state
        const {onSubmit} = this.props
        var temp = data;
        // temp.organizationId = data.organizationId ? data.organizationId._id : ''
        temp.emails = data.emails.map(v => {
            return {val: v}
        })
        const errors = {}
        if (!temp.organizationId) {
            errors.organizationId = 'Invalid organization ID'
        }
        if (!temp.customerCode) {
            errors.customerCode = 'Invalid customer Code'
        }
        if (!temp.fullName) {
            errors.fullName = 'Invalid full Name'
        }
        if (!temp.mobileNumber) {
            errors.mobileNumber = 'Invalid Mobile Number'
        }
        if (!temp.cityId) {
            errors.cityId = 'Invalid city'
        }
        // if (temp.mobileNumber&&!isPhoneNumber(temp.mobileNumbe)) {
        //     errors.mobileNumber = 'Mobile Number wrong format'
        // }
        if (!temp.openTime) {
            errors.openTime = 'Please enter open time of customer'
        }
        if (temp.openTime && !isTime(temp.openTime)) {
            errors.openTime = 'Open time must be in format HH:mm'
        }
        if (!temp.closeTime) {
            errors.closeTime = 'Please enter close time of customer'
        }
        if (temp.closeTime && !isTime(temp.closeTime)) {
            errors.closeTime = 'Close time must be in format HH:mm'
        }
        temp.emails.map((v, i) => {
            if (v && !isEmail(v)) {
                return null
            }
        })
        for (var e in errors) {
            NotificationManager.warning(errors[e], 'Warning', 4000);
        }
        if (Object.keys(errors).length > 0) {
            return
        }
        if (!this.props.data) {
            delete temp._id
            temp.species = "SUPPLIERS"
        }
        onSubmit(temp)
    }
    setWorkingDays = (e, day) => {
        const {data} = this.state
        let days = data.algoConfig ? data.algoConfig.workingDays : []
        if (e.target.checked) {
            if ((days.length && days.indexOf(day) === -1) || !days.length) {
                days = [...days, day]
            }
        } else {
            if (days.length && days.indexOf(day) >= 0) {
                days = days.filter(d => d !== day)
            }
        }
        return this.setState({

            data: {
                ...data,
                algoConfig: {...data.algoConfig, workingDays: days}
            }
        })
    }

    render() {
        const {onClose, heading, organizations, customerGroup, city, classes} = this.props
        const {open, data, moreConfig, errors} = this.state
        const customerGroupOptions = customerGroup.map(e => {
            if (e._id && e.groupName) {
                return ({
                    value: e._id,
                    label: e.groupName
                })
            }
        }).reverse()
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
        const firstWeekDayOptions = [
            {value: 'MON', label: 'Monday'},
            {value: 'TUE', label: 'Tuesday'},
            {value: 'WED', label: 'Wednesday'},
            {value: 'THU', label: 'Thursday'},
            {value: 'FRI', label: 'Friday'},
            {value: 'SAT', label: 'Saturday'},
            {value: 'SUN', label: 'Sunday'}
        ]
        const workingDayList = [...firstWeekDayOptions]
        return (
            <Modal
                className='Supplier_Modal'
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
                                value={data.organizationId}
                                error={!!errors.organizationId}
                                onChange={(e) => {
                                    this.setState({
                                        errors: {
                                            ...this.state.errors,
                                            organizationId: ''
                                        },
                                        data: {
                                            ...data,
                                            organizationId: e
                                        }
                                    }, () => {
                                        this.getGroup()
                                    })
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                style={{marginTop: '15px'}}
                                label='Supplier Code'
                                placeholder='Supplier Code'
                                value={data.customerCode || ''}
                                error={!!errors.customerCode}
                                onChange={(e) => {
                                    this.setState({
                                        errors: {
                                            ...this.state.errors,
                                            customerCode: ''
                                        },
                                        data: {
                                            ...data,
                                            customerCode: e.target.value
                                        }
                                    }, this.checkError)
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
                                        data: {
                                            ...data,
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
                                error={!!errors.fullName}
                                onChange={(e) => {
                                    this.setState({
                                        data: {
                                            ...data,
                                            fullName: e.target.value
                                        }
                                    }, this.checkError)
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <Select
                                label='City'
                                style={{marginTop: '15px'}}
                                options={listCity}
                                placeholder='City'
                                value={data.cityId || ''}
                                error={!!errors.cityId}
                                onChange={(e) => {
                                    this.setState({
                                        data: {
                                            ...data,
                                            cityId: e
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
                                        data: {
                                            ...data,
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
                                label='Supplier Group'
                                placeholder='Supplier Group'
                                style={{marginTop: '15px'}}
                                options={customerGroupOptions}
                                value={data.groupIds ? data.groupIds : []}
                                onChange={(e) => {
                                    this.setState({
                                        data: {
                                            ...data,
                                            groupIds: e
                                        }
                                    })
                                }}
                            />
                        </FormControl>
                        <FormControl style={{marginTop: '15px'}}>
                            <InputLabel shrink={true} htmlFor="adornment-amount">Email</InputLabel>
                            <Input
                                placeholder='Email'
                                label='Email'
                                value={data.email || ''}
                                error={!!errors.email}
                                onChange={(e) => {
                                    this.setState({
                                        data: {
                                            ...data,
                                            email: e.target.value
                                        }
                                    })
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <AddIcon onClick={() => {
                                            var temp = data.emails
                                            temp.push("")
                                            this.setState({
                                                data: {
                                                    ...data,
                                                    emails: temp
                                                }
                                            })
                                        }}/>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {data.emails.map((value, index) =>
                            <FormControl key={index}>
                                <TextField
                                    style={{marginTop: '15px'}}
                                    placeholder='Email'
                                    label='Email'
                                    value={value || ''}
                                    error={!!errors.emails[index]}
                                    onChange={(e) => {
                                        this.setState({
                                            data: {
                                                ...data,
                                                emails: this.state.data.emails.map((v, i) => {
                                                    if (i == index) {
                                                        return e.target.value
                                                    } else {
                                                        return v
                                                    }
                                                })
                                            }
                                        })
                                    }}
                                />
                            </FormControl>
                        )
                        }
                        <FormControl>
                            <TextField
                                style={{marginTop: '15px'}}
                                placeholder='Mobile Number'
                                label='Mobile Number'
                                value={data.mobileNumber || ''}
                                error={!!errors.mobileNumber}
                                onChange={(e) => {
                                    this.setState({
                                        data: {
                                            ...data,
                                            mobileNumber: e.target.value
                                        }
                                    }, this.checkError)
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
                                        data: {
                                            ...data,
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
                                value={data.serialNumber.join()}
                                onChange={(e)=>this.setState({
                                    data:{
                                        ...data,
                                        serialNumber:e.target.value.split(",")
                                    }
                                })}
                                endAdornment={
                                    <InputAdornment title={"Each serial must be seperated by comma. Example: 09SCKHFSF,HNSDF78"} position="end">
                                        <InfoIcon/>
                                    </InputAdornment>
                                }
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
                                        data: {
                                            ...data,
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

                                        data: {
                                            ...data,
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
                                value={data.comment || ''}
                                onChange={(e) => {
                                    this.setState({

                                        data: {
                                            ...data,
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
                                                value={data.coordinate.latitude || ''}
                                                onChange={e =>
                                                    this.setState({

                                                        data: {
                                                            ...data,
                                                            coordinate: {
                                                                ...data.coordinate,
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
                                                error={!!errors.openTime}
                                                onChange={e =>
                                                    this.setState({

                                                        data: {
                                                            ...data,
                                                            openTime: e.target.value
                                                        }
                                                    }, this.checkError)
                                                }

                                            />
                                        </FormControl>
                                        <FormControl>
                                            <TextField
                                                className='m-t-md'
                                                label='Sales code'
                                                placeholder='Sales code'
                                                value={data.salesCode || ''}
                                                error={!!errors.salesCode}
                                                onChange={e =>
                                                    this.setState({

                                                        data: {
                                                            ...data,
                                                            salesCode: e.target.value
                                                        }
                                                    })
                                                }

                                            />
                                        </FormControl>
                                        <FormControl>
                                            <Select
                                                className='m-t-md'
                                                label='Truck Only'
                                                placeholder='Truck Only'
                                                value={data.algoConfig.truckOnly || ' '}
                                                options={[{value: 'FALSE', label: 'FALSE'}, {
                                                    value: 'TRUE',
                                                    label: 'TRUE'
                                                }]}
                                                onChange={(e) => {
                                                    this.setState({

                                                        data: {
                                                            ...data,
                                                            algoConfig: {
                                                                ...data.algoConfig,
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
                                                value={data.coordinate.longitude || ''}
                                                onChange={e =>
                                                    this.setState({

                                                        data: {
                                                            ...data,
                                                            coordinate: {
                                                                ...data.coordinate,
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
                                                error={!!errors.closeTime}
                                                onChange={e =>
                                                    this.setState({

                                                        data: {
                                                            ...data,
                                                            closeTime: e.target.value
                                                        }
                                                    }, this.checkError)
                                                }
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <TextField
                                                className='m-t-md'
                                                label='MDP'
                                                placeholder='MDP'
                                                value={data.MDP || ''}
                                                error={!!errors.MDP}
                                                onChange={e =>
                                                    this.setState({

                                                        data: {
                                                            ...data,
                                                            MDP: e.target.value
                                                        }
                                                    })
                                                }

                                            />
                                        </FormControl>
                                        <FormControl>
                                            <TextField
                                                className='m-t-md'
                                                label='Sales Code'
                                                placeholder='Sales Code'
                                                value={data.salesCode || ''}
                                                onChange={e =>
                                                    this.setState({
                                                        data: {
                                                            ...data,
                                                            salesCode: e.target.value
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
                                                    style={{marginTop: '15px'}}
                                                    label='Thời gian tối thiểu'
                                                    placeholder='Thời gian tối thiểu'
                                                    value={data.algoConfig.minTime || ''}
                                                    onChange={e =>
                                                        this.setState({

                                                            data: {
                                                                ...data,
                                                                algoConfig: {
                                                                    ...data.algoConfig,
                                                                    minTime: e.target.value
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

                                                            data: {
                                                                ...data,
                                                                algoConfig: {
                                                                    ...data.algoConfig,
                                                                    maxTime: e.target.value
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
                                                    error={!!errors.timewindow}
                                                    value={data.algoConfig.timewindow || ''}
                                                    onChange={e =>
                                                        this.setState({

                                                            data: {
                                                                ...data,
                                                                algoConfig: {
                                                                    ...data.algoConfig,
                                                                    timewindow: e.target.value
                                                                }
                                                            }
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className='col-md-6'>
                                                <TextField
                                                    style={{marginTop: '15px'}}
                                                    label='Tax Code'
                                                    placeholder='Tax Code'
                                                    value={data.taxCode || ''}
                                                    onChange={e =>
                                                        this.setState({

                                                            data: {
                                                                ...data,
                                                                taxCode: e.target.value
                                                            }

                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className='col-md-6'>
                                                <TextField
                                                    required
                                                    style={{marginTop: '15px'}}
                                                    label='Invoice Address'
                                                    placeholder='Invoice Address'
                                                    value={data.invoiceAddress || ''}
                                                    onChange={e =>
                                                        this.setState({

                                                            data: {
                                                                ...data,
                                                                invoiceAddress: e.target.value
                                                            }

                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <FormGroup row className='m-t-md'>
                                            <FormLabel component='legend'>Working Days</FormLabel>
                                            {workingDayList.map((day, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    label={day.label}
                                                    control={
                                                        <Checkbox
                                                            color='primary'
                                                            value={day.value}
                                                            checked={
                                                                this.props.data ? (data.algoConfig.workingDays.indexOf(
                                                                    day.value
                                                                ) !== -1) : null
                                                            }
                                                            onChange={e =>
                                                                this.setWorkingDays(e, day.value)
                                                            }
                                                        />
                                                    }
                                                />
                                            ))}
                                        </FormGroup>
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
             customerGroup,
             city: {list, error, status}
         },
     }) => ({
        customerGroup: customerGroup.list.data_single,
        city: list
    }),
    dispatch => ({
        listCustomerGroupFunc: (params, option) => dispatch(listCustomerGroup(params, option)),
        listCityFunc: (params) => dispatch(listCity(params))
    })
)(CustomerModal)
