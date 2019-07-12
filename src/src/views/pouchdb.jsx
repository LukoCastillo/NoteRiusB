import React from 'react';
import DB from '../db';



class PouchDb extends React.Component {
    componentDidMount() {
        const db = new DB();
        db.getAllDocs().then((re) => {
            debugger;
        }).catch((err) => {
            debugger;
        });
        /* db.getAllNotes('bd29aecd-4214-45a0-851b-c017812b87d0').then((res) => {
             console.log(res);
         }).catch((e) => {
             console.log(e);
         })*/
    }
    adduser = () => {
        const db = new DB('notes-big');


        db.saveUser({ name: "Jose", age: 20, notes: [] }).then((res) => {
            console.log(res);
        });
    }
    syncDb = () => {
        const db = new DB('notes-big');
        db.syncDataBase();
    }
    addNote = () => {
        const db = new DB('notes-big');
        db.addNoteByUser('bd29aecd-4214-45a0-851b-c017812b87d0', { title: "223", body: "wer", position: 1 })
    }
    render() {
        return (<div>
            My pouchdb page
            <button onClick={this.adduser}>add user</button>
            <button onClick={this.syncDb}>sync database</button>
            <button onClick={this.addNote}>add note</button>
        </div>);
    }
}

export default PouchDb;


