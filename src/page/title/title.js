import React, { Component } from 'react';
import {timeformat} from '../kit/formatdate'

export class Title extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tid: props.title.tid,
            title: props.title
        }
    }

    render() {
        return (
            <article className="box my-3" >
                <h4 className="title is-6">{this.state.title.heading}</h4>
                <pre>
                    <code className="subtitle is-7">{this.state.title.content}</code>
                </pre>
                <div className="media content is-small">
                    <div className="media-content">
                        <p>
                            <a>@{this.state.title.nike}</a>·<a>replied </a>·{timeformat(this.state.title.timeline)}
                            <span className="tag">{this.state.title.tag}</span>
                            <span className="icon has-text-info mx-6">
                                <i className="fa fa-thumbs-o-up fa-1g"/>
                            </span>
                            <span className="icon has-text-info mx-6">
                                <i className="fa fa-star-o fa-1g"/>
                            </span>
                            <span className="icon has-text-info mx-6">
                                <i className="fa fa-external-link fa-1g"/>
                            </span>
                        </p>
                    </div>
                    {/*<div className="media-right">*/}
                    {/*    <span className="has-text-grey-light"><i*/}
                    {/*      className="fa fa-comments"/> 99</span>*/}
                    {/*</div>*/}
                </div>
            </article>
        )
    }
}

export const TitleList = (props) => {
    const titlelist = props.data.map((title) => {
        return (<Title key={title.tid} title={title}/>)
    })

    return (
        <div className="content">
            {props.data === 0 && <p>There are no titles.</p>}
            {titlelist}
        </div>
    )
}

