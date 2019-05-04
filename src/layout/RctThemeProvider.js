/**
 * Rct Theme Provider
 */
import React, { Component, Fragment } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { IntlProvider } from 'react-intl'

// themes
import primaryTheme from './themes/primaryTheme'

class RctThemeProvider extends Component {
  render () {
    const { children } = this.props
    // theme changes
    let theme = primaryTheme
    return (
      <MuiThemeProvider theme={theme}>
        <IntlProvider locale='en'>
          <Fragment>{children}</Fragment>
        </IntlProvider>
      </MuiThemeProvider>
    )
  }
}
export default RctThemeProvider
