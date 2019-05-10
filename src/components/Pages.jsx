/**
 * App Routes
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Sidebar from 'react-sidebar'
import $ from 'jquery'
import {Scrollbars} from 'react-custom-scrollbars'
import classnames from 'classnames'

// Components
import Header from './common/Header/Header'
import Footer from './common/Footer/Footer'
import SideBarContent from './common/Sidebar'
import AppConfig from '../constants/AppConfig'

// actions
import {collapsedSidebarAction} from '../actions'

class _Pages extends Component {
    state = {
        loadingHeader: true,
        loadingSidebar: true
    }

    componentWillMount() {
        this.updateDimensions()
    }

    componentDidMount() {
        const {windowWidth} = this.state
        window.addEventListener('resize', this.updateDimensions)
        if (AppConfig.enableUserTour && windowWidth > 600) {
            setTimeout(() => {
                this.props.startUserTour()
            }, 2000)
        }
        setTimeout(() => {
            this.setState({loadingHeader: false, loadingSidebar: false})
        }, 114)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions)
    }

    componentWillReceiveProps(nextProps) {
        const {windowWidth} = this.state
        if (nextProps.location !== this.props.location) {
            if (windowWidth <= 1199) {
                this.props.collapsedSidebarAction(false)
            }
        }
    }

    updateDimensions = () => {
        this.setState({
            windowWidth: $(window).width(),
            windowHeight: $(window).height()
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0)
        }
    }

    renderPage() {
        const {children} = this.props
        return (
            <Scrollbars
                className='rct-scroll'
                autoHide
                autoHideDuration={100}
                style={this.getScrollBarStyle()}
            >
                <div className='rct-page-content'>{children}</div>
            </Scrollbars>
        )
    }

    // render header
    renderHeader() {
        /* if (loadingHeader) {
                return <PreloadHeader />;
            } */
        return <Header/>
    }

    // render Sidebar
    renderSidebar() {
        /* if (loadingSidebar) {
                return <PreloadSidebar />;
            } */
        return (
                <SideBarContent/>
        )
    }

    // Scrollbar height
    getScrollBarStyle() {
        return {
            height: 'calc(100vh - 50px)'
        }
    }

    render() {
        const {navCollapsed, rtlLayout, miniSidebar} = this.props.layout
        const {withHeader, children} = this.props
        const {windowWidth} = this.state
        return (
            <div className='app'>
                <div className='app-main-container'>
                    {/*  <Tour /> */}
                    <Sidebar
                        sidebar={this.renderSidebar()}
                        open={windowWidth <= 1199 ? navCollapsed : false}
                        docked={windowWidth > 1199 ? !navCollapsed : false}
                        pullRight={rtlLayout}
                        onSetOpen={() => this.props.collapsedSidebarAction(false)}
                        styles={{content: {overflowY: ''}}}
                        contentClassName={classnames({
                            'app-conrainer-wrapper': miniSidebar
                        })}
                    >
                        <div className='app-container'>
                            <div className='rct-app-content'>
                                <div className='app-header'>
                                    {withHeader && this.renderHeader()}
                                </div>
                                <div className='rct-page'>
                                    <React.Fragment>
                                        <Scrollbars
                                            className='rct-scroll'
                                            autoHide
                                            autoHideDuration={100}
                                            style={this.getScrollBarStyle()}
                                        >
                                            {children}
                                        </Scrollbars>
                                    </React.Fragment>
                                </div>
                                <Footer/>
                            </div>
                        </div>
                    </Sidebar>
                </div>
            </div>
        )
    }
}

// map state to props
const mapStateToProps = ({layout}) => {
    return {layout}
}
const Page = withRouter(
    connect(mapStateToProps, {
        collapsedSidebarAction
    })(_Pages)
)
const MainPage = ({children}) => <Page withHeader>{children}</Page>
const HeaderPage = ({children}) => (
    <div
        className='rct-page-header p-x-md'
        style={{marginTop: '2px', background: 'white'}}
    >
        {children}
    </div>
)
// Scrollbar height

const ContentPage = ({children}) => {
    return <div className='rct-page-content'>{children}</div>
}

MainPage.Header = HeaderPage
MainPage.Content = ContentPage

export default MainPage
