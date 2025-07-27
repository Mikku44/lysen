'use client'

import { useEffect } from 'react'

export default function BuyMeACoffeeWidget() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js'
    script.setAttribute('data-name', 'BMC-Widget')
    script.setAttribute('data-id', 'andalangu')
    script.setAttribute('data-description', 'Support me on Buy me a coffee!')
    script.setAttribute('data-message', 'Thank you visit us.')
    script.setAttribute('data-color', '#5F7FFF')
    script.setAttribute('data-position', 'Right')
    script.setAttribute('data-x_margin', '18')
    script.setAttribute('data-y_margin', '18')
    script.setAttribute('data-cfasync', 'false')
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return null
}
