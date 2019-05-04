import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
// import InputLabel from '@material-ui/core/InputLabel'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import CancelIcon from '@material-ui/icons/Cancel'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ClearIcon from '@material-ui/icons/Clear'

import Chip from '@material-ui/core/Chip'
import Select from 'react-select'
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
class Option extends React.Component {
    handleClick = event => {
        event.persist()
        this.props.onSelect(this.props.option, event)
    }

    render () {
        const { children, isFocused, isSelected, onFocus } = this.props
        return (
            <MenuItem
                onFocus={onFocus}
                selected={isFocused}
                onClick={this.handleClick}
                component='div'
                style={{
                    fontWeight: isSelected ? 500 : 400
                }}
            >
                {children}
            </MenuItem>
        )
    }
}

function SelectWrapped (props) {
    const { classes,value, placeholder,isMulti,onChange, ...other } = props
    return (
        <Picky
            options={Option}
            value={value}
            multiple={isMulti}
            includeSelectAll={true}
            includeFilter={true}
            onChange={values =>onChange(values)}
            dropdownHeight={600}
            placeholder={placeholder}
        />
    )
}

const ITEM_HEIGHT = 48

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit / 4
    },
    // We had to use a lot of global selectors in order to style react-select.
    // We are waiting on https://github.com/JedWatson/react-select/issues/1679
    // to provide a better implementation.
    // Also, we had to reset the default style injected by the library.
    '@global': {
        '.Select-control': {
            display: 'flex',
            alignItems: 'center',
            border: 0,
            height: 'auto',
            background: 'transparent',
            '&:hover': {
                boxShadow: 'none'
            }
        },
        '.Select-multi-value-wrapper': {
            flexGrow: 1,
            display: 'flex',
            flexWrap: 'wrap'
        },
        '.Select--multi .Select-input': {
            margin: 0
        },
        '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
            padding: 0
        },
        '.Select-noresults': {
            padding: theme.spacing.unit * 2
        },
        '.Select-input': {
            display: 'inline-flex !important',
            padding: 0,
            height: 'auto'
        },
        '.Select-input input': {
            background: 'transparent',
            border: 0,
            padding: 0,
            cursor: 'default',
            display: 'inline-block',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            margin: 0,
            outline: 0
        },
        '.Select-placeholder, .Select--single .Select-value': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.pxToRem(16),
            padding: 0
        },
        '.Select-placeholder': {
            opacity: 0.42,
            color: theme.palette.common.black
        },
        '.Select-menu-outer': {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[2],
            position: 'absolute',
            left: 0,
            top: `calc(100% + ${theme.spacing.unit}px)`,
            width: '100%',
            zIndex: 2,
            maxHeight: ITEM_HEIGHT * 4.5
        },
        '.Select.is-focused:not(.is-open) > .Select-control': {
            // boxShadow: 'none'
        },
        '.Select-menu': {
            maxHeight: ITEM_HEIGHT * 4.5,
            overflowY: 'auto'
        },
        '.Select-menu div': {
            boxSizing: 'content-box'
        },
        '.Select-arrow-zone, .Select-clear-zone': {
            color: theme.palette.action.active,
            cursor: 'pointer',
            height: 21,
            width: 21,
            zIndex: 1
        },
        // Only for screen readers. We can't use display none.
        '.Select-aria-only': {
            position: 'absolute',
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
            height: 1,
            width: 1,
            margin: -1
        }
    }
})

class IntegrationReactSelect extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            value: props.value || null
        }
    }

    handleChangeValue = v => {
        const { onChange, isMulti } = this.props
        this.setState(
            {
                value: v
            },
            onChange(isMulti ? v.split(',') : v)
        )
    }
    render () {
        const {
            classes,
            isMulti,
            options,
            label,
            placeholder,
            ...rest
        } = this.props
        const { value } = this.state
        return (
            <FormControl {...rest}>
                {/*<InputLabel htmlFor='select-custom'>{label}</InputLabel>*/}
                <Input
                    fullWidth
                    inputComponent={SelectWrapped}
                    inputProps={{
                        classes,
                        value: value,
                        label: label,
                        multi: !!isMulti,
                        onChange: this.handleChangeValue,
                        instanceId: 'react-select-chip',
                        id: 'react-select-chip',
                        name: 'react-select-chip',
                        simpleValue: true,
                        placeholder: placeholder,
                        options: options,
                        // isTrusted:true
                    }}
                    onChange={(e)=>{console.log(e)}}
                />
            </FormControl>
        )
    }
}

IntegrationReactSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.string]).isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string
}

export default withStyles(styles)(IntegrationReactSelect)
