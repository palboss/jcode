import React, { Component } from 'react';
import {authAPI} from "../../api/api";

export class Nike extends Component {
    validate_nike = (e) => {
        let feedbackN = document.getElementById("feedbacknike")
        const nikepattern = /[^%&'@,;=?$]/g;
        let value = e.target.value;
        if (nikepattern.test(value)) {
            e.target.classList.remove("is-danger")
            e.target.classList.add("is-primary")
            feedbackN.textContent = ""
        } else {
            e.target.classList.remove("is-primary")
            e.target.classList.add("is-danger")
            feedbackN.textContent = "昵称 有特殊字符 %&'@,;=?$"
        }
    }

    render() {
        return (
            <div className="field">
                <p className="control has-icons-left">
                    <input id='nike' className="input is-centered is-primary" type="text" placeholder="昵称"
                        maxLength="30" required onChange={this.validate_nike.bind(this)} />
                    <span className="icon is-small is-left">
                        <i className="fa fa-user-o"/>
                    </span>
                </p>
                <p className="help is-danger" id="feedbacknike"/>
            </div>
        );
    }
}

export class Mobile extends Component {
    validate_mobile = (e) => {
        const feedbackM = document.getElementById("feedbackmobile")
        const mobilepattern = /^1[3456789]\d{9}$/;
        let value = e.target.value
        if (mobilepattern.test(value)) {
            e.target.classList.remove("is-danger")
            e.target.classList.add("is-primary")
            feedbackM.textContent = ""
        } else {
            e.target.classList.remove("is-primary")
            e.target.classList.add("is-danger")
            feedbackM.textContent = "手机格式不对"
        }
    }

    render() {
        return (
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input id="mobile"  className="input is-centered is-primary" type="tel"
                           placeholder="手机" onChange={this.validate_mobile.bind(this)}/>
                    <span className="icon is-small is-left">
                        <i className="fa fa-mobile-phone"/>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fa fa-check"/>
                    </span>
                </p>
                <p className="help is-danger" id="feedbackmobile"/>
            </div>
        )
    }
}

export class Email extends Component {
    validate_email = (e) => {
        const feedbackE = document.getElementById("feedbackemail")
        const emailpattern = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
        let value = e.target.value;
        if (emailpattern.test(value)) {
            e.target.classList.remove("is-danger");
            e.target.classList.add("is-primary");
            feedbackE.textContent = ""
        } else {
            e.target.classList.remove("is-primary");
            e.target.classList.add("is-danger");
            feedbackE.textContent = "邮箱格式不对"
        }
    }

    has_email = async (e) => {
        const feedbackE = document.getElementById("feedbackemail");
        const elementE = document.getElementById("email");
        let res = await authAPI.has_mailregister(e.target.value)
        if (res && res.status === 200) {
            let {has_mail} = res.data
            if (has_mail) {
                elementE.classList.remove("is-primary");
                elementE.classList.add("is-danger");
                feedbackE.textContent = "邮箱已注册";
            }
        }
    }

    render() {
        return (
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input id="email" className="input is-centered is-primary" type="email"
                        placeholder="邮箱" required onChange={this.validate_email.bind(this)}
                        onBlur={this.props.isRegister? this.has_email.bind(this): null} />
                    <span className="icon is-small is-left">
                        <i className="fa fa-envelope-o"/>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fa fa-check"/>
                    </span>
                </p>
                <p className="help is-danger" id="feedbackemail"/>
            </div>
        )
    }
}

export class SendVcode extends Component {

    constructor(props) {
        super(props);
        this.interval = 60
        this.state = {
            btntext: "发送邮件验证码",
            timer: this.interval,
            btndis: false
        };

        this.sendVericode = this.sendVericode.bind(this)
    }

    sendVericode = async (e) => {
        let email = document.getElementById("email");
        await authAPI.sendmail_vcode(email.value).then();
        this.count()
    }

    count = () => {
        let siv = setInterval(() => {
            let _timer = this.state.timer - 1
            this.setState({timer: (_timer), btntext: "验证码已发送(" + _timer + ")", btndis: true},
                () => {
                    if (_timer === 0) {
                        clearInterval(siv);
                        this.setState({timer: this.interval * 2, btntext: "重新发送", btndis: false})
                    }
                })
        }, 1000)
    }

    render() {
        return (
            <p className="control">
                <button className="button is-info is-rounded" disabled={this.state.btndis}
                    onClick={this.sendVericode} >
                    {this.state.btntext}
                </button>
            </p>
        );
    }
}

export function Vcode(props) {
    return (
        <p className="control is-expanded">
            <input id="vcode" className="input is-centered is-primary" type="text" required
                placeholder="验证码" pattern="^[\d]{6}$" title="6位数字验证码"/>
        </p>
    )
}