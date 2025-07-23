'use client'

import { ChangeEvent, useEffect } from 'react'

import {
  selectTemplate,
  setColor,
  setCurrency,
  setLang
} from '@/app/store/features/template/templateSlice'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import i18n from '@/app/i18n'
import { Button } from './ui/button'
import ColorPick from './generator/ColorPick'

export default function Template () {
  const dispatch = useAppDispatch()
  const { color, currency, lang } = useAppSelector(selectTemplate)

  const currencies = ['THB', 'USD', 'JPY', 'KRW', 'CNY', 'MYR']
  const switchCurrency = () => {
    const currentIndex = currencies.indexOf(currency)
    const nextIndex = (currentIndex + 1) % currencies.length
    dispatch(setCurrency(currencies[nextIndex]))
  }
  const toggleLang = () => {
    const newLang = i18n.language === 'en' ? 'th' : 'en'
    i18n.changeLanguage(newLang)
    dispatch(setLang(newLang))
  }

  const handleChangeColor = (value: string) => {
    dispatch(setColor(value))
  }

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', color)
  }, [color])

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])

  return (
    <div className='flex gap-2 items-center'>
      {/* <span className='mr-2'>Color</span> */}
      {/* <label
        htmlFor='color-picker'
        style={{ backgroundColor: color }}
        className='rounded-sm min-w-[30px] min-h-[30px] size-[30px]'
      >
        <div className="w-[30px] ">
          <input
            id='color-picker'
            type='color'
            value={color}
            onChange={handleChangeColor}
            className='w-16 h-10 p-0 border-none bg-transparent cursor-pointer opacity-0 '
          />
        </div>
      </label> */}

      <ColorPick
        onPick={(value: string) => handleChangeColor(value)}
        color={color}
      />

      <Button
        className='relative z-10 border border-white/20'
        onClick={switchCurrency}
      >
        {currency}
      </Button>
      <Button className='border border-white/20' onClick={toggleLang}>
        {lang !== 'en' ? 'TH' : 'EN'}
      </Button>
    </div>
  )
}
