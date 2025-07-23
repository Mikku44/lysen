'use client'

import React, { useRef, useEffect } from 'react'
import SignaturePad from 'signature_pad'

interface SignatureCanvasProps {
  value?: string
  onChange: (dataUrl: string) => void
  height?: number
  width?: number
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  value,
  onChange,
  height = 200,
  width = 500
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const signaturePadRef = useRef<SignaturePad>(null)
 

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        backgroundColor: '#ffffff',
        penColor: 'black'
      })

      if (value) {
         signaturePadRef.current?.clear()
          signaturePadRef.current?.fromDataURL(value,{height,width})
      }

      // On end drawing

      signaturePadRef.current?.addEventListener('endStroke', () => {
        const dataUrl = signaturePadRef.current?.toDataURL()
      
        if (dataUrl) onChange(dataUrl)
      })
    }
  }, [])
  

  const clearSignature = () => {
    signaturePadRef.current?.clear()
    onChange('')
  }

  return (
    <div className='space-y-2'>
      <div className="w-full border rounded overflow-hidden border-gray-300  shadow-sm">
        <canvas
          ref={canvasRef}
          height={height}
          width={width}
          className='  mx-auto  '
        />
      </div>
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={clearSignature}
          className='px-3 py-1 text-sm bg-gray-100 border rounded hover:bg-gray-200'
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default SignatureCanvas
