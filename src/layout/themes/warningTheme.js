/**
 * App Warning Theme
 */
import { createMuiTheme } from '@material-ui/core/styles'
import AppConfig from '../../constants/AppConfig'
const theme = createMuiTheme({
  palette: {
    primary: {
      main: AppConfig.themeColors.warning
    },
    secondary: {
      main: AppConfig.themeColors.primary
    }
  }
})

export default theme
