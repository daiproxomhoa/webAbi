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

function DateTimePicker (props) {
  const { classes, value, onChange, label, ...rest } = props

  return (
    <form className={classes.container} noValidate>
      <TextField
        {...rest}
        id='datetime-local'
        label={label}
        type='datetime-local'
        value={value}
        className={className}
        onChange={e => onChange(e.target.value)}
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  )
}

DateTimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string
}

export default withStyles(styles)(DateTimePicker)
