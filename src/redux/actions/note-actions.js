
import DB from '../../db';


export const UPDATE_NOTE = 'note:updateNote';
export const LOAD_NOTES = 'note:loadNotes';
export const DELETE_NOTE = 'note:deleteNote';

export function loadNote(userId) {
    return function (dispatch) {
        const db = new DB();
        db.getAllNotes(userId).then((res) => {
            dispatch({
                type: LOAD_NOTES,
                payload: {
                    notes: res
                }
            });
        });
    }
}

export function updateNote(userId, newNote) {
    return function (dispatch) {
        const db = new DB();
        db.addNoteByUser(userId, [newNote]).then((res) => {
            dispatch({
                type: UPDATE_NOTE,
                payload: {
                    note: newNote
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    }
}


export function deleteNote(userId, noteId) {
    return function (dispatch) {
        const db = new DB();
        db.deleteNote(userId, noteId).then(res => {
            dispatch({
                type: DELETE_NOTE,
                payload: {
                    id: noteId
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    }
}