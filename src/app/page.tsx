import Typing from '@/components/home/Typing'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Lysen - Free Invoice & Receipt Generator | No Login Required',
  description:
    'Generate professional invoices and receipts instantly with Lysen. AI-powered, customizable templates, completely free. No registration needed - start creating now!',
  openGraph: {
    title: 'Lysen - Free Invoice & Receipt Generator',
    description:
      'Generate professional invoices and receipts instantly. AI-powered, customizable templates, completely free.',
    url: 'https://lysen.khain.app',
    
  }
}

export default function LandingPage () {
  return (
    <main className='flex w-full min-h-screen items-center justify-center p-8 pb-20 gap-16 sm:p-20'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center'>
        <section className='space-y-8'>
          <div className='space-y-4'>
            <div className='flex gap-2 md:w-auto items-end w-[300px]'>
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-black'>
                Lysen{' '}
              </h1>
              <span className='text-zinc-800'>
                <Typing />
              </span>
            </div>
            <h2 className='text-xl sm:text-2xl text-gray-600 font-normal'>
              Make invoice / receipt easily
            </h2>
          </div>

          <Link
            href={'/generator'}
            className='inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[var(--color-primary)] rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2'
          >
            Get started
          </Link>
        </section>

        <section className='space-y-6'>
          <ul className='space-y-4'>
            <li className='flex items-start space-x-3'>
              <div className='w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full mt-2.5 flex-shrink-0'></div>
              <span className='text-gray-700 text-lg'>No login needed</span>
            </li>
            <li className='flex items-start space-x-3'>
              <div className='w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full mt-2.5 flex-shrink-0'></div>
              <span className='text-gray-700 text-lg'>No data collection</span>
            </li>
            <li className='flex items-start space-x-3'>
              <div className='w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full mt-2.5 flex-shrink-0'></div>
              <span className='text-gray-700 text-lg'>Optimized with AI</span>
            </li>
            <li className='flex items-start space-x-3'>
              <div className='w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full mt-2.5 flex-shrink-0'></div>
              <span className='text-gray-700 text-lg'>
                Customize your templates
              </span>
            </li>
          </ul>
        </section>

        <section className='lg:col-span-2 mt-16 pt-16 border-t border-gray-200'>
          <div className='text-center space-y-12'>
            <h3 className='text-3xl sm:text-4xl font-light text-black'>
              Benefits of Lysen
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto'>
              <div className='space-y-3 text-center'>
                <div className='w-12 h-12 bg-[var(--color-primary)] rounded-full mx-auto flex items-center justify-center'>
                  <div className='w-6 h-6 bg-white rounded-sm'></div>
                </div>
                <h4 className='text-lg font-medium text-black'>
                  No Manual Complexity
                </h4>
                <p className='text-gray-600 text-sm'>
                  Skip the hassle of manual invoice creation
                </p>
              </div>

              <div className='space-y-3 text-center'>
                <div className='w-12 h-12 bg-[var(--color-primary)] rounded-full mx-auto flex items-center justify-center'>
                  <div className='w-6 h-6 bg-white rounded-full'></div>
                </div>
                <h4 className='text-lg font-medium text-black'>Easy to Use</h4>
                <p className='text-gray-600 text-sm'>
                  Simple and intuitive interface
                </p>
              </div>

              <div className='space-y-3 text-center'>
                <div className='w-12 h-12 bg-[var(--color-primary)] rounded-full mx-auto flex items-center justify-center'>
                  <div className='w-6 h-6 bg-white rounded-full border-2 border-black'></div>
                </div>
                <h4 className='text-lg font-medium text-black'>Save Time</h4>
                <p className='text-gray-600 text-sm'>
                  Save time with automated features
                </p>
              </div>

              <div className='space-y-3 text-center'>
                <div className='w-12 h-12 bg-[var(--color-primary)] rounded-full mx-auto flex items-center justify-center'>
                  <div className='w-4 h-4 bg-white transform rotate-45'></div>
                </div>
                <h4 className='text-lg font-medium text-black'>100% Free</h4>
                <p className='text-gray-600 text-sm'>Completely free to use</p>
              </div>

              <div className='space-y-3 text-center'>
                <div className='w-12 h-12 bg-[var(--color-primary)] rounded-full mx-auto flex items-center justify-center'>
                  <div className='w-6 h-1 bg-white rounded-full'></div>
                </div>
                <h4 className='text-lg font-medium text-black'>Customizable</h4>
                <p className='text-gray-600 text-sm'>
                  Fully customizable templates
                </p>
              </div>

              <div className='space-y-3 text-center'>
                <div className='w-12 h-12 bg-[var(--color-primary)] rounded-full mx-auto flex items-center justify-center'>
                  <div className='w-2 h-2 bg-white rounded-full'></div>
                  <div className='w-2 h-2 bg-white rounded-full ml-1'></div>
                </div>
                <h4 className='text-lg font-medium text-black'>Secure</h4>
                <p className='text-gray-600 text-sm'>
                  Secure and private data handling
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
