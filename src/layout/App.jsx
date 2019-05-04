/**
 * App.js Layout Start Here
 */
import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import AuthorizedRoute from '../components/AuthorizedRoute'
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

class App extends Component {
    render() {
        return (
            <RctThemeProvider>
                <Switch>
                    <MainPage>
                        <AuthorizedRoute path='/' exact component={DashboardPage}/>
                        <AuthorizedRoute path='/organizations' component={OrganizationPage}/>
                        <AuthorizedRoute path='/partners' component={PartnerPage}/>
                        <AuthorizedRoute path='/products' component={ProductPage}/>
                        <AuthorizedRoute path='/services' component={ServicePage}/>
                        <AuthorizedRoute path='/orders' component={OrderPage}/>
                        <AuthorizedRoute path='/transport' component={TransportPage}/>
                        <AuthorizedRoute path='/warehouse' component={WarehousePage}/>
                        <AuthorizedRoute path='/tasks' component={TaskPage}/>
                        <AuthorizedRoute path='/analytical-reports' component={ReportPage}/>
                    </MainPage>
                </Switch>
            </RctThemeProvider>
        )
    }
}

export default App
