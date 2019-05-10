import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import queryString from 'query-string'
import {Redirect} from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import UpdateIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import RestoreIcon from '@material-ui/icons/Restore'
import TextField from '@material-ui/core/TextField'
import {STATUS_LOADING, STATUS_SUCCESS} from '../../constants/Const'
import Select from '../common/Select'
import DataTable from '../common/DataTable/DataTable'
import UserModal from './UserModal'
import FloatingActionButton from '../common/FloatingActionButton/FloatingActionButton'
import UploadModal from '../UploadModal'
import moment from 'moment'
import {
    listUser,
    createUser,
    updateUser,
    deleteUser,
    listOrganization,
    uploadFileUser,
    listUserGroup,
} from '../../actions'

class UserList extends Component {
    static propTypes = {
        listUserFunc: PropTypes.func.isRequired,
        createUserFunc: PropTypes.func.isRequired,
        updateUserFunc: PropTypes.func.isRequired,
        deleteUserFunc: PropTypes.func.isRequired,
        listOrgFunc: PropTypes.func.isRequired,
        listUserGroupFunc: PropTypes.func.isRequired,
        status: PropTypes.object.isRequired,
        // users: PropTypes.object.isRequired,
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
        const {listOrgFunc, status, listUserGroupFunc} = this.props
        const {currentPage, pageLimit} = this.state
        listOrgFunc({
            currentPage: currentPage,
            pageLimit: pageLimit * 100,
            orderBy: {organizationName: 1}
        })
        listUserGroupFunc({
            currentPage: 1,
            pageLimit: 200,
            orderBy: {createdAt: 1},
        })
    }

    componentWillReceiveProps(nextProps) {
        const {status} = nextProps
        if (status.org === STATUS_SUCCESS && this.state.checkLoad == true) {

            this.setState({checkLoad: false}, () => {
                this.fetchUser()
            })
        }
    }

    fetchUser = () => {
        const {listUserFunc, organizations} = this.props
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
        listUserFunc({
            currentPage: currentPage + 1,
            pageLimit: pageLimit,
            organizationIds: organizations.map(value => value.id),
            orderBy: {createdAt: 1},
            ...options
        })
    }

    onEditUser = (user = {}) => {
        this.setState({
            modal: {
                update: true,
                data: {...user}
            }
        })
    }

    onDeleteUserGroup = (uId = ['']) => {
        // console.log(uId)
        // const {deleteUserGroupFunc} = this.props
        // if (uId && window.confirm('Are you sure ? ')) {
        //     deleteUserGroupFunc({roleIds: uId})
        //     setTimeout(() => {
        //         this.fetchUser()
        //     }, 500)
        // }
    }
    onDeleteUserGroupArr = arr => {
        const {deleteUserGroupFunc} = this.props
        if (window.confirm('Are you sure ? ')) {
            var deleteArr = arr.data.map((value, index) =>
                this.props.users[value.index]._id
            )
            deleteUserGroupFunc({roleIds: deleteArr})
            this.setState({checkLoad: true})
        }
    }
    getActions = user => (
        <React.Fragment>
            <Tooltip title='Edit'>
                <IconButton
                    size='small'
                    style={{width: '30px', height: '30px'}}
                    onClick={() => this.onEditUser(user)}
                >
                    <UpdateIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title='delete'>
                <IconButton
                    onClick={() => this.onDeleteUserGroup([user._id])}
                    size='small'
                    style={{width: '30px', height: '30px'}}
                >
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title='Reset Password'>
                <IconButton
                    onClick={() => this.onDeleteUserGroup([user._id])}
                    size='small'
                    style={{width: '30px', height: '30px'}}
                >
                    <RestoreIcon/>
                </IconButton>
            </Tooltip>
        </React.Fragment>
    )
    getGroup = (user = {}) => {
        return (
            <React.Fragment>
                <ul className='roles-and-permission'>{
                    user.roleIds.map((value, index) =>
                        <li key={index}>
                            <span className='text-bold'>
                            {value.roleGroupName}
                            </span>
                        </li>)
                }
                </ul>
            </React.Fragment>
        )
    }

    render() {
        const {modal, query, filter, currentPage, pageLimit} = this.state
        const {users, status, location, organizations, rolesList, totalLength, updateUserFunc, createUserFunc} = this.props
        const orgOptions = organizations.map(org => ({
            value: org._id,
            label: org.organizationName
        }))
        const columns = [
            {name: 'UserName', options: {filter: true}},
            {name: 'Name', options: {filter: true}},
            {name: 'Email', options: {filter: true}},
            {name: 'Created at', options: {filter: false}},
            {name: 'Groups', options: {filter: false, sort: false}},
            {name: 'Edit', options: {filter: false, sort: false, width: '15%'}}
        ]
        let dataTable = []
        if (users.length > 0) {
            dataTable = users.map(user => [
                user.username,
                user.displayName,
                user.email,
                // user.createdAt,
                new moment(user.createdAt).format("YYYY-MM-DD  LTS (Z)").toString(),
                this.getGroup(user),
                this.getActions(user),
            ])
        }
        console.log(users)
        return (
            <div className='user-group-list'>
                <div className='filter-search m-t-xs m-b-md'>
                    <form onSubmit={() => this.fetchUser()}>
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
                                        }, this.fetchUser)
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
                                            this.fetchUser
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
                            this.fetchUser()
                        })
                    }
                    onChangePage={
                        number => {
                            this.setState({currentPage: number}, () => {
                                this.fetchUser()
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
                    <UserModal
                        heading='Update User Group'
                        open={modal.update}
                        data={modal.data}
                        roles={rolesList.map((value) => {
                            return {value: value.organizationId._id, label: value.roleGroupName+"("+value.organizationId.organizationName+")"}
                        })}
                        okText='Update'
                        organizations={orgOptions || []}
                        onClose={() => this.setState({modal: {update: false}})}
                        onSubmit={data => {
                            console.log(data)
                        }
                        }
                    />
                )}
                {modal.create && (
                    <UserModal
                        heading='Create User Group'
                        open={modal.create}
                        organizations={orgOptions || []}
                        okText='Create'
                        roles={rolesList.map((value) => {
                            return {value: value.organizationId._id, label: value.roleGroupName+"("+value.organizationId.organizationName+")"}
                        })}
                        onClose={() => this.setState({modal: {create: false}})}
                        onSubmit={data => {
                            console.log(data)
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
             users: {list, models, create, update, deleteUser, totalLength},
             userGroups,
         }
     }) => ({
        users: list.ids.map(uId => models[uId]) || [],
        organizations:
            organizations.list.ids.map(orgId => organizations.models[orgId]) || [],
        status: {
            list: list.status || '',
            create: create.status || '',
            update: update.status || '',
            deleteUser: deleteUser.status || '',
            org: organizations.list.status
        },
        rolesList: userGroups.list.ids.map(uId => userGroups.models[uId]),
        totalLength
    }),
    dispatch => ({
        listUserGroupFunc: params => dispatch(listUserGroup(params)),
        listUserFunc: params => dispatch(listUser(params)),
        createUserFunc: params => dispatch(createUser(params)),
        updateUserFunc: params => dispatch(updateUser(params)),
        deleteUserFunc: uId => dispatch(deleteUser(uId)),
        uploadFileGroup: file => dispatch(uploadFileUser(file)),
        listOrgFunc: params => dispatch(listOrganization(params))
    })
)(UserList)
