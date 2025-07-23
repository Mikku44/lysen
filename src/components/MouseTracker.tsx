'use client'
import { useEffect, useRef, useState } from 'react'

export default function MouseTracker () {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState(20)

  const lastPosition = useRef({ x: 0, y: 0 })
  const lastTime = useRef(Date.now())

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMouseMove = (e: MouseEvent) => {
        const now = Date.now()
        const deltaTime = now - lastTime.current

        const dx = e.clientX - lastPosition.current.x
        const dy = e.clientY - lastPosition.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const speed = distance / deltaTime

        const newSize = Math.min(60, Math.max(10, speed * 50))
        setSize(newSize)

        setPosition({ x: e.clientX, y: e.clientY })
        lastPosition.current = { x: e.clientX, y: e.clientY }
        lastTime.current = now
      }

      window.addEventListener('mousemove', handleMouseMove)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: position.y - size / 2,
        left: position.x - size / 2,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: 'var(--primary)',
        pointerEvents: 'none',
        zIndex: 9999,
        transition:
          'width 0.4s ease, height 0.4s ease, top 0.1s ease, left 0.1s ease'
      }}
    />
  )
}
