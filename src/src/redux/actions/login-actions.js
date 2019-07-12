import DB from '../../db';

export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";
export const LOGOUT_USER = "LOGOUT_USER";


export function loginUser(user) {
    return function (dispatch) {
        const db = new DB();

        db.saveUser(user).then(((res) => {
            let idx = res.id ? res.id : res._id;
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user: Object.assign({}, { _id: idx }, user) }
            });
        })).catch((err) => {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { user }
            });
        });
    }
}