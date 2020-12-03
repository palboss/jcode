import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {ContextUser} from '../../contextUser'
import {Email, SendVcode, Vcode} from './component'
import {authAPI} from "../../api/api";

// component for the login page
export default class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            redirect: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // handles login submission
    handleSubmit = async (e) => {
        e.preventDefault();
        let email = document.getElementById("email");
        let vcode = document.getElementById("vcode");

        let response = await authAPI.login(email=email.value, vcode=vcode.value);
        if (response && response.status === 201) {
            let {token, nike, uid} = response.data;
            let user = {nike: nike, uid: uid, email: email.value};
            this.context.actions.signin(true, user, token);
            this.setState({redirect: true});
        }
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/"/>
        } else {
            return(
                <div className="login">
                    <div className="card">
                        <div className="card-header">
                            <p className="card-header-title is-centered">
                            登录
                            </p>
                        </div>
                        <div className="card-content">
                            <form onSubmit={this.handleSubmit}>
                                <Email/>
                                <div className="field is-grouped">
                                    <Vcode/>
                                    <SendVcode/>
                                </div>
                                <p className="help is-link">验证码通过邮件发送，免密登录</p>
                                <br/><br/>
                                <button type="submit" className="button is-primary is-fullwidth">登录</button>
                            </form>
                        </div>
                    </div>
                    <div className="control">
                        <p className="label is-small has-text-centered">使用以下帐号直接登录</p>
                        <p className="buttons are-medium is-centered">
                            <button className="button is-white">
                                <span className="icon has-text-dark">
                                  <i className="fa fa-github fa-1g"/>
                                </span>
                            </button>
                            <button className="button is-white">
                                <span className="icon has-text-success">
                                  <i className="fa fa-weixin fa-1g"/>
                                </span>
                            </button>
                        </p>
                    </div>
                </div>
            )
        }
    }
}

Login.contextType = ContextUser;
