import {combineReducers} from 'redux';
import playerReducer from './slice/player';
import editorReducer from './slice/editor';
import utilsReducer from './slice/utils';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import React, {PropsWithChildren} from 'react';
import {Provider} from 'react-redux';

const rootReducer = combineReducers({
  player: playerReducer,
  editor: editorReducer,
  utils: utilsReducer,
});

const middlewares = [thunk];

const editorStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...middlewares,
    ...getDefaultMiddleware({serializableCheck: false}),
  ],
});

type ReduxState = ReturnType<typeof editorStore.getState>;
type ReduxDispatch = ReturnType<typeof editorStore.dispatch>;

const getStore = () => {
  return editorStore.getState();
};

export {getStore};

export type {ReduxState, ReduxDispatch};

const StoreProvider: PropsWithChildren<any> = ({children}: any) => {
  return <Provider store={editorStore}>{children}</Provider>;
};

export default StoreProvider;
