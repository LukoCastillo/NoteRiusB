import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { syncUserNotes } from '../../redux/actions/note-actions';

import UserHub from './userHub';


class HeaderApp extends React.Component {

    onSyncUser = () =>{
        if(this.confirmMsg()){
            this.props.syncUserNotes();
        }
    };

    confirmMsg = () => {
        return window.confirm("Do you really want to sync?");
    }
    

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
                        (<UserHub {...this.props.user}  onSync={this.onSyncUser} />)
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
    return bindActionCreators({
        syncUserNotes: syncUserNotes,
    }, dispatch)
};

export default connect(mapStateToProps, mapActionToProps, null)(HeaderApp);