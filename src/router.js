import React from 'react';

import CreateNote from './views/createNote';
import Home from './views/home';
import NotFound from './views/notFound';
import LoginPage from './views/login';
import PouchDb from './views/pouchdb';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Routering extends React.Component {

    render() {
        return (
            <section>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/createNote" component={CreateNote} />
                    <Route exact path="/createNote/:id" component={CreateNote} />
                    <Route exact path="/not-found" component={NotFound} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/pouch" component={PouchDb} />
                    <Redirect exact from="/" to="/home" />
                    <Redirect exact from="*" to="/home" />
                </Switch>
            </section>
        );
    }

}

export default withRouter(Routering);
