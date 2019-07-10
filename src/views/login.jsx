import React from 'react';
import GoogleLogin from 'react-google-login';


class LoginPage extends React.Component {
    responseGoogle = (response) => {
        console.log(response);
    }

    render() {
        return (<div className="homePage">
            <GoogleLogin
                clientId="576339338935-b0ns3sd9673d2k866aj4hicqpcsngbqi.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>);
    }
}

export default LoginPage;


