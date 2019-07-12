import React from 'react';
import GoogleLogin from 'react-google-login';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../redux/actions/login-actions';



class LoginPage extends React.Component {
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    redirectToHome = () => {
        this.props.history.push('/home');
    };
    resSuccessGoogle = ({ profileObj }) => {
        let user = Object.assign({}, profileObj);
        this.props.onLoginUser(user);
    }
    resFailGoogle = (err) => {
        console.log(err);
    }
    render() {
        return (<div className="loginPage">
            <GoogleLogin className="signInButton"
                clientId="576339338935-b0ns3sd9673d2k866aj4hicqpcsngbqi.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.resSuccessGoogle}
                onFailure={this.resFailGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <p>
                Userid : {this.props.user._id}
            </p>
        </div >);
    }
}

const mapStateToProps = (state, props) => {
    return {
        user: state.login
    }
};

const mapActionToProps = (dispatch, props) => {
    return bindActionCreators({
        onLoginUser: loginUser
    }, dispatch)
};

export default connect(mapStateToProps, mapActionToProps, null)(LoginPage);


