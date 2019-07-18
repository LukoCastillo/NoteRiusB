import React from 'react';
import HeaderApp from '../components/header';
import Routering from '../router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../redux/actions/login-actions';
import { loadNote } from '../redux/actions/note-actions';


class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.initialLocalUser();
    }
    componentDidUpdate() {
        this.props.onLoadAllNotes(this.props.user._id);
    }
    initialLocalUser = () => {
        this.props.onLogInUser();

    };
    render() {
        return (<div className="App">
            <HeaderApp />
            <Routering />
        </div>)
    }
}

const mapStateToProps = (state, props) => {
    return {
        user: state.login
    }
};

const mapActionToProps = (dispatch, props) => {
    return bindActionCreators({
        onLogInUser: loginUser,
        onLoadAllNotes: loadNote
    }, dispatch)
};

export default connect(mapStateToProps, mapActionToProps, null)(Layout);
