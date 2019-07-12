import { LOGIN_USER, LOGOUT_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from '../actions/login-actions';

const _initalState = {
    _id: "",
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
        case LOGIN_USER:
            return state;
        case LOGIN_USER_SUCCESS:
            let _newLogin = payload.user;
            return Object.assign({}, state, _newLogin);
        case LOGIN_USER_ERROR:
            return state;
        case LOGOUT_USER:
            return state;
        default:
            return state;
    }
};

export default loginReducer;