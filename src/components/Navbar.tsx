import Link from 'next/link'
import Typing from './home/Typing'

export default function Navbar () {
  return (
    <header className='print:hidden'>
      <nav className='max-w-7xl mx-auto p-2 flex gap-1 items-center justify-between'>
        <Link
          href={'/'}
          className='text-2xl hover:bg-gray-100/50 rounded-sm p-2 px-3'
        >
          Lysen
          <div className='text-sm'>
            <Typing></Typing>
          </div>
        </Link>

        <Link
          href='https://buymeacoffee.com/andalangu'
          target='_blank'
          className='text-sm flex gap-2 items-center hover:bg-gray-100/50 text-gray-600 bg-gray-100 rounded-full p-2 px-5'
        >
          <img
            className='w-3'
            src='https://cdn.buymeacoffee.com/assets/logos/icon-black.png'
            alt='buy me a coffe'
          ></img>
          Buy me a coffee
        </Link>
      </nav>
    </header>
  )
}
