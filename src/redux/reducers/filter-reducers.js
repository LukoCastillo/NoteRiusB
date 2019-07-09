import { FILTER_NOTE } from '../actions/filter-actions';

const _initalState = { text: "" };

const noteReducer = (state = _initalState, { type, payload }) => {
    switch (type) {
        case FILTER_NOTE:
            return Object.assign({}, state, payload.filter);
        default:
            return state;
    }
};


export default noteReducer;