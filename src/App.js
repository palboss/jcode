import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navigation from './page/navigation'
import Home from './page/home/home'
import Login from './page/auth/login'
import Register from './page/auth/register'
import Search from './page/search/search'
import Write from './page/title/write'
import 'bulma/css/bulma.css'
import UserProviderImpl from './contextUser'
import ScrollToTop from './page/kit/totop'

import './App.css'


export default class App extends Component {

  render() {
    return(
        <div className="App">
            <UserProviderImpl>
                <Router>
                    <Navigation/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" render={()=> (<Login />)} exact/>
                        <Route path="/register" render={()=> (<Register />)} exact/>
                        <Route path="/search/:q" render={(props)=> (<Search {...props} />)}  exact/>
                        <Route path="/write" render={()=> (<Write />)} exact/>
                        <Route path="/space/:uid" component={Home} />} exact/>
                        <Route path="*" component={Error}/>
                    </Switch>
                </Router>
            </UserProviderImpl>
            <ScrollToTop/>
        </div>
        )
    }
}

