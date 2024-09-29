import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   blacklist: [
//     'user',
//     'editor'
//   ],
//   timeout: null,
// };

const middlewares = [thunk];

// if (__DEV__) {
//   middlewares.push(createLogger());
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);

type ReduxState = ReturnType<typeof store.getState>
type ReduxDispatch = ReturnType<typeof store.dispatch>


export type {ReduxState, ReduxDispatch}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...middlewares,
    ...getDefaultMiddleware({serializableCheck: false}),
  ],
});

// export const persistor = persistStore(store);

