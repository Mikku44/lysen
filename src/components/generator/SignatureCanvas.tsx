'use client'

import React, { useRef, useEffect, useCallback } from 'react'
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
  const signaturePadRef = useRef<SignaturePad | null>(null)

  // Initialize signature pad
  useEffect(() => {
    if (!canvasRef.current) return

    signaturePadRef.current = new SignaturePad(canvasRef.current, {
      backgroundColor: '#ffffff',
      penColor: 'black'
    })

    const signaturePad = signaturePadRef.current

    const handleEndStroke = () => {
      const dataUrl = signaturePad?.toDataURL()
      if (dataUrl) onChange(dataUrl)
    }

    signaturePad.addEventListener('endStroke', handleEndStroke)

    // Cleanup function to remove event listener
    return () => {
      signaturePad.removeEventListener('endStroke', handleEndStroke)
      signaturePad.clear()
      signaturePadRef.current = null
    }
  }, [onChange])

  // Handle value changes
  useEffect(() => {
    if (!signaturePadRef.current || !value) return

    signaturePadRef.current.clear()
    signaturePadRef.current.fromDataURL(value, { height, width })
  }, [value, height, width])
  

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
