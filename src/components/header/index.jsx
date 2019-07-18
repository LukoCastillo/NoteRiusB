import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserHub from './userHub';


class HeaderApp extends React.Component {

    render() {
        return (<div>
            <Navbar className="bg-light justify-content-between">
                <div>
                    <Link to="/home" className="navbar-brand">
                        NoteApp
                </Link>
                </div>
                <div>
                    <div className=" mr-sm-2">{this.props.user.email === "" ?
                        (<Link to="/login" className="nav-link">Login to sync</Link>)
                        :
                        (<UserHub {...this.props.user} />)
                    }</div>
                </div>
            </Navbar>
        </div>)
    }
}

const mapStateToProps = (state, props) => {
    return {
        user: state.login
    }
};

const mapActionToProps = (dispatch, props) => {
    return {};
};

export default connect(mapStateToProps, mapActionToProps, null)(HeaderApp);