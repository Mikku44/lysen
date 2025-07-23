'use client'
import { useTranslation } from 'react-i18next'

export default function LegalPage() {
  const { t } = useTranslation()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-sm leading-relaxed min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{t('legal.title')}</h1>
      <p className="mb-6 text-gray-600">{t('legal.description')}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">{t('legal.termsTitle')}</h2>
      <ul className="list-disc pl-6 space-y-1">
       
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">{t('legal.privacyTitle')}</h2>
      <ul className="list-disc pl-6 space-y-1">
       
      </ul>
    </div>
  )
}
