import PouchDB from 'pouchdb-browser';
import PouchAuth from 'pouchdb-authentication';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchAuth);

const _USER = "cedgerselidinstonlyedstr";
const _PASS = "c42e46cf7f82b0c7316425f7ea324fc72f9e18a2";

export default class DB {
    constructor() {
        this.db = new PouchDB('notes-big');
        this.remoteDatabase = new PouchDB('https://59c816a3-2047-4250-b9fa-d8496c77b736-bluemix.cloudant.com/notes-big', { skip_setup: true });
    }
    async syncDataBase() {

        this.remoteDatabase.login(_USER, _PASS).then((res) => {
            PouchDB.sync(this.db, this.remoteDatabase, {
                live: true,
                heartbeat: false,
                timeout: false,
                retry: true
            }).then((resu) => {
                console.log(resu);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    async getAllNotes(userid) {
        return this.db.get(userid).then((doc) => {
            return doc.notes || [];
        });
    }
    async saveUser(user) {
        const _self = this;

        return _self.db.find({
            selector: {
                googleId: user.googleId
            }
        }).then((res) => {
            if (res.docs.length > 0) {
                return res.docs[0];
            } else {
                return _self.db.post(user);
            }
        }).catch((err) => {
            return err;
        });
    }

    async getAllDocs() {
        return this.db.allDocs({
            include_docs: true,
        });
    }

    async addNoteByUser(userid, newNote) {
        const _self = this;
        return _self.db.get(userid).then(function (doc) {

            doc.notes = doc.notes || [];
            let _newNotes = [...doc.notes, newNote];
            doc.notes = _newNotes;
            return _self.db.put(doc);
        })
    }
}