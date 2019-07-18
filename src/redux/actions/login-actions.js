import DB from '../../db';

export const SAVE_USER = "SAVE_USER";
export const SAVE_USER_SUCCESS = "SAVE_USER_SUCCESS";
export const SAVE_USER_ERROR = "SAVE_USER_ERROR";

export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";
export const LOGOUT_USER = "LOGOUT_USER";



/**Internal methods */

/**
 *  save the logged user into the db
 * @param {Object} user 
 */
const saveLoggedUser = (user, notes) => {
    const db = new DB();

    return db.saveUser(user, notes).then(((res) => {
        let idx = res.id ? res.id : res._id;
        return db.syncLocalUser(idx, notes).then(res => {
            return { user: Object.assign({}, { _id: idx }, user) };
        });
    }));
};

const tryLoginUser = () => {
    const db = new DB();
    const LOCAl_USER = "localUser";
    const userId = sessionStorage.getItem('loggedUser') === null ? LOCAl_USER : sessionStorage.getItem('loggedUser');

    return db.getLocalUser(userId).then(res => {
        //return existing user
        return { user: res };
    }).catch(err => {
        //return localUser
        return { user: { _id: LOCAl_USER } };
    });
}

/**End internal methods */

export function saveUser(user, notes) {
    return function (dispatch) {
        saveLoggedUser(user, notes).then(res => {
            dispatch({
                type: SAVE_USER_SUCCESS,
                payload: { user: res.user }
            });
        }).catch(err => {
            dispatch({
                type: SAVE_USER_ERROR,
                payload: { error: err }
            });
        });
    }
}



export function loginUser(userId) {
    return function (dispatch) {
        tryLoginUser().then(res => {
            dispatch({
                type: LOGIN_USER,
                payload: { user: res.user }
            });
        }).catch(err => {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { error: err }
            });
        })
    }
}

