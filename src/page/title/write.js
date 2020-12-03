import React, { Component } from 'react';
import {ContextUser} from '../../contextUser'
import {Redirect} from "react-router-dom";
import {titleAPI} from '../../api/api'

// component to write title
export default class Write extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            redirect: this.context.state.isLogin
        }

        this.handlewrite = this.handlewrite.bind(this)
    }

    handlewrite = async (e) => {
        e.preventDefault();
        let isLogin = this.context.state.isLogin
        if (isLogin) {
            let heading = document.getElementById("heading");
            let content = document.getElementById("content");
            let token = this.context.state.token

            let res = await titleAPI.createTitile(token, heading.value, content.value)
            let status = res.status;
            if (status === 201) {
                alert('提交成功!')
                heading.value = '';
                content.value = '';
            }
        }
    }

    render() {
        if(!this.state.redirect) {
            return (
                <Redirect to="/login" />
            )
        } else {
            return(
                <section className="write hero">
                    <div className="hero-body">
                         <div className="columns is-centered">
                            <div className="column is-7">
                                <form className="box" onSubmit={this.handlewrite}>
                                    <nav className="level">
                                        <div className="level-left">
                                            <p className="level-item"><strong>记一行代码 解惑他人</strong></p>
                                        </div>
                                        <div className="level-right">
                                            <p className="level-item">
                                                <button type="submit" className="button is-small is-rounded is-info">发布</button>
                                            </p>
                                        </div>
                                    </nav>
                                    <div className="control">
                                        <input id="heading" className="input is-info" type="text"
                                            maxLength="100" required placeholder="列出Docker容器" />
                                        <hr/>
                                        <textarea id="content" className="textarea has-fixed-size is-info" rows="8"
                                              maxLength="800" required placeholder="docker ps -a" >
                                        </textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
    }
}

Write.contextType = ContextUser;