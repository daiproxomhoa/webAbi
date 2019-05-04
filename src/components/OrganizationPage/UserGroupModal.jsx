import React, {Component} from 'react'
import Modal from '../common/Modal/Modal'
import TextField from '@material-ui/core/TextField'
import {Table} from 'reactstrap'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import Select from '../common/Select/Select'

function isContain(arr, n) {
    for (var i in arr) {
        if (arr[i] === n)
            return true
    }
    return false

}

class UserGroupModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            data: {
                configurations: {},
            },
            matrix: null,
            errors: {},

        }
    }

    // componentWillMount() {
    //     this.setState({data: this.props.data, open: this.props.open})
    // }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.open !== prevState.open) {
            var permisions = (nextProps.data ? nextProps.data.permissions[0] : []);
            var colums = ['insert', 'view', 'update', 'delete', 'view_all', 'export'];
            var rows = ["ORGANIZATIONS", "REPORTS", "TASKS", "TASKS_ACTIONS", "CUSTOMERS", "PRODUCTS", "USERS", "ROLES", "SURVEYS", "SMS", "SERVICES", "ORDERS", "LONGHAUL ORDERS", "STRANPORTATION", "SALES", "ROUTER", "PROMOTION"];
            var matrix = []
            for (var r in rows) {
                matrix[r] = []
                for (var c1 in colums) {
                    if (isContain(permisions[colums[c1]], rows[r])) {
                        matrix[r][c1] = true;
                    } else {
                        matrix[r][c1] = false;
                    }
                }
            }
            return {
                ...prevState,
                open: nextProps.open,
                data: nextProps.data ? nextProps.data : prevState.data,
                matrix: matrix,
            }
        }

        return null
    }

    onSubmit = () => {
        const {onSubmit} = this.props
        const {data, matrix} = this.state
        const errors = {}
        const {roleGroupCode, roleGroupName, organizationId} = data
        if (!roleGroupCode) {
            errors.roleGroupCode = 'Invalid role group code'
        }
        if (!roleGroupName) {
            errors.roleGroupName = 'Invalid role group name'
        }
        if (!organizationId) {
            errors.organizationId = 'Invalid organizations'
        }

        this.setState({errors})
        if (Object.keys(errors).length > 0) {
            return
        }
        var result = ((data.permissions || this.props.data) ? data.permissions[0] : {});
        var colums = ['insert', 'view', 'update', 'delete', 'view_all', 'export'];
        var rows = ["ORGANIZATIONS", "REPORTS", "TASKS", "TASKS_ACTIONS", "CUSTOMERS", "PRODUCTS", "USERS", "ROLES", "SURVEYS", "SMS", "SERVICES", "ORDERS", "LONGHAUL ORDERS", "STRANPORTATION", "SALES", "ROUTER", "PROMOTION"];
        for (var j = 0; j < colums.length; j++) {
            result[colums[j]] = [];
        }
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[0].length; j++) {
                if (matrix[i][j] == true) {
                    result[colums[j]].push(rows[i])
                }
            }
        }
        this.setState({data: {...this.state.data, permissions: [result]}}, () => {
            onSubmit(this.state.data)
        })


    }

    getBodyTable() {
        const {matrix} = this.state
        var colums = ['insert', 'view', 'update', 'delete', 'view_all', 'export'];
        var rows = ["ORGANIZATIONS", "REPORTS", "TASKS", "TASKS_ACTIONS", "CUSTOMERS", "PRODUCTS", "USERS", "ROLES", "SURVEYS", "SMS", "SERVICES", "ORDERS", "LONGHAUL ORDERS", "STRANPORTATION", "SALES", "ROUTER", "PROMOTION"];
        var body = [];
        var body = matrix.map((row, index1) =>
            <tr key={index1}>
                <td>{rows[index1]}</td>
                <td><Checkbox
                    // value={
                    //     function () {
                    //         return true
                    //     }
                    // }
                    onChange={(e) => {
                        var temp = matrix;
                        temp[index1] = new Array(6).fill(e.target.checked);
                        this.setState({matrix: temp})
                    }}/></td>
                {row.map((col, index2) =>
                    <td key={index2}><Checkbox checked={col} onChange={(e) => {
                        var temp = matrix;
                        temp[index1][index2] = !temp[index1][index2];
                        this.setState({matrix: temp})
                    }}/></td>
                )}
            </tr>
        )
        return body
    }

    render() {
        const {heading, onClose, organizations, ...rest} = this.props
        const {open, errors, data, matrix} = this.state
        var body = this.getBodyTable()
        return (
            <Modal
                {...rest}
                open={open}
                size='lg'
                heading={heading}
                onClose={onClose}
                onSubmit={() => this.onSubmit()}
                loading="false"
            >
                <div className='row'>
                    <div className='col-md-6'>
                        <FormControl>
                            <TextField
                                label='Group Code'
                                placeholder='Group Code'
                                value={data.roleGroupCode || ''}
                                error={!!errors.roleGroupCode}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            roleGroupCode: e.target.value
                                        },
                                        errors: {
                                            ...this.state.errors,
                                            roleGroupCode: ''
                                        }
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                className='m-t-md'
                                label='Group Name'
                                placeholder='Group Name'
                                value={data.roleGroupName || ''}
                                error={!!errors.roleGroupName}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            roleGroupName: e.target.value
                                        },
                                        errors: {
                                            ...this.state.errors,
                                            roleGroupName: ''
                                        }
                                    })
                                }
                            />
                        </FormControl>
                    </div>
                    <div className='col-md-6'>
                        <FormControl>
                            <Select
                                style={{marginTop: '12px'}}
                                placeholder='Organizations'
                                options={organizations || []}
                                value={data.organizationId ? data.organizationId._id : ''}
                                onChange={value =>
                                    this.setState({
                                        ...this.state,
                                        errors: {
                                            ...this.state.errors,
                                            organizationId: ''
                                        },
                                        data: {
                                            ...this.state.data,
                                            organizationId: value
                                        }
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                placeholder='Descriptions'
                                label='Descriptions'
                                className='m-t-md'
                                value={data.roleGroupDescription || ''}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        data: {
                                            ...this.state.data,
                                            roleGroupDescription: e.target.value
                                        }
                                    })
                                }
                            />
                        </FormControl>
                    </div>
                    <div className='more configurations m-t-md col-lg-12'>
                        <span className='text-uppercase'>Configurations</span>
                        <div className='row'>
                            <div className='col-md-4 col-xs-4'>
                                <FormControlLabel
                                    label='Enable Checkin-Out'
                                    control={
                                        <Checkbox
                                            color='primary'
                                            value='enableCheckInOut'
                                            checked={data.configurations.enableCheckInOut}
                                            onChange={() =>
                                                this.setState({
                                                    ...this.state,
                                                    data: {
                                                        ...data,
                                                        configurations: {
                                                            ...data.configurations,
                                                            enableCheckInOut: !data.configurations.enableCheckInOut
                                                        }
                                                    }
                                                })
                                            }
                                        />
                                    }
                                />
                            </div>
                            <div className='col-md-4 col-xs-4'>
                                <FormControlLabel
                                    label='Enable Confirm Reject'
                                    control={
                                        <Checkbox
                                            color='primary'
                                            value='enableConfirmReject'
                                            checked={data.configurations.enableConfirmReject}
                                            onChange={() =>
                                                this.setState({
                                                    ...this.state,
                                                    data: {
                                                        ...data,
                                                        configurations: {
                                                            ...data.configurations,
                                                            enableConfirmReject: !data.configurations.enableConfirmReject
                                                        }
                                                    }
                                                })
                                            }
                                        />
                                    }
                                />
                            </div>
                            <div className='col-md-4 col-xs-4'>
                                <FormControlLabel
                                    label='Disable Choose Photo Library'
                                    control={
                                        <Checkbox
                                            color='primary'
                                            value='disableChoosePhoto'
                                            checked={data.configurations.disableChoosePhoto}
                                            onChange={() =>
                                                this.setState({
                                                    ...this.state,
                                                    data: {
                                                        ...data,
                                                        configurations: {
                                                            ...data.configurations,
                                                            disableChoosePhoto: !data.configurations.disableChoosePhoto
                                                        }
                                                    }
                                                })
                                            }
                                        />
                                    }
                                />
                            </div>
                            <div className='roles responsive-table-wrapper w-100 p-sm'>
                                <div className='table-responsive'>
                                    <div className='flip-scroll'>
                                        <Table hover bordered striped>
                                            <thead>
                                            <tr className='text-white'>
                                                <th>Modules</th>
                                                <th>Full</th>
                                                <th>Create</th>
                                                <th>Read</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                                <th>View All</th>
                                                <th>Exports</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {body}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default UserGroupModal
