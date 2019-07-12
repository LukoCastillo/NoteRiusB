import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class HeaderApp extends React.Component {

    render() {
        return (<div>
            <Navbar bg="light" expand="lg">
                <Link to="/home" className="navbar-brand">
                    NoteApp
                </Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Link to="/login" className="nav-link">Login to sync</Link>
                </Navbar.Collapse>
            </Navbar>
        </div>)
    }
}


export default HeaderApp;