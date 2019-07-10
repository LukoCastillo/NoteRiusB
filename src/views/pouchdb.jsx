import React from 'react';
import PouchDB from 'pouchdb-browser';
import PouchAuth from 'pouchdb-authentication'
PouchDB.plugin(PouchAuth);



class PouchDb extends React.Component {
    componentDidMount() {
        debugger;
        const db = new PouchDB('notes-big');
        const remoteDatabase = new PouchDB('https://59c816a3-2047-4250-b9fa-d8496c77b736-bluemix.cloudant.com/notes-big', { skip_setup: true });
        remoteDatabase.login('', '').then((res) => {
            PouchDB.sync(db, remoteDatabase, {
                live: true,
                heartbeat: false,
                timeout: false,
                retry: true
            }).then((resu) => {
                console.log(resu);
            }).catch((err) => {
                console.log(err);
            });

            db.allDocs({
                include_docs: true,
            }).then(result => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });

        });


    }
    render() {
        return (<div>
            My pouchdb page
        </div>);
    }
}

export default PouchDb;


