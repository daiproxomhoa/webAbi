import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import configureStore from './store'
import App from './layout/App'
import LoginPage from "./components/AuthPage/LoginPage";
import RegisterPage from "./components/AuthPage/RegisterPage";
import MainPage from "./components/Pages";

const MainApp = () => (
    <Provider store={configureStore()}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Router>
                <Switch>

                    <Route path='/login' component={LoginPage}/>
                    <Route path='/register' component={RegisterPage}/>
                    <Route path='/' component={App}/>
                </Switch>
            </Router>
        </MuiPickersUtilsProvider>
    </Provider>
)

export default MainApp
