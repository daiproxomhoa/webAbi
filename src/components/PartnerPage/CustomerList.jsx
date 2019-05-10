import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import queryString from 'query-string'
import {Redirect} from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import UpdateIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField'

import {STATUS_LOADING, STATUS_SUCCESS} from '../../constants/Const'
import Select from '../common/Select'
import DataTable from '../common/DataTable/DataTable'
import FloatingActionButton from '../common/FloatingActionButton/FloatingActionButton'
import UploadModal from '../UploadModal'
import {
    listOrganization,
    listPartner,
    listCustomerGroup
} from '../../actions'
import {getCookie} from "../../util/helpers";
import OrganizationModal from "../OrganizationPage/OrganizationModal";
import CustomerModal from "./CustomerModal";
import UserModal from "../OrganizationPage/UserModal";

class CustomerList extends Component {
    static propTypes = {
        listPartnerFunc: PropTypes.func.isRequired,
        // createUserGroupFunc: PropTypes.func.isRequired,
        // updateUserGroupFunc: PropTypes.func.isRequired,
        // deleteUserGroupFunc: PropTypes.func.isRequired,
        // listOrgFunc: PropTypes.func.isRequired,
        //
        // status: PropTypes.object.isRequired,
        // // partnerList: PropTypes.object.isRequired,
        // organizations: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            modal: {
                create: false,
                update: false,
                deleteUserGroup: false,
                upload: false,
                data: {}
            },
            filter: {
                keyword: '',
                organization: ''
            },
            user: JSON.parse(getCookie('user')),
            pageLimit: 10,
            currentPage: 0,
            checkLoad: true,
            st: ''
        }
    }

    componentDidMount() {
        const {listOrgFunc,listCustomerGroupFunc} = this.props
        const {currentPage, pageLimit, user} = this.state
        this.fetchCustomer()
        listOrgFunc({
            currentPage: currentPage,
            pageLimit: pageLimit * 100,
            orderBy: {organizationName: 1},
        })
        listCustomerGroupFunc({
            currentPage: 1,
            organizationIds: user.organizationIds,
            pageLimit: 1000
        },'all')

    }

    componentWillReceiveProps(nextProps) {
        const {st, checkLoad} = this.state
        const {status, user} = nextProps
        console.log(user)
        if ((checkLoad == true) && status[st] == STATUS_SUCCESS) {
            this.setState({checkLoad: false}, () => {
                this.fetchCustomer()
            })
        }
    }

    fetchCustomer = () => {
        console.log('Load')
        const {listPartnerFunc} = this.props
        const {filter, currentPage, pageLimit, user} = this.state
        const options = {}

        if (filter.keyword) {
            options.searchInput = filter.keyword
        }
        if (filter.organization) {
            options.organizationIds = [filter.organization]
        }
        if(filter.customerGroup) {
            if (Object.keys(filter.customerGroup).length > 1) {
                options.customerGroup = filter.customerGroup
            }
        }
        if (pageLimit > 1) {
            options.pageLimit = pageLimit
        }
        listPartnerFunc({
            currentPage: currentPage + 1,
            pageLimit: pageLimit,
            orderBy: {createdAt: 1},
            organizationIds: user.organizationIds,
            ...options
        })
    }

    onEditPartner = (value = {}) => {
        this.setState({
            modal: {
                update: true,
                data: {...value}
            }
        })
    }

    onDeletePartner = (uId = ['']) => {
        const {deleteUserGroupFunc} = this.props
        if (uId && window.confirm('Are you sure ? ')) {
            this.setState({checkLoad: true, st: 'deletePartner'}, () => {
                deleteUserGroupFunc({roleIds: uId})
            })
        }
    }
    onDeletePartnerArr = arr => {
        const {deleteUserGroupFunc} = this.props
        if (window.confirm('Are you sure ? ')) {
            // var deleteArr = arr.data.map((value, index) =>
            //     this.props.partnerList[value.index]._id
            // )
            // this.setState({checkLoad: true, st: 'deleteUserGroup'}, () => {
            //     deleteUserGroupFunc({roleIds: deleteArr})
            // });
        }
    }
    getActions = valueoup => (
        <React.Fragment>
            <Tooltip title='Edit'>
                <IconButton
                    size='small'
                    style={{maxWidth: '30px', height: '30px'}}
                    onClick={() => this.onEditPartner(valueoup)}
                >
                    <UpdateIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title='delete'>
                <IconButton
                    onClick={() => this.onDeletePartner([valueoup._id])}
                    size='small'
                    style={{maxWidth: '30px', height: '30px'}}
                >
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
        </React.Fragment>
    )

    render() {
        const {modal, query, filter, currentPage, pageLimit} = this.state
        const {partnerList, status, location, organizations, totalLength,customerGroup} = this.props
        const orgOptions = organizations.map(org => ({
            value: org._id,
            label: org.organizationName
        }))
        const customerGroupOptions= customerGroup.map(org => ({
            value: org._id,
            label: org.groupName
        })).reverse()
        const columns = [
            {name: 'Customer Code', options: {filter: true, styles: {maxWidth: '10'}}},
            {name: 'Customer Name', options: {filter: true}},
            {name: 'Email', options: {filter: false, sort: false}},
            {name: 'Mobile Mumber', options: {filter: false, sort: false}},
            {name: 'Customer Group', options: {filter: false, sort: false}},
            {name: 'Province'},
            {name: 'Address', options: {filter: false, sort: false}},
            {name: 'Option', options: {filter: false, sort: false}}
        ]
        let dataTable = []
        if (partnerList.length > 0) {
            dataTable = partnerList.map(value => [
                value.customerCode,
                value.fullName,
                value.email,
                value.mobileNumber,
                (value.groupIds[0] ? value.groupIds[0].groupName : ''),
                (value.cityId ? value.cityId.cityName : ''),
                value.streetAddress,
                this.getActions(value)
            ])
        }
        console.log(modal.data)
        return (
            <div className='user-group-list'>
                <div className='filter-search m-t-xs m-b-md'>
                    <form onSubmit={() => this.fetchCustomer()}>
                        <div className='row'>
                            <div className='col-md-2 col-sm-4 earch'>
                                <TextField
                                    placeholder='Search User Group'
                                    className='w-100'
                                    style={{marginTop: '4px'}}
                                    value={filter.keyword || ''}
                                    onChange={e =>
                                        this.setState({
                                            ...this.state,
                                            filter: {
                                                ...filter,
                                                keyword: e.target.value
                                            }
                                        }, this.fetchCustomer)
                                    }
                                />
                            </div>
                            <div className='col-md-2 col-sm-4 filter-organization'>
                                <Select
                                    placeholder='Organizations'
                                    value={filter.organization || ''}
                                    options={orgOptions}
                                    onChange={value =>
                                        this.setState(
                                            ...this.state,
                                            {
                                                filter: {
                                                    ...filter,
                                                    organization: value
                                                }
                                            },
                                            this.fetchCustomer
                                        )
                                    }
                                />
                            </div>
                            <div className='col-md-2 col-sm-4 filter-organization'>
                                <Select
                                    isMulti={true}
                                    placeholder='Customer group'
                                    value={filter.customerGroup || ''}
                                    options={customerGroupOptions}
                                    onChange={value =>
                                        this.setState(
                                            ...this.state,
                                            {
                                                filter: {
                                                    ...filter,
                                                    customerGroup: value
                                                }
                                            },
                                            this.fetchCustomer
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <button style={{display: 'none'}}/>
                    </form>
                </div>
                <div className='floating-action-button'>
                    <FloatingActionButton>
                        <FloatingActionButton.FloatingMenuItem
                            icon='edit'
                            label='Create'
                            onClick={() => this.setState({modal: {create: true}})}
                        />
                        <FloatingActionButton.FloatingMenuItem
                            icon='upload'
                            label='Import'
                            onClick={() => this.setState({modal: {upload: true}})}
                        />
                    </FloatingActionButton>
                </div>
                <DataTable
                    count={totalLength}
                    page={currentPage}
                    serverSide={true}
                    rowsPerPage={pageLimit}
                    columns={columns}
                    data={dataTable}
                    // loading={status.list === STATUS_LOADING}
                    onChangeRowsPerPage={number =>
                        this.setState({pageLimit: number}, () => {
                            this.fetchCustomer()
                        })
                    }
                    onChangePage={
                        number => {
                            this.setState({currentPage: number}, () => {
                                this.fetchCustomer()
                            })
                        }
                    }
                    onRowsDelete={arr => this.onDeletePartnerArr(arr)}
                />
                {modal.create && (
                    <CustomerModal
                        heading='Create Organization'
                        open={modal.create}
                        organizations={organizations}
                        // parentOrgs={prOrgs}
                        okText='Create'
                        onClose={() => this.setState({modal: {create: false}})}
                        onSubmit={org =>
                            console.log(org)
                        }
                    />
                )}{modal.update && (
                <CustomerModal
                    heading='Update Organization'
                    open={modal.update}
                    organizations={orgOptions}
                    data={modal.data}
                    okText='Update'
                    onClose={() => this.setState({modal: {update: false}})}
                    onSubmit={data => {
                        console.log(data)
                    }
                    }
                />
            )}
                <UploadModal
                    heading='Import User Groups'
                    open={modal.upload}
                    onClose={() => this.setState({modal: {upload: false}})}
                    onSubmit={() => console.log('import')}
                />

            </div>
        )
    }
}

export default connect(
    ({
         partner: {
             partners: {list, models, create, update, deletePartner, totalLength},
             customerGroup: {list_all},
         },
         organization: {
             organizations
         },

         auth: {
             user
         }
     }) => ({
        partnerList: list.data || [],
        organizations:
            organizations.list.ids.map(orgId => organizations.models[orgId]) || [],
        status: {
            list: list.status || '',
            create: create.status || '',
            update: update.status || '',
            deletePartner: deletePartner.status || ''
        },
        user,
        customerGroup: list_all,
        totalLength
    }),
    dispatch => ({
        listPartnerFunc: params => dispatch(listPartner(params)),
        listOrgFunc: params => dispatch(listOrganization(params)),
        listCustomerGroupFunc: (params, option) => dispatch(listCustomerGroup(params, option))
    })
)(CustomerList)
