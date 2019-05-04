/**
 * Data Table
 */
import React from 'react'
// import MUIDataTable from 'mui-datatables'
import MUIDataTable from '../../../components/common/MuiTB/MUIDataTable'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'

class DataTable extends React.Component {
    static propTypes = {
        columns: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        loading: PropTypes.bool
    }
    static defaultProps = {
        columns: ['Name', 'Title', 'Location', 'Age', 'Salary'],
        data: [
            ['Gabby George', 'Business Analyst','Minneapolis', 30, '$100,000'],
            ['Aiden Lloyd', 'Business Consultant', 'Dallas', 55, '$200,000'],
            ['Jaden Collins', 'Attorney', 'Santa Ana', 27, '$500,000'],
            ['Franky Rees', 'Business Analyst', 'St. Petersburg', 22, '$50,000'],
            ['Aaren Rose', 'Business Consultant', 'Toledo', 28, '$75,000']
        ]
    }

    render() {
        const {
            columns,
            data,
            loading,
            onSearchChange,
            onFilterChange,
            onColumnViewChange,
            onChangeRowsPerPage,
            resizableColumns,
            onCellClick,
            onChangePage,
            onRowsDelete,
            rowsPerPage,
            onRowsSelect,
            options,
            count,
            serverSide,
            page,
            onTableChange,
            ...rest
        } = this.props
        const opts = {
            ...options,
            onSearchChange,
            onFilterChange,
            onRowsSelect,
            onCellClick,
            onChangePage,
            onRowsDelete,
            onColumnViewChange,
            onTableChange,
            serverSide,
            resizableColumns,
            search: false,
            filter: true,
            print: true,
            rowsPerPage,
            count,
            page,
            onChangeRowsPerPage,
            rowsPerPageOptions: [10, 25, 50, 100, 200],
            filterType: 'dropdown',
            responsive: 'stacked'
        }
        // SHOULD UPDATE TO SHOW LOADING ONLY IN BODY OF TABLE
        if (loading) {
            return (
                <div className='page-loader d-flex justify-content-center mb-30'>
                    <CircularProgress/>
                </div>
            )
        }
        if (!data.length) {
            return (
                <Paper>
                    <div className='text-center w-100 p-md'>
                        <i className='fas fa-table fa-2x'/>
                        <h1 className='text-center m-t-sm'>No data to show</h1>
                    </div>
                </Paper>
            )
        }
        return (
            <div className='data-table-wrapper'>
                <MUIDataTable {...rest} data={data} columns={columns} options={opts}/>
            </div>
        )
    }
}

export default DataTable
