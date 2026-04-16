'use client'
import { useEffect, useRef, useState } from 'react'

export default function MouseTracker () {
  const [displayPosition, setDisplayPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState(20)

  const targetPosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  const lastPosition = useRef({ x: 0, y: 0 })
  const lastTime = useRef(Date.now())
  const rafId = useRef<number | null>(null)

  // Smooth animation loop using lerp
  useEffect(() => {
    const animate = () => {
      // Lerp factor (0.15 = smooth follow, higher = faster, lower = slower)
      const lerpFactor = 0.15

      currentPosition.current.x +=
        (targetPosition.current.x - currentPosition.current.x) * lerpFactor
      currentPosition.current.y +=
        (targetPosition.current.y - currentPosition.current.y) * lerpFactor

      setDisplayPosition({
        x: currentPosition.current.x,
        y: currentPosition.current.y
      })

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  // Mouse move handler
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMouseMove = (e: MouseEvent) => {
        const now = Date.now()
        const deltaTime = now - lastTime.current

        const dx = e.clientX - lastPosition.current.x
        const dy = e.clientY - lastPosition.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const speed = distance / (deltaTime || 1)

        const newSize = Math.min(60, Math.max(10, speed * 50))
        setSize(newSize)

        // Update target position for smooth animation
        targetPosition.current = { x: e.clientX, y: e.clientY }
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
      className='print:hidden'
      style={{
        position: 'fixed',
        top: displayPosition.y - size / 2,
        left: displayPosition.x - size / 2,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: 'var(--primary)',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.3s ease, height 0.3s ease'
      }}
    />
  )
}
