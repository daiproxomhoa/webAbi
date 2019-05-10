/**
 * App.js Layout Start Here
 */
import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import RctThemeProvider from './RctThemeProvider'
import DashboardPage from '../components/DashboardPage/DashboardPage'
import OrganizationPage from '../components/OrganizationPage/OrganizationPage'
import PartnerPage from '../components/PartnerPage/PartnerPage'
import ProductPage from '../components/ProductPage/ProductPage'
import ServicePage from '../components/ServicePage/ServicePage'
import OrderPage from '../components/OrderPage/OrderPage'
import TransportPage from '../components/TransportPage/TransportPage'
import WarehousePage from '../components/WarehousePage/WarehousePage'
import TaskPage from '../components/TaskPage/TaskPage'
import ReportPage from '../components/ReportPage/ReportPage'
import LoginPage from '../components/AuthPage/LoginPage'
import RegisterPage from '../components/AuthPage/RegisterPage'
import MainPage from '../components/Pages'
import {getCookie} from "../util/helpers";

class App extends Component {

    render() {
        const {children} = this.props
        const jwtToken = getCookie('jwtToken')
        return (
            <RctThemeProvider>
                <Switch>
                    {!jwtToken ?

                        <Route path='/' component={LoginPage}/>
                        :
                        <MainPage>
                            <Route path='/' exact component={DashboardPage}/>
                            <Route path='/organizations' component={OrganizationPage}/>
                            <Route path='/partners' component={PartnerPage}/>
                            <Route path='/products' component={ProductPage}/>
                            <Route path='/services' component={ServicePage}/>
                            <Route path='/orders' component={OrderPage}/>
                            <Route path='/transport' component={TransportPage}/>
                            <Route path='/warehouse' component={WarehousePage}/>
                            <Route path='/tasks' component={TaskPage}/>
                            <Route path='/analytical-reports' component={ReportPage}/>
                        </MainPage>
                    }
                </Switch>
            </RctThemeProvider>
        )
    }
}

export default App
