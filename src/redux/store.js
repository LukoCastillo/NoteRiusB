//redux importing.
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import noteReducer from './reducers/note-reducers';
import filterReducer from './reducers/filter-reducers';

//project reducers
const allReducers = combineReducers({
    notes: noteReducer,
    filter: filterReducer
});
//create init store

const allStoreEnhancers = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(allReducers, {}, allStoreEnhancers);


export default store;