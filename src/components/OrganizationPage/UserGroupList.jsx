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

import {STATUS_LOADING,STATUS_SUCCESS} from '../../constants/Const'
import Select from '../common/Select'
import DataTable from '../common/DataTable/DataTable'
import UserGroupModal from './UserGroupModal'
import FloatingActionButton from '../common/FloatingActionButton/FloatingActionButton'
import UploadModal from '../UploadModal'
import {
    listUserGroup,
    createUserGroup,
    updateUserGroup,
    deleteUserGroup,
    listOrganization,
    uploadFileUserGroup
} from '../../actions'

class UserGroupList extends Component {
    static propTypes = {
        listUserGroupFunc: PropTypes.func.isRequired,
        createUserGroupFunc: PropTypes.func.isRequired,
        updateUserGroupFunc: PropTypes.func.isRequired,
        deleteUserGroupFunc: PropTypes.func.isRequired,
        listOrgFunc: PropTypes.func.isRequired,

        status: PropTypes.object.isRequired,
        // userGroups: PropTypes.object.isRequired,
        organizations: PropTypes.array.isRequired
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
            pageLimit: 10,
            currentPage: 0,
            checkLoad: true
        }
    }

    componentDidMount() {
        const {listOrgFunc} = this.props
        const {currentPage, pageLimit} = this.state
        this.fetchUserGroup()
        listOrgFunc({
            currentPage: currentPage,
            pageLimit: pageLimit * 100,
            orderBy: {organizationName: 1}
        })

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.status,this.state.checkLoad)
        const {status}=nextProps
        if ((this.state.checkLoad == true)&&(status.update==STATUS_SUCCESS||status.deleteUserGroup==STATUS_SUCCESS||status.create==STATUS_SUCCESS)) {
            this.setState({checkLoad: false}, () => {
                this.fetchUserGroup()
            })
        }
    }

    fetchUserGroup = () => {
        console.log('Load')
        const {listUserGroupFunc} = this.props
        const {filter, currentPage, pageLimit} = this.state
        const options = {}

        if (filter.keyword) {
            options.searchInput = filter.keyword
        }
        if (filter.organization) {
            options.organizationIds = [filter.organization]
        }
        if (pageLimit > 1) {
            options.pageLimit = pageLimit
        }
        listUserGroupFunc({
            currentPage: currentPage + 1,
            pageLimit: pageLimit,
            orderBy: {createdAt: 1},
            ...options
        })
    }

    onEditUserGroup = (userGroup = {}) => {
        this.setState({
            modal: {
                update: true,
                data: {...userGroup}
            }
        })
    }

    onDeleteUserGroup = (uId = ['']) => {
        const {deleteUserGroupFunc} = this.props
        if (uId && window.confirm('Are you sure ? ')) {
            this.setState({checkLoad:true}, () => {
                deleteUserGroupFunc({roleIds: uId})
            })
        }
    }
    onDeleteUserGroupArr = arr => {
        const {deleteUserGroupFunc} = this.props
        if (window.confirm('Are you sure ? ')) {
            var deleteArr = arr.data.map((value, index) =>
                this.props.userGroups[value.index]._id
            )
            this.setState({checkLoad: true}, () => {
                deleteUserGroupFunc({roleIds: deleteArr})
            });
        }
    }
    getActions = userGroup => (
        <React.Fragment>
            <Tooltip title='Edit'>
                <IconButton
                    size='small'
                    style={{width: '30px', height: '30px'}}
                    onClick={() => this.onEditUserGroup(userGroup)}
                >
                    <UpdateIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title='delete'>
                <IconButton
                    onClick={() => this.onDeleteUserGroup([userGroup._id])}
                    size='small'
                    style={{width: '30px', height: '30px'}}
                >
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
        </React.Fragment>
    )
    getRolesAndPerm = (perms = {}) => {
        return (
            <React.Fragment>
                <ul className='roles-and-permission'>
                    <li>
                        <span className='text-bold'>Create: </span>
                        {perms.insert && perms.insert.length
                            ? perms.insert.map(r => r).join('-')
                            : '-'}
                    </li>
                    <li>
                        <span className='text-bold'>Read: </span>
                        {perms.view && perms.view.length
                            ? perms.view.map(r => r).join('-')
                            : '-'}
                    </li>
                    <li>
                        <span className='text-bold'>Update: </span>
                        {perms.update && perms.update.length
                            ? perms.update.map(r => r).join('-')
                            : '-'}
                    </li>
                    <li>
                        <span className='text-bold'>Delete: </span>
                        {perms.delete && perms.delete
                            ? perms.delete.map(r => r).join('-')
                            : '-'}
                    </li>
                    <li>
                        <span className='text-bold'>Delete: </span>
                        {perms.view_all && perms.view_all.length
                            ? perms.view_all.map(r => r).join('-')
                            : '-'}
                    </li>
                </ul>
            </React.Fragment>
        )
    }

    render() {
        const {modal, query, filter, currentPage, pageLimit} = this.state
        const {userGroups, status, location, organizations, totalLength, updateUserGroupFunc, createUserGroupFunc} = this.props
        const orgOptions = organizations.map(org => ({
            value: org._id,
            label: org.organizationName
        }))
        const columns = [
            {name: 'Group Code', options: {filter: true}},
            {name: 'Group Name', options: {filter: true}},
            {name: 'Organizations', options: {filter: true}},
            {name: 'Roles and Permission', options: {filter: false}},
            {name: 'Actions', options: {filter: false, sort: false}}
        ]
        let dataTable = []
        if (userGroups.length > 0) {
            dataTable = userGroups.map(userGr => [
                userGr.roleGroupCode,
                userGr.roleGroupName,
                userGr.organizationId.organizationName,
                this.getRolesAndPerm(userGr.permissions[0]),
                this.getActions(userGr),
            ])
        }
        return (
            <div className='user-group-list'>
                <div className='filter-search m-t-xs m-b-md'>
                    <form onSubmit={() => this.fetchUserGroup()}>
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
                                        }, this.fetchUserGroup)
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
                                            this.fetchUserGroup
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
                            this.fetchUserGroup()
                        })
                    }
                    onChangePage={
                        number => {
                            this.setState({currentPage: number}, () => {
                                this.fetchUserGroup()
                            })
                        }
                    }
                    onRowsDelete={arr => this.onDeleteUserGroupArr(arr)}
                />
                <UploadModal
                    heading='Import User Groups'
                    open={modal.upload}
                    onClose={() => this.setState({modal: {upload: false}})}
                    onSubmit={() => console.log('import')}
                />
                {modal.update && (
                    <UserGroupModal
                        heading='Update User Group'
                        open={modal.update}
                        data={modal.data}
                        okText='Update'
                        organizations={orgOptions || []}
                        onClose={() => this.setState({modal: {update: false}})}
                        onSubmit={data => {
                            this.setState({modal: {update: false}});
                            data['roleId'] = data['_id'];
                            this.setState({checkLoad: true}, () => {
                                updateUserGroupFunc(data)
                            });
                        }
                        }
                    />
                )}
                {modal.create && (
                    <UserGroupModal
                        heading='Create User Group'
                        open={modal.create}
                        organizations={orgOptions || []}
                        okText='Create'
                        onClose={() => this.setState({modal: {create: false}})}
                        onSubmit={data => {
                            this.setState({modal: {create: false}});
                            this.setState({checkLoad:true},()=>{ createUserGroupFunc(data)});
                        }}
                    />
                )}
            </div>
        )
    }
}

export default connect(
    ({
         organization: {
             organizations,
             userGroups: {list, models, create, update, deleteUserGroup, totalLength},

         }
     }) => ({
        userGroups: list.ids.map(uId => models[uId]) || [],
        organizations:
            organizations.list.ids.map(orgId => organizations.models[orgId]) || [],
        status: {
            list: list.status || '',
            create: create.status || '',
            update: update.status || '',
            deleteUserGroup: deleteUserGroup.status || ''
        },
        totalLength
    }),
    dispatch => ({
        listUserGroupFunc: params => dispatch(listUserGroup(params)),
        createUserGroupFunc: params => dispatch(createUserGroup(params)),
        updateUserGroupFunc: params => dispatch(updateUserGroup(params)),
        deleteUserGroupFunc: uId => dispatch(deleteUserGroup(uId)),
        uploadFileUserGroup: file => dispatch(uploadFileUserGroup(file)),
        listOrgFunc: params => dispatch(listOrganization(params))
    })
)(UserGroupList)
