'use client'

import { store, persistor } from '@/app/store/store'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function ReduxProvider ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
