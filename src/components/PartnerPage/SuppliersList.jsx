import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import queryString from 'query-string'
import {Redirect} from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import UpdateIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '../common/TextField'
import Select from '../common/Select'
import DataTable from '../common/DataTable/DataTable'
import FloatingActionButton from '../common/FloatingActionButton/FloatingActionButton'
import UploadModal from '../UploadModal'
import {getCenter} from "../../util/helpers";
import {KEY_GOOGLE_MAP, STATUS_LOADING, STATUS_SUCCESS} from '../../constants/Const'
import {
    listOrganization,
    listPartner,
    listCustomerGroup,
    updatePartner,
    deletePartner
} from '../../actions'
import {getCookie} from "../../util/helpers";
import OrganizationModal from "../OrganizationPage/OrganizationModal";
import SuppliersModal from "./SuppliersModal";
import UserModal from "../OrganizationPage/UserModal";
import Button from "@material-ui/core/Button";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";

class SuppliersList extends Component {
    static propTypes = {
        listPartnerFunc: PropTypes.func.isRequired,
        updatePartnerFunc: PropTypes.func.isRequired,
        deletePartnerFunc: PropTypes.func.isRequired,
        listOrgFunc: PropTypes.func.isRequired,
        listCustomerGroupFunc: PropTypes.func.isRequired,
        status: PropTypes.object.isRequired,
        // partnerList: PropTypes.object.isRequired,
        organizations: PropTypes.array.isRequired,

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
            st: '',
            isMap: false
        }
    }

    componentDidMount() {
        const {listOrgFunc, listCustomerGroupFunc} = this.props
        const {currentPage, pageLimit, user} = this.state
        this.fetchSupplier()
        listOrgFunc({
            categoryIds: [],
            currentPage: 1,
            orderBy: {organizationName: 1},
            pageLimit: 1000,
            searchInput: ""
        })
        listCustomerGroupFunc({
            currentPage: 1,
            organizationIds: user.organizationIds,
            pageLimit: 1000,
            species: "SUPPLIERS"
        }, 'all')

    }

    componentWillReceiveProps(nextProps) {
        const {st, checkLoad} = this.state
        const {status, user} = nextProps
        if ((checkLoad == true) && status[st] == STATUS_SUCCESS) {
            this.setState({checkLoad: false}, () => {
                this.fetchSupplier()
            })
        }
    }

    fetchSupplier = () => {
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
        if (filter.customerGroup) {
            if (Object.keys(filter.customerGroup).length > 0 && filter.customerGroup[0] != "") {
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
            species: "SUPPLIERS",
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

    onDeletePartner = (value = ['']) => {
        const {deletePartnerFunc} = this.props
        if (value && window.confirm('Are you sure ? ')) {
            this.setState({modal: {update: false}, checkLoad: true, st: 'deletePartner'}, () => {
                deletePartnerFunc({
                    customerType: 0,
                    ids: [value]
                })
            })
        }
    }
    onDeletePartnerArr = arr => {
        const {deletePartnerFunc} = this.props
        if (window.confirm('Are you sure ? ')) {
            var deleteArr = arr.data.map((value, index) =>
                this.props.partnerList[value.index]._id
            )
            this.setState({checkLoad: true, st: 'deletePartner'}, () => {
                deletePartnerFunc({
                    customerType: 0,
                    ids: deleteArr
                })
            });
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
        const {modal, query, filter, currentPage, pageLimit, isMap} = this.state
        const {partnerList, status, location, organizations, listOrgFunc, totalLength, customerGroup, updatePartnerFunc} = this.props
        const orgOptions = organizations.map(org => ({
            value: org._id,
            label: org.organizationName
        }))
        const customerGroupOptions = customerGroup.map(org => ({
            value: org._id,
            label: org.groupName
        })).reverse()
        const columns = [
            {name: 'Supplier Code', options: {filter: true, styles: {maxWidth: '10'}}},
            {name: 'Supplier Name', options: {filter: true}},
            {name: 'Email', options: {filter: false, sort: false}},
            {name: 'Mobile Mumber', options: {filter: false, sort: false}},
            {name: 'Supplier Group', options: {filter: false, sort: false}},
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
        var googleMapURL = "https://maps.googleapis.com/maps/api/js?key=" + KEY_GOOGLE_MAP + "&v=3.exp&libraries=geometry,drawing,places"
        var map = partnerList.map((value, i) => {
            if (value.coordinate != undefined && value.coordinate.latitude != 0 && value.coordinate.longitude != 0 && value.coordinate.latitude != null && value.coordinate.longitude != null) {
                return {...value.coordinate,streetAddress:value.streetAddress}
            }
            else {
                null
            }
        })
        map = map.filter(v=>v!=null||v!=undefined)
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={7}
                defaultCenter={getCenter(map)}
            >
                {map.map((value, key) => {
                    return (
                        <Marker
                            key={key}
                            position={{lat: value.latitude, lng: value.longitude}}
                            title={value.streetAddress}

                        />
                    )
                })}

            </GoogleMap>
        ));
        return (
            <div className='user-group-list'>
                <div className='filter-search m-t-xs m-b-md'>
                    <form onSubmit={() => this.fetchSupplier()}>
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
                                        }, this.fetchSupplier)
                                    }
                                />
                            </div>
                            <div className='col-md-2 col-sm-4 filter-organization'>
                                <Select
                                    placeholder='Organizations'
                                    // label='Organizations'
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
                                            this.fetchSupplier
                                        )
                                    }
                                    // onChangeText={e =>
                                    //     listOrgFunc({
                                    //         categoryIds: [],
                                    //         currentPage: 1,
                                    //         orderBy: {organizationName: 1},
                                    //         pageLimit: 10,
                                    //         searchInput: e
                                    //     })
                                    // }
                                />
                            </div>
                            <div className='col-md-2 col-sm-4 filter-organization' >
                                <Select
                                    isMulti={true}
                                    placeholder='Supplier group'
                                    // label='Supplier group'
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
                                            this.fetchSupplier
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <Button style={{
                                    boxShadow: 'none',
                                    borderRadius: 2,
                                    height: 33,
                                    width: 33,
                                    padding: '7px 11px 7px',
                                    minWidth: 42,
                                    backgroundColor: 'rgba(167,164,164,0.54)'
                                }} onClick={() => {
                                    this.setState({isMap: !isMap})
                                }}>
                                    <i className='far fa-map'/>
                                </Button>
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
                {isMap == false ?
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
                                this.fetchSupplier()
                            })
                        }
                        onChangePage={
                            number => {
                                this.setState({currentPage: number}, () => {
                                    this.fetchSupplier()
                                })
                            }
                        }
                        onRowsDelete={arr => this.onDeletePartnerArr(arr)}
                    /> :
                    <div>
                        <MapWithAMarker
                            googleMapURL={googleMapURL}
                            loadingElement={<div style={{height: `100%`}}/>}
                            containerElement={<div style={{height: `420px`}}/>}
                            mapElement={<div style={{height: `100%`}}/>}
                        />
                    </div>
                }
                {modal.create && (
                    <SuppliersModal
                        heading='Create Organization'
                        open={modal.create}
                        organizations={orgOptions}
                        // parentOrgs={prOrgs}
                        okText='Create'
                        onClose={() => this.setState({modal: {create: false}})}
                        onSubmit={data =>
                            this.setState({modal: {update: false}, checkLoad: true, st: 'update'}, () => {
                                updatePartnerFunc(data)
                                console.log(data)
                            })
                        }
                    />
                )}{modal.update && (
                <SuppliersModal
                    heading='Update Organization'
                    open={modal.update}
                    organizations={orgOptions}
                    data={modal.data}
                    okText='Update'
                    onClose={() => this.setState({modal: {update: false}})}
                    onSubmit={data => {
                        this.setState({modal: {update: false}, checkLoad: true, st: 'update'}, () => {
                            updatePartnerFunc(data)
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
             partners: {list, create, update, deletePartner, totalLength},
             customerGroup,
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
            deletePartner: deletePartner.status || '',
        },
        user,
        customerGroup: customerGroup.list.data,
        totalLength
    }),
    dispatch => ({
        listPartnerFunc: params => dispatch(listPartner(params)),
        updatePartnerFunc: params => dispatch(updatePartner(params)),
        deletePartnerFunc: params => dispatch(deletePartner(params)),
        listOrgFunc: params => dispatch(listOrganization(params)),
        listCustomerGroupFunc: (params, option) => dispatch(listCustomerGroup(params, option))
    })
)(SuppliersList)
