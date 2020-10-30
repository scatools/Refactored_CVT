import {combineReducers} from 'redux';
// import dataReducer from './dataReducer';
import weightsReducer from './weightsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    // data: dataReducer, 
    user: userReducer,
    weights: weightsReducer})

export default rootReducer;