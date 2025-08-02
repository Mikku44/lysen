import Link from 'next/link'
import Template from './Template'
import ReduxProvider from './home/ReduxProvider'
// import CountOnline from './firebase/countOnline'
// import { ChartColumnBig } from 'lucide-react'

export default function Footer () {
  return (
    <footer className='bg-[var(--primary)] text-gray-50 print:hidden'>
      <div className='max-w-7xl w-full mx-auto px-4 py-2 text-sm flex lg:flex-row flex-col gap-2 lg:items-center justify-between'>
        <div className=''>Copyright 2025 © Lysen Khain.app</div>
        <div className='flex gap-2 items-center'>
          <Link className='hover:underline' href='/terms-of-use'>
            Terms of use & Privacy Policy
          </Link>

          <ReduxProvider>
            <Template></Template>
            <div className='flex gap-1 items-center'>
              {/* <ChartColumnBig /> <CountOnline /> */}
              <a href='https://www.hitwebcounter.com' target='_blank'>
                <img
                  src='https://hitwebcounter.com/counter/counter.php?page=21296567&style=0007&nbdigits=5&type=page&initCount=0'
                  title='Counter Widget'
                  alt='Visit counter For Websites'
                />
              </a>
            </div>
          </ReduxProvider>
        </div>
      </div>
    </footer>
  )
}
