import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import UpdateIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {Badge} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import queryString from 'query-string'

import Select from '../common/Select'
import UploadModal from '../UploadModal'
import DataTable from '../common/DataTable/DataTable'
import OrganizationModal from './OrganizationModal'
import FloatingActionButton from '../common/FloatingActionButton/FloatingActionButton'
import {STATUS_SUCCESS, STATUS_LOADING} from '../../constants/Const'
import GoogleMapReact from 'google-map-react';

import {
    listOrganization,
    createOrganization,
    deleteOrganization,
    updateOrganization,
    listParentOrganization,
    listOrgCategory,
    uploadFileOrg,
    downloadFileOrgSample
} from '../../actions'

class OrganizationList extends Component {
    static propTypes = {
        listOrgFunc: PropTypes.func.isRequired,
        listParentOrgFunc: PropTypes.func.isRequired,
        createOrgFunc: PropTypes.func.isRequired,
        updateOrgFunc: PropTypes.func.isRequired,
        deleteOrgFunc: PropTypes.func.isRequired,
        listOrgCategoryFunc: PropTypes.func.isRequired,
        uploadFileOrgFunc: PropTypes.func.isRequired,
        downloadFileOrgSampleFunc: PropTypes.func.isRequired,

        parentOrgs: PropTypes.array.isRequired,
        organizations: PropTypes.array.isRequired,
        create: PropTypes.object.isRequired,
        update: PropTypes.object.isRequired,
        orgCategories: PropTypes.array.isRequired,
        status: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            modal: {
                create: false,
                update: false,
                upload: false,
                data: {}
            },
            filter: {
                keyword: '',
                orgCategory: [],
                parentOrg: []
            },
            pageLimit: 10,
            currentPage: 0,
            checkLoad: true,
            st:''
        }
    }

    componentDidMount() {
        const {listOrgCategoryFunc, listParentOrgFunc} = this.props
        listOrgCategoryFunc()
        listParentOrgFunc()
        this.fetch()
    }

    componentWillReceiveProps(nextProps) {
        const {status} = nextProps
        const {st,checkLoad} = this.state
        console.log(status,checkLoad,st)
        if ( checkLoad == true && status[st]!==STATUS_LOADING) {

            this.setState({checkLoad: false}, () => {
                this.fetch()
            })
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (
    //         nextProps.status.upload !== prevState.modal.upload &&
    //         nextProps.status.upload === STATUS_SUCCESS
    //     ) {
    //         return {...prevState, modal: {upload: false}}
    //     }
    //     return null
    // }

    fetch = () => {
        console.log('LOAD')
        const {listOrgFunc} = this.props
        const {filter, pageLimit, currentPage} = this.state
        const options = {}
        if (filter.keyword) {
            options.searchInput = filter.keyword
        }
        if (filter.orgCategory) {
            options.categoryIds = filter.orgCategory
        }
        if (filter.parentOrg) {
            options.parent = filter.parentOrg
        }
        if (pageLimit > 1) {
            options.pageLimit = pageLimit
        }
        listOrgFunc({
            currentPage: currentPage + 1,
            orderBy: {createdAt: 1},
            ...options
        })
    }
    applyFilter = () => {
        const {filter, pageLimit} = this.state
        const query = {}
        if (filter.keyword) {
            query.keyword = filter.keyword
        }
        if (filter.orgCategory) {
            query.orgCategory = filter.orgCategory
        }
        if (filter.parentOrg) {
            query.parentOrg = filter.parentOrg
        }
        this.setState({query, pageLimit})
    }
    onEditOrganization = org => {
        this.setState({
            modal: {
                update: true,
                data: {...org}
            }
        })
    }
    onDeleteOrganization = orgId => {
        const {deleteOrgFunc} = this.props
        if (window.confirm('Are you sure ? ')) {
            this.setState({checkLoad: true,st:'deleteOrg'}, () => {
                deleteOrgFunc({organizationIds: [orgId]})
            })
        }
    }
    onDeleteOrganizationArr = arr => {
        const {deleteOrgFunc} = this.props
        if (window.confirm('Are you sure ? ')) {
            var deleteArr = arr.data.map((value, index) =>
                this.props.organizations[value.index].id
            )
            this.setState({checkLoad: true,st:'deleteOrg'}, () => {
                deleteOrgFunc({organizationIds: deleteArr})
            })
        }
    }

    render() {
        const {modal, filter, currentPage, pageLimit} = this.state
        const {
            organizations,
            orgCategories,
            updateOrgFunc,
            createOrgFunc,
            uploadFileOrgFunc,
            status,
            location,
            totalLength,
            list
        } = this.props
        const orgCategoryOptions = orgCategories.map(category => ({
            value: category._id,
            label: category.organizationCategoryName
        }))
        var parentOrgs = organizations.map(org => ({
            value: org._id,
            label: org.organizationName
        }))
        parentOrgs = getUnique(parentOrgs, 'value');
        const columns = [
            {name: 'Organization Code', options: {filter: false, sort: true}},
            {name: 'Organization Name', options: {filter: true, sort: true}},
            {
                name: 'Organization Categories',
                options: {
                    sort: true,
                    filter: true,
                    // filterList: ['Branch'],
                    // customFilterListRender: v => `Organization Categories: ${v}`,
                    // filterOptions:['Branch','Transpoter']
                }
            },
            {name: 'Parent Organizations', options: {filter: true, sort: true}},
            {name: 'Actions', options: {filter: false, sort: false}}
        ]
        const getOrgCategory = (categories, index) => {
            return (
                <div className='text-uppercase' key={index}>
                    {categories.length &&
                    categories.map((item, index1) => (
                        <Badge color='primary' key={index1} title={item.organizationCategoryName}>
                            {item.organizationCategoryName}
                        </Badge>
                    ))}
                </div>
            )
        }

        let dataTable = []
        if (organizations.length) {
            dataTable = organizations.map((org, index) => [
                org.organizationCode || '-',
                org.organizationName || '-',
                getOrgCategory(org.orgCategory, index) || '-',
                org.parentId ? org.parentId.organizationName : '-',
                <div>
                    <Tooltip title='Edit'>
                        <IconButton
                            size='small'
                            style={{width: '30px', height: '30px'}}
                            onClick={() => this.onEditOrganization(org)}
                        >
                            <UpdateIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton
                            onClick={() => this.onDeleteOrganization(org.id)}
                            size='small'
                            style={{width: '30px', height: '30px'}}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            ])
        }
        return (
            <div className='organization-list'>
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
                <div className='filter-search m-t-xs m-b-md'>
                    <form onSubmit={() => this.applyFilter()}>
                        <div className='row'>
                            <div className='col-md-3 col-sm-3 earch'>
                                <TextField
                                    placeholder='Search organization'
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
                                            }, () => {
                                                this.fetch()
                                            }
                                        )
                                    }
                                />
                            </div>
                            <div className='col-md-3 col-sm-3'>
                                <Select
                                    placeholder='Organization Category'
                                    value={filter.orgCategory || ''}
                                    options={orgCategoryOptions}
                                    isMulti={true}
                                    onChange={(value, key) => {
                                        console.log(value, orgCategoryOptions)
                                        this.setState(
                                            {
                                                filter: {
                                                    ...filter,
                                                    orgCategory: (value[0] != "" ? value : null)
                                                }
                                            }, () => {
                                                this.fetch()
                                            }
                                        )
                                    }}
                                />

                            </div>
                            <div className='col-md-3 col-sm-3'>
                                <Select
                                    placeholder='Parent Organization'
                                    value={filter.parentOrg || ''}
                                    options={parentOrgs}
                                    onChange={value =>
                                        this.setState(
                                            ...this.state,
                                            {
                                                filter: {
                                                    ...filter,
                                                    parentOrg: value
                                                }
                                            },
                                            () => {
                                                this.fetch()
                                            }
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <Button style={{
                                    boxShadow: 'none',
                                    borderRadius: 2,
                                    height: 33,
                                    padding: '7px 11px 7px',
                                    backgroundColor: 'rgba(167,164,164,0.54)'
                                }} onClick={() => {
                                    console.log('AHIHI')
                                }}>
                                    <i className='far fa-map'/>
                                </Button>
                            </div>
                        </div>
                        <button style={{display: 'none', color: 'rgba(0,0,0,0.54)'}}/>
                    </form>
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
                        this.setState({pageLimit: number}, this.fetch)
                    }
                    onChangePage={number => {
                        this.setState({currentPage: (number)}, this.fetch)
                    }
                    }
                    onRowsDelete={arr => this.onDeleteOrganizationArr(arr)}
                />
                {modal.create && (
                    <OrganizationModal
                        heading='Create Organization'
                        open={modal.create}
                        orgCategories={orgCategories}
                        parentOrgs={parentOrgs}
                        okText='Create'
                        onClose={() => this.setState({modal: {create: false}})}
                        onSubmit={org => {
                            this.setState({modal: {create: false},checkLoad: true,st:'create'}, () => {
                                createOrgFunc(org);
                            })
                        }}
                    />
                )}
                {modal.update && (
                    <OrganizationModal
                        heading='Update Organization'
                        open={modal.update}
                        data={modal.data}
                        parentOrgs={parentOrgs}
                        orgCategories={orgCategories}
                        okText='Update'
                        onClose={() => this.setState({modal: {edit: false}})}
                        onSubmit={newOrg =>
                            this.setState({modal:{update: false},checkLoad: true,st:'update'}, () => {
                                updateOrgFunc(modal.data.id, newOrg)
                            })
                    }
                    />
                )}
                <UploadModal
                    heading='Import Organization'
                    open={modal.upload}
                    onClose={() => this.setState({modal: {upload: false}})}
                    onSubmit={file => uploadFileOrgFunc(file)}
                />
            </div>
        )
    }
}

export default connect(
    ({
         organization: {
             organizations: {list, models, create, update, deleteOrg, upload, totalLength},
             parentOrgs,
             orgCategories
         }
     }) => ({
        organizations: list.ids.map(orgId => models[orgId]) || [],
        status: {
            list: list.status || '',
            create: create.status || '',
            update: update.status || '',
            deleteOrg: deleteOrg.status || '',
            upload: upload.status || ''
        },
        create,
        update,
        deleteOrg,
        totalLength,
        list,
        parentOrgs: parentOrgs.list.ids.map(pId => parentOrgs.models[pId]) || [],
        orgCategories: orgCategories.list || []
    }),
    dispatch => ({
        listOrgFunc: params => dispatch(listOrganization(params)),
        createOrgFunc: data => dispatch(createOrganization(data)),
        updateOrgFunc: (orgId, data) => dispatch(updateOrganization(orgId, data)),
        deleteOrgFunc: orgId => dispatch(deleteOrganization(orgId)),
        listParentOrgFunc: params => dispatch(listParentOrganization(params)),
        listOrgCategoryFunc: params => dispatch(listOrgCategory(params)),
        downloadFileOrgSampleFunc: file => dispatch(downloadFileOrgSample(file)),
        uploadFileOrgFunc: file => dispatch(uploadFileOrg(file))
    })
)(OrganizationList)

function getUnique(arr, comp) {

    const unique = arr
        .map(e => e[comp])

        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);

    return unique;
}