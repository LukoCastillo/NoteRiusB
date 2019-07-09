import { UPDATE_NOTE, DELETE_NOTE } from '../actions/note-actions';


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
            debugger;
            return state.filter((note) => note.id !== payload.id);
        default:
            return state;
    }
};


export default noteReducer;