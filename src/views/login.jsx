import React from 'react';
import GoogleLogin from 'react-google-login';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveUser } from '../redux/actions/login-actions';



class LoginPage extends React.Component {
    componentDidMount() {
        this.redirectToHome();
    }
    componentDidUpdate() {
        this.redirectToHome();
    }

    redirectToHome = () => {
        if (this.props.user.email !== "") {
            this.savesession();
            this.props.history.push('/home');
        }
    };
    savesession = () => {
        sessionStorage.setItem('loggedUser', this.props.user._id);
    };

    resSuccessGoogle = ({ profileObj }) => {
        let user = Object.assign({}, profileObj);
        let _notes = this.props.notes;
        debugger;
        this.props.onLoginUser(user, _notes);
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
        user: state.login,
        notes: state.notes
    }
};

const mapActionToProps = (dispatch, props) => {
    return bindActionCreators({
        onLoginUser: saveUser
    }, dispatch)
};

export default connect(mapStateToProps, mapActionToProps, null)(LoginPage);


