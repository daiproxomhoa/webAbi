import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'

import Select from '../common/Select/Select'
import Modal from '../common/Modal/Modal'
import {connect} from "react-redux";
import classnames from "classnames";
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {NotificationManager} from "react-notifications";
import {STATUS_SUCCESS} from "../../constants/Const";
import {listCustomerGroup, listOrganization} from "../../actions";


const INIT_DATA = {
    associatedGroups: [],
    config: {selectTable: true},
    groupCode: "",
    groupDes: "",
    groupName: "",
    lastUpdatedAt: "",
    organizationId: null,
    updatedAt: "",
    selfAssociated: false
}

class CustomerGroupModal extends Component {
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
            errors: {}

        }
    }

    componentDidMount() {
        // const {readCustomerGroupFunc, id} = this.props
        // this.fetchGroup();
        // if (id) {
        //     readCustomerGroupFunc({_id: id})
        // }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if ((nextProps.open !== prevState.open) && nextProps.status == STATUS_SUCCESS && nextProps.create !== true) {
            return {
                ...prevState,
                data: nextProps.data ? {
                    ...nextProps.data,
                    parentId: (nextProps.data.parentId ? nextProps.data.parentId._id : null)
                } : prevState.data,
                open: nextProps.open,
            }
        }
        return null
    }


    fetchGroup = (orgId) => {
        const {listCustomerGroupFunc} = this.props
        listCustomerGroupFunc({
            currentPage: 1,
            organizationIds: [orgId || ''],
            pageLimit: 1000
        }, 'single')
    }
    submit = () => {
        const {data} = this.state
        const {onSubmit} = this.props
        var temp = data;
        const errors = {}
        if (!temp.groupCode) {
            errors.groupCode = 'Please enter groupCode'
        }
        if (!temp.groupName) {
            errors.groupName = 'Please enter groupName'
        }
        for (var e in errors) {
            NotificationManager.warning(errors[e], 'Warning', 4000);
        }
        this.setState({errors})
        if (Object.keys(errors).length > 0) {
            return
        }
        if (!this.props.id) {
            delete temp._id
            delete temp.selfAssociated
        }
        onSubmit(temp)
    }

    render() {
        const {onClose, heading, organizations, customerGroupList, classes, open, create} = this.props
        const {moreConfig, data, errors} = this.state
        const customerGroupOptions = customerGroupList.map(e => ({
            value: e._id,
            label: e.groupName
        }))
        const orgOptions = organizations.map(org => ({
            value: org._id,
            label: org.organizationName
        }))
        return (
            <Modal
                className='Partner_Modal'
                open={open}
                size='lg'
                onClose={() => onClose()}
                onSubmit={() => this.submit()}
                heading={heading}
                loading="false"
            >
                <div className='main-information row'>
                    <div className='col-md-12'>
                        {create &&
                        (<FormControl>
                            <Select
                                placeholder='Organization'
                                style={{marginTop: '15px'}}
                                options={orgOptions}
                                onChange={value =>
                                    this.setState(
                                        {
                                            data: {
                                                ...data,
                                                organizationId: value
                                            }
                                        }, () => {
                                            this.fetchGroup(value)
                                        }
                                    )
                                }
                            />
                        </FormControl>)
                        }
                        <FormControl fullWidth>
                            <Select
                                placeholder='Group parent'
                                label='Group parent'
                                value={data.parentId || ''}
                                style={{marginTop: '15px'}}
                                options={customerGroupOptions}
                                onChange={value => {
                                    this.setState(
                                        {
                                            data: {
                                                ...data,
                                                parentId: (value == '' ? null : value)
                                            }
                                        },
                                    )
                                }
                                }
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <Select
                                isMulti={true}
                                placeholder='Associated Groups'
                                style={{marginTop: '15px'}}
                                value={data.associatedGroups || ''}
                                options={customerGroupOptions}
                                onChange={value =>
                                    this.setState(
                                        {
                                            data: {
                                                ...data,
                                                associatedGroups: (value == '' ? null : value)
                                            }
                                        },
                                    )
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                label='Group Code'
                                placeholder='Group Code'
                                value={data.groupCode || ''}
                                error={!!errors.groupCode}
                                onChange={(e) => {
                                    this.setState({
                                        data: {
                                            ...data,
                                            groupCode: e.target.value
                                        }
                                    })
                                }}
                            />
                        </FormControl>{
                        create &&
                        <FormControl>
                            <FormControlLabel
                                label='Self-associated'
                                style={{marginBottom: 0}}
                                control={
                                    <Checkbox
                                        color='primary'
                                        onChange={e => this.setState({
                                            data: {
                                                ...data,

                                                selfAssociated: !data.selfAssociated

                                            }
                                        })}
                                    />}
                            />

                        </FormControl>
                    }
                        < FormControl>
                            < TextField
                                label='Group Name'
                                placeholder='Group Name'
                                value={data.groupName || ''}
                                error={!!errors.groupName}
                                onChange={(e) => {
                                    this.setState({
                                        data: {
                                            ...data,
                                            groupName: e.target.value
                                        }
                                    })
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                label='Group description'
                                placeholder='Group description'
                                value={data.groupDes || ''}
                                onChange={(e) => {
                                    this.setState({
                                        data: {
                                            ...data,
                                            groupDes: e.target.value
                                        }
                                    })
                                }}
                            />
                        </FormControl>

                        <FormControl>
                            <h1 style={{marginTop: 15}}>
                                CONFIGURATION
                            </h1>
                            <FormControlLabel
                                label='Select Table'
                                style={{marginBottom: 0}}
                                control={
                                    <Checkbox
                                        color='primary'
                                        checked={(data.config ? data.config.selectTable : '')}
                                        onChange={e => this.setState({
                                            data: {
                                                ...data,
                                                config: {
                                                    ...data.config,
                                                    selectTable: !data.config.selectTable
                                                }
                                            }
                                        })}
                                    />}
                            />
                        </FormControl>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default connect(
    ({
         partner: {
             customerGroup: {list, read},
         },
         organization: {
             organizations,
         }
     }
    ) =>
        ({
            customerGroupList: list.data_single || [],
            data: read.data,
            status: read.status,
            organizations:
                organizations.list.ids.map(orgId => organizations.models[orgId]) || [],
        }),
    dispatch => ({
        listCustomerGroupFunc: (params, option) => dispatch(listCustomerGroup(params, option)),
    })
)(CustomerGroupModal)
