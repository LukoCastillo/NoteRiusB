import PouchDB from 'pouchdb-browser';
import PouchAuth from 'pouchdb-authentication';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchAuth);

const _USER = "lieddereatindedithemysed";
const _PASS = "d1a4e592ea8778cbfa948f7d2ccb21d08073f3b1";


export default class DB {
    constructor() {
        this.db = new PouchDB('notes-big');
        this.remoteDatabase = new PouchDB('https://59c816a3-2047-4250-b9fa-d8496c77b736-bluemix.cloudant.com/notes-big', { skip_setup: true });
        this.getAllDocs();
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
        return this.db.find({
            selector: { _id: { $eq: userid } }
        }).then((res) => {
            if (res.docs.length > 0)
                return res.docs[0].notes || [];
            else
                return []

        }).catch((err) => {
            console.log(err);
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

    getAllDocs() {
        this.db.allDocs({
            include_docs: true,
        }).then(res => {
            console.log(res);
        });
    }

    async addNoteByUser(userid, newNote) {
        const _self = this;

        return _self.db.find({
            selector: {
                _id: userid
            }
        }).then((res) => {
            let user = {};
            if (res.docs.length > 0) {
                user = Object.assign({}, res.docs[0]);
                user.notes = _self.addNotes(user, newNote);
                return _self.db.put(user);
            } else {
                user = { _id: userid };
                user.notes = _self.addNotes(user, newNote);
                return _self.db.post(user);
            }
        });
    }

    addNotes(user, currentNotes) {
        let userNotes = user.notes || [];
        currentNotes.forEach(newNote => {
            let indexNote = userNotes.findIndex((userNote) => userNote.id === newNote.id);
            //update or add a new note
            if (indexNote !== -1) {
                userNotes[indexNote] = Object.assign({}, newNote);
            } else {
                userNotes.push(newNote);
            }
        });
        return userNotes;
    }


    async deleteNote(userid, noteId) {
        const _self = this;
        return _self.db.find({
            selector: {
                _id: userid
            }
        }).then((res) => {
            if (res.docs.length > 0) {
                let user = res.docs[0];
                user.notes = user.notes.filter((note) => note.id !== noteId);
                return _self.db.put(user);
            } else
                return [];
        });
    }
    async deleteUserDoc(userId) {
        const _self = this;
        return _self.db.get(userId).then(function (doc) {
            return _self.db.remove(doc);
        });
    }

    async syncLocalUser(userId, notes) {
        let _self = this;
        //save new notes.
        return _self.addNoteByUser(userId, notes).then(res => {
            //delete localUser.
            return _self.deleteUserDoc("localUser").then(res => {
                debugger;
            }).catch(err => {
                debugger;
            });
        });
    }

    async getLocalUser(userId) {
        return this.db.get(userId);
    }
}