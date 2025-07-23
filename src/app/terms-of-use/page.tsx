'use client'
import { useTranslation } from 'react-i18next'

export default function LegalPage() {
  const { t } = useTranslation()

  const terms = t('legal.terms', { returnObjects: true }) as string[]
  const privacy = t('legal.privacy', { returnObjects: true }) as string[]

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-gray-800 text-base leading-relaxed">
      <h1 className="text-3xl font-semibold mb-6">{t('legal.title')}</h1>
      <p className="mb-10 text-gray-600">{t('legal.description')}</p>

      {/* Terms of Use Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-medium mb-4">{t('legal.termsTitle')}</h2>
        <ol className="list-decimal pl-6 space-y-4 text-gray-700">
          {terms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ol>
      </section>

      <hr className="border-gray-200 my-12" />

      {/* Privacy Policy Section */}
      <section>
        <h2 className="text-2xl font-medium mb-4">{t('legal.privacyTitle')}</h2>
        <ol className="list-decimal pl-6 space-y-4 text-gray-700">
          {privacy.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </section>
    </main>
  )
}
