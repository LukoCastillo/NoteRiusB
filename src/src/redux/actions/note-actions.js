//add note
//get notes
//get notebyid
//delete note

export const UPDATE_NOTE = 'note:updateNote';
export const GET_NOTES = 'note:getNote';
export const GET_NOTE_BY_ID = 'note:getNoteById';
export const DELETE_NOTE = 'note:deleteNote';


export function updateNote(newNote) {
    return {
        type: UPDATE_NOTE,
        payload: {
            note: newNote
        }
    }
}

export function deleteNote(id) {
    return {
        type: DELETE_NOTE,
        payload: {
            id
        }
    }
}