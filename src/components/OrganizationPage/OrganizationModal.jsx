import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import classnames from 'classnames'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import {NotificationManager} from 'react-notifications';
import Select from '../common/Select/Select'
import Modal from '../common/Modal/Modal'
import DatePicker from '../common/DatePicker/DatePicker'
import TimePicker from '../common/TimePicker/TimePicker'
import {isPhoneNumber} from '../../util/helpers'

const INIT_DATA = {

    organizationDescription: '',
    parentId: '',
    reasons: [],
    algoConfig: {
        useERP: false,
        useColdChain: false,
        timeBalancing: false,
        reDelivery: false,
        maxTime: '',
        minTime: '',
        unloadMinWeight: 0,
        unloadMinTime: 0,
        selfLearnTraffic: false,
        selfLearnServiceTime: false,
        selfLearnSortingTime: false,
        volumeUnit: 0.0,
        weightUnit: 7,
        startWorkingTime: 0,
        autoReduceDriver: false,
        lunchTime: false,
        limitWaitTime: 0,
        limitBikeXdock: 10,
        limitBikeDistanceSegment: 100,
        limitBikeDistance: 50,
        useFamiliarity: false,
        useServiceTime: false,
        useClustering: false
    },
    closeTime: '',
    openTime: '',
    enableDynamicRouting: false,
    updatingData: false,
    runningAlgo: false,
    secretCode: null,
    categoryIds: [],
    coordinate: {
        longitude: 0,
        latitude: 0
    },
    configurations: {
        firstWeekDay: '',
        preventReSubmit: false,
        preventSubmitOverTime: false,
        telematics: false,
        smsBrandName: null,
        workingDays: [],
        typeTransportation: null,
        typeWarehouse: null
    },
    organizationCode: '',
    orgCategory: [],
    foundedAt: 0,
    phoneNumber: null,
    streetAddress: null
}

class OrganizationModal extends Component {
    static propTypes = {
        onClose: PropTypes.func,
        onSubmit: PropTypes.func,
        heading: PropTypes.string,
        orgCategories: PropTypes.array,
        parentOrgs: PropTypes.array
    }

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            moreConfig: false,
            parentOrgs: [],
            data: {...INIT_DATA},
            errors: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.open !== prevState.open) {
            return {
                ...prevState,
                open: nextProps.open,
                data:
                    nextProps.data && nextProps.data.id
                        ? {
                            ...nextProps.data,
                            parentId: nextProps.data.parentId
                                ? nextProps.data.parentId._id
                                : '',
                            orgCategory: nextProps.data.orgCategory.map(item => item._id),
                            coordinate: nextProps.data.coordinate,
                            algoConfig: {
                                ...nextProps.data.algoConfig,
                                ...INIT_DATA.algoConfig
                            },
                            configurations: {
                                ...nextProps.data.configurations,
                                ...INIT_DATA.configurations
                            }
                        }
                        : prevState.data
            }
        }
        return null
    }

    submit = () => {
        const {data} = this.state
        const {onSubmit} = this.props
        const {organizationCode, organizationName, phoneNumber} = data
        const errors = {}
        if (!data.parentId) {
            errors.parentId = 'Invalid parent Organization'
        }
        if (phoneNumber && !isPhoneNumber(phoneNumber)) {
            errors.phoneNumber = 'Invalid phone number'
        }
        if (!organizationCode) {
            errors.organizationCode = 'Invalid organization code'
        }
        if (!organizationName) {
            errors.organizationName = 'Invalid organization name'
        }
        this.setState({errors})

        if (Object.keys(errors).length > 0) {
            return
        }
        onSubmit(data)
    }
    // SHOULD CHANGE
    setWorkingDays = (e, day) => {
        const {data} = this.state
        let days = data.configurations ? data.configurations.workingDays : []
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
            ...this.state,
            data: {
                ...data,
                configurations: {...data.configurations, workingDays: days}
            }
        })
    }

    render() {
        const {onClose, heading, orgCategories, parentOrgs} = this.props
        const {open, moreConfig, data, errors} = this.state
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
        const algoConfigList = {
            useFamiliarity: {
                value: 'useFamiliarity',
                label: 'Use Familiarity'
            },
            useClustering: {
                value: 'useClustering',
                label: 'Use Clustering'
            },
            lunchTime: {
                value: 'lunchTime',
                label: 'Lunch Time'
            },
            autoReduceDriver: {
                value: 'autoReduceDriver',
                label: 'Auto Reduce Driver'
            },
            selfLearnSortingTime: {
                value: 'selfLearnSortingTime',
                label: 'Self Learn Sorting Time'
            },
            selfLearnServiceTime: {
                value: 'selfLearnServiceTime',
                label: 'Self Learn Service Time'
            },
            selfLearnTraffic: {
                value: 'selfLearnTraffic',
                label: 'Self Learn Traffic'
            },
            timeBalancing: {
                value: 'timeBalancing',
                label: 'Time Balancing'
            },
            useColdChain: {
                value: 'useColdChain',
                label: 'Use Cold Chain'
            },
            useERP: {
                value: 'useERP',
                label: 'Use ERP'
            }
        }
        const orgCategoryOptions = orgCategories.map(orgCategory => ({
            value: orgCategory._id,
            label: orgCategory.organizationCategoryName
        }))
        console.log(data)
        return (
            <Modal
                className='Organization_Modal'
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
                                label='Parent Organizations'
                                placeholder='Parent Organizations'
                                style={{marginTop: '18px'}}
                                value={data.parentId || ''}
                                error={!!errors.parentId}
                                options={parentOrgs}
                                onChange={value =>
                                    this.setState({
                                        ...this.state,
                                        errors: {...errors, parentId: ''},
                                        data: {...data, parentId: value}
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                required
                                className='m-t-md'
                                error={!!errors.organizationCode}
                                value={data.organizationCode || ''}
                                disabled={!!data.id}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        errors: {...errors, organizationCode: ''},
                                        data: {...data, organizationCode: e.target.value}
                                    })
                                }
                                label='Organization Code'
                                placeholder='Organization Code'
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                required
                                error={!!errors.organizationName}
                                value={data.organizationName || ''}
                                label='Organization Name'
                                disabled={!!data.id}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        errors: {...errors, organizationName: ''},
                                        data: {...data, organizationName: e.target.value}
                                    })
                                }
                                placeholder='Organization Name'
                            />
                        </FormControl>
                        <FormControl>
                            <DatePicker
                                label='Founded At'
                                value={data.foundedAt || ''}
                                className='w-100 m-t-md'
                                onChange={date =>
                                    this.setState({
                                        ...this.state,
                                        data: {...data, foundedAt: date}
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <Select
                                label='Organization Categories'
                                placeholder='Organization Categories'
                                isMulti
                                className='m-t-md'
                                value={data.orgCategory || []}
                                options={orgCategoryOptions}
                                onChange={categories =>
                                    this.setState({
                                        ...this.state,
                                        data: {...data, orgCategory: categories}
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                placeholder='Descriptions'
                                value={data.organizationDescription || ''}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {...data, organizationDescription: e.target.value}
                                    })
                                }
                                label='Descriptions'
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                placeholder='Address'
                                value={data.streetAddress || ''}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {...data, streetAddress: e.target.value}
                                    })
                                }
                                label='Address'
                            />
                        </FormControl>
                    </div>
                    <div className='col-md-6'>
                        <FormControl style={{marginTop: '4px'}}>
                            <TextField
                                placeholder='Latitude'
                                type='number'
                                value={(data.coordinate && data.coordinate.latitude) || ''}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...data,
                                            coordinate: {
                                                ...data.coordinate,
                                                latitude: e.target.value
                                            }
                                        }
                                    })
                                }
                                label='Latitude'
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                placeholder='Longtitude'
                                className='m-t-md'
                                type='number'
                                value={(data.coordinate && data.coordinate.longitude) || ''}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...data,
                                            coordinate: {
                                                ...data.coordinate,
                                                longitude: e.target.value
                                            }
                                        }
                                    })
                                }
                                label='Longtitude'
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                value={data.phoneNumber || ''}
                                type='number'
                                error={!!errors.phoneNumber}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {...data, phoneNumber: e.target.value},
                                        errors: {...this.state.errors, phoneNumber: ''}
                                    })
                                }
                                placeholder='Phone Number'
                                label='Phone Number'
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                value={
                                    (data.configurations && data.configurations.smsBrandName) ||
                                    ''
                                }
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...data,
                                            configurations: {
                                                ...data.configurations,
                                                smsBrandName: e.target.value
                                            }
                                        }
                                    })
                                }
                                placeholder='SMS Brand Name'
                                label='SMS Brand Name'
                            />
                        </FormControl>
                        <FormControl>
                            <Select
                                label='First Week day'
                                className='m-t-md'
                                value={
                                    (data.configurations && data.configurations.firstWeekDay) ||
                                    ''
                                }
                                options={firstWeekDayOptions}
                                onChange={value =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...data,
                                            configurations: {
                                                ...data.configurations,
                                                firstWeekDay: value
                                            }
                                        }
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <TimePicker
                                placeholder='Open Time'
                                label='Open Time'
                                className='w-100 m-t-md'
                                value={data.openTime || ''}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {...data, openTime: e.target.value}
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <TimePicker
                                placeholder='Close Time'
                                label='Close Time'
                                className='w-100 m-t-md'
                                value={data.closeTime || ''}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {...data, closeTime: e.target.value}
                                    })
                                }
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
                                                placeholder='Secret Code'
                                                value={data.secretCode || ''}
                                                onChange={e =>
                                                    this.setState({
                                                        ...this.state,
                                                        data: {...data, secretCode: e.target.value}
                                                    })
                                                }
                                                className='m-t-md'
                                                label='Secret Code'
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <TextField
                                                placeholder='Min Time'
                                                value={
                                                    (data.algoConfig && data.algoConfig.minTime) || ''
                                                }
                                                onChange={e =>
                                                    this.setState({
                                                        ...this.state,
                                                        data: {
                                                            ...data,
                                                            algoConfig: {
                                                                ...data.algoConfig,
                                                                minTime: e.target.value
                                                            }
                                                        }
                                                    })
                                                }
                                                label='Min Time (minutes)'
                                                className='m-t-md'
                                                type='number'
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <TextField
                                                placeholder='Max Time'
                                                className='m-t-md'
                                                value={
                                                    (data.algoConfig && data.algoConfig.maxTime) || ''
                                                }
                                                onChange={e =>
                                                    this.setState({
                                                        ...this.state,
                                                        data: {
                                                            ...data,
                                                            algoConfig: {
                                                                ...data.algoConfig,
                                                                maxTime: e.target.value
                                                            }
                                                        }
                                                    })
                                                }
                                                label='Max Time (minutes)'
                                                type='number'
                                            />
                                        </FormControl>
                                        <FormGroup row className='m-t-md'>
                                            <FormLabel component='legend'>
                                                Disallow Re-submit Task
                                            </FormLabel>
                                            <FormControlLabel
                                                color='primary'
                                                value='yes'
                                                control={<Radio/>}
                                                checked={
                                                    (data.configurations &&
                                                        data.configurations.preventReSubmit) ||
                                                    false
                                                }
                                                onChange={() =>
                                                    this.setState({
                                                        ...this.state,
                                                        data: {
                                                            ...data,
                                                            configurations: {
                                                                ...data.configurations,
                                                                preventReSubmit: true
                                                            }
                                                        }
                                                    })
                                                }
                                                label='Yes'
                                            />
                                            <FormControlLabel
                                                control={<Radio/>}
                                                color='primary'
                                                value='no'
                                                label='No'
                                                checked={
                                                    (data.configurations &&
                                                        !data.configurations.preventReSubmit) ||
                                                    false
                                                }
                                                onChange={() =>
                                                    this.setState({
                                                        ...this.state,
                                                        data: {
                                                            ...data,
                                                            configurations: {
                                                                ...data.configurations,
                                                                preventReSubmit: false
                                                            }
                                                        }
                                                    })
                                                }
                                            />
                                        </FormGroup>
                                        <FormGroup row className='m-t-md'>
                                            <FormLabel component='legend'>
                                                Disallow Submit Task By
                                            </FormLabel>
                                            <FormControlLabel
                                                color='primary'
                                                value='yes'
                                                onChange={() =>
                                                    this.setState({
                                                        ...this.state,
                                                        data: {
                                                            ...data,
                                                            configurations: {
                                                                ...data.configurations,
                                                                preventSubmitOverTime: true
                                                            }
                                                        }
                                                    })
                                                }
                                                control={<Radio/>}
                                                checked={
                                                    (data.configurations &&
                                                        data.configurations.preventSubmitOverTime) ||
                                                    false
                                                }
                                                label='Date & Time'
                                            />
                                            <FormControlLabel
                                                control={<Radio/>}
                                                color='primary'
                                                checked={
                                                    (data.configurations &&
                                                        !data.configurations.preventSubmitOverTime) ||
                                                    false
                                                }
                                                value='no'
                                                onChange={() =>
                                                    this.setState({
                                                        ...this.state,
                                                        data: {
                                                            ...data,
                                                            configurations: {
                                                                ...data.configurations,
                                                                preventSubmitOverTime: false
                                                            }
                                                        }
                                                    })
                                                }
                                                className='m-r-xl'
                                                label='Date'
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className='col-md-6'>
                                        <FormGroup>
                                            <FormGroup row>
                                                <FormLabel component='legend'>
                                                    Call Center Services
                                                </FormLabel>
                                                <FormControlLabel
                                                    label='C-Call'
                                                    control={
                                                        <Checkbox color='primary' checked value='C-Call'/>
                                                    }
                                                />
                                                <FormControlLabel
                                                    label='Plivo'
                                                    control={<Checkbox color='primary' value='Plivo'/>}
                                                />
                                            </FormGroup>
                                            <FormControl>
                                                <FormLabel component='legend'>Telematics</FormLabel>
                                                <FormControlLabel
                                                    label='Telematics'
                                                    control={
                                                        <Checkbox
                                                            color='primary'
                                                            checked={
                                                                (data.configurations &&
                                                                    data.configurations.telematics) ||
                                                                false
                                                            }
                                                            onChange={() =>
                                                                this.setState({
                                                                    ...this.state,
                                                                    data: {
                                                                        ...data,
                                                                        configurations: {
                                                                            ...data.configurations,
                                                                            telematics: !data.configurations
                                                                                .telematics
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                        />
                                                    }
                                                />
                                            </FormControl>
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
                                                                    data.configurations.workingDays.indexOf(
                                                                        day.value
                                                                    ) !== -1
                                                                }
                                                                onChange={e =>
                                                                    this.setWorkingDays(e, day.value)
                                                                }
                                                            />
                                                        }
                                                    />
                                                ))}
                                            </FormGroup>
                                            <FormGroup row>
                                                <FormLabel component='legend'>Transporter</FormLabel>
                                                <FormControlLabel
                                                    color='primary'
                                                    value='yes'
                                                    control={<Radio/>}
                                                    checked
                                                    label='In-house'
                                                />
                                                <FormControlLabel
                                                    control={<Radio/>}
                                                    color='primary'
                                                    value='no'
                                                    className='m-r-xl'
                                                    label='Outsourcing'
                                                />
                                            </FormGroup>
                                        </FormGroup>
                                    </div>
                                    <div className='transportation-configurations col-md-12 m-t-md'>
                                        <h4 className='text-uppercase'>
                                            Transportation Configuration
                                        </h4>
                                        <div className='row'>
                                            {Object.keys(algoConfigList).map((config, index) => (
                                                <div className='col-md-4 col-xs-6' key={index}>
                                                    <FormControlLabel
                                                        label={algoConfigList[config].label}
                                                        key={index}
                                                        control={
                                                            <Checkbox
                                                                color='primary'
                                                                checked={
                                                                    (data.algoConfig &&
                                                                        data.algoConfig[config]) ||
                                                                    false
                                                                }
                                                                value={algoConfigList[config].value}
                                                                onChange={() =>
                                                                    this.setState({
                                                                        ...this.state,
                                                                        data: {
                                                                            ...data,
                                                                            algoConfig: {
                                                                                ...data.algoConfig,
                                                                                [config]: !data.algoConfig[config]
                                                                            }
                                                                        }
                                                                    })
                                                                }
                                                            />
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className='m-t-sm'>
                                            <span className='m-r-sm'>Need</span>
                                            <TextField
                                                className='custom_minutes'
                                                type='number'
                                                min={0}
                                                value={
                                                    (data.algoConfig && data.algoConfig.unloadMinTime) ||
                                                    0
                                                }
                                                onChange={e =>
                                                    this.setState({
                                                        ...this.state,
                                                        data: {
                                                            ...data,
                                                            algoConfig: {
                                                                ...data.algoConfig,
                                                                unloadMinTime: e.target.value
                                                            }
                                                        }
                                                    })
                                                }
                                            />
                                            <span className='m-l-sm m-r-sm'>
                        minutes for loading and unloading of packages weighing
                      </span>
                                            <TextField
                                                className='custom_kg'
                                                type='number'
                                                min={0}
                                                value={
                                                    (data.algoConfig &&
                                                        data.algoConfig.unloadMinWeight) ||
                                                    0
                                                }
                                                onChange={e =>
                                                    this.setState({
                                                        ...this.state,
                                                        data: {
                                                            ...data,
                                                            algoConfig: {
                                                                ...data.algoConfig,
                                                                unloadMinWeight: e.target.value
                                                            }
                                                        }
                                                    })
                                                }
                                            />
                                            <span className='m-l-sm'>kg</span>
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

export default OrganizationModal
