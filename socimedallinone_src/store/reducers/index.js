import {combineReducers} from 'redux';
// import editorReducer from './editor';
import userReducer from './user';
import playerReducer from '../../container/editor/store/slice/player';
import editorReducer from '../../container/editor/store/slice/editor';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
