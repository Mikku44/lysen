'use client'

import { useEffect, useState } from 'react'
import * as QRCode from 'qrcode'

interface PromptPayQRProps {
  promptPayId: string
  amount?: number
  size?: number
}

export default function PromptPayQR ({
  promptPayId,
  amount,
  size = 200
}: PromptPayQRProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const generateQR = async () => {
      if (!promptPayId || promptPayId.length < 10) {
        setQrDataUrl(null)
        setError(null)
        return
      }

      try {
        // Dynamic import to avoid SSR issues
        const promptpayQr = await import('promptpay-qr')
        const payload = promptpayQr.default.generate(promptPayId, {
          amount: amount > 0 ? amount : undefined
        })

        const dataUrl = await QRCode.toDataURL(payload, {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        })

        setQrDataUrl(dataUrl)
        setError(null)
      } catch (err) {
        console.error('Error generating PromptPay QR:', err)
        setError('Failed to generate QR code')
        setQrDataUrl(null)
      }
    }

    generateQR()
  }, [promptPayId, amount, size])

  if (error) {
    return (
      <div
        className='flex items-center justify-center bg-gray-100 rounded-lg'
        style={{ width: size, height: size }}
      >
        <p className='text-xs text-gray-500 text-center px-4'>{error}</p>
      </div>
    )
  }

  if (!qrDataUrl) {
    return (
      <div
        className='flex items-center justify-center bg-gray-100 rounded-lg'
        style={{ width: size, height: size }}
      >
        <p className='text-xs text-gray-400'>Enter PromptPay ID</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center gap-2'>
      <img
        src={qrDataUrl}
        alt='PromptPay QR Code'
        width={size}
        height={size}
        className='rounded-lg'
      />
      {amount > 0 && (
        <p className='text-sm text-gray-600'>Amount: {amount.toFixed(2)} THB</p>
      )}
    </div>
  )
}