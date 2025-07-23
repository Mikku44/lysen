import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './features/user/userSlice'
import templateReducer from './features/template/templateSlice'
import invoiceReducer from './features/invoices/invoicesSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['invoice','template'] 
}

const rootReducer = combineReducers({
  user: userReducer,
  template: templateReducer,
  invoice: invoiceReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store)

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
