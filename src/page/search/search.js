import React, { Component } from 'react';
import {titleAPI} from "../../api/api";
import {TitleList} from "../title/title";
import './search.css'


export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: this.props.match.params.q,
            loading: true,
            pages: 0,
            pagenum: 1,
            titleList: []
        }
    }

    searchdata = async () => {
        let response = await titleAPI.search(this.state.query, this.state.pagenum)
        if (response.status === 200) {
            let {pages, titles} = response.data
            this.setState({titleList: titles, pages: pages, pagenum: this.state.pagenum + 1, loading: false})
        } else {
            this.setState({loading: false})
        }
    }

    componentDidMount = async () => {
        await this.searchdata()
        const ob = new IntersectionObserver(entries => {
            entries.forEach((item) => {
                if(item.isIntersecting){
                    this.searchmoredata()
                }
            })
        })
        ob.observe(document.getElementById("tmore"))
    }

    componentWillReceiveProps = async (nextProps) => {
        if (nextProps.match.params.q !== this.state.query) {
            this.setState({query: nextProps.match.params.q,
                loading: true,
                pages: 0,
                pagenum: 1,
                titleList: []
            }, this.searchdata)
        }
    }

    searchmoredata = async () => {
        if (this.state.pagenum < this.state.pages) {
            let response = await titleAPI.search(this.state.query, this.state.pagenum)
            if (response.status === 200) {
                let {titles} = response.data
                let list = this.state.titleList.concat(titles)
                this.setState({titleList: list, pagenum: this.state.pagenum + 1, loading: false})
            }
        }
    }

    searchlayout(){
        return (
            <section className="home hero">
                <div className="hero-body">
                    <div className="columns is-centered">
                        <div className="column is-8">
                            <TitleList data={this.state.titleList} />
                            <hr id="tmore"/>
                            <div className="linetext" style={{display: this.state.pagenum>=this.state.pages}}>
                                <span>您的写作，是我的无底线</span>
                            </div>
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
                    {this.searchlayout(
                        <span className="icon has-text-info">
                            <i className="fa fa-spinner fa-pulse fa-2x"/>
                        </span>
                    )}
                </div>
            );
        } else {
            return(
                <div>
                    {this.searchlayout()}
                </div>
            )
        }
    }
}
