'use client'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { persistor, store } from '../store/store'
import { I18nextProvider } from 'react-i18next'
import Navigator from '@/components/generator/Navigator'
import '../i18n'
import i18n from '../i18n'
import { PersistGate } from 'redux-persist/integration/react'

export default function Layout ({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <section className='min-h-screen'>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigator />
            {children}
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </section>
  )
}
