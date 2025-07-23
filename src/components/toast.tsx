import { toast as sonner } from 'sonner'

export function toast (message?: string) {
  return sonner.custom(t => (
    <div className='border rounded-xl p-4 bg-gray-100/20 backdrop-blur-2xl min-w-[300px]'>
      <div className='flex gap-3 items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <g
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
          >
            <path
              strokeDasharray='2 4'
              strokeDashoffset='6'
              d='M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9'
            >
              <animate
                attributeName='stroke-dashoffset'
                dur='0.6s'
                repeatCount='indefinite'
                values='6;0'
              />
            </path>
            <path
              strokeDasharray='32'
              strokeDashoffset='32'
              d='M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9'
            >
              <animate
                fill='freeze'
                attributeName='stroke-dashoffset'
                begin='0.1s'
                dur='0.4s'
                values='32;0'
              />
            </path>
            <path strokeDasharray='10' strokeDashoffset='10' d='M12 8v7.5'>
              <animate
                fill='freeze'
                attributeName='stroke-dashoffset'
                begin='0.5s'
                dur='0.2s'
                values='10;0'
              />
            </path>
            <path
              strokeDasharray='6'
              strokeDashoffset='6'
              d='M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5'
            >
              <animate
                fill='freeze'
                attributeName='stroke-dashoffset'
                begin='0.7s'
                dur='0.2s'
                values='6;0'
              />
            </path>
          </g>
        </svg>
        <div className=''>
          <h1>{message || 'Custom toast'}</h1>
          <div className='text-sm text-gray-700'>{new Date().toUTCString()}</div>
        </div>
      </div>
      {/* <button
        className='text-sm mt-5 rounded-md py-2 px-4 hover:bg-gray-200/60 hover:text-black/60 duration-150'
        onClick={() => sonner.dismiss(t)}
      >
        Dismiss
      </button> */}
    </div>
  ))
}
