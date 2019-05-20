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
    listCustomerGroup,
    updateCustomerGroup,
    createCustomerGroup, readCustomerGroup
} from '../../actions'
import {getCookie} from "../../util/helpers";
import OrganizationModal from "../OrganizationPage/OrganizationModal";
import CustomerGroupModal from "./CustomerGroupModal";
import UserModal from "../OrganizationPage/UserModal";

class CustomerGroup extends Component {
    static propTypes = {
        // listGroupFunc: PropTypes.func.isRequired,
        // createUserGroupFunc: PropTypes.func.isRequired,
        // updateUserGroupFunc: PropTypes.func.isRequired,
        // deleteUserGroupFunc: PropTypes.func.isRequired,
        // listOrgFunc: PropTypes.func.isRequired,
        //
        // status: PropTypes.object.isRequired,
        // // customerGroupList: PropTypes.object.isRequired,
        // organizations: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props)
        const user = JSON.parse(getCookie('user'));
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
                organization: user.organizationIds || ''
            },
            user: user || {},
            pageLimit: 10,
            currentPage: 0,
            checkLoad: true,
            st: ''
        }
    }

    componentDidMount() {
        const {listOrgFunc, listCustomerGroupFunc} = this.props
        const {currentPage, pageLimit, user} = this.state
        this.fetchCustomerGroup()
        listOrgFunc({
            categoryCodes: ['DEPOT', 'SUN', 'XDOCK']
        })
        listCustomerGroupFunc({
            currentPage: currentPage + 1,
            organizationIds: user.organizationIds,
            pageLimit: pageLimit
        }, 'all')

    }

    componentWillReceiveProps(nextProps) {
        const {st, checkLoad} = this.state
        const {status, user} = nextProps
        if ((checkLoad == true) && status[st] == STATUS_SUCCESS) {
            this.setState({checkLoad: false}, () => {
                this.fetchCustomerGroup()
            })
        }
    }

    fetchCustomerGroup = () => {
        const {listCustomerGroupFunc} = this.props
        const {filter, currentPage, pageLimit, user} = this.state
        const options = {}

        if (filter.keyword) {
            options.searchInput = filter.keyword
        }
        if (filter.organization) {
            options.organizationIds = [filter.organization]
        } else {
            options.organizationIds = user.organizationIds
        }
        if (filter.customerGroup) {
            if (Object.keys(filter.customerGroup).length > 0 && filter.customerGroup[0] != "") {
                options.customerGroup = filter.customerGroup
            }
        }
        if (pageLimit > 1) {
            options.pageLimit = pageLimit
        }
        listCustomerGroupFunc({
            currentPage: currentPage + 1,
            pageLimit: pageLimit,
            orderBy: {createdAt: 1},
            ...options
        }, 'all')
    }

    onEditGroup = (value = {}) => {
        const {readCustomerGroupFunc, listCustomerGroupFunc} = this.props
        readCustomerGroupFunc({_id: value._id})
        listCustomerGroupFunc({
            currentPage: 1,
            organizationIds: [value.organizationId._id],
            pageLimit: 1000
        }, 'single')
        this.setState({
            modal: {
                update: true,
                data: value
            }
        })
    }

    onDeleteGroup = (value = ['']) => {
        const {deleteGroupFunc} = this.props
        if (value && window.confirm('Are you sure ? ')) {
            this.setState({modal: {update: false}, checkLoad: true, st: 'deleteGroup'}, () => {
                deleteGroupFunc({
                    customerType: 0,
                    ids: [value]
                })
            })
        }
    }
    onDeleteGroupArr = arr => {
        const {deleteGroupFunc} = this.props
        if (window.confirm('Are you sure ? ')) {
            var deleteArr = arr.data.map((value, index) =>
                this.props.customerGroupList[value.index]._id
            )
            this.setState({checkLoad: true, st: 'deleteGroup'}, () => {
                deleteGroupFunc({
                    customerType: 0,
                    ids: deleteArr
                })
            });
        }
    }
    getActions = value => (
        <React.Fragment>
            <Tooltip title='Edit'>
                <IconButton
                    size='small'
                    style={{maxWidth: '30px', height: '30px'}}
                    onClick={() => this.onEditGroup(value)}
                >
                    <UpdateIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title='delete'>
                <IconButton
                    onClick={() => this.onDeleteGroup([value._id])}
                    size='small'
                    style={{maxWidth: '30px', height: '30px'}}
                >
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
        </React.Fragment>
    )

    render() {
        const {modal, query, filter, currentPage, pageLimit,user} = this.state
        const {customerGroupList, listCustomerGroupFunc, status, location, organizations, totalLength, updateCustomerGroupFunc, createCustomerGroupFunc} = this.props
        const orgOptions = organizations.map(org => ({
            value: org._id,
            label: org.organizationName
        }))
        const columns = [
            {name: 'Group Code', options: {filter: true, styles: {maxWidth: '10'}}},
            {name: 'Group Parent', options: {filter: true}},
            {name: 'Group Name', options: {filter: false, sort: false}},
            {name: 'Group description', options: {filter: false, sort: false}},
            {name: 'Option', options: {filter: false, sort: false}}
        ]
        let dataTable = []
        if (customerGroupList.length > 0) {
            dataTable = customerGroupList.map(value => [
                value.groupCode,
                (value.parentId ? value.parentId.groupName : ''),
                value.groupName,
                value.groupDes,
                this.getActions(value)
            ])
        }
        return (
            <div className='user-group-list'>
                <div className='filter-search m-t-xs m-b-md'>
                    <form onSubmit={() => this.fetchCustomerGroup()}>
                        <div className='row'>
                            <div className='col-md-2 col-sm-4 earch'>
                                <TextField
                                    placeholder='Search customer Group'
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
                                        }, this.fetchCustomerGroup)
                                    }
                                />
                            </div>
                            <div className='col-md-2 col-sm-4 filter-organization'>
                                <Select
                                    placeholder='Organizations'
                                    value={filter.organization || ''}
                                    options={orgOptions || ''}
                                    onChange={value =>
                                        this.setState(
                                            ...this.state,
                                            {
                                                filter: {
                                                    ...filter,
                                                    organization: value
                                                }
                                            },
                                            this.fetchCustomerGroup
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
                            onClick={() => {
                                listCustomerGroupFunc({
                                    currentPage: 1,
                                    organizationIds: [],
                                    pageLimit: 1000
                                }, 'single')
                                this.setState({modal: {create: true}})
                            }}
                        />
                        <FloatingActionButton.FloatingMenuItem
                            icon='upload'
                            label='Import'
                            onClick={() => {
                                this.setState({modal: {upload: true}})
                            }
                            }
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
                            this.fetchCustomerGroup()
                        })
                    }
                    onChangePage={
                        number => {
                            this.setState({currentPage: number}, () => {
                                this.fetchCustomerGroup()
                            })
                        }
                    }
                    onRowsDelete={arr => this.onDeleteGroupArr(arr)}
                />
                {modal.create && (
                    <CustomerGroupModal
                        heading='Create Organization'
                        open={modal.create}
                        create={true}
                        okText='Create'
                        onClose={() => this.setState({modal: {create: false}})}
                        onSubmit={data =>
                            this.setState({modal: {update: false}, checkLoad: true, st: 'create'}, () => {
                                createCustomerGroupFunc(data)
                            })
                        }
                    />
                )}{modal.update && (
                <CustomerGroupModal
                    heading='Update Organization'
                    open={modal.update}
                    create={false}
                    okText='Update'
                    onClose={() => this.setState({modal: {update: false}})}
                    onSubmit={data => {
                        this.setState({modal: {update: false}, checkLoad: true, st: 'update'}, () => {
                            updateCustomerGroupFunc(data)
                        })
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
             customerGroup: {list, create, update, deleteCustomerGroup,totalLength},
         },
         organization: {
             organizations
         },
         auth: {
             user
         }
     }) => ({
        customerGroupList: list.data || [],
        organizations:
            organizations.list.ids.map(orgId => organizations.models[orgId]) || [],
        status: {
            list: list.status || '',
            create: create.status || '',
            update: update.status || '',
            deleteCustomerGroup: deleteCustomerGroup.status || ''
        },
        user,
        totalLength
    }),
    dispatch => ({
        listOrgFunc: params => dispatch(listOrganization(params)),
        listCustomerGroupFunc: (params, option) => dispatch(listCustomerGroup(params, option)),
        readCustomerGroupFunc: (params) => dispatch(readCustomerGroup(params)),
        updateCustomerGroupFunc: (params) => dispatch(updateCustomerGroup(params)),
        createCustomerGroupFunc: (params) => dispatch(createCustomerGroup(params))
    })
)(CustomerGroup)
