import { UPDATE_NOTE, DELETE_NOTE, LOAD_NOTES } from '../actions/note-actions';


const initalState = [];

const noteReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case UPDATE_NOTE:
            let newState = [...state];
            let noteIdx = newState.findIndex((note, idx) => note.id === payload.note.id);
            if (noteIdx !== -1)
                newState[noteIdx] = Object.assign({}, payload.note);
            else
                newState = [...state, payload.note];
            return newState;
        case DELETE_NOTE:
            return state.filter((note) => note.id !== payload.id);
        case LOAD_NOTES:
            return payload.notes.map((item) => item);
        default:
            return state;
    }
};


export default noteReducer;