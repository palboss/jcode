import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {ContextUser} from '../../contextUser'
import {Nike, Email, SendVcode, Vcode} from './component'
import {authAPI} from '../../api/api'


export default class Register extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            redirect: false
        };

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let nike = document.getElementById("nike");
        let email = document.getElementById("email");
        let vcode = document.getElementById("vcode");

        let response = await authAPI.register(nike.value, email.value, "", vcode.value)
        if (response && response.status === 201) {
            let {token, uid} = response.data;
            let user = {nike: nike.value, uid: uid, email: email.value};
            this.context.actions.signin(true, user, token);
            this.setState({redirect: true});
        }
     }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/" />
        } else {
            return(
                <div className="register">
                    <div className="card">
                        <div className="card-header">
                            <p className="card-header-title is-centered">
                            注册
                            </p>
                        </div>

                        <div className="card-content">
                            <form onSubmit={this.handleSubmit}>
                                <Nike/>
                                {/* <Mobile/> */}
                                <Email isRegister={true}/>
                                <div className="field is-grouped">
                                    <Vcode/>
                                    <SendVcode/>
                                </div>
                                <p className="help is-link">验证码通过邮件发送，免密登录</p>
                                <br/><br/>
                                <button type="submit" className="button is-primary  is-fullwidth">注册</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

Register.contextType = ContextUser;
