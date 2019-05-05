import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
})

function TimePicker (props) {
  const { classes,id, value, label, onChange, className, ...rest } = props
  return (
    <form className={classes.container} noValidate>
      <TextField
        {...rest}
        id={id}
        label={label}
        type='time'
        className={className}
        value={value}
        onChange={e => onChange(e)}
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          step: 300 // 5 min
        }}
      />
    </form>
  )
}

TimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string
}
TimePicker.defaultProps = {
  label: 'Time Picker'
}

export default withStyles(styles)(TimePicker)
