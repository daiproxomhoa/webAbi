import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from '@material-ui/core/Input'
import React from "react";
import PropTypes from "prop-types";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";

class TextField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value || null
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.value != this.props.value)
            this.setState({
                value: nextProps.value
            })
    }

    render() {
        const {error, label, placeholder, onChange, style,endAdornment} = this.props
        const {value} = this.state
        return (
            <FormControl style={style}>{label &&
            <InputLabel shrink={true} htmlFor="adornment-amount" >{label}</InputLabel>
            }
                <Input
                    placeholder={placeholder}
                    value={value||''}
                    error={error}
                    onChange={onChange}
                    endAdornment={endAdornment}
                />

            </FormControl>
        )
    }
}

TextField.propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string
}
export default (TextField)
