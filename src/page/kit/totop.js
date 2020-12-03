import React, { Component } from 'react';

export default class ScrollToTop extends Component {
    constructor(props) {
        super(props)

        this.state = ({
        show: false
        })

        this.changeScrollTopShow = this.changeScrollTopShow.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.changeScrollTopShow)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.changeScrollTopShow)
    }

    render() {
        const { show } = this.state;
        return(
            <div>{
                    show &&
                    <div className = "button is-primary" onClick = {this.scrollToTop}
                        style={{position:'fixed', right:'100px', bottom:'100px'}} >
                        <span className="icon">
                            <i className="fa fa-arrow-up"/>
                        </span>
                    </div>
                }
            </div>
        )
    }

    changeScrollTopShow() {
        if (window.pageYOffset < 400) {
        this.setState({
          show: false
        })
        }else {
        this.setState({
          show: true
        })
        }
    }

    scrollToTop() {
        const scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if ( pos > 0 ) {
          window.scrollTo( 0, pos - 20 );
        } else {
          window.clearInterval( scrollToTop );
        }
        }, 1);
    }
}

