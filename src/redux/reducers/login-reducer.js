import {
    SAVE_USER, LOGOUT_USER, LOGIN_USER,
    SAVE_USER_SUCCESS, SAVE_USER_ERROR,
    LOGIN_USER_ERROR
} from '../actions/login-actions';

const _initalState = {
    _id: null,
    email: "",
    familyName: "",
    givenName: "",
    googleId: "",
    imageUrl: "",
    name: "",
    notes: []
};

const loginReducer = (state = _initalState, { type, payload }) => {
    switch (type) {
        case SAVE_USER:
            return state;
        case LOGIN_USER:
        case SAVE_USER_SUCCESS:
            let _newLogin = payload.user;
            return Object.assign({}, state, _newLogin);
        case SAVE_USER_ERROR:
            return state;

        case LOGIN_USER_ERROR:
            return state;
        case LOGOUT_USER:
            return state;
        default:
            return state;
    }
};

export default loginReducer;