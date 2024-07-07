import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  userReducer  from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// store all our reducers to pass to persist 
const rootReducer = combineReducers({ user: userReducer});

// set the key, version, and store  in local storage 
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer )

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})

// set store to persist
export const persistor = persistStore(store);
