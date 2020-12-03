import React,{ Component} from 'react'

export const ContextUser = React.createContext({
    // isLogin: false,
    // user: null,
    // token: null,
})

export default class UserProviderImpl extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin: localStorage.getItem('isLogin') === undefined ? false: localStorage.getItem('isLogin'),
            user: JSON.parse(localStorage.getItem('user')),
            token: localStorage.getItem('token'),
        }
    }

    signin = (isLogin, user, token) => {
        this.setState({
            isLogin: isLogin,
            user: user,
            token: token
        })
        if (isLogin){
            localStorage.setItem('isLogin', this.state.isLogin);
            localStorage.setItem('user', JSON.stringify(this.state.user));
            localStorage.setItem('token', this.state.token);
        }
    }

    signout = () => {
        this.setState({
            isLogin: false,
            user: null,
            token: null
        })
        localStorage.removeItem('isLogin')
        localStorage.removeItem('user');
        localStorage.removeItem('token')
    }

    render = () =>
        <ContextUser.Provider
            value={{ state : {...this.state}, actions: {signin: this.signin, signout: this.signout}}}>
            {this.props.children}
        </ContextUser.Provider>
}
