import React, { Component } from 'react';
import {titleAPI} from "../../api/api";
import {TitleList} from "../title/title";


// component for the main page
export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            tcounter: 0,
            titleList: []
        }
    }

    // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
    componentDidMount = async () => {
        let response = await titleAPI.listTitle(0)
        if (response.status === 200) {
            let counter = response.data.length
            this.setState({titleList: response.data, tcounter: counter, loading: false})
        } else {
            this.setState({loading: false})
        }

        const ob = new IntersectionObserver(entries => {
            entries.forEach((item) => {
                if(item.isIntersecting){
                    this.loadmoredata()
                }
            })
        })
        ob.observe(document.getElementById("tmore"))
    }

    loadmoredata = async () => {
        let response = await titleAPI.listTitle(this.state.tcounter)
        if (response.status === 200) {
            let list = this.state.titleList.concat(response.data)
            this.setState({titleList: list, tcounter: list.length})
        }
    }

    homelayout(){
        return (
            <section className="home hero">
                <div className="hero-body">
                    <div className="columns is-centered">
                        <div className="column is-8">
                            <TitleList data={this.state.titleList} />
                            <hr id="tmore"/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    render() {
        const {loading} = this.state

        if(loading) {
            return (
                <div>
                    {this.homelayout(
                        <span className="icon has-text-info">
                            <i className="fa fa-spinner fa-pulse fa-2x"/>
                        </span>
                    )}
                </div>
            );
        } else {
            return(
                <div>
                    {this.homelayout()}
                </div>
            )
        }
    }
}


