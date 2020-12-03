import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {ContextUser} from '../contextUser'
import {withRouter} from 'react-router-dom'
import {authAPI} from "../api/api";
import brand from '../brand.png';
import pen from '../img/pen1.ico'

// functional component which serves as the navigation bar
class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            searchtext: ''
        }

        this.searchOnchange = this.searchOnchange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    signoutClick = async () => {
        await authAPI.logout(this.context.state.user.uid).then()
        this.context.actions.signout()
    }

    searchOnchange(e) {
        e.preventDefault()
        this.setState({searchtext: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.searchtext) {
            this.props.history.replace('/search/' + this.state.searchtext)
        }
    }

    // determines which buttons should be displayed based off weather or not user is logged in
    buttonsDisplay = (user) => {
        // if not logged in, show sign up and login buttons
        if(!user) {
            return (
                <div>
                    <Link to="/login" className="button is-primary is-light is-rounded is-small">登录</Link>
                    <Link to="/register" className="button is-danger is-light is-rounded is-small">注册</Link>
                </div>
            )
        } else {
            // let profile_link = "/space/" + user.uid
            return (
                <div>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            <span className="icon has-text-info mr-1">
                                <i className="fa fa-user-circle-o fa-1g"/>
                            </span>
                            {user.nike}
                        </a>
                        <div className="navbar-dropdown">
                            {/*<Link to={profile_link}  className="navbar-item">*/}
                            {/*    <span className="icon has-text-danger mr-2">*/}
                            {/*       <i className="fa fa fa-user-o fa-1g"/>*/}
                            {/*    </span>*/}
                            {/*    我的主页*/}
                            {/*</Link>*/}
                            <Link to="/" className="navbar-item" onClick={this.signoutClick} >
                                <span className="icon has-text-danger mr-2">
                                    <i className="fa fa fa-sign-out fa-1g"/>
                                </span>
                                退出
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
    }
    render() {
        return(
            <nav className="navbar is-fixed-top is-transparent"
                 role="navigation" aria-label="main navigation">
                <div className="container is-small">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-item">
                            <img src={brand} alt="" width="90" height="75"/>
                        </Link>
                    </div>

                    <div className="navbar-start" id="search-nav">
                        <div className="navbar-item ml-6">
                            <form onSubmit={this.handleSubmit}>
                                <div className="control is-expanded has-icons-right">
                                    <input className="input is-rounded is-small" onChange={this.searchOnchange}
                                           placeholder="搜索" />
                                     <span className="icon is-right" >
                                        <i className="fa fa-search" />
                                     </span>
                                 </div>
                            </form>
                        </div>
                    </div>

                    <div className="navbar-item is-flex-touch">
                        <div className="navbar-item">
                            <div className="buttons">
                                 {this.buttonsDisplay(this.context.state.user)}
                            </div>
                        </div>
                        <div className="navbar-item">
                            <Link to="/write" className="button is-success is-rounded is-small">
                                <span className="icon">
                                     <img src={pen} alt="pen"/>
                                 </span>
                                <span>Coding</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

Navigation.contextType = ContextUser;
const WrappedNav = withRouter(Navigation)
export default WrappedNav;