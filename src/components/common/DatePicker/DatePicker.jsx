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

const DatePicker = ({
  classes,
  label,
  value,
  onChange,
  className,
  ...rest
}) => {
  return (
    <form className={classes.container} noValidate>
      <TextField
        {...rest}
        id='date'
        label={label || 'Date Picker'}
        type='date'
        value={value}
        onChange={e => onChange(e.target.value)}
        className={className}
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  )
}

DatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  className: PropTypes.string
}

export default withStyles(styles)(DatePicker)
