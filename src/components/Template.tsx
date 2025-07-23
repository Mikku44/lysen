'use client'

import { useEffect } from 'react'

import { selectTemplate, setColor } from '@/app/store/features/template/templateSlice'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'

export default function Template() {
  const dispatch = useAppDispatch()
  const { color } = useAppSelector(selectTemplate)

  useEffect(() => {
    
    document.documentElement.style.setProperty('--primary', color)
  }, [color])

  return (
    <div>
        {/* <span className='mr-2'>Color</span> */}
      <label
        htmlFor='color-picker'
        style={{ backgroundColor: color }}
        className='rounded-sm min-w-[10px] min-h-[10px] size-[10px]'
      >
        <input
          id='color-picker'
          type='color'
          value={color}
          onChange={(e) => dispatch(setColor(e.target.value))}
          className='w-16 h-10 p-0 border-none bg-transparent cursor-pointer opacity-0'
        />
      </label>
    </div>
  )
}
